import RxObservableMaster from './RxObservableMaster'
import type { WsMsgFormat, WsEvent, Listener } from './types'

declare global {
  interface URLSearchParams {
    size: number | undefined
  }
}

class WsObservables<TEventKeys, TData> {
  observables: Map<TEventKeys, RxObservableMaster<TData>>

  constructor() {
    this.observables = new Map()
  }

  get(event: TEventKeys) {
    if (!this.observables.has(event)) this.observables.set(event, new RxObservableMaster<TData>())
    return this.observables.get(event)
  }
}

class WebSocketMaster {
  url: string
  params?: { [key: string]: string | number }
  socket: WebSocket | null = null
  observables: WsObservables<string, WsMsgFormat>
  listeners: { [k: string]: Array<Listener> } = {}
  onCloseCallback?: (...args: any[]) => void

  constructor(props: { url: string }) {
    this.url = props.url
    this.observables = new WsObservables()
  }

  setParams(params: { [key: string]: string | number }) {
    this.params = Object.fromEntries(Object.entries(params).filter(([, v]) => !!v))
  }

  connect() {
    const url = new URL(this.url)
    const searchParams = new URLSearchParams(this.params as unknown as URLSearchParams)
    if (searchParams?.size !== 0) url.search = searchParams.toString()

    this.socket = new WebSocket(url)

    this.socket.onopen = e => {
      console.debug('ws connected.', e)
    }
    this.socket.onclose = e => {
      this.onCloseCallback && this.onCloseCallback()
      console.debug('ws on closed.', e)
    }
    this.socket.onerror = e => {
      console.debug('ws on error: ', e)
    }
    this.socket.onmessage = e => {
      console.debug('ws on message.', e)
      const message = JSON.parse(e.data) as WsMsgFormat
      this.notifyObservables(message)
      this.notifyListeners(message)
    }
  }

  notifyObservables(message: WsMsgFormat) {
    const key = this.genEventKey({ roomId: message.roomId })
    const observable = this.observables.get(key)
    observable?.notifyListener(message)
  }

  notifyListeners(message: WsMsgFormat) {
    const key = this.genEventKey({ roomId: message.roomId, pairId: message.account })
    if (!this.listeners[key]) return

    for (const listener of this.listeners[key]) {
      listener.resolve({ key, message: 'ok' })
      clearTimeout(listener.timer)
    }

    delete this.listeners[key]
  }

  genEventKey(event: WsEvent) {
    const _pairId = event.pairId ? `_${event.pairId}` : ''
    const key = `${event.roomId}${_pairId}`
    return key
  }

  subscribe(event: WsEvent, callback: (value: WsMsgFormat) => void) {
    const key = this.genEventKey(event)
    const observable = this.observables.get(key)
    return observable?.subscribe(callback)
  }

  send(value: Omit<WsMsgFormat, 'nickname'>) {
    return this.sendSync(value)
  }

  waitSync(event: WsEvent) {
    const key = this.genEventKey(event)

    return new Promise((resolve, reject) => {
      if (!this.listeners[key]) this.listeners[key] = []
      const timer = setTimeout(() => {
        reject(`waitSync timeout: ${key}`)

        const listeners = this.listeners[key]
        const listener = listeners.find(promiseResolver => promiseResolver.resolve === resolve)
        if (listener) listeners.splice(listeners.indexOf(listener), 1)
      }, 10 * 1000)
      
      this.listeners[key].push({ resolve, timer })
    })
  }

  async sendSync(value: Omit<WsMsgFormat, 'nickname'>) {
    this.socket?.send(value.message)
    const res = await this.waitSync({ roomId: value.roomId, pairId: value.account })
    return res
  }

  setOnCloseCallback(callback: (...args: any[]) => void) {
    this.onCloseCallback = callback
  }
}

export default new WebSocketMaster({ url: 'ws://localhost:8080/websocket' })
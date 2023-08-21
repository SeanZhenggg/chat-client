export type WsMsgFormat = {
  roomId: string
  account: string
  message: string
  nickname: string
}

export type WsEvent = {
  roomId: string
  pairId?: string
}

export type Listener = { resolve: (value?: { key: string; message: string }) => void; timer: ReturnType<typeof setTimeout> }
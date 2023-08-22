import { createReducerContext } from 'react-use'
import type { Reducer } from 'react'
import Cookie from 'js-cookie'

type InitState = {
  token: string
  account: string
  roomId: string
}

type Action = 'setToken' | 'setAccount' | 'setRoomId' | 'resetState'

const initState: InitState = {
  token: Cookie.get('token') || '',
  account: Cookie.get('account') || '',
  roomId: ''
}

const reducer: Reducer<InitState, { type: Action, payload?: string }> = (state, action) => {
  switch(action.type) {
    case 'setAccount':
      return { ...state, account: action.payload || '' }
    case 'setToken':
      return { ...state, token: action.payload || '' }
    case 'setRoomId':
      return { ...state, roomId: action.payload || '' }
    case 'resetState':
      Cookie.remove('account')
      Cookie.remove('token')
      return { token: '', account: '', roomId: '' }
    default:
      return state
  }
}

export const [useAuthContext, AuthContextProvider] = createReducerContext(reducer, initState)
import React, { useEffect, useRef, useState } from 'react'
import ws from '../ws'
import { useAuthContext } from '../context/AuthContext'
import {
  StyledChatContainer,
  StyledBorderedTitle,
  StyledChatContent,
  StyledInput,
  StyledChatInputContainer,
  StyledChatMsgBlock,
  StyledChatMsgName,
  StyledChatMsgContent
} from '../resources/uiLibrary'
import { useForm } from 'react-hook-form'
import { WsMsgFormat } from '../types'

const getMsgType = (event: WsMsgFormat, currentAcc: string) => {
  if (event.message === '已連線') return 'connected'
  if (event.account === currentAcc) return 'self'
  return 'others'
}

const Chat: React.FC = () => {
  const init = useRef(false)
  const [ctx, dispatch] = useAuthContext()
  const { register, watch, reset } = useForm()
  const message = watch("message")
  const isComposition = useRef(false)
  const [messages, setMessages] = useState<(WsMsgFormat & { type: 'self' | 'others' | 'connected' })[]>([])

  useEffect(() => {
    if(init.current) return   
    if (!ctx.account || !ctx.token || !ctx.roomId) return 

    ws.setParams({
      account: ctx.account,
      token: ctx.token,
      roomId: ctx.roomId
    })
    ws.setOnCloseCallback(() => {
      
      dispatch({ type: 'resetState' })
    })
    ws.connect()

    ws.subscribe({ roomId: ctx.roomId }, (event) => {
      setMessages(prev => [...prev, { ...event, type: getMsgType(event, ctx.account) }])
    })
    init.current = true
  }, [ctx])

  const onSubmit = async (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return

    if(isComposition.current) return

    await ws.send({
      account: ctx.account,
      roomId: ctx.roomId,
      message: message
    })

    reset({
      message: ''
    })    
  }

  const onComposition = (e: React.CompositionEvent) => {
    if (e.type === 'compositionend') {
      isComposition.current = false
    } else {
      isComposition.current = true
    }
  }

  return (
    <>
      <StyledBorderedTitle>{ctx.roomId} 號聊天室</StyledBorderedTitle>

      <StyledChatContainer>
        <StyledChatContent>
          {messages.map((e, idx) => 
            <StyledChatMsgBlock key={`${idx}-${e.account}-${e.message}`}>
              <StyledChatMsgName $type={e.type}>{e.nickname}</StyledChatMsgName>
              <StyledChatMsgContent $type={e.type}>{e.message}</StyledChatMsgContent>
            </StyledChatMsgBlock>
          )}
        </StyledChatContent>
      </StyledChatContainer>

      <StyledChatInputContainer>
        <StyledInput
          onKeyDown={(e) => onSubmit(e)}
          onCompositionStart={onComposition}
          onCompositionEnd={onComposition}
          {...register('message')}
        />
      </StyledChatInputContainer>
    </>
  )
}

export default Chat
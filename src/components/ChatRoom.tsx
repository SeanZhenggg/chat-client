import React, { useEffect, useRef, useState } from 'react'
import ws from '../ws'
import { useAuthContext } from '../context/AuthContext'
import { StyledChatContainer, StyledChat, StyledBorderedTitle, StyledChatContent, StyledInput, StyledChatInputContainer } from '../resources/uiLibrary'
import { useForm } from 'react-hook-form'
import { WsMsgFormat } from '../types'
const Chat: React.FC = () => {
  const init = useRef(false)
  const [ctx] = useAuthContext()
  const { register, watch, reset } = useForm()
  const message = watch("message")
  const isComposition = useRef(false)
  const [messages, setMessages] = useState<WsMsgFormat[]>([])

  useEffect(() => {
    if(init.current) return   
    if (!ctx.account || !ctx.token || !ctx.roomId) return 

    ws.setParams({
      account: ctx.account,
      token: ctx.token,
      roomId: ctx.roomId
    })
    ws.connect()

    ws.subscribe({ roomId: ctx.roomId }, (event) => {
      console.log('⛔️⛔️⛔️⛔️⛔️', event)
      setMessages(prev => [...prev, event])
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
    <StyledChat>
      <StyledBorderedTitle>{ctx.roomId} 號聊天室</StyledBorderedTitle>

      <StyledChatContainer>
        <StyledChatContent>
          {messages.map((e, idx) => 
            <p key={`${idx}-${e.account}-${e.message}`}>{e.nickname} : {e.message}</p>
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
    </StyledChat>
  )
}

export default Chat
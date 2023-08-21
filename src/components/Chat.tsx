import { useMemo } from 'react'
import { useAuthContext } from '../context/AuthContext'
import Entry from './ChatEntry'
import Room from './ChatRoom'

const Chat: React.FC = () => {
  const [ctx] = useAuthContext()

  return useMemo(() => {
    if (ctx.token && ctx.account && ctx.roomId) return <Room />
    return <Entry />
  }, [ctx])
}

export default Chat
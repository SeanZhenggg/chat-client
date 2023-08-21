import { useState, useMemo, memo } from 'react'
import { StyledNav, StyledTab, StyledContainer } from '../resources/uiLibrary'
import Login from './Login'
import Register from './Register'

const Auth: React.FC = () => {
  const [tab, setTab] = useState('login')

  const Renderer = useMemo(() => {
    switch (tab) {
      case 'login':
        return <Login />
      case 'register':
        return <Register />
      default:
        return null
    }
  }, [tab])

  return (
    <>
      <StyledNav>
        <StyledTab $active={tab === 'login'} onClick={() => setTab('login')}>登入</StyledTab>
        <StyledTab $active={tab === 'register'} onClick={() => setTab('register')}>註冊</StyledTab>
      </StyledNav>

      <StyledContainer>
        {Renderer}
      </StyledContainer>
    </>
  )
}


const MemoAuth = memo(Auth)
export default MemoAuth
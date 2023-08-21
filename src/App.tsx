import './App.css'
import { useAuthContext, AuthContextProvider } from './context/AuthContext'
import Auth from './components/Auth'
import Chat from './components/Chat'
import { StyledMain } from './resources/uiLibrary'

const Main = () => {
  const [ctx] = useAuthContext()

  return (
    <StyledMain>
      {!ctx.token ? <Auth /> : <Chat />}
    </StyledMain>
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Main />
    </AuthContextProvider>
  )
}

export default App

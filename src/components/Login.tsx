import { useState } from 'react'
import { StyledForm, StyledButton, StyledInput, StyledLabel } from '../resources/uiLibrary'
import { type FieldValues, useForm } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'
import { useAuthContext } from '../context/AuthContext'

const userLoginApi = (url: string, { arg }: { arg: { account: string, password: string, nickname: string } }) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(arg)
  })
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const { trigger } = useSWRMutation('/api/user/login', userLoginApi)
  const [error, setError] = useState('')
  const [, dispatch] = useAuthContext()

  const onSubmit = async (data: FieldValues) => {
    const result = await trigger({
      account: data.account,
      password: data.password,
      nickname: data.nickname
    })
    
    if (result.status !== 200) {
      setError('帳號密碼錯誤')
      return
    }

    const response = await result.json()
    dispatch({ type: 'setAccount', payload: data.account })
    dispatch({ type: 'setToken', payload: response?.data })
  }
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel>
        帳號：
        <StyledInput type='text' {...register("account")}></StyledInput>
      </StyledLabel>

      <StyledLabel>
        密碼：
        <StyledInput type='password' {...register("password")}></StyledInput>
      </StyledLabel>

      <StyledButton type='submit'>登入</StyledButton>

      {error && <p style={{ color: 'red' }}>錯誤訊息：{error}</p>}
    </StyledForm>
  )
}

export default Login
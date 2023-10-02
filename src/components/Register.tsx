import { useState } from 'react'
import { StyledForm, StyledButton, StyledInput, StyledLabel } from '../resources/uiLibrary'
import { useForm, type FieldValues } from 'react-hook-form'
import useSWRMutation from 'swr/mutation'

const addUserApi = (url: string, { arg }: { arg: { account: string, password: string, nickname: string } }) => {
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
  const { trigger } = useSWRMutation('/api/user', addUserApi)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data: FieldValues) => {
    const result = await trigger({
      account: data.account,
      password: data.password,
      nickname: data.nickname
    })
    
    const response = await result.json()
    if (result.status !== 200) {
      setSuccess('')
      setError(response?.message)
      return
    }

    setError('')
    setSuccess('註冊成功')
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

      <StyledLabel>
        暱稱：
        <StyledInput type='text' {...register("nickname")}></StyledInput>
      </StyledLabel>

      <StyledButton type='submit'>註冊</StyledButton>
      {error && <p style={{ color: 'red' }}>錯誤訊息：{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </StyledForm>
  )
}

export default Login
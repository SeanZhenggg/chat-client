import { FieldValues, useForm } from 'react-hook-form'
import { StyledContainer, StyledForm, StyledButton, StyledLabel, StyledInput, StyledTitle, StyledFlexAroundContainer } from '../resources/uiLibrary'
import { useAuthContext } from '../context/AuthContext'
const ChatEntry: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [, dispatch] = useAuthContext()

  const onSubmit = (data: FieldValues) => {
    dispatch({ type: 'setRoomId', payload: data.roomId })
  }

  const onGoBackToLogin = () => {
    dispatch({ type: 'resetState' })
  }
  return (
    <StyledContainer>
      <StyledTitle>房間選擇：</StyledTitle>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledLabel>
          房號：
          <StyledInput type='text' placeholder='請輸入房號' {...register("roomId")} />
        </StyledLabel>

        <StyledFlexAroundContainer>
          <StyledButton type='submit'>進入房間</StyledButton>
          <StyledButton onClick={onGoBackToLogin}>回到登入</StyledButton>
        </StyledFlexAroundContainer>
      </StyledForm>
    </StyledContainer>
  )
}

export default ChatEntry
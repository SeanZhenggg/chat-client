import styled from 'styled-components'

export const StyledMain = styled.main`
  border-radius: 20px;
  border: 2px solid #eeeeee;
  overflow-x: hidden;
  min-width: 343px;
  margin: 0 16px;
  width: 50vw;
  max-width: 650px;
`

export const StyledContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledTab = styled.div<{ $active?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background: ${props => props.$active ? "#eee" : ""};
  color: ${props => props.$active ? "black" : "#eee"};
  
`

export const StyledForm = styled.form`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: stretch;
`;

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  border: none;
  display: inline-block;
  &:focus-visible {
    outline: #eee solid 2px;
  }
  flex: 1;
`

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  width: 100%;
`

export const StyledButton = styled.button`
  display: inline-block;
  color: #eee;
  font-size: 1em;
  padding: 0.5em 1em;
  border: 2px solid #eee;
  border-radius: 20px;
`

export const StyledTitle = styled.h3`
  font-weight: 600;
  color: #eee;
  font-size: 28px;
  text-align: center;
  display: block;
  padding: 0px 18px 24px;
  margin: 0;
`

export const StyledBorderedTitle = styled(StyledTitle)`
  border-bottom: 2px solid #eee;
  padding: 24px 18px 24px;
`

export const StyledChatContainer = styled.div`
  padding: 24px;
`

export const StyledChatContent = styled.div`
  padding: 12px 24px;
  border: 2px solid #eee;
  border-radius: 20px;
  min-height: 300px;
  max-height: 500px;
  overflow-y: scroll;
`

export const StyledFlexAroundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const StyledChatInputContainer = styled.div`
  display: flex;
  padding: 24px;
  border-top: 2px solid #eee;

  & input {
    height: 36px;
    font-size: 24px;
  }
`

export const StyledChatMsgBlock = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`

export const StyledChatMsgName = styled.span<{ $type: 'self' | 'others' | 'connected' }>`
  font-size: 18px;
  font-weight: 600;
  line-height: 1.25;
  color: ${props => {
    switch (props.$type) {
      case 'self':
        return "#EE4921"
      case 'others':
        return "#FFC133"
      case 'connected':
        return '#23EC41'
      default:
        return '#ffffff'
    }
  }}`

export const StyledChatMsgContent = styled.span<{ $type: 'self' | 'others' | 'connected' }>`
  font-size: 16px;
  color: #eee;
  line-height: 1;
  margin-left: 4px;
  color: ${props => {
    switch (props.$type) {
      case 'connected':
        return '#23EC41'
      case 'self':
      case 'others':
      default:
        return '#ffffff'
    }
  }}
`
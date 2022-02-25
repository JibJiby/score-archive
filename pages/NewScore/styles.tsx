import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { inputStyle } from '@styles/common'

export const NewScoreInput = styled.input`
  ${inputStyle}

  /* TODO: ScoreSearch 스타일 일반화 */
  margin: 50px auto;
  width: 60%;
  min-width: 300px;
  height: 3rem;
  outline: none;
  border: 0px;
  font-size: 16px;
  padding: 10px;
  border-radius: 6px;
  text-align: center;
`

export const FileUploadWrapper = styled.div`
  width: 128px;
  height: 128px;
  background-color: #fafafa;
  cursor: pointer;
  border: 1.4px dashed #d9d9d9;

  &:hover {
    border-color: tomato;
  }

  span[role='button'] {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`

export const Divider = styled.hr`
  width: 100%;
  border-top: 3px dashed tomato;
`

export const StatusColor = styled.div<{ status: string }>`
  display: inline-block;
  background-color: ${(props) => (props.status === 'green' ? '#51cf66' : '#fa5252')};
  width: 10px;
  height: 10px;
  margin: 0 10px;
`

export const SecondTitleInput = styled.input`
  /* https://codeconvey.com/css-input-border-animation/ */
  border: 0;
  min-width: 180px;
  padding: 7px 0;
  border-bottom: 2px solid black;
  background-color: transparent;
  outline: none;

  &:focus {
    border-bottom: 2px solid tomato;
    transition: border-bottom 0.3s;
  }
`

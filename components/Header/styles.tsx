import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
  margin: 0 1rem;
  user-select: none;
  font-weight: 700;

  min-width: 275px;
`

export const Logo = styled.div`
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 3rem;

  cursor: pointer;
`

export const LoginButton = styled.div`
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
  background-color: rgb(109, 61, 246);
  color: white;
`

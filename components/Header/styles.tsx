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
  /* background-color: tomato; */
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
  background-color: #49b95e;
  color: white;
`

export const NewScoreButton = styled.div`
  color: #001c34;
  border-color: #001c34;
  border: 1px solid transparent;

  font-weight: 600;
  cursor: pointer;
`

export const userButtonWrapperStyle = css`
  display: flex;
  flexdirection: row;
  justify-content: space-between;
  align-items: center;
  min-width: 140px;
`

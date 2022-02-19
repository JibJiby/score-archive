import { css } from '@emotion/react'

export const logoStyle = css`
  /* *:hover {
    font-size: 35px;
  } */
`

export const inputStyle = css`
  box-shadow: 0 1px 0 rgb(68 121 178 / 8%), 0 2px 10px rgb(68 121 178 / 8%);
  text-align: center;

  &:focus {
    transform: scale(1.05);
  }
`

export const buttonStyle = css`
  &:hover {
    opacity: 0.75;
  }
`

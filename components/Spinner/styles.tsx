import { css } from '@emotion/react'

export const spinerStyle = css`
  border: 4px solid #f3f3f3;
  border-top: 4px solid tomato;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.4s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

import { css } from '@emotion/react'
import { inputStyle } from '@styles/common'

export const inputWrapperStyle = css`
  padding: 24px;
  width: 553px;

  ${inputStyle}

  @media screen and (max-width: 600px) {
    width: 80%;
  }
`

import React from 'react'
import { Global, css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

export const globalStyles = (
  <Global
    styles={css`
      ${emotionNormalize}

      *, *::after, *::before {
        box-sizing: border-box;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        font-smoothing: antialiased;
      }

      html,
      body {
        background-color: rgb(230, 231, 236);
        font-family: 'Noto Sans KR', sarif;
        font-size: 15px;
      }
    `}
  />
)

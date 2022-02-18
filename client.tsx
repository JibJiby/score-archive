import React from 'react'
import { render } from 'react-dom'

import App from '@layouts/App'
import { BrowserRouter } from 'react-router-dom'

import emotionReset from 'emotion-reset'
import { Global, css } from '@emotion/react'
import './App.css'

render(
  <BrowserRouter>
    <Global
      styles={css`
        ${emotionReset}

        /* 적용됨. */
        /* * {
          background-color: gray;
        } */

        *,
        *::after,
        *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
        }
      `}
    />
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
)

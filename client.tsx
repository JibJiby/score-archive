import React from 'react'
import { render } from 'react-dom'
import App from '@layouts/App'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { globalStyles } from './styles/globals'

render(
  <BrowserRouter>
    {globalStyles}
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
)

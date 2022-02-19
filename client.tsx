import React from 'react'
import { render } from 'react-dom'
import App from '@layouts/App'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { globalStyles } from './styles/globals'
import { Provider } from 'react-redux'
import store from '@store/configureStore'

render(
  <Provider store={store}>
    <BrowserRouter>
      {globalStyles}
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector('#app'),
)

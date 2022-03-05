import React from 'react'
import { render } from 'react-dom'
import App from '@layouts/App'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { globalStyles } from './styles/globals'
import { Provider } from 'react-redux'
import store from '@store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
let persistor = persistStore(store)

render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        {globalStyles}
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.querySelector('#app'),
)

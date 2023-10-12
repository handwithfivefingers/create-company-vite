import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

// window.store = store

const ROOT = document.getElementById('root')

const APP = (
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

createRoot(ROOT).render(APP)

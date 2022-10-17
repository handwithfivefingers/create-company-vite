import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

window.store = store

const ROOT = document.getElementById('root')

const APP = (
  <Provider store={store}>
    <App />
  </Provider>
)

createRoot(ROOT).render(APP)

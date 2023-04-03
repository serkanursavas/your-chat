import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ConfigProvider } from 'antd'
import { antdTheme } from './utility/config-provider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={antdTheme}>
    <App />
  </ConfigProvider>
)

import React from 'react'
import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client'
import zhCN from 'antd/locale/zh_CN';
import App from './App.tsx'
const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<ConfigProvider locale={zhCN}>
  <App />
</ConfigProvider>)

import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6096B4'
        }
      }}
    >
      <Login />
    </ConfigProvider>
  )
}

export default App

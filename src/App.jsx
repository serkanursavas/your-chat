import './App.css'
import Signup from './pages/Signup'
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
      <Signup />
    </ConfigProvider>
  )
}

export default App

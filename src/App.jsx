import './App.css'
import { routes } from './router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'

function App() {
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [currentUser])

  const ProtectedRoute = ({ children }) => {
    if (currentUser === null) {
      return <Navigate to="login" />
    } else {
      return children
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.name === 'Home' ? (
                <ProtectedRoute>{isLoading ? <Spin size="large" /> : <route.component />}</ProtectedRoute>
              ) : (
                <route.component />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import { routes } from './router'
import { BrowserRouter, Routes, Route, useRouteError } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { Result, Button } from 'antd'

function App() {
  const { currentUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)

  const LoadingSpinner = () => {
    return (
      <div className=" flex justify-center items-center h-[100vh] ">
        <div className="spinner w-[40px] h-[40px] border-2  rounded-[50%] border-solid border-t-transparent"></div>
      </div>
    )
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
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
                <ProtectedRoute>{isLoading ? <LoadingSpinner /> : <route.component />}</ProtectedRoute>
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

import '../App.css'

import Layout from '../components/UI/Layout'
import Aside from '../components/Aside/Aside'
import Chat from '../components/Chat/Chat'
import { useEffect, useState } from 'react'
import { auth } from '../store/firebase'
import { signOut } from 'firebase/auth'

const Home = () => {
  const [isActive, setIsActive] = useState(true)
  const TIMEOUT_SECONDS = 30 * 60 * 1000

  useEffect(() => {
    let timeout

    if (isActive) {
      timeout = setTimeout(() => {
        signOut(auth)
      }, TIMEOUT_SECONDS)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isActive])

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return (
    <Layout>
      <Aside />
      <Chat />
    </Layout>
  )
}
export default Home

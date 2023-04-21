import '../App.css'

import Layout from '../components/UI/Layout'
import Aside from '../components/Aside/Aside'
import Chat from '../components/Chat/Chat'
import { auth } from '../store/firebase'
import { signOut } from 'firebase/auth'

import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'

const Home = () => {
  const [isActive, setIsActive] = useState(true)
  const TIMEOUT_SECONDS = 30 * 60 * 1000

  const [state, setState] = useState('Active')
  const [count, setCount] = useState(0)
  const [remaining, setRemaining] = useState(0)

  const onIdle = () => {
    signOut(auth)
  }

  const onActive = () => {
    setState('Active')
  }

  const onAction = () => {
    setCount(count + 1)
  }

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 10_000,
    throttle: 500
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <Layout>
      <Aside />
      <Chat />
    </Layout>
  )
}
export default Home

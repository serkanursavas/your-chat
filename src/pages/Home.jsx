import '../App.css'

import Layout from '../components/UI/Layout'
import Aside from '../components/Aside/Aside'
import Chat from '../components/Chat/Chat'
import { auth } from '../store/firebase'
import { signOut } from 'firebase/auth'

import { useEffect, useState } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { Modal } from 'antd'
import { createContext } from 'react'
const ReachableContext = createContext(null)

const Home = () => {
  const [openChats, setOpenChats] = useState(true)

  const toggleChats = () => {
    setOpenChats(!openChats)
  }

  const [modal, contextHolder] = Modal.useModal()
  const TIMEOUT_SECONDS = 30 * 60 * 1000

  const [remaining, setRemaining] = useState(0)
  const promptBeforeIdle = 60_000

  const handleStillHere = () => {
    activate()
  }

  const config = {
    title: 'Are you still there? ',
    content: (
      <>
        <ReachableContext.Consumer>
          {remaining =>
            `after ${remaining <= 60 ? remaining : ''} seconds, your session will be terminated for security purposes.`
          }
        </ReachableContext.Consumer>
        <br />
      </>
    ),
    okText: "I'm here",
    cancelText: 'Sign Out',
    onOk() {
      handleStillHere()
    },
    onCancel() {
      signOut(auth)
    }
  }

  const onIdle = () => {
    signOut(auth)
  }

  const onPrompt = () => {
    modal.confirm(config)
  }

  const { getRemainingTime, activate } = useIdleTimer({
    onIdle,
    onPrompt,
    timeout: TIMEOUT_SECONDS,
    promptBeforeIdle,
    throttle: 1000
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
    <ReachableContext.Provider value={remaining}>
      <Layout>
        <Aside
          openChats={openChats}
          toggleChats={toggleChats}
        />
        {contextHolder}
        <Chat
          toggleChats={toggleChats}
          openChats={openChats}
        />
      </Layout>
    </ReachableContext.Provider>
  )
}
export default Home

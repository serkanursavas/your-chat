import { useEffect, useRef } from 'react'

import Message from './Message'
import { chats } from '../../constants'

const Messages = () => {
  const scrollRef = useRef(null)
  const activeChat = chats.filter(chat => (chat.active ? chat : undefined)).shift()

  useEffect(() => {
    const element = scrollRef.current
    element.scrollTop = element.scrollHeight
  }, [])

  return (
    <div
      ref={scrollRef}
      className="box-border relative px-5 py-4 overflow-auto messages-height bg-beige"
    >
      {activeChat.chat.map((message, index) => (
        <Message
          key={index}
          owner={message.username == 'Jonathan'}
          profilePhoto={activeChat.profilePhoto}
          text={message.message}
        />
      ))}
    </div>
  )
}

export default Messages

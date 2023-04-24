import { useEffect, useContext, useState } from 'react'

import Message from './Message'
import { doc, onSnapshot } from 'firebase/firestore'
import { ChatContext } from '../../context/ChatContext'
import { db } from '../../store/firebase'
import NoMessage from '../UI/NoMessage'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatID), doc => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatID])

  return (
    <div className="box-border relative px-5 pt-4 h-[84%] md:h-[484px] overflow-auto grow bg-beige">
      {messages.length !== 0 ? (
        messages.map(message => {
          const dateObj = new Date(message.date * 1000)
          // Get the locale-specific date string in 24-hour format
          const dateString = dateObj.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })

          return (
            <Message
              key={message.id}
              sender={message.senderID}
              text={message.text}
              messageTime={dateString}
            />
          )
        })
      ) : (
        <NoMessage />
      )}
    </div>
  )
}

export default Messages

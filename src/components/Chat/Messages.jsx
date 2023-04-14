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
    <div className="box-border relative px-5 pt-4 h-[492px] overflow-auto bg-beige">
      {messages.length !== 0 ? (
        messages.map(message => {
          return (
            <Message
              key={message.id}
              sender={message.senderID}
              text={message.text}
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

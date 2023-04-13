import ChatOverview from './ChatOverview'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../store/firebase'
import { AuthContext } from '../../context/AuthContext'
import { useContext, useEffect, useState } from 'react'

const Chats = () => {
  const { currentUser } = useContext(AuthContext)
  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        setChats(Object.entries(doc.data()))
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  return (
    <div className="w-full h-[496px] overflow-hidden grow">
      <div className="w-full h-full overflow-y-auto bg-secondary">
        {chats.map(chat => {
          return (
            <ChatOverview
              key={chat[0]}
              username={chat[1].userInfo.name}
              profilePhoto={chat[1].userInfo.photoUrl}
              lastMessage={chat?.lastMessage}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Chats

import ChatOverview from './ChatOverview'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../store/firebase'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useContext, useEffect, useState } from 'react'

const Chats = ({ openChats }) => {
  const { currentUser } = useContext(AuthContext)
  const { dispatch, data } = useContext(ChatContext)

  const [chats, setChats] = useState([])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        doc.data() && setChats(Object.entries(doc.data()))
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const selectHandler = user => {
    dispatch({ type: 'CHANGE_USER', payload: user })
  }

  return (
    <div className="w-full h-[86%] md:h-[496px] overflow-hidden grow">
      <div className="w-full h-full overflow-y-auto bg-secondary">
        {chats
          ?.sort((a, b) => b[1].date - a[1].date)
          .map(chat => {
            return (
              <div
                key={chat[0]}
                onClick={() => selectHandler(chat[1].userInfo)}
              >
                <ChatOverview
                  username={chat[1].userInfo.name}
                  profilePhoto={chat[1].userInfo.photoUrl}
                  lastMessage={chat[1]?.lastMessage?.text}
                  active={chat[1].userInfo.uid === data.user.uid}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Chats

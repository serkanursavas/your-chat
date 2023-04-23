import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState, useContext } from 'react'
import { collection, query, getDoc, getDocs, doc, where, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../store/firebase'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

import ChatOverview from './ChatOverview'

const Search = ({ isSearchingHandler }) => {
  const [username, setUsername] = useState()
  const [allUser, setAllUser] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const fetchCollection = async () => {
      const q = query(collection(db, 'users'))

      const querySnapshot = await getDocs(q)
      const users = querySnapshot.docs.map(user => user.data())
      setAllUser(users)
    }

    fetchCollection()
  }, [])

  const selectHandler = async (event, user) => {
    dispatch({ type: 'CHANGE_USER', payload: user })
    // check is chat exist
    const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    const response = await getDoc(doc(db, 'chats', combinedID))

    if (!response.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, 'chats', combinedID), { messages: [] })

      // Create userChat
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [combinedID + '.userInfo']: {
          uid: user.uid,
          name: user.name,
          photoUrl: user.photoURL
        }
      })

      await updateDoc(doc(db, 'userChats', user.uid), {
        [combinedID + '.userInfo']: {
          uid: currentUser.uid,
          name: currentUser.displayName,
          photoUrl: currentUser.photoURL
        }
      })
    }
    setUsername('')
  }

  return (
    <div className="!scroll-x-auto !h-[6%] relative ">
      <Input
        className="custom-input cursor-pointer !h-full search-input !shadow-none !p-3 !bg-secondary hover:!border-black focus:!border-black placeholder:!text-[#3d3d3d47] !border-[#3d3d3d47]"
        placeholder="Find a user"
        onChange={e => {
          const filteredArray = allUser.filter(item => item.name.includes(e.target.value))
          setFilteredArray(filteredArray)
          isSearchingHandler(e.target.value)
          setUsername(e.target.value)
        }}
        value={username}
        prefix={<SearchOutlined className="!text-lg" />}
      />
      {username && (
        <div className="overflow-y-auto md:h-[496px] ">
          {filteredArray.map(user => {
            return (
              <div
                key={user.uid}
                onClick={event => {
                  selectHandler(event, user)
                  isSearchingHandler('')
                }}
              >
                <ChatOverview
                  username={user.name}
                  profilePhoto={user.photoURL}
                  lastMessage=""
                  active={false}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Search

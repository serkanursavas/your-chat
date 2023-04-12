import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState, useContext } from 'react'
import { collection, query, getDoc, getDocs, doc, where, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../store/firebase'
import { AuthContext } from '../../context/AuthContext'

import ChatOverview from './ChatOverview'

const Search = () => {
  const [username, setUsername] = useState()
  const [allUser, setAllUser] = useState([])
  const [filteredArray, setFilteredArray] = useState([])
  const { currentUser } = useContext(AuthContext)

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
    // check is chat exist
    const combinedID = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
    const response = await getDoc(doc(db, 'chats', combinedID))
    console.log(user.uid)
    console.log(currentUser.uid)
    if (!response.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, 'chats', combinedID), { messages: [] })

      // create userChats
      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [combinedID + '.userInfo']: {
          uid: user.uid,
          name: user.name,
          photoUrl: user.photoURL
        },
        [combinedID + '.date']: serverTimestamp()
      })

      await updateDoc(doc(db, 'userChats', user.uid), {
        [combinedID + '.userInfo']: {
          uid: currentUser.uid,
          name: currentUser.name,
          photoUrl: currentUser.photoURL
        },
        [combinedID + '.date']: serverTimestamp()
      })
    }
    setUsername('')
  }

  return (
    <div className="!scroll-x-auto relative">
      <Input
        className="custom-input cursor-pointer search-input !shadow-none !p-3 !bg-secondary hover:!border-black focus:!border-black placeholder:!text-[#3d3d3d47] !border-[#3d3d3d47]"
        placeholder="Find a user"
        onChange={e => {
          const filteredArray = allUser.filter(item => item.name.includes(e.target.value))
          setFilteredArray(filteredArray)
          setUsername(e.target.value)
        }}
        value={username}
        prefix={<SearchOutlined className="!text-lg" />}
      />
      {username && (
        <div className="overflow-y-auto h-[496px]">
          {filteredArray.map(user => {
            return (
              <div
                key={user.uid}
                onClick={event => selectHandler(event, user)}
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

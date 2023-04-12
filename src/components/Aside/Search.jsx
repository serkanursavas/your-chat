import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../store/firebase'

import ChatOverview from './ChatOverview'

const Search = () => {
  const [username, setUsername] = useState()
  const [allUser, setAllUser] = useState([])

  useEffect(() => {
    const fetchCollection = async () => {
      const q = query(collection(db, 'users'))

      const querySnapshot = await getDocs(q)
      const users = querySnapshot.docs.map(user => user.data())
      setAllUser(users)
    }

    fetchCollection()
  }, [])

  return (
    <>
      <Input
        className="custom-input cursor-pointer search-input !shadow-none !p-3 !bg-secondary hover:!border-black focus:!border-black placeholder:!text-[#3d3d3d47] !border-[#3d3d3d47]"
        placeholder="Find a user"
        onChange={e => {
          setUsername(e.target.value)
        }}
        prefix={<SearchOutlined className="!text-lg" />}
      />
      <ChatOverview
        username="Test"
        profilePhoto="https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1200"
        lastMessage=""
        active={false}
      />
    </>
  )
}

export default Search

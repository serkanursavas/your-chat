import { Dropdown } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../store/firebase'

import ProfilePhoto from '../ProfilePhoto'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'

const Nav = () => {
  const { dispatch } = useContext(ChatContext)
  const items = [
    {
      key: '1',
      icon: <PoweroffOutlined />,
      label: (
        <button
          onClick={() => {
            dispatch({ type: 'LOGOUT_USER' })
            signOut(auth)
          }}
          className="w-full bg-transparent border-none shadow-none outline-none hover:cursor-pointer"
        >
          Logout
        </button>
      )
    }
  ]

  const { currentUser } = useContext(AuthContext)

  return (
    <div className="flex items-center justify-between px-2 h-14 bg-primary">
      <div className="font-semibold select-none text-lg text-[#C9DFE7]">Your Chat</div>
      <div className="flex items-center justify-center">
        <Dropdown
          menu={{
            items,
            className: '!bg-beige !p-0 !rounded-none'
          }}
          placement="bottomRight"
        >
          <div className="h-10 p-1 rounded-full cursor-pointer hover:bg-secondary">
            {currentUser && (
              <ProfilePhoto
                size="40"
                profilePhoto={currentUser.photoURL}
              />
            )}
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Nav

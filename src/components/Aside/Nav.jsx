import { Dropdown } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import { signOut } from 'firebase/auth'
import { auth } from '../../store/firebase'

import ProfilePhoto from '../ProfilePhoto'

const Nav = () => {
  const items = [
    {
      key: '1',
      icon: <PoweroffOutlined />,
      label: (
        <button
          onClick={() => signOut(auth)}
          className="w-full bg-transparent border-none shadow-none outline-none hover:cursor-pointer"
        >
          Logout
        </button>
      )
    }
  ]

  return (
    <div className="flex items-center justify-between px-2 h-14 bg-primary">
      <div className="font-semibold text-lg text-[#C9DFE7]">Your Chat</div>
      <div className="flex items-center justify-center">
        <Dropdown
          menu={{
            items,
            className: '!bg-beige !p-0 !rounded-none'
          }}
          placement="bottomRight"
        >
          <div className="h-10 p-1 rounded-full cursor-pointer hover:bg-secondary">
            <ProfilePhoto
              size="40"
              profilePhoto="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1200"
            />
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default Nav

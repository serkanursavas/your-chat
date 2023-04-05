import { Dropdown } from 'antd'
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons'

import ProfilePhoto from '../ProfilePhoto'

const Nav = () => {
  const items = [
    {
      key: '1',
      icon: <PoweroffOutlined />,
      label: (
        <button className="w-full bg-transparent border-none shadow-none outline-none hover:cursor-pointer">
          Logout
        </button>
      )
    }
  ]

  return (
    <div className="flex items-center justify-between h-20 p-2 bg-primary">
      <div className="font-semibold text-lg text-[#C9DFE7]">Your Chat</div>
      <div className="flex items-end gap-2 ">
        <ProfilePhoto size="10" />

        <Dropdown
          menu={{
            items,
            className: '!bg-beige !p-0 !mt-1 !rounded-none'
          }}
          placement="bottomRight"
          trigger={['click']}
        >
          <button className="p-2 pb-1 bg-transparent border-none rounded-full cursor-pointer focus:bg-[#7AABC2] ">
            <DownOutlined className="text-lg text-[#333]" />
          </button>
        </Dropdown>
      </div>
    </div>
  )
}

export default Nav

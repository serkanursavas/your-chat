import { Button } from 'antd'

import userProfile from '../../assets/user.svg'

const Nav = () => {
  return (
    <div className="flex items-center justify-between h-20 p-2 bg-primary">
      <div className="font-semibold">Your Chat</div>
      <div className="flex items-center gap-2">
        <img
          className="w-10"
          src={userProfile}
          alt=""
        />
        <p>John</p>
        <Button
          size="small"
          className="!text-xs !bg-secondary hover:!text-white !rounded-none !border-none"
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Nav

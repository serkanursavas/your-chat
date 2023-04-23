import { ChatContext } from '../../context/ChatContext'
import { useContext } from 'react'

import startChatIcon from '../../assets/start-chat.svg'

const ChatInfo = ({ toggleChats }) => {
  const { data } = useContext(ChatContext)
  return (
    <div className="flex items-center justify-between px-5 h-[8%] md:!h-14 bg-secondary">
      <div className="text-xl font-semibold">{data.user.name}</div>
      <button
        className="p-0 px-1 pt-1 bg-white border-none rounded-full outline-none bg-opacity-60 hover:bg-opacity-100 md:hidden"
        onClick={toggleChats}
      >
        <img
          className="w-8"
          src={startChatIcon}
        />
      </button>
    </div>
  )
}

export default ChatInfo

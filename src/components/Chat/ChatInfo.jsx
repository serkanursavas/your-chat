import { ChatContext } from '../../context/ChatContext'
import { useContext } from 'react'

const ChatInfo = ({ toggleChats }) => {
  const { data } = useContext(ChatContext)
  return (
    <div className="flex items-center justify-between px-5 h-[8%] md:!h-14 bg-secondary">
      <div className="text-xl font-semibold">{data.user.name}</div>
      <button
        className="md:hidden"
        onClick={toggleChats}
      >
        Hamb
      </button>
    </div>
  )
}

export default ChatInfo

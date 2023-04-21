import ChatInfo from './ChatInfo'
import Messages from './Messages'
import MessageInput from './MessageInput'

const Chat = ({ toggleChats }) => {
  return (
    <div className="relative flex-col overflow-hidden md:flex md:col-span-2 bg-beige">
      <ChatInfo toggleChats={toggleChats} />
      <Messages />
      <MessageInput />
    </div>
  )
}

export default Chat

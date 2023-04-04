import ChatInfo from './ChatInfo'
import Messages from './Messages'
import MessageInput from './MessageInput'

const Chat = () => {
  return (
    <div className="relative flex flex-col w-4/6 overflow-hidden bg-beige">
      <ChatInfo />
      <Messages />
      <MessageInput />
    </div>
  )
}

export default Chat

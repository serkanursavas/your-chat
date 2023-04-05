import ChatInfo from './ChatInfo'
import Messages from './Messages'
import MessageInput from './MessageInput'

const Chat = () => {
  return (
    <div className="relative flex flex-col col-span-2 overflow-hidden bg-beige">
      <ChatInfo />
      <Messages />
      <MessageInput />
    </div>
  )
}

export default Chat

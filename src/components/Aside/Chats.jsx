import ChatOverview from './ChatOverview'
import { chats } from '../../constants'

const Chats = () => {
  return (
    <div className="box-border overflow-x-hidden chats-height bg-secondary ">
      {chats.map((chat, index) => {
        return (
          <ChatOverview
            key={index}
            username={chat.username}
            profilePhoto={chat.profilePhoto}
            lastMessage={chat.lastMessage}
            active={chat.active}
          />
        )
      })}
    </div>
  )
}

export default Chats

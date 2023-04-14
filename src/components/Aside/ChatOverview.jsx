import ProfilePhoto from '../ProfilePhoto'

const ChatOverview = props => {
  const messagePre = props.lastMessage.slice(0, 24)
  return (
    <div
      className={`flex items-center py-2 space-x-2 h-fit ${
        props.active ? 'bg-[#7AABC2]' : ''
      } hover:bg-primary  active:bg-primary hover:cursor-pointer px-3 `}
    >
      <ProfilePhoto
        size="50"
        profilePhoto={props.profilePhoto}
      />
      <div className="flex flex-col justify-center">
        <span className="font-medium ">{props.username}</span>
        <span className="text-sm opacity-40">{messagePre}</span>
      </div>
    </div>
  )
}

export default ChatOverview

import ProfilePhoto from '../ProfilePhoto'

const ChatOverview = props => {
  return (
    <div
      className={`flex items-center py-2 space-x-2 h-fit ${
        props.active ? 'bg-[#7AABC2]' : ''
      } hover:bg-primary  active:bg-primary hover:cursor-pointer px-3 `}
    >
      <ProfilePhoto
        size="56"
        profilePhoto={props.profilePhoto}
      />
      <div className="flex flex-col justify-center">
        <span className="text-[18px] font-medium ">{props.username}</span>
        <span className="text-sm opacity-40">{props.lastMessage}</span>
      </div>
    </div>
  )
}

export default ChatOverview

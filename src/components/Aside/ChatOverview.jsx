import ProfilePhoto from '../ProfilePhoto'

const ChatOverview = ({ lastMessage, profilePhoto, username, active }) => {
  const modifiedLastMessage = lastMessage?.length > 24 ? `${lastMessage.slice(0, 24)}...` : lastMessage

  return (
    <div
      className={`flex items-center py-2 space-x-2 h-fit ${
        active ? 'bg-[#7AABC2]' : ''
      } hover:bg-primary  active:bg-primary hover:cursor-pointer px-3 `}
    >
      <ProfilePhoto
        size="50"
        profilePhoto={profilePhoto}
      />
      <div className="flex flex-col justify-center">
        <span className="font-medium ">{username}</span>
        <span className="text-sm break-all opacity-40">{modifiedLastMessage}</span>
      </div>
    </div>
  )
}

export default ChatOverview

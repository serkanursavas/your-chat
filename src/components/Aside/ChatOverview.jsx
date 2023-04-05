import ProfilePhoto from '../ProfilePhoto'

const ChatOverview = props => {
  return (
    <div
      className={`flex w-full gap-2 px-2 py-3 ${
        props.active ? 'bg-[#7AABC2]' : ''
      } hover:bg-primary active:bg-primary hover:cursor-pointer`}
    >
      <ProfilePhoto
        size="14"
        profilePhoto={props.profilePhoto}
      />
      <div className="flex flex-col justify-center">
        <span className="block text-lg font-medium leading-5 ">{props.username}</span>
        <span className="block text-sm leading-4 opacity-40">{props.lastMessage}</span>
      </div>
    </div>
  )
}

export default ChatOverview

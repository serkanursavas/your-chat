import ProfilePhoto from '../ProfilePhoto'

const Message = props => {
  return (
    <div className={`flex ${props.owner ? 'flex-row-reverse' : ''}  gap-4 mb-2 `}>
      <div className="flex flex-col justify-center">
        {props.owner ? (
          <img
            src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1200"
            className="object-cover w-12 h-12 bg-center bg-cover rounded-full"
          />
        ) : (
          <ProfilePhoto
            size="12"
            profilePhoto={props.profilePhoto}
          />
        )}
        <span className="text-sm leading-4 opacity-40">just now</span>
      </div>

      <div
        className={`p-3  h-fit relative text-sm ${
          props.owner ? 'rounded-lg rounded-tr-none bg-grey' : 'rounded-lg rounded-tl-none bg-white'
        }`}
      >
        <div className={`${props.owner ? 'owner-message-triangle' : 'guest-message-triangle'}`}></div>
        {props.text}
      </div>
    </div>
  )
}

export default Message

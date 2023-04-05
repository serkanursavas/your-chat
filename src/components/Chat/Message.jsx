import ProfilePhoto from '../ProfilePhoto'

const Message = props => {
  return (
    <>
      {props.owner ? (
        <div className={`flex justify-end w-full space-x-4  mb-2 `}>
          <div className="relative px-3 py-2 mt-2 text-sm rounded-lg rounded-tr-none h-fit bg-grey">
            <div className="owner-message-triangle"></div>
            {props.text}
          </div>
          <div className="flex flex-col justify-center">
            <img
              src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1200"
              className="object-cover bg-center bg-cover rounded-full w-11 h-11"
            />
            <span className="text-xs opacity-40">just now</span>
          </div>
        </div>
      ) : (
        <div className={`flex w-full space-x-4  mb-2 `}>
          <div className="flex flex-col justify-center">
            <ProfilePhoto
              size="44"
              profilePhoto={props.profilePhoto}
            />

            <span className="text-xs opacity-40">just now</span>
          </div>
          <div className="relative px-3 py-2 mt-2 text-sm bg-white rounded-lg rounded-tl-none h-fit">
            <div className="guest-message-triangle"></div>
            {props.text}
          </div>
        </div>
      )}
    </>
  )
}

export default Message

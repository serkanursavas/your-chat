import ProfilePhoto from '../ProfilePhoto'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useContext, useEffect, useRef } from 'react'

const Message = props => {
  const scrollRef = useRef(null)
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [props.text])

  return (
    <>
      {props.sender === currentUser.uid ? (
        <div
          ref={scrollRef}
          className={`flex justify-end w-full space-x-4  mb-2 `}
        >
          <div className="relative px-3 py-2 mt-2 text-sm break-all rounded-lg rounded-tr-none max-w-[50%] h-fit bg-grey">
            <div className=" owner-message-triangle"></div>
            {props.text}
          </div>
          <div className="flex flex-col justify-center">
            <img
              src={currentUser.photoURL}
              className="object-cover bg-center bg-cover rounded-full w-11 h-11"
            />
            <span className="mt-1 ml-2 text-xs opacity-40">{props.messageTime}</span>
          </div>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className={`flex w-full space-x-4  mb-2 `}
        >
          <div className="flex flex-col justify-center">
            <ProfilePhoto
              size="44"
              profilePhoto={data.user.photoUrl}
            />

            <span className="mt-1 ml-2 text-xs opacity-40">{props.messageTime}</span>
          </div>
          <div className="relative break-all px-3 py-2 mt-2 text-sm bg-white max-w-[50%] rounded-lg rounded-tl-none h-fit">
            <div className="guest-message-triangle"></div>
            {props.text}
          </div>
        </div>
      )}
    </>
  )
}

export default Message

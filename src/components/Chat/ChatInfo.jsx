import dots3 from '../../assets/dots3.svg'
import phone from '../../assets/phone.svg'
import video from '../../assets/video.svg'

const ChatInfo = () => {
  return (
    <div className="box-border flex items-center justify-between h-20 p-2 bg-secondary">
      <div className="text-lg ">Serkan</div>
      <div className="flex gap-3">
        <img
          src={video}
          className="w-6"
        />
        <img
          src={phone}
          className="w-6"
        />
        <img
          src={dots3}
          className="w-5"
        />
      </div>
    </div>
  )
}

export default ChatInfo

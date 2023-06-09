import startchat from '../../assets/startchat.svg'

const NoMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className=" flex flex-col justify-center items-center  p-16 bg-[#93BFCF] bg-opacity-40  rounded-full">
        <img
          className="mt-4 w-28"
          src={startchat}
          alt="Start a chat"
        />
        <p className="text-lg font-medium">Start a converstaion!</p>
        <p className="hidden md:block text-xs font-light text-[#333]">Please write a message</p>
        <p className="block md:hidden text-xs font-light text-[#333]">Click chat icon which top-right to see friends</p>
      </div>
    </div>
  )
}

export default NoMessage

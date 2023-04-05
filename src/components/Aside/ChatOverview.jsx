const ChatOverview = () => {
  return (
    <div className="flex w-full gap-2 p-2 hover:bg-primary ">
      <img
        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1200"
        className="object-cover bg-center bg-cover rounded-full w-14 h-14"
      />
      <div className="flex flex-col justify-center">
        <span className="block text-lg font-semibold leading-5 ">Kim</span>
        <span className="block text-sm leading-4 opacity-40">Hello</span>
      </div>
    </div>
  )
}

export default ChatOverview

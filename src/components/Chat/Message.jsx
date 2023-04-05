const Message = ({ owner }) => {
  return (
    <div className={`flex ${owner ? 'flex-row-reverse' : ''}  gap-4 p-2 `}>
      <div className="flex flex-col justify-center">
        {owner ? (
          <img
            src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1200"
            className="object-cover w-12 h-12 bg-center bg-cover rounded-full"
          />
        ) : (
          <img
            src="https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=1200"
            className="object-cover w-12 h-12 bg-center bg-cover rounded-full"
          />
        )}
        <span className="text-sm leading-4 opacity-40">just now</span>
      </div>

      <div
        className={`p-3  h-fit ${owner ? 'rounded-lg rounded-tr-none bg-grey' : 'rounded-lg rounded-tl-none bg-white'}`}
      >
        What are u doing?
      </div>
    </div>
  )
}

export default Message

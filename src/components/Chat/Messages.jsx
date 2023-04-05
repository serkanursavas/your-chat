import Message from './Message'

const Messages = () => {
  return (
    <div className="box-border relative p-4 bg-beige">
      <Message />
      <Message owner={true} />
      <Message />
      <Message owner={true} />
      <Message />
    </div>
  )
}

export default Messages

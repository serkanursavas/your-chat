import ChatOverview from './ChatOverview'

const Chats = () => {
  return (
    <div className="box-border space-y-2 overflow-x-hidden bg-secondary">
      <ChatOverview />
      <ChatOverview />
      <ChatOverview />
      <ChatOverview />
    </div>
  )
}

export default Chats

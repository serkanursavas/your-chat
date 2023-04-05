import Nav from './Nav'
import Search from './Search'
import Chats from './Chats'

const Aside = props => {
  return (
    <aside className="flex flex-col w-2/6 bg-secondary ">
      <Nav />
      <Search />
      <Chats />
    </aside>
  )
}

export default Aside

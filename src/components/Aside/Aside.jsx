import Nav from './Nav'
import Search from './Search'
import Chats from './Chats'

const Aside = props => {
  return (
    <aside className="flex flex-col col-span-1 bg-secondary">
      <Nav />
      <Search />
      <Chats />
    </aside>
  )
}

export default Aside

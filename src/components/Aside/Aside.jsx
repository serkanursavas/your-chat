import Nav from './Nav'
import Search from './Search'
import Chats from './Chats'

const Aside = props => {
  return (
    <aside className="absolute -left-[70%] md:left-auto w-[70%] md:w-auto md:block flex flex-col h-full col-span-1 md:relative bg-secondary">
      <Nav />
      <Search />
      <Chats />
    </aside>
  )
}

export default Aside

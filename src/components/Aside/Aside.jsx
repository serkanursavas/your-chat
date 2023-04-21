import Nav from './Nav'
import Search from './Search'
import Chats from './Chats'

const Aside = ({ openChats }) => {
  return (
    <aside
      className={`absolute ${
        openChats ? '-translate-x-[100%]' : 'translate-x-[0]'
      } md:left-auto w-[80%] !h-[100%] transition-transform duration-500 ease-in-out transform  md:w-auto md:block flex flex-col md:h-full col-span-1 z-20 md:relative bg-secondary`}
    >
      <Nav />
      <Search />
      <Chats openChats={openChats} />
    </aside>
  )
}

export default Aside

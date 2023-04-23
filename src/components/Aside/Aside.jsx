import Nav from './Nav'
import Search from './Search'
import Chats from './Chats'
import { useState } from 'react'

const Aside = ({ openChats, toggleChats }) => {
  const [isSearching, setIsSearching] = useState('')

  const isSearchingHandler = field => {
    setIsSearching(field)
  }

  return (
    <aside
      className={`absolute ${
        openChats ? '-translate-x-[100%]' : 'translate-x-[0]'
      } md:left-auto md:translate-x-[0] w-[80%] !h-[100%] transition-transform duration-500 ease-in-out transform  md:w-auto md:block flex flex-col md:h-full col-span-1 z-20 md:relative bg-secondary`}
    >
      <Nav />
      <Search isSearchingHandler={isSearchingHandler} />
      <Chats
        isSearching={isSearching}
        openChats={openChats}
        toggleChats={toggleChats}
      />
    </aside>
  )
}

export default Aside

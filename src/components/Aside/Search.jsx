import { Input } from 'antd'

const Search = () => {
  return (
    <Input
      className="custom-input !shadow-none !bg-secondary hover:!border-black focus:!border-black placeholder:!text-[#3d3d3d47] !border-[#3d3d3d47]"
      placeholder="Find a user"
    />
  )
}

export default Search

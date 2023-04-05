import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Search = () => {
  return (
    <Input
      className="custom-input search-input !shadow-none !p-3 !bg-secondary hover:!border-black focus:!border-black placeholder:!text-[#3d3d3d47] !border-[#3d3d3d47]"
      placeholder="Find a user"
      prefix={<SearchOutlined className="!text-lg" />}
    />
  )
}

export default Search

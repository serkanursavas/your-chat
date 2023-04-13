import { Form, Input, Button } from 'antd'
import { PictureOutlined, PaperClipOutlined } from '@ant-design/icons'

const MessageInput = () => {
  return (
    <Form className="flex justify-between w-full p-2 pl-0 bg-white ">
      <Input
        className="!border-none !shadow-none !text-lg"
        type="text"
        placeholder="Type something..."
      />
      <div className="flex items-center gap-4">
        <button className="p-0 bg-transparent border-none cursor-pointer hover:text-primary">
          <PaperClipOutlined className="text-xl opacity-30" />
        </button>
        <button className="p-0 bg-transparent border-none cursor-pointer hover:text-primary">
          <PictureOutlined className="text-xl opacity-30" />
        </button>

        <Button className="bg-primary  !text-white ">Send</Button>
      </div>
    </Form>
  )
}

export default MessageInput

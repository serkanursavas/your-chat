import { Form, Input, Button } from 'antd'
import { PictureOutlined, PaperClipOutlined } from '@ant-design/icons'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useContext, useRef } from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { db } from '../../store/firebase'

const MessageInput = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const [form] = Form.useForm()
  const inputRef = useRef(null)

  const onFinish = async values => {
    const text = values.text
    form.resetFields()

    if (text !== undefined) {
      await updateDoc(doc(db, 'chats', data.chatID), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderID: currentUser.uid,
          date: Timestamp.now()
        })
      })
      inputRef.current.focus()

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatID + '.lastMessage']: {
          text
        },
        [data.chatID + '.date']: serverTimestamp()
      })

      await updateDoc(doc(db, 'userChats', data.user.uid), {
        [data.chatID + '.lastMessage']: {
          text
        },
        [data.chatID + '.date']: serverTimestamp()
      })
    }
  }

  return (
    data.chatID !== 'null' && (
      <Form
        form={form}
        onFinish={onFinish}
        className="flex justify-center md:justify-between w-full !h-[8%]  md:h-[52px] p-2 pl-0 bg-white "
        onClick={() => inputRef.current.focus()}
      >
        <Form.Item
          name="text"
          className="flex items-center w-full !h-full "
        >
          <Input
            ref={inputRef}
            className="!border-none !shadow-none !truncate !text-lg !w-[260px] sm:!w-[540px] md:!w-[430px] md:!h-full"
            type="text"
            placeholder=" Type something..."
            autoComplete="off"
          />
        </Form.Item>
        <div className="flex items-center gap-4">
          <button className="hidden p-0 bg-transparent border-none cursor-pointer md:block hover:text-primary">
            <PaperClipOutlined className="text-xl opacity-30" />
          </button>
          <button className="hidden p-0 bg-transparent border-none cursor-pointer md:block hover:text-primary">
            <PictureOutlined className="text-xl opacity-30" />
          </button>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary  !text-white"
          >
            Send
          </Button>
        </div>
      </Form>
    )
  )
}

export default MessageInput

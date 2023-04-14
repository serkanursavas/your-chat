import { Form, Input, Button } from 'antd'
import { PictureOutlined, PaperClipOutlined } from '@ant-design/icons'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext'
import { useContext, useState } from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { db } from '../../store/firebase'

const MessageInput = () => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  console.log(data)

  const onFinish = async values => {
    const text = values.text

    await updateDoc(doc(db, 'chats', data.chatID), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderID: currentUser.uid,
        date: Timestamp.now()
      })
    })

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

  return (
    data.chatID !== 'null' && (
      <Form
        onFinish={onFinish}
        className="flex justify-between w-full h-[52px] p-2 pl-0 bg-white "
      >
        <Form.Item
          name="text"
          className="flex items-center h-full"
        >
          <Input
            className="!border-none !shadow-none !text-lg !w-[430px] !h-full"
            type="text"
            placeholder="Type something..."
          />
        </Form.Item>
        <div className="flex items-center gap-4">
          <button className="p-0 bg-transparent border-none cursor-pointer hover:text-primary">
            <PaperClipOutlined className="text-xl opacity-30" />
          </button>
          <button className="p-0 bg-transparent border-none cursor-pointer hover:text-primary">
            <PictureOutlined className="text-xl opacity-30" />
          </button>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-primary  !text-white "
          >
            Send
          </Button>
        </div>
      </Form>
    )
  )
}

export default MessageInput

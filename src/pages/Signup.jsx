import { Form, Input, Button, Upload, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'

import { useState } from 'react'

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const Signup = () => {
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log(values)
  }

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <div className="p-5 text-center bg-white border border-gray-200 border-solid rounded-md shadow-md w-72">
      <h3 className="mb-2 text-3xl text-primary">YOUR CHAT</h3>
      <h4 className="mt-2 font-thin">Register</h4>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark={true}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a valid username!'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder=" Name"
            className="custom-input !shadow-none"
          />
        </Form.Item>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please enter a valid email!'
            },
            {
              type: 'email'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder=" Email"
            className="custom-input !shadow-none"
          />
        </Form.Item>
        <Form.Item
          required
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a valid password!'
            },
            {
              pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: 'must include one uppercase and one digit'
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder=" Password"
            className="custom-input !shadow-none"
          />
        </Form.Item>
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%'
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4 font-medium"
              disabled={
                !form.isFieldsTouched(true) || !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Sign Up
            </Button>
          )}
        </Form.Item>
      </Form>
      <p className="text-sm font-light">
        You already have an account?{' '}
        <a
          href="#"
          className="no-underline text-primary"
        >
          Login
        </a>
      </p>
    </div>
  )
}

export default Signup

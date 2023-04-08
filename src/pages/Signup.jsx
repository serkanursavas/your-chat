import { Form, Input, Button, Upload, message } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth } from '../store/firebase'

const Signup = () => {
  const [form] = Form.useForm()
  const [error, setError] = useState()
  const [username, setUsername] = useState('')

  const onFinish = async values => {
    const name = values.name
    const email = values.email
    const password = values.password

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError(error)
    }
  }

  // uploading img to firestore
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
  }
  const handleFileUpload = async file => {
    const storage = getStorage()
    const storageRef = ref(storage, username)
    console.log(username)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      error => {
        // Handle unsuccessful uploads
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
        setLoading(false)
        setImageUrl(downloadUrl)
      }
    )
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
      <h4 className="mt-2 mb-10 font-thin">Register</h4>
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
            onChange={e => {
              setUsername(e.target.value)
              console.log(username)
            }}
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
          onChange={handleChange}
          customRequest={({ file }) => handleFileUpload(file)}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '95%',
                borderRadius: '100%',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                padding: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                maxWidth: '95%',
                maxHeight: '95%',
                minWidth: '95%',
                minHeight: '95%',
                objectFit: 'cover'
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
      {error && <p>Something went wrong!</p>}
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

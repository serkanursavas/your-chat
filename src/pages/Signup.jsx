import { Form, Input, Button, Upload, notification } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db } from '../store/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { Spin } from 'antd'

const Signup = () => {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, placement) => {
    api[type]({
      message: 'Email already use in.',
      description: 'Please enter a different email.',
      placement,
      style: {
        boxShadow:
          '0px 2px 4px rgba(255, 0, 0, 0.2), 0px 4px 8px rgba(255, 0, 0, 0.1), 0px 8px 16px rgba(255, 0, 0, 0.05)'
      }
    })
  }

  const [form] = Form.useForm()
  const [username, setUsername] = useState()
  const emailRef = useRef(null)
  const [isRegister, setIsRegister] = useState(false)

  const onFinish = async values => {
    const name = values.name
    const email = values.email
    const password = values.password

    createUserWithEmailAndPassword(auth, email, password)
      .then(async response => {
        setIsRegister(true)
        await updateProfile(response.user, {
          displayName: name,
          photoURL: imageUrl
        })

        // Add a new document in collection "users"
        await setDoc(doc(db, 'users', response.user.uid), {
          uid: response.user.uid,
          name,
          email,
          photoURL: imageUrl
        })

        await setDoc(doc(db, 'userChats', response.user.uid), {})
        navigate('/')
      })
      .catch(error => {
        setIsRegister(false)
        const errorCode = error.code
        if (errorCode === 'auth/email-already-in-use') {
          openNotificationWithIcon('error', 'topLeft')
          emailRef.current.focus()
        }
      })
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

  return !isRegister ? (
    <div className="p-5 text-center bg-white border border-gray-200 border-solid rounded-md shadow-md w-72">
      {contextHolder}
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
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
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
            ref={emailRef}
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
              message: 'It must include one uppercase and one digit'
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder=" Password"
            className="custom-input !shadow-none"
          />
        </Form.Item>
        <Form.Item
          required
          name="upload"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="mt-2 avatar-uploader"
            showUploadList={false}
            fileList={null}
            onChange={handleChange}
            customRequest={({ file }) => handleFileUpload(file)}
            disabled={username === undefined}
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
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4 font-medium"
              disabled={
                loading ||
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Sign Up
            </Button>
          )}
        </Form.Item>
      </Form>

      <p className="text-sm font-light">
        You already have an account?{' '}
        <Link
          to="/login"
          className="no-underline text-primary"
        >
          Login
        </Link>
      </p>
    </div>
  ) : (
    <Spin size="large" />
  )
}

export default Signup

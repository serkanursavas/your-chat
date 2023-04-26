import { Form, Input, Button, Upload } from 'antd'
import { UserOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useState, useRef } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db } from '../store/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'
import { Spin } from 'antd'

const Signup = () => {
  const navigate = useNavigate()

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
      <div className="flex flex-row-reverse items-center justify-between mb-6 md:block">
        <h4 className="text-lg font-thin md:mt-2 md:mb-10">Update Profile</h4>
      </div>
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
              disabled={loading || !!form.getFieldsError().filter(({ errors }) => errors.length).length}
            >
              Update Profile
            </Button>
          )}
        </Form.Item>
      </Form>

      <p className="text-sm font-light">
        <Link
          to="/"
          className="no-underline text-primary"
        >
          Go back
        </Link>
      </p>
    </div>
  ) : (
    <Spin size="large" />
  )
}

export default Signup

import { Form, Input, Button, Upload } from 'antd'
import { UserOutlined, PlusOutlined, LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useState, useRef, useContext } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db } from '../store/firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { useNavigate, Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Signup = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const onFinish = async values => {
    try {
      await updateProfile(currentUser, {
        photoURL: imageUrl
      })

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  // uploading img to firestore
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(currentUser.photoURL)
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
  }
  const handleFileUpload = async file => {
    const storage = getStorage()
    const storageRef = ref(storage, currentUser.displayName)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      error => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
          setLoading(false)
          setImageUrl(downloadUrl)
        })
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
      <div className="flex flex-row-reverse items-center justify-between mb-6 md:block">
        <h4 className="text-lg font-normal text-primary md:mt-2 ">Update Profile Photo</h4>
        <h4 className="mt-1 text-xs font-thin">Upload new photo by clicking photo below</h4>
      </div>
      <Form
        onFinish={onFinish}
        requiredMark={true}
      >
        <Form.Item
          required
          name="upload"
          // rules={[
          //   {
          //     required: true,
          //     message: 'please'
          //   }
          // ]}
        >
          <Upload
            name="avatar"
            listType="picture-circle"
            className="mt-2 avatar-uploader"
            showUploadList={false}
            fileList={null}
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
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4 font-medium"
            >
              Go Back
            </Button>
          )}
        </Form.Item>
      </Form>

      {/* <p className="px-4 py-1 mx-auto text-sm font-light border-solid rounded-lg border-primary w-fit">
        <ArrowLeftOutlined />
        <Link
          to="/"
          className="ml-1 text-black no-underline"
        >
          Go back
        </Link>
      </p> */}
    </div>
  )
}

export default Signup

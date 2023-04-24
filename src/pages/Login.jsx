import { Form, Input, Button, notification, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../store/firebase'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [messageApi, contextHolderMessage] = message.useMessage()
  const success = () => {
    messageApi.open({
      type: 'error',
      content: 'Too many request. Please again after a while!',
      className: 'custom-class',
      style: {
        marginTop: '20vh'
      }
    })
  }

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, placement, errorMessage) => {
    api[type]({
      message: errorMessage,
      description: 'Please check your login information.',
      placement,
      style: {
        boxShadow:
          '0px 2px 4px rgba(255, 0, 0, 0.2), 0px 4px 8px rgba(255, 0, 0, 0.1), 0px 8px 16px rgba(255, 0, 0, 0.05)'
      }
    })
  }

  const onFinish = async values => {
    const email = values.email
    const password = values.password

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        navigate('/')
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        if (errorCode === 'auth/user-not-found') {
          openNotificationWithIcon('error', 'topLeft', 'User not found')
          emailRef.current.focus()
        } else if (errorCode === 'auth/too-many-requests') {
          success()
        } else {
          openNotificationWithIcon('error', 'topLeft', 'Wrong password')
          passwordRef.current.focus()
        }
      })
  }

  return (
    <div className="p-5 text-center bg-white border border-gray-200 border-solid rounded-md shadow-md w-72">
      {contextHolder}
      {contextHolderMessage}
      <div className="flex flex-row-reverse items-center justify-between mb-6 md:block">
        <h3 className="md:mb-2 md:text-3xl text-primary">YOUR CHAT</h3>
        <h4 className="text-lg font-thin md:mt-2 md:mb-10">Login</h4>
      </div>
      <Form
        form={form}
        requiredMark={true}
        onFinish={onFinish}
      >
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
              message: 'must include one uppercase and one digit'
            }
          ]}
        >
          <Input.Password
            ref={passwordRef}
            prefix={<LockOutlined />}
            placeholder=" Password"
            className="custom-input !shadow-none"
          />
        </Form.Item>

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
              Login
            </Button>
          )}
        </Form.Item>
      </Form>
      <p className="text-sm font-light">
        You don't have an account?{' '}
        <Link
          to="/signup"
          className="no-underline text-primary"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default Login

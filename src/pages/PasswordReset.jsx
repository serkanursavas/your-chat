import { Form, Input, Button, notification } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../store/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

const PasswordReset = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const emailRef = useRef(null)

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, placement, title, desc) => {
    api[type]({
      message: title,
      description: desc,
      placement,
      style:
        type === 'error'
          ? {
              boxShadow:
                '0px 2px 4px rgba(255, 0, 0, 0.2), 0px 4px 8px rgba(255, 0, 0, 0.1), 0px 8px 16px rgba(255, 0, 0, 0.05)'
            }
          : {
              boxShadow:
                '0px 2px 4px rgba(0, 255, 0, 0.2), 0px 4px 8px rgba(0, 255, 0, 0.1), 0px 8px 16px rgba(0, 255, 0, 0.05)'
            }
    })
  }

  const onFinish = async values => {
    const email = values.email

    sendPasswordResetEmail(auth, email)
      .then(res => {
        openNotificationWithIcon('success', 'topLeft', 'The Verification Mail', 'Please verify email using the link')
      })
      .catch(error => {
        openNotificationWithIcon('error', 'topLeft', 'User not found.', 'Please enter a valid email.')
        emailRef.current.focus()
      })
  }

  return (
    <div className="p-5 text-center bg-white border border-gray-200 border-solid rounded-md shadow-md w-72">
      {contextHolder}

      <div className="flex items-center justify-center mb-6 md:block">
        <h4 className="text-base font-thin md:mt-2 md:mb-10">Send Password Reset Email</h4>
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
              Send
            </Button>
          )}
        </Form.Item>
      </Form>
      <p className="text-sm font-light">
        <Link
          to="/login"
          className="no-underline text-primary"
        >
          Go Back
        </Link>
      </p>
    </div>
  )
}

export default PasswordReset

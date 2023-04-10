import { Form, Input, Button } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Login = () => {
  const [form] = Form.useForm()

  return (
    <div className="p-5 text-center bg-white border border-gray-200 border-solid rounded-md shadow-md w-72">
      <h3 className="mb-2 text-3xl text-primary">YOUR CHAT</h3>
      <h4 className="mt-2 mb-10 font-thin">Login</h4>
      <Form
        form={form}
        requiredMark={true}
      >
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

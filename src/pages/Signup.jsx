import { Form, Input, Button, Upload } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PlusOutlined } from '@ant-design/icons'

const Signup = () => {
  return (
    <div className="p-5 text-center bg-white border border-gray-200 border-solid rounded-md shadow-md w-72">
      <h3 className="mb-2 text-3xl text-primary">YOUR CHAT</h3>
      <h4 className="mt-2 font-thin">Register</h4>
      <Form>
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
            placeholder="Name"
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
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
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
            placeholder="Password"
          />
        </Form.Item>
        <Upload
          name="avatar"
          listType="picture-circle"
        >
          <div>
            <PlusOutlined />
            <div className="mt-0">Add Photo</div>
          </div>
        </Upload>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4 font-medium"
          >
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
      <p className="font-light">
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

import { Button, Form, Input } from 'antd';
import { useContext } from 'react';

import AuthContext from '../context/auth';

type TSignInProps = Readonly<{
  onCreateAccount: () => void;
}>;

const SignIn: React.FC<TSignInProps> = ({ onCreateAccount }) => {
  const { isAuthLoading, handleUserSignIn } = useContext(AuthContext);

  return (
    <Form
      name="sign-in"
      onFinish={(values) =>
        handleUserSignIn
          ? handleUserSignIn(values.email, values.password)
          : null
      }
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        name="email"
        rules={[
          { message: 'Please input your E-Mail address!', required: true },
        ]}
      >
        <Input type="email" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ message: 'Please input your password!', required: true }]}
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="default" block onClick={onCreateAccount}>
          Create an account
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isAuthLoading}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;

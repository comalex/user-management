import { Button, Form, Input } from 'antd';
import { useContext } from 'react';

import AuthContext from '../context/auth';

type TSignUpProps = Readonly<{
  onHaveAccount: () => void;
}>;

const SignUp: React.FC<TSignUpProps> = ({ onHaveAccount }) => {
  const { handleUserSignUp, isAuthLoading } = useContext(AuthContext);

  const onSubmitButtonClick = (values: any) => {
    if (handleUserSignUp) {
      handleUserSignUp(values.email, values.password);
    }
  };

  return (
    <Form
      name="sign-up"
      onFinish={onSubmitButtonClick}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        name="email"
        rules={[
          {
            message: 'The input is not valid E-mail!',
            type: 'email',
          },
          { message: 'Please input your E-Mail address!', required: true },
        ]}
      >
        <Input type="email" placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ message: 'Please input your password!', required: true }]}
        hasFeedback
      >
        <Input.Password type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        hasFeedback
        dependencies={['password']}
        rules={[
          { message: 'Please input your password to confirm!', required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password type="password" placeholder="Confirm password" />
      </Form.Item>

      <Form.Item>
        <Button type="default" block onClick={onHaveAccount}>
          Already have an account?
        </Button>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isAuthLoading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;

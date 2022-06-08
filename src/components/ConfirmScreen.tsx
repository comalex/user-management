import { Button, Form, Input } from 'antd';
import { useContext } from 'react';

import AuthContext from '../context/auth';

const ConfirmScreen: React.FC = () => {
  const { isAuthLoading, user, handleConfirmSignUp } = useContext(AuthContext);

  return (
    <Form
      name="confirm-sign-up"
      onFinish={(values) =>
        handleConfirmSignUp
          ? handleConfirmSignUp(user.user.username, values.code)
          : null
      }
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        name="code"
        rules={[{ message: 'Please input code from E-Mail!', required: true }]}
      >
        <Input.Password type="password" placeholder="Code" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={isAuthLoading}>
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConfirmScreen;

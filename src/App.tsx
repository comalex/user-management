import { Col, Row, Spin } from 'antd';
import { Amplify } from 'aws-amplify';
import { useContext } from 'react';

// Amplify config
import awsconfig from './aws-exports';
// Components
import AuthScreen from './components/AuthScreen';
import ConfirmScreen from './components/ConfirmScreen';
import ListScreen from './components/ListScreen';
// Context
import AuthContext, { AuthStatus } from './context/auth';

// Styles
import 'antd/dist/antd.dark.min.css';
import './App.css';

Amplify.configure(awsconfig);

const App: React.FC = () => {
  const { authStatus } = useContext(AuthContext);

  return (
    <Row align="middle" justify="center" style={{ minHeight: '100vh' }}>
      {authStatus === AuthStatus.PENDING && (
        <Col>
          <Spin size="large" />
        </Col>
      )}
      {authStatus === AuthStatus.AUTHENTICATED && (
        <Col span={12}>
          <ListScreen />
        </Col>
      )}
      {authStatus === AuthStatus.CONFIRMATION && (
        <Col span={6}>
          <ConfirmScreen />
        </Col>
      )}
      {authStatus === AuthStatus.UNAUTHENTICATED && (
        <Col span={6}>
          <AuthScreen />
        </Col>
      )}
    </Row>
  );
};

export default App;

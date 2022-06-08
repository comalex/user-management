import { useState } from 'react';

// Components
import SignIn from './SignIn';
import SignUp from './SignUp';

const AuthScreen: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return isSignIn ? (
    <SignIn onCreateAccount={() => setIsSignIn(false)} />
  ) : (
    <SignUp onHaveAccount={() => setIsSignIn(true)} />
  );
};

export default AuthScreen;

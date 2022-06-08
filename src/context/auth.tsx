import { Auth } from 'aws-amplify';
import { createContext, useEffect, useState } from 'react';

import { showErrorNotification } from '../helpers/notification';

export const enum AuthStatus {
  PENDING = 'PENDING',
  CONFIRMATION = 'CONFIRMATION',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  ERROR = 'ERROR',
}

type TAuthContext = {
  authStatus: AuthStatus;
  handleConfirmSignUp: (email: string, code: string) => void;
  handleUserSignIn: (email: string, password: string) => void;
  handleUserSignOut: () => void;
  handleUserSignUp: (email: string, password: string) => void;
  user: any;
  isAuthLoading: boolean;
};

type TAuthContextProvider = {
  children: React.ReactNode;
};

const AuthContext = createContext<Partial<TAuthContext>>({});

export const AuthContextProvider: React.FC<TAuthContextProvider> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.PENDING);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user) {
          setUser(user);
          setAuthStatus(AuthStatus.AUTHENTICATED);
        } else {
          setAuthStatus(AuthStatus.UNAUTHENTICATED);
        }
      })
      .catch(() => setAuthStatus(AuthStatus.UNAUTHENTICATED));
  }, []);

  const handleUserSignOut = (): void => {
    setIsAuthLoading(true);
    Auth.signOut()
      .then(() => {
        setUser(null);
        setAuthStatus(AuthStatus.UNAUTHENTICATED);
      })
      .catch((err: any) => showErrorNotification(err))
      .finally(() => setIsAuthLoading(false));
  };

  const handleUserSignIn = (email: string, password: string): void => {
    setIsAuthLoading(true);
    Auth.signIn(email, password)
      .then((user) => {
        setUser(user);
        setAuthStatus(AuthStatus.AUTHENTICATED);
      })
      .catch((err: any) => {
        showErrorNotification(err.message);
      })
      .finally(() => setIsAuthLoading(false));
  };

  const handleUserSignUp = (email: string, password: string): void => {
    setIsAuthLoading(true);
    Auth.signUp({ password, username: email })
      .then((user) => {
        setUser(user);
        setAuthStatus(AuthStatus.CONFIRMATION);
      })
      .catch((err: any) => showErrorNotification(err.message))
      .finally(() => setIsAuthLoading(false));
  };

  const handleConfirmSignUp = (email: string, code: string): void => {
    setIsAuthLoading(true);
    Auth.confirmSignUp(email, code)
      .then(() => {
        setAuthStatus(AuthStatus.AUTHENTICATED);
      })
      .catch((err: any) => showErrorNotification(err.message))
      .finally(() => setIsAuthLoading(false));
  };

  const context = {
    authStatus,
    handleConfirmSignUp,
    handleUserSignIn,
    handleUserSignOut,
    handleUserSignUp,
    isAuthLoading,
    user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

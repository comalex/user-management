import { render, screen, waitFor } from '@testing-library/react';

import './mocks/matchMedia.mock';
import App from './App';
// Context
import { AuthContextProvider } from './context/auth';

describe('App', () => {
  test('render without crashing', async () => {
    render(
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    );

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('Email');
      expect(emailInput).toBeInTheDocument();
    });

    await waitFor(() => {
      const passInput = screen.getByPlaceholderText('Password');
      expect(passInput).toBeInTheDocument();
    });

    await waitFor(() => {
      const createAccountButton = screen.getByText(/create an account/i);
      expect(createAccountButton).toBeInTheDocument();
    });

    await waitFor(() => {
      const signInButton = screen.getByText(/sign in/i);
      expect(signInButton).toBeInTheDocument();
    });
  });
});

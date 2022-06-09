import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '../mocks/matchMedia.mock';

import AuthScreen from './AuthScreen';

describe('AuthScreen', () => {
  test('render SignIn by default without crashing', () => {
    render(<AuthScreen />);
    const signInButton = screen.getByText(/sign in/i);
    expect(signInButton).toBeInTheDocument();
  });

  test('has change to SignUp form after create an account button click', async () => {
    render(<AuthScreen />);

    // Getting the create an account button and simulate click
    const createAccountButton = screen.getByText(/create an account/i);
    fireEvent.click(createAccountButton);

    // Getting sign up button and checking on existence
    const signUpButton = screen.getByText(/sign up/i);
    await waitFor(() => {
      expect(signUpButton).toBeInTheDocument();
    });
  });

  test('has change to SignUp form and back to SignIn', async () => {
    render(<AuthScreen />);

    // Getting the create an account button and simulate click
    const createAccountButton = screen.getByText(/create an account/i);
    fireEvent.click(createAccountButton);

    // Getting have an account button and checking and simulate click
    const haveAccountButton = screen.getByText(/have an account/i);
    fireEvent.click(haveAccountButton);

    // Getting sign in button and checking on existence
    const signInButton = screen.getByText(/sign in/i);
    await waitFor(() => {
      expect(signInButton).toBeInTheDocument();
    });
  });
});

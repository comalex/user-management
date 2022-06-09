import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '../mocks/matchMedia.mock';

import SignIn from './SignIn';

describe('SignIn', () => {
  test('render without crashing', () => {
    const onCreateAccount = jest.fn();
    render(<SignIn onCreateAccount={onCreateAccount} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Password');
    const createAccountButton = screen.getByText(/create an account/i);
    const signInButton = screen.getByText(/sign in/i);
    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(createAccountButton).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  test('has correct input values', () => {
    const onCreateAccount = jest.fn();
    render(<SignIn onCreateAccount={onCreateAccount} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toHaveValue('');
    expect(passInput).toHaveValue('');
  });

  test('has correct input values after user input', async () => {
    // TODO: look into why this test is giving warning about not being inside act()
    // fireEvent by default runs inside act()
    // and we are waiting for all states to be updated
    // and still getting warning

    const onCreateAccount = jest.fn();
    render(<SignIn onCreateAccount={onCreateAccount} />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    await waitFor(() => {
      expect(emailInput).toHaveValue('test@test.com');
    });

    const passInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passInput, { target: { value: 'test' } });
    await waitFor(() => expect(passInput).toHaveValue('test'));
  });
});

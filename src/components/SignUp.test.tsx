import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '../mocks/matchMedia.mock';

import SignUp from './SignUp';

describe('SignUp', () => {
  test('render without crashing', () => {
    const onHaveAccount = jest.fn();
    render(<SignUp onHaveAccount={onHaveAccount} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Password');
    const confirmPassInput = screen.getByPlaceholderText('Confirm password');
    const haveAccountButton = screen.getByText(/have an account/i);
    const signUpButton = screen.getByText(/sign up/i);
    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(confirmPassInput).toBeInTheDocument();
    expect(haveAccountButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  test('has correct input values', () => {
    const onHaveAccount = jest.fn();
    render(<SignUp onHaveAccount={onHaveAccount} />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Password');
    const confirmPassInput = screen.getByPlaceholderText('Confirm password');
    expect(emailInput).toHaveValue('');
    expect(passInput).toHaveValue('');
    expect(confirmPassInput).toHaveValue('');
  });

  test('has correct input values after user input', async () => {
    // TODO: look into why this test is giving warning about not being inside act()
    // fireEvent by default runs inside act()
    // and we are waiting for all states to be updated
    // and still getting warning

    const onHaveAccount = jest.fn();
    render(<SignUp onHaveAccount={onHaveAccount} />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    await waitFor(() => expect(emailInput).toHaveValue('test@test.com'));

    const passInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passInput, { target: { value: 'test' } });
    await waitFor(() => expect(passInput).toHaveValue('test'));

    const confirmPassInput = screen.getByPlaceholderText('Confirm password');
    fireEvent.change(confirmPassInput, { target: { value: 'test' } });
    await waitFor(() => expect(confirmPassInput).toHaveValue('test'));
  });

  test('has validation message appeared on password mismatch', async () => {
    const onHaveAccount = jest.fn();
    render(<SignUp onHaveAccount={onHaveAccount} />);

    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });

    const passInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passInput, { target: { value: 'test' } });

    const confirmPassInput = screen.getByPlaceholderText('Confirm password');
    fireEvent.change(confirmPassInput, { target: { value: 'testtest' } });

    await waitFor(() => {
      const validationMessage = screen.getByRole('alert');
      expect(validationMessage).toBeInTheDocument();
    });
  });
});

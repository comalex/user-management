import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '../mocks/matchMedia.mock';

import ConfirmScreen from './ConfirmScreen';

describe('ConfirmScreen', () => {
  test('render without crashing', () => {
    render(<ConfirmScreen />);
    const codeInput = screen.getByPlaceholderText('Code');
    const confirmButton = screen.getByText(/confirm/i);
    expect(codeInput).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  test('has correct input values', () => {
    render(<ConfirmScreen />);
    const codeInput = screen.getByPlaceholderText('Code');
    expect(codeInput).toHaveValue('');
  });

  test('has correct input values after user input', async () => {
    // TODO: look into why this test is giving warning about not being inside act()
    // fireEvent by default runs inside act()
    // and we are waiting for all states to be updated
    // and still getting warning

    render(<ConfirmScreen />);

    const codeInput = screen.getByPlaceholderText('Code');
    fireEvent.change(codeInput, { target: { value: 'test' } });
    await waitFor(() => {
      expect(codeInput).toHaveValue('test');
    });
  });
});

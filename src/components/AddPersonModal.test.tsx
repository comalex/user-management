import { render, screen } from '@testing-library/react';

// Mocks
import '../mocks/matchMedia.mock';

import AddPersonModal from './AddPersonModal';

describe('ActionMenu', () => {
  test('render without crashing', () => {
    const onClose = jest.fn();
    const onSave = jest.fn();
    render(
      <AddPersonModal isVisible={true} onClose={onClose} onSave={onSave} />
    );

    const nameInput = screen.getByPlaceholderText('Enter person name');
    const rankInput = screen.getByPlaceholderText('Person rank');
    const saveButton = screen.getByText(/save/i);
    expect(nameInput).toBeInTheDocument();
    expect(rankInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test('has correct input values', () => {
    const onClose = jest.fn();
    const onSave = jest.fn();
    render(
      <AddPersonModal isVisible={true} onClose={onClose} onSave={onSave} />
    );

    const nameInput = screen.getByPlaceholderText('Enter person name');
    const rankInput = screen.getByPlaceholderText('Person rank');
    expect(nameInput).toHaveValue('');
    expect(rankInput).toHaveValue('1');
  });
});

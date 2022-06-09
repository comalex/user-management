import { render, screen } from '@testing-library/react';

// Mocks
import '../mocks/matchMedia.mock';
import { personMock } from '../mocks/person.mock';

import ActionMenu from './ActionMenu';

describe('ActionMenu', () => {
  test('render without crashing', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    render(
      <ActionMenu person={personMock} onEdit={onEdit} onDelete={onDelete} />
    );

    const editButton = screen.getByText(/edit/i);
    const deleteButton = screen.getByText(/delete/i);
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

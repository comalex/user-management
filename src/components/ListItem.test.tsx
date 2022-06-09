import { render, screen } from '@testing-library/react';

// Mocks
import '../mocks/matchMedia.mock';
import { personMock } from '../mocks/person.mock';

import ListItem from './ListItem';

describe('ListItem', () => {
  test('render without crashing', () => {
    const onItemUpdate = jest.fn();
    const onItemDelete = jest.fn();
    render(
      <ListItem
        person={personMock}
        onItemUpdate={onItemUpdate}
        onItemDelete={onItemDelete}
      />
    );

    const listItemTitle = screen.getByText(/john doe/i);
    expect(listItemTitle).toBeInTheDocument();
  });

  // TODO: do test for edit and delete actions
  // currently cant do this because of the way the dropdown is rendered
  // cant pass any data to retrieve dropdown buttons to antd dropdown component
  // tried to use container querySelector but test fails with timeout error
  // querySelector take to long to find the action buttons
});

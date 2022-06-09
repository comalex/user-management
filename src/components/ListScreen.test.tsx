import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mocks
import '../mocks/matchMedia.mock';
import { peopleMock } from '../mocks/person.mock';

import ListScreen from './ListScreen';

const server = setupServer(
  rest.get('/people', (req, res, ctx) => {
    return res(
      ctx.json({
        body: peopleMock,
        statusCode: 200,
        url: '/people',
      })
    );
  })
);

describe('ListScreen', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('render without crashing', async () => {
    render(<ListScreen />);

    const listItemTitle = await waitFor(() => screen.getByText(/no data/i));
    expect(listItemTitle).toBeInTheDocument();
  });
});

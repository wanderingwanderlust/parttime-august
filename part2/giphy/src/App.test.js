import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('clicking link does something', () => {
  const homeRoute = '/about';

  render(
    <MemoryRouter initialEntries={[homeRoute]}>
      <App />
    </MemoryRouter>
  )

  expect(screen.getByText(/Giphy App/i)).toBeInTheDocument()
})

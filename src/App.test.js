import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product text', () => {
  render(<App />);
  const columnHeader = screen.getByText(/Selected products/i);
  expect(columnHeader).toBeInTheDocument();
});

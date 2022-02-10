import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('title', () => {
  render(<App />);
  const title = screen.getByText(/Movies/);
  expect(title).toBeInTheDocument();
});

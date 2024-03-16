import { render, screen } from '@testing-library/react';
import App from './App';

describe('Testing app', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/React/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders 3 list items', () => {
    render(<App />);
    const elements = screen.getAllByRole('listitem');
    // expect(elements).toHaveLength(3);
    expect(elements.length).toEqual(3);
  })

  test('testing for id', () => {
    render(<App />)
    const id = screen.getByTestId('mytestid');
    expect(id).toBeInTheDocument();
  })

  test('sum should be 6', () => {
    render(<App />)
    const sum = screen.getByTitle('sum');
    expect(sum.textContent).toBe('11')
  })
})

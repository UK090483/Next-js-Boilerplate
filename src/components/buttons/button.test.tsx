/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  it('type click should render ', () => {
    render(<Button label="test" type="click" onClick={() => {}} />);
  });
  it('type click should show label', () => {
    render(<Button label="test" type="click" onClick={() => {}} />);
    expect(screen.getByText('test'));
  });
  it('type click should handle click', () => {
    const handleClick = jest.fn();
    render(<Button label="test" type="click" onClick={handleClick} />);
    fireEvent.click(screen.getByText('test'));
    expect(handleClick).toBeCalledTimes(1);
  });
});

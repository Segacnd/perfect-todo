import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('button tests', () => {
  it('render with type button', () => {
    render(
      <div>
        <Button buttonClick={() => {}} buttonType='button' styleType='primary' size='standart'>
          hello
        </Button>
      </div>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('hello');
    expect(button).toHaveAttribute('type', 'button');
  });
  it('render with type submit and without text', () => {
    render(
      <div>
        <Button buttonType='submit' styleType='primary' size='standart'>
          lalala
        </Button>
      </div>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('lalala');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

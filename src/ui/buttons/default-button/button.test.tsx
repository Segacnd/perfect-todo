import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('button tests', () => {
  it('render with type button', () => {
    render(
      <div>
        <Button buttonClick={() => {}} buttonType='button' text='hello' styleType='primary' size='standart' />
      </div>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('hello');
    expect(button).toHaveAttribute('type', 'button');
  });
  it('render with type submit and without text', () => {
    render(
      <div>
        <Button buttonType='submit' text='' styleType='primary' size='standart' />
      </div>
    );
    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('');
    expect(button).toHaveAttribute('type', 'submit');
  });
});

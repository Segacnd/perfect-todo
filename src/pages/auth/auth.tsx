import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../ui/inputs/default-input/input';
import { Button } from '../../ui/buttons/default-button/button';

export const Auth: FC = () => {
  return (
    <div>
      <h2>Authorization</h2>
      <form action=''>
        <Input
          value=''
          placeholder='Login...'
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />

        <Button text='submit' buttonClick={() => {}} buttonType='submit' />
      </form>
      <p>
        Dont have an account? <br /> <Link to='/registration'>Create new account</Link>
      </p>
    </div>
  );
};

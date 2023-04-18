import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../ui/inputs/default-input/input';
import { Button } from '../../ui/buttons/default-button/button';

export const Register: FC = () => {
  return (
    <div>
      <h2>Registration</h2>
      <form action=''>
        <Input
          value=''
          placeholder='create Login'
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />
        <Input
          value=''
          placeholder='your First Name'
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />
        <Input
          value=''
          placeholder='your Second Name'
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />
        <Button text='submit' buttonClick={() => {}} buttonType='submit' />
      </form>
      <p>
        Already have account? <br /> <Link to='/auth'>Log in</Link>
      </p>
    </div>
  );
};

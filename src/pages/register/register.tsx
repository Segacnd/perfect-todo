import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input } from '../../ui/inputs/default-input/input';
import { Button } from '../../ui/buttons/default-button/button';

export const Register: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('registration_title')}</h2>
      <form action=''>
        <Input
          value=''
          placeholder={t('registration_login_input')}
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />
        <Input
          value=''
          placeholder={t('registration_fname_input')}
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />
        <Input
          value=''
          placeholder={t('registration_lname_input')}
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />
        <Button text={t('registration_button_text')} buttonClick={() => {}} buttonType='submit' />
      </form>
      <p>
        {t('registration_redirect_text')} <br /> <Link to='/auth'>{t('registration_link_text')}</Link>
      </p>
    </div>
  );
};

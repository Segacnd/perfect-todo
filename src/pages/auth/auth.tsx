import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input } from '../../ui/inputs/default-input/input';
import { Button } from '../../ui/buttons/default-button/button';

export const Auth: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h2>{t('auth_title')}</h2>
      <form action=''>
        <Input
          value=''
          placeholder={t('auth_input_placeholder')}
          labelText=''
          isLabelOpen={false}
          change={() => {}}
          setIsLabelOpen={() => {}}
        />

        <Button text={t('auth_button_text')} buttonClick={() => {}} buttonType='submit' />
      </form>
      <p>
        {t('auth_redirect_text')} <br /> <Link to='/registration'>{t('auth_create_acc_text')}</Link>
      </p>
    </div>
  );
};

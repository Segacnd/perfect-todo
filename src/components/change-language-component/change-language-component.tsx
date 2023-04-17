import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './change-language-component.module.css';

const langs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russian' },
};

export const ChangeLanguageComponent: FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.changeLanguageWrapper}>
      {Object.keys(langs).map((el) => (
        <button type='submit' key={el} onClick={() => i18n.changeLanguage(el)} disabled={i18n.resolvedLanguage === el}>
          {el}
        </button>
      ))}
    </div>
  );
};

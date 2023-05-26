import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './form-layout.module.css';
import { ChangeLanguageComponent } from '../change-language-component/change-language-component';
import { useAuth } from '../../hooks/use-auth';
import { Loader } from '../../ui/loader/loader';

export const FormLayout: FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const titleAnimation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
  };
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);
  return (
    <div className={styles.layout}>
      <motion.div
        initial='hidden'
        variants={titleAnimation}
        viewport={{ once: true }}
        whileInView='visible'
        className={styles.content}
      >
        <Outlet />
        <div className={styles.buttonWrapper}>
          <ChangeLanguageComponent />
        </div>
      </motion.div>
      <Loader />
    </div>
  );
};

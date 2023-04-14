import { FC } from 'react';
import styles from './card.module.css';

export const Card: FC = () => {
  return (
    <div className={styles.note}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam deleniti placeat inventore eius ipsa reiciendis
      nihil. Beatae maiores consectetur molestias recusandae quam, incidunt iure natus, quas, assumenda blanditiis
      perferendis pariatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam deleniti placeat
      inventore eius ipsa reiciendis nihil. Beatae maiores consectetur molestias recusandae quam, incidunt iure natus,
      quas, assumenda blanditiis perferendis pariatur?
    </div>
  );
};

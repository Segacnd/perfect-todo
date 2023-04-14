import { FC, useState } from 'react';
import styles from './add-button.module.css';
import { Tooltip } from '../../pop-up/tooltip/tooltip';

type AddButtonProps = {
  text: string;
  tooltipText: string;
  click: () => void;
};

export const AddButton: FC<AddButtonProps> = ({ text, click, tooltipText }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const hideTooltip = (): void => {
    setIsTooltipOpen(false);
  };

  const showTooltip = (): void => {
    setIsTooltipOpen(true);
  };

  return (
    <div className={styles.buttonWrapper}>
      <button
        type='button'
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className={styles.addButton}
        onClick={click}
      >
        {text}
      </button>
      {isTooltipOpen && <Tooltip text={tooltipText} />}
    </div>
  );
};

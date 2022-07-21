import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.scss';
import { makeid } from '@/helper/Common';
const CCButton = (props) => {
  const { fill, outline, ...rest } = props;
  return (
    <button
      key={makeid(8)}
      className={clsx([
        styles.btn,
        {
          [styles.upper]: props?.type === 'upper',
          [styles.link]: props?.link,
          [styles.outline]: props?.outline,
          [styles.fill]: props?.fill,
        },
      ])}
      {...rest}
    >
      <span>{props.children}</span>
    </button>
  );
};

export default CCButton;

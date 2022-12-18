import './button.scss';

import React, { FC } from 'react';

interface buttonProps {
  children: any;
  className: string;
  click?: () => void;
  type?: "button" | "submit" | "reset" | undefined
}

export const Button: FC<buttonProps> = ({ children, className, click, type = 'button'}) => {
  return (
    <button onClick={click} className={className} type={type}>
      {children}
    </button>
  );
};

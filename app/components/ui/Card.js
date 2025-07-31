'use client';

import { useTranslation } from 'react-i18next';

const Card = ({ 
  children, 
  className = '', 
  padding = 'default',
  shadow = 'default',
  ...props 
}) => {
  const { t } = useTranslation();

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const baseClasses = 'bg-white rounded-lg border border-gray-200';
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
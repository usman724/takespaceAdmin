'use client';

import { useTranslation } from 'react-i18next';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const { t } = useTranslation();

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#103358] text-white hover:bg-[#0a2a4a] focus:ring-[#103358]',
    secondary: 'bg-[#398AC8] text-white hover:bg-[#2d7bb8] focus:ring-[#398AC8]',
    yellow: 'bg-[#F2C94C] text-[#103358] hover:bg-[#e6b83a] focus:ring-[#F2C94C]',
    outline: 'border border-[#103358] text-[#103358] hover:bg-[#103358] hover:text-white focus:ring-[#103358]',
    ghost: 'text-[#103358] hover:bg-gray-100 focus:ring-[#103358]'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
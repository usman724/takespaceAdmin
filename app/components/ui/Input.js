'use client';

import { useTranslation } from 'react-i18next';

const Input = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  disabled = false,
  error = false,
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  const { t } = useTranslation();

  const baseClasses = 'w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const stateClasses = error 
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:ring-[#103358] focus:border-[#103358]';

  const iconClasses = icon 
    ? iconPosition === 'left' ? 'pl-10' : 'pr-10' 
    : '';

  const classes = `${baseClasses} ${stateClasses} ${iconClasses} ${className}`;

  return (
    <div className="relative">
      {icon && iconPosition === 'left' && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="" alt="icon" className="h-5 w-5 text-gray-400" />
        </div>
      )}
      
      <input
        type={type}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      
      {icon && iconPosition === 'right' && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <img src="" alt="icon" className="h-5 w-5 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default Input;
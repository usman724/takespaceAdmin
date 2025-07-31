'use client';
import { useState } from 'react';
import { useLocalization } from '../../hooks/useLocalization';
import { validateEmail, validateRequired } from '../../utils/validation';
import { authAPI } from '../../utils/api';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function   LoginForm() {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepSignedIn: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
  
    if (!validateForm()) return;
    window.location.href = '/dashboard';
    // setLoading(true);
    // try {
    //   // const response = await authAPI.login({
    //   //   email: formData.email,
    //   //   password: formData.password,
    //   //   keepSignedIn: formData.keepSignedIn
    //   // });
    //   console.log('Login successful:', response);
    //   // Handle successful login (redirect, etc.)
    //   window.location.href = '/dashboard';
    // } catch (error) {
    //   setApiError('Login failed. Please check your credentials.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-[320px]">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-[#0F172A] leading-5">
          {t('auth.emailUsername')}
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          className="w-full h-12 px-4 py-3 border-[1.5px] border-[#CBD5E1] rounded-xl focus:border-[#398AC8] text-[#0F172A]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center w-full">
          <label className="text-sm font-semibold text-[#0F172A] leading-5">
            {t('auth.password')}
          </label>
          <a 
            href="#" 
            className="text-sm font-semibold text-[#398AC8] leading-5 hover:underline"
          >
            {t('auth.forgotPassword')}
          </a>
        </div>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          placeholder="••••••••••"
          showPasswordToggle
          className="w-full h-12 px-4 py-3 border-[1.5px] border-[#398AC8] rounded-xl focus:border-[#398AC8] text-[#475569]"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-[6px]">
          <div className="w-6 h-6 mt-0">
            <input
              type="checkbox"
              checked={formData.keepSignedIn}
              onChange={(e) => handleChange('keepSignedIn', e.target.checked)}
              className="w-4 h-4 mt-1 ml-1 text-[#103358] bg-white border border-gray-300 rounded focus:ring-[#103358] focus:ring-2"
              style={{
                accentColor: '#103358'
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#0F172A] leading-6">
              {t('auth.keepSignedIn')}
            </label>
            <p className="text-sm font-medium text-[#475569] leading-5">
              {t('auth.recommended')}
            </p>
          </div>
        </div>

        {apiError && <ErrorMessage message={apiError} />}

        <Button
          type="submit"
          className="w-full h-11 bg-[#103358] text-white text-sm font-semibold leading-5 rounded-xl hover:bg-[#0a2544] transition-colors"
          disabled={loading}
        >
          {loading ? <LoadingSpinner size="small" color="white" /> : t('auth.signIn')}
        </Button>

        <div className="text-center">
          <span className="text-[14px] font-semibold text-[#475569]">{t('auth.newToTakeSpace')} </span>
          <a href="/signup" className="text-sm font-semibold text-[#103358] underline hover:no-underline">
            {t('auth.createAccount')}
          </a>
        </div>

        <div className="w-full h-px bg-[#E2E8F0]"></div>

        <div className="text-center">
          <a href="#" className="text-[14px] font-semibold text-[#103358] underline hover:no-underline">
            {t('auth.troubleSigning')}
          </a>
        </div>
      </div>
    </form>
  );
}
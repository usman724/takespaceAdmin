'use client';
import { useState } from 'react';
import { useLocalization } from '../../hooks/useLocalization';
import { validateEmail, validateRequired, validatePassword } from '../../utils/validation';
import { authAPI } from '../../utils/api';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

export default function SignupForm({ onNext }) {
  const { t } = useLocalization();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    password: '',
    parentPin: '',
    agreeTerms: false
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

    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }

    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!validateRequired(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!validateRequired(formData.password)) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!validateRequired(formData.parentPin)) {
      newErrors.parentPin = 'Parent PIN is required';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
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
    //   const response = await authAPI.signup(formData);
    //   console.log('Signup successful:', response);
    //   onNext(formData);
    // } catch (error) {
    //   setApiError('Signup failed. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.firstName')}
          </label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            error={errors.firstName}
            placeholder="First name..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.lastName')}
          </label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            error={errors.lastName}
            placeholder="Last name..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.email')}
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="Email..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.dateOfBirth')}
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            error={errors.dateOfBirth}
            placeholder="DOB..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('auth.password')}
          </label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            error={errors.password}
            placeholder="Password..."
            showPasswordToggle
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#103358] mb-2">
            {t('signup.parentPin')}
          </label>
          <Input
            type="password"
            value={formData.parentPin}
            onChange={(e) => handleChange('parentPin', e.target.value)}
            error={errors.parentPin}
            placeholder="Pin..."
          />
        </div>
      </div>

      <div>
        <Checkbox
          checked={formData.agreeTerms}
          onChange={(e) => handleChange('agreeTerms', e.target.checked)}
          label={
            <span className='text-[14px] text-[#6E7485]'>
              {t('signup.agreeTerms')} <a href="#" className="text-[#398AC8] hover:underline">{t('signup.termsConditions')}</a>
            </span>
          }
          error={errors.agreeTerms}
        />
      </div>

      {apiError && <ErrorMessage message={apiError} />}

      <Button
        type="submit"
        useCustomClasses={true}
        className="w-full flex flex-row justify-center items-center gap-2 h-12 bg-[#103358] rounded-xl px-4 py-3 hover:bg-[#0a2544] transition-colors"
        disabled={loading}
      >
        {loading ? (
          <LoadingSpinner size="small" color="white" />
        ) : (
          <span className="font-semibold text-sm text-white leading-5">
            {t('signup.continue')}
          </span>
        )}
      </Button>

      <div className="flex items-center justify-center gap-4">
        <div className="w-[134.5px] h-px bg-[#E2E8F0]"></div>
        <span className="text-sm text-gray-600">{t('common.or')}</span>
        <div className="w-[134.5px] h-px bg-[#E2E8F0]"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Button
          useCustomClasses={true}
          className="w-full flex flex-row justify-center items-center gap-2 h-10 bg-white border border-[#CBD5E1] rounded-xl px-[14px] py-[10px] hover:bg-gray-50 transition-colors"
        >
          <img src="/icons/google.svg" className="w-5 h-5" />
          <span className="font-semibold text-sm text-[#0F172A] leading-5">
            {t('welcome.continueWithGoogle')}
          </span>
        </Button>
        <Button
          useCustomClasses={true}
          className="w-full flex flex-row justify-center items-center gap-2 h-10 bg-white border border-[#CBD5E1] rounded-xl px-[14px] py-[10px] hover:bg-gray-50 transition-colors"
        >
          <img src="/icons/apple.svg" className="w-[17.52px] h-[20.8px]" />
          <span className="font-semibold text-sm text-black leading-5">
            {t('welcome.continueWithApple')}
          </span>
        </Button>
      </div>
    </form>
  );
}
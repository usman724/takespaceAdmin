'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import I18nProvider from '../components/providers/I18nProvider';

const SignupPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup attempt:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <I18nProvider>
      <Layout showSidebar={false}>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-md w-full space-y-8" padding="xl">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-[#103358]">
                {t('signup')}
              </h2>
            </div>
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  name="email"
                  type="email"
                  placeholder={t('email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  name="password"
                  type="password"
                  placeholder={t('password')}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder={t('confirmPassword')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                {t('signup')}
              </Button>

              <div className="text-center">
                <span className="text-gray-600">{t('alreadyHaveAccount')} </span>
                <a
                  href="/login"
                  className="text-[#398AC8] hover:text-[#103358] font-medium"
                >
                  {t('loginHere')}
                </a>
              </div>
            </form>
          </Card>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default SignupPage; 
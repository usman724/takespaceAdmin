'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import I18nProvider from '../components/providers/I18nProvider';

const LoginPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
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
                {t('login')}
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
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="/forgot-password"
                  className="text-sm text-[#398AC8] hover:text-[#103358]"
                >
                  {t('forgotPassword')}
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                {t('login')}
              </Button>

              <div className="text-center">
                <span className="text-gray-600">{t('dontHaveAccount')} </span>
                <a
                  href="/signup"
                  className="text-[#398AC8] hover:text-[#103358] font-medium"
                >
                  {t('signUpHere')}
                </a>
              </div>
            </form>
          </Card>
        </div>
      </Layout>
    </I18nProvider>
  );
};

export default LoginPage; 
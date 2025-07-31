'use client';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    { key: 'company', label: t('company') },
    { key: 'membership', label: t('membership') },
    { key: 'blog', label: t('blog') },
    { key: 'helpCentre', label: t('helpCentre') },
    { key: 'userGuides', label: t('userGuides') },
    { key: 'tellUsWhatYouThink', label: t('tellUsWhatYouThink') },
    { key: 'testimonials', label: t('testimonials') },
    { key: 'careers', label: t('careers') },
    { key: 'contactUs', label: t('contactUs') },
    { key: 'termsOfService', label: t('termsOfService') },
    { key: 'privacyPolicy', label: t('privacyPolicy') }
  ];

  const socialMediaIcons = [
    { key: 'facebook', alt: 'Facebook' },
    { key: 'twitter', alt: 'X (Twitter)' },
    { key: 'youtube', alt: 'YouTube' },
    { key: 'linkedin', alt: 'LinkedIn' }
  ];

  return (
    <footer className="bg-[#103358] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center mb-6">
          {footerLinks.map((link, index) => (
            <div key={link.key} className="flex items-center">
              <a
                href={`/${link.key}`}
                className="text-white hover:text-gray-300 transition-colors px-2"
              >
                {link.label}
              </a>
              {index < footerLinks.length - 1 && (
                <span className="text-white px-2">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Copyright and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            {/* TS Logo */}
            <div className="w-8 h-8 bg-[#398AC8] rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <span className="text-white">{t('copyright')}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white">{t('followUs')}</span>
            <div className="flex space-x-3">
              {socialMediaIcons.map((icon) => (
                <a
                  key={icon.key}
                  href={`/${icon.key}`}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <img 
                    src="" 
                    alt={icon.alt} 
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
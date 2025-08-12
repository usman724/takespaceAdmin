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
    { key: 'facebook', alt: 'Facebook', src: '/socialicon/facebook.svg' },
    { key: 'twitter', alt: 'X (Twitter)', src: '/socialicon/twitter.svg' },
    { key: 'youtube', alt: 'YouTube', src: '/socialicon/youtube.svg' },
    { key: 'instagram', alt: 'Instagram', src: '/socialicon/instagram.svg' },
    { key: 'linkedin', alt: 'LinkedIn', src: '/socialicon/linkedin.svg' }
  ];

  return (
    <footer className="bg-[#103358] text-white relative z-10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-[18px] pb-[12px]">
        {/* Navigation Links - centered single row */}
        <div className="flex flex-wrap justify-center items-center text-center mb-1">
          {footerLinks.map((link, index) => (
            <div key={link.key} className="flex items-center">
              <a
                href={`/${link.key}`}
                className={`px-2 sm:px-3 text-white hover:text-gray-300 transition-colors ${
                  link.key === 'privacyPolicy' ? 'font-semibold' : 'font-normal'
                }`}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: '28px' }}
              >
                {link.label}
              </a>
              {index < footerLinks.length - 1 && (
                <span className="text-white/70" style={{ padding: '0 2px', lineHeight: '28px' }}>|</span>
              )}
            </div>
          ))}
        </div>

        {/* Second line - centered */}
        <div className="w-full flex justify-center">
          <div className="inline-flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', lineHeight: '28px' }}>
            <div className="w-7 h-7 bg-[#398AC8] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-[12px]">TS</span>
            </div>
            <span className="whitespace-nowrap">{t('copyright')}</span>
            <span className="whitespace-nowrap">{t('followUs')}</span>
            <div className="inline-flex items-center gap-2.5">
              {socialMediaIcons.map((icon) => (
                <a
                  key={icon.key}
                  href={`/${icon.key}`}
                  className="inline-flex"
                  aria-label={icon.alt}
                >
                  <img src={icon.src} alt={icon.alt} className="w-5 h-5" />
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
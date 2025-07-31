'use client';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '/icons/flags/en.svg' },
    { code: 'es', name: 'Español', flag: '/icons/flags/es.svg' },
    { code: 'fr', name: 'Français', flag: '/icons/flags/fr.svg' },
    { code: 'ar', name: 'العربية', flag: '/icons/flags/ar.svg' }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsDropdownOpen(false);
    // Here you can add logic to actually change the language
    console.log('Selected language:', language);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="mt-[40px] ml-[40px] mr-[40px]">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl lg:text-3xl font-bold">
          <span className="text-[#103358]">TAKE</span>
          <span className="text-[#398AC8]">SPACE</span>
        </div>
        
        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-[#103358] hover:bg-[#E3F3FF] px-3 py-2 rounded-lg transition-colors"
          >
            <img src="/icons/global.svg" alt="Language" className="w-5 h-5" />
            <span className="text-sm lg:text-base">{selectedLanguage}</span>
            <img 
              src="/icons/arrowdown.svg" 
              alt="Dropdown" 
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-[#E3F3FF] transition-colors ${
                      selectedLanguage === language.name ? 'bg-[#E3F3FF] text-[#398AC8]' : 'text-[#103358]'
                    }`}
                  >
                    {/* Flag placeholder - you can replace with actual flag icons */}
                    <div className="w-5 h-5 rounded-sm bg-gray-200 flex items-center justify-center text-xs">
                      {language.code.toUpperCase()}
                    </div>
                    <span className="text-sm lg:text-base">{language.name}</span>
                    {selectedLanguage === language.name && (
                      <svg className="w-4 h-4 ml-auto text-[#398AC8]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
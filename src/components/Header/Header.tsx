/**
 * Header Component
 * Application header with logo, title, language and theme toggles
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Palette } from 'lucide-react';

const THEMES = ['light', 'dark'];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Update document direction based on language
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  /**
   * Toggle language between Arabic and English
   */
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  /**
   * Change theme
   */
  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <header className="bg-base-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* ED Logo with gradient background */}
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl transform transition-transform hover:scale-105">
                <span className="text-3xl font-black text-white tracking-tighter">
                  ED
                </span>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-base-200"></div>
            </div>
          </div>

          {/* Title Section - Center */}
          <div className="flex-1 text-center px-4">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('header.title')}
            </h1>
          </div>

          {/* Controls Section - Language & Theme */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Languages className="w-5 h-5" />
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4">
                <li>
                  <button
                    onClick={() => i18n.changeLanguage('ar')}
                    className={i18n.language === 'ar' ? 'active' : ''}
                  >
                    <span className="text-lg">🇸🇦</span>
                    <span>{t('language.ar')}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => i18n.changeLanguage('en')}
                    className={i18n.language === 'en' ? 'active' : ''}
                  >
                    <span className="text-lg">🇬🇧</span>
                    <span>{t('language.en')}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Theme Toggle */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Palette className="w-5 h-5" />
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4 max-h-96 overflow-y-auto">
                {THEMES.map((theme) => (
                  <li key={theme}>
                    <button
                      onClick={() => changeTheme(theme)}
                      className={currentTheme === theme ? 'active' : ''}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className={`w-4 h-4 rounded-full bg-${theme === 'dark' ? 'gray-800' : 'primary'}`}></div>
                        <span className="capitalize">{t(`theme.${theme}`)}</span>
                        {currentTheme === theme && (
                          <span className="ml-auto text-success">✓</span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { memo } from 'react';
import { Logo } from './Header';
import AnimatedSection from './AnimatedSection';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div
      className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center font-sans"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <main className="container mx-auto px-4 py-8 lg:px-8 lg:py-12 max-w-6xl">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <Logo
                className="h-12 sm:h-16 w-auto max-w-[250px] mx-auto transition-transform duration-300 hover:scale-105"
                ariaLabel="Company Logo"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 animate-slide-up">
              {t('greeting')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 animate-slide-up delay-100">
              {t('wishes')}
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 animate-slide-up delay-200">
              {t('description')}
            </p>
            <Link
              to="/cards"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-slide-up delay-300"
              aria-label={t('create_card')}
            >
              {t('create_card')}
              <ChevronRight
                size={20}
                className={isArabic ? 'ms-2 transform rotate-180' : 'ms-2'}
              />
            </Link>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default memo(Home);

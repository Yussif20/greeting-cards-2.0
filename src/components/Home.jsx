import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronRight, Gift, Users, Clock } from 'lucide-react';
import { memo } from 'react';
import { Logo } from './Header';
import AnimatedSection from './AnimatedSection';
import sampleCard from '../assets/rhc/rhc-post-2.jpg';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div
      className="bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex flex-col items-center justify-center font-sans bg-[url('/islamic-pattern-light.jpg')] dark:bg-[url('/islamic-pattern-dark.avif')]  bg-repeat bg-[length:200px]"
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ backgroundAttachment: 'fixed' }}
    >
      <main className="container mx-auto px-4 py-12 lg:px-8 lg:py-16 max-w-7xl relative z-10">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 text-center border border-green-100 dark:border-gray-700">
            <div className="mb-6 sm:mb-8">
              <Logo
                className="h-16 sm:h-20 w-auto max-w-[300px] mx-auto transition-transform duration-300 hover:scale-105"
                ariaLabel="Eid al-Adha Greeting Cards Logo"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-800 dark:text-green-200 mb-4 animate-slide-up">
              {t('eid_al_adha_greeting')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 animate-slide-up delay-100">
              {t('eid_wishes_message')}
            </p>
            <div className="mb-8 relative">
              <div className="w-full max-w-[400px] mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl p-4 shadow-inner animate-pulse">
                <img
                  src={sampleCard}
                  alt={t('sample_card')}
                  className="w-full h-auto rounded-lg object-cover aspect-[16/16]"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('preview_description')}
                </p>
              </div>
            </div>
            <Link
              to="/cards"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up delay-200"
              aria-label={t('create_card')}
            >
              {t('create_card')}
              <ChevronRight
                size={20}
                className={isArabic ? 'ml-2 transform rotate-180' : 'ml-2'}
              />
            </Link>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Gift className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                10K+
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('cards_created')}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                5K+
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('happy_users')}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                24/7
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('support_available')}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Testimonial Section */}
        <AnimatedSection delay={400}>
          <div className="mt-12 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 text-center">
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 italic mb-4">
              &quot;{t('testimonial_message')}&quot;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              - {t('testimonial_author')}
            </p>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default memo(Home);

// src/components/Home.jsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

const Home = () => {
  const { i18n } = useTranslation();

  return (
    <div
      className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center text-[var(--foreground)]"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-12">
        <img
          src={logo}
          alt="Reda Hazard Control"
          className="h-16 sm:h-20 mx-auto mb-8 animate-fade-in"
        />
        <h1 className="text-3xl sm:text-5xl font-bold text-[#243e87] mb-4 animate-slide-up">
          {i18n.language === 'ar' ? 'عيد أضحى مبارك' : 'Blessed Eid al-Adha'}
        </h1>
        <p className="text-lg sm:text-xl text-[var(--foreground)]/80 mb-8 animate-slide-up delay-100">
          {i18n.language === 'ar'
            ? 'نتمنى لكم عيداً مليئاً بالفرح والسلام مع عائلتكم وأحبائكم'
            : 'Wishing you a joyful and peaceful Eid with your family and loved ones'}
        </p>
        <p className="text-base sm:text-lg text-[var(--foreground)]/70 mb-10 animate-slide-up delay-200">
          {i18n.language === 'ar'
            ? 'في رضا للسيطرة على المخاطر، نحتفل معكم بهذا العيد بإنشاء بطاقات تهنئة مخصصة لمشاركة الفرحة'
            : 'At Reda Hazard Control, we celebrate this Eid with you by creating personalized greeting cards to share the joy'}
        </p>
        <Link
          to="/cards"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ee2e3a] text-white font-semibold rounded-lg shadow-lg hover:bg-[#ee2e3a]/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up delay-300"
        >
          {i18n.language === 'ar' ? 'أنشئ بطاقتك الآن' : 'Create Your Card Now'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-[#ee2e3a]/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-[#243e87]/10 rounded-full translate-x-16 translate-y-16 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Home;

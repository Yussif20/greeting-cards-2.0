import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { memo } from "react";
import { Logo } from "./Header";
import AnimatedSection from "./AnimatedSection";
import sampleCard from "/rhc/RHC.jpg";

const Home = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className="bg-gradient-to-br from-[#e6e9f4] via-[#f4e0b5] to-[#243e87]/10 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 min-h-screen flex flex-col items-center justify-center font-sans bg-[url('/light-moon-small.png')] dark:bg-[url('/dark-moon-small.png')] bg-cover bg-no-repeat bg-center transition-all duration-300 sm:bg-[url('/light-moon.png')] sm:dark:bg-[url('/dark-moon.png')] sm:bg-fixed"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <main className="container mx-auto px-4 py-12 lg:px-8 lg:py-16 max-w-7xl relative z-10">
        {/* Hero Section */}
        <AnimatedSection>
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 text-center border border-[#e6e9f4] dark:border-gray-700">
            <div className="mb-6 sm:mb-8">
              <Logo
                className="h-16 sm:h-20 w-auto max-w-[300px] mx-auto transition-transform duration-300 hover:scale-105"
                ariaLabel="New Hijri Year Greeting Cards Logo"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#243e87] dark:text-gray-200 mb-4 animate-slide-up">
              {t("new_hijri_year_greeting")}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 mb-6 animate-slide-up delay-100">
              {t("new_hijri_year_message")}
            </p>
            <div className="mb-8 relative">
              <div className="w-full max-w-[500px] sm:max-w-[600px] mx-auto bg-gray-100 dark:bg-gray-700 rounded-xl p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={sampleCard}
                    alt={t("sample_card")}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 sm:mt-4">
                  {t("preview_description")}
                </p>
              </div>
            </div>
            <Link
              to="/cards"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#243e87] to-[#4a6ab7] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-slide-up delay-200"
              aria-label={t("create_card")}
            >
              {t("create_card")}
              <ChevronRight
                size={20}
                className={isArabic ? "ml-2 transform rotate-180" : "ml-2"}
              />
            </Link>
          </div>
        </AnimatedSection>

        {/* Testimonial Section */}
        <AnimatedSection delay={400}>
          <div className="mt-12 p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-[#e6e9f4] dark:border-gray-700 text-center shadow-inner">
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 italic mb-4">
              "{t("new_hijri_testimonial_message")}"
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              - {t("new_hijri_testimonial_author")}
            </p>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
};

export default memo(Home);

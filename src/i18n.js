import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      visit_website: 'Visit Our Website',
      copyright: '© 2025 All rights reserved.',
      // Home
      eid_greeting: 'Blessed Eid al-Adha',
      eid_message: 'Wishing you a joyful and peaceful Eid with your family and loved ones',
      company_message: 'At Reda Hazard Control, we celebrate this Eid with you by creating personalized greeting cards to share the joy',
      create_card: 'Create Your Card Now',

      // CardSelector
      select_card: 'Select a Card',
      whatsapp_story: 'WhatsApp Story',
      linkedin_post: 'LinkedIn Post',
      guide_name: 'Enter Your Name',
      enable_customization: 'Enable Customization',
      guide_color: 'Pick a Text Color',
      font_language: 'Font Language',
      arabic: 'Arabic',
      english: 'English',
      guide_font: 'Choose a Font',
      guide_font_style: 'Select Text Style',
      guide_font_size: 'Set Text Size',
      normal: 'Normal',
      bold: 'Bold',
      italic: 'Italic',
      preview: 'Preview',
      position_tip: 'Click or drag to position text',
      save_card: 'Save Card',
      share_card: 'Share Card',
      greeting_card: 'Greeting Card',
      share_message: 'Check out my custom greeting card!',
      loading_fonts: 'Loading fonts...',
    },
  },
  ar: {
    translation: {
      // Common
      visit_website: 'زوروا موقعنا الإلكتروني',
      copyright: '© 2025 جميع الحقوق محفوظة',
      // Home
      eid_greeting: 'عيد أضحى مبارك',
      eid_message: 'نتمنى لكم عيداً مليئاً بالفرح والسلام مع عائلتكم وأحبائكم',
      company_message: 'في رضا للسيطرة على المخاطر، نحتفل معكم بهذا العيد بإنشاء بطاقات تهنئة مخصصة لمشاركة الفرحة',
      create_card: 'أنشئ بطاقتك الآن',

      // CardSelector
      select_card: 'اختر بطاقة',
      whatsapp_story: 'قصة واتساب',
      linkedin_post: 'منشور لينكدإن',
      guide_name: 'أدخل اسمك',
      enable_customization: 'تفعيل التخصيص',
      guide_color: 'اختر لون النص',
      font_language: 'لغة الخط',
      arabic: 'العربية',
      english: 'الإنجليزية',
      guide_font: 'اختر خطًا',
      guide_font_style: 'حدد أسلوب النص',
      guide_font_size: 'حدد حجم النص',
      normal: 'عادي',
      bold: 'غامق',
      italic: 'مائل',
      preview: 'معاينة',
      position_tip: 'انقر أو اسحب لتحديد موقع النص',
      save_card: 'حفظ البطاقة',
      share_card: 'مشاركة البطاقة',
      greeting_card: 'بطاقة تهنئة',
      share_message: 'شاهد بطاقة التهنئة المخصصة الخاصة بي!',
      loading_fonts: 'جارٍ تحميل الخطوط...',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Common
      copyright: "© 2025 Reda Hazard Control. All rights reserved.",

      // Header
      home: "Home",
      about: "About",
      contact: "Contact",
      change_language: "Change Language",
      language_ar: "Arabic",
      language_en: "English",

      // Home
      greeting: "Happy New Hijri Year",
      wishes:
        "Wishing you a prosperous and blessed New Hijri Year with your family and friends",
      description:
        "At Reda Hazard Control, we celebrate the New Hijri Year by creating personalized greeting cards to share the joy",
      create_card: "Create Your Card Now",
      visit_website: "Visit Website",
      cards_downloaded: "{count} cards downloaded so far",
      download_count_error:
        "Failed to fetch download count. Please try again later.",

      // CardSelector
      select_card: "Select a Card",
      cards: "Cards",
      guide_name: "Customize Your Card",
      enter_name: "Enter your name",
      guide_color: "Text Color",
      font_language: "Font Language",
      arabic: "Arabic",
      english: "English",
      guide_font: "Font",
      guide_font_style: "Font Style",
      normal: "Normal",
      bold: "Bold",
      italic: "Italic",
      guide_font_size: "Font Size",
      text_shadow: "Text Shadow",
      elegant: "Elegant",
      professional: "Professional",
      festive: "Festive",
      undo: "Undo",
      reset: "Reset",
      preview: "Preview",
      position_tip: "Click or drag to position text",
      card_preview: "Card Preview",
      text_preview: "Your Name",
      zoom_in: "Zoom In",
      zoom_out: "Zoom Out",
      save_card: "Save Card",
      share_card: "Share Card",
      greeting_card: "Greeting Card",
      share_message: "Check out my custom New Hijri Year card!",
      loading_fonts: "Loading fonts...",
      font_load_error_retry: "Failed to load fonts. Please try again.",
      image_load_error: "Failed to load image. Please select another card.",
      download_error: "Failed to download card. Please try again.",
      share_error: "Failed to share card. Please try again.",
      retry: "Retry",
      new_hijri_year_greeting: "Happy New Hijri Year!",
      new_hijri_year_message:
        "Celebrate the New Hijri Year with personalized greeting cards.",
      preview_description: "Preview of your custom New Hijri Year card.",
      cards_created: "Cards Created",
      happy_users: "Happy Users",
      support_available: "Support Available",
      new_hijri_testimonial_message:
        "Creating a custom New Hijri Year card was so easy and heartfelt!",
      new_hijri_testimonial_author: "Fatima A.",
    },
  },
  ar: {
    translation: {
      // Common
      copyright: "© 2025 Reda Hazard Control. جميع الحقوق محفوظة.",

      // Header
      home: "الرئيسية",
      about: "من نحن",
      contact: "اتصل بنا",
      change_language: "تغيير اللغة",
      language_ar: "العربية",
      language_en: "الإنجليزية",

      // Home
      greeting: "سنة هجرية سعيدة",
      wishes:
        "نتمنى لكم سنة هجرية جديدة مليئة بالبركة والازدهار مع عائلتكم وأصدقائكم",
      description:
        "في رضا للسيطرة على المخاطر، نحتفل بالسنة الهجرية الجديدة بإنشاء بطاقات تهنئة مخصصة لمشاركة الفرحة",
      create_card: "أنشئ بطاقتك الآن",
      visit_website: "زيارة الموقع",
      cards_downloaded: "تم تنزيل {count} بطاقة حتى الآن",
      download_count_error:
        "فشل في جلب عدد التنزيلات. يرجى المحاولة مرة أخرى لاحقًا.",

      // CardSelector
      select_card: "اختر بطاقة",
      cards: "بطاقات",
      guide_name: "تخصيص بطاقتك",
      enter_name: "أدخل اسمك",
      guide_color: "لون النص",
      font_language: "لغة الخط",
      arabic: "العربية",
      english: "الإنجليزية",
      guide_font: "الخط",
      guide_font_style: "نمط الخط",
      normal: "عادي",
      bold: "غامق",
      italic: "مائل",
      guide_font_size: "حجم الخط",
      text_shadow: "ظل النص",
      elegant: "أنيق",
      professional: "احترافي",
      festive: "احتفالي",
      undo: "تراجع",
      reset: "إعادة تعيين",
      preview: "معاينة",
      position_tip: "انقر أو اسحب لتحديد موقع النص",
      card_preview: "معاينة البطاقة",
      text_preview: "اسمك",
      zoom_in: "تكبير",
      zoom_out: "تصغير",
      save_card: "حفظ البطاقة",
      share_card: "مشاركة البطاقة",
      greeting_card: "بطاقة تهنئة",
      share_message: "شاهد بطاقة السنة الهجرية المخصصة الخاصة بي!",
      loading_fonts: "جارٍ تحميل الخطوط...",
      font_load_error_retry: "فشل تحميل الخطوط. يرجى المحاولة مرة أخرى.",
      image_load_error: "فشل تحميل الصورة. يرجى اختيار بطاقة أخرى.",
      download_error: "فشل تنزيل البطاقة. يرجى المحاولة مرة أخرى.",
      share_error: "فشل مشاركة البطاقة. يرجى المحاولة مرة أخرى.",
      retry: "إعادة المحاولة",
      new_hijri_year_greeting: "سنة هجرية سعيدة!",
      new_hijri_year_message:
        "احتفل بالسنة الهجرية الجديدة ببطاقات تهنئة مخصصة.",
      preview_description: "معاينة بطاقة السنة الهجرية المخصصة الخاصة بك.",
      cards_created: "بطاقات تم إنشاؤها",
      happy_users: "مستخدمون سعداء",
      support_available: "الدعم المتاح",
      new_hijri_testimonial_message:
        "إنشاء بطاقة سنة هجرية مخصصة كان سهلاً ومؤثراً!",
      new_hijri_testimonial_author: "فاطمة ع.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

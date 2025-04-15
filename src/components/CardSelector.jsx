import { useState, useRef, useEffect } from 'react';
import { imageCategories } from '../data';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash/debounce';

const CardSelector = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCardType, setSelectedCardType] = useState(null);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');
  const [namePosition, setNamePosition] = useState({ x: 540, y: 540 });
  const [font, setFont] = useState('Cairo');
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontLanguage, setFontLanguage] = useState('arabic');
  const [activeTab, setActiveTab] = useState('RHC');
  const [fontSize, setFontSize] = useState(60);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [enableCustomization, setEnableCustomization] = useState(false);
  const canvasRef = useRef(null);
  const tabRefs = useRef([]);
  const [underlineStyle, setUnderlineStyle] = useState({ left: '0px' });

  useEffect(() => {
    const loadFonts = async () => {
      const fontPromises = [
        'Cairo',
        'Tajawal',
        'Amiri',
        'Noto Naskh Arabic',
        'Scheherazade',
        'Lateef',
        'Almarai',
        'Reem Kufi',
        'Arial',
        'Roboto',
        'Lora',
        'Playfair Display',
        'Open Sans',
        'Montserrat',
      ].map((fontName) => {
        const font = new FontFace(
          fontName,
          `url(https://fonts.googleapis.com/css2?family=${fontName.replace(
            ' ',
            '+'
          )}:wght@400;700&display=swap)`
        );
        return font
          .load()
          .then(() => document.fonts.add(font))
          .catch((err) =>
            console.warn(`Font ${fontName} failed to load:`, err)
          );
      });

      await Promise.all(fontPromises);
      setFontsLoaded(true);
      debouncedDrawPreview();
    };

    loadFonts();
  }, []);

  const selectCard = (card) => {
    const img = new Image();
    img.src = card.src;
    img.onload = () => {
      setSelectedImage(img);
      setSelectedCardType(card.type);
      if (card.type === 'whatsapp') {
        setNamePosition({ x: img.width / 2, y: img.height * 0.8 - 100 });
        setFontSize(80);
      } else {
        setNamePosition({ x: img.width / 2, y: img.height / 2 + 1200 });
        setFontSize(180);
      }
      if (!enableCustomization) {
        setColor('#ffffff');
        setFont(fontLanguage === 'arabic' ? 'Cairo' : 'Arial');
        setFontStyle('normal');
        setFontLanguage(i18n.language === 'ar' ? 'arabic' : 'english');
      }
    };
  };

  const handleTabChange = (category) => {
    setActiveTab(category);
    getUnderlinePosition(category);
  };

  const getUnderlinePosition = () => {
    const activeTabRef =
      tabRefs.current[Object.keys(imageCategories).indexOf(activeTab)];
    if (activeTabRef) {
      const { offsetLeft, offsetWidth } = activeTabRef;
      setUnderlineStyle({
        left: `${offsetLeft + offsetWidth / 2 - 30}px`,
      });
    }
  };

  const drawPreview = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedImage) return;

    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio || 1;
    const container = canvas.parentElement;
    const maxWidth = container.clientWidth;
    const aspectRatio = selectedImage.width / selectedImage.height;
    const canvasWidth = Math.min(maxWidth, selectedImage.width);
    const canvasHeight = canvasWidth / aspectRatio;

    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    ctx.scale(scale, scale);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(selectedImage, 0, 0, canvasWidth, canvasHeight);

    if (name) {
      const scaleX = canvasWidth / selectedImage.width;
      const scaleY = canvasHeight / selectedImage.height;
      ctx.font = `${fontStyle} ${fontSize * scaleX}px ${font}`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, namePosition.x * scaleX, namePosition.y * scaleY);
    }
  };

  const debouncedDrawPreview = debounce(drawPreview, 100);

  const handleCanvasClick = (e) => {
    if (!enableCustomization || !selectedImage) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;
    const scaleX = selectedImage.width / canvasWidth;
    const scaleY = selectedImage.height / canvasHeight;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setNamePosition({ x, y });
    debouncedDrawPreview();
  };

  const downloadCard = () => {
    if (!selectedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio || 1;

    // Create a temporary canvas for full resolution
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = selectedImage.width * scale;
    tempCanvas.height = selectedImage.height * scale;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.scale(scale, scale);

    tempCtx.drawImage(
      selectedImage,
      0,
      0,
      selectedImage.width,
      selectedImage.height
    );

    if (name) {
      tempCtx.font = `${fontStyle} ${fontSize}px ${font}`;
      tempCtx.fillStyle = color;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(name, namePosition.x, namePosition.y);
    }

    const link = document.createElement('a');
    link.download = 'greeting-card.png';
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const shareCard = async () => {
    if (!selectedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio || 1;

    // Create a temporary canvas for full resolution
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = selectedImage.width * scale;
    tempCanvas.height = selectedImage.height * scale;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.scale(scale, scale);

    tempCtx.drawImage(
      selectedImage,
      0,
      0,
      selectedImage.width,
      selectedImage.height
    );

    if (name) {
      tempCtx.font = `${fontStyle} ${fontSize}px ${font}`;
      tempCtx.fillStyle = color;
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(name, namePosition.x, namePosition.y);
    }

    const dataUrl = tempCanvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], 'greeting-card.png', { type: 'image/png' });

    if (navigator.share) {
      try {
        await navigator.share({
          files: [file],
          title: t('greeting_card'),
          text: t('share_message'),
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      alert(t('share_not_supported'));
    }
  };

  useEffect(() => {
    if (!selectedImage || !fontsLoaded) return;
    debouncedDrawPreview();

    const handleResize = () => debouncedDrawPreview();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      debouncedDrawPreview.cancel();
    };
  }, [
    selectedImage,
    selectedCardType,
    name,
    color,
    namePosition,
    font,
    fontStyle,
    fontSize,
    fontLanguage,
    i18n.language,
    fontsLoaded,
    enableCustomization,
  ]);

  const whatsappCards = imageCategories[activeTab]?.filter(
    (card) => card.type === 'whatsapp'
  );
  const linkedinCards = imageCategories[activeTab]?.filter(
    (card) => card.type === 'linkedin'
  );

  return (
    <div
      className="min-h-screen bg-[var(--background)] flex flex-col items-center py-4 sm:py-8 overflow-hidden"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <h1 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-4 fade-in">
        (1) {t('select_card')}
      </h1>
      <div className="flex flex-col lg:flex-row flex-1 w-full max-w-6xl px-4 sm:px-6 lg:px-0">
        <div className="w-full lg:w-1/2 p-4 overflow-y-auto flex flex-col items-center gap-4">
          <div className="w-full max-w-md mx-auto py-1 px-1 flex items-center justify-between mb-6 bg-[var(--card-bg)] text-[var(--foreground)] text-sm font-medium leading-5 rounded-lg relative overflow-x-auto">
            {Object.keys(imageCategories).map((category, index) => (
              <button
                key={category}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`border-none transition-all duration-300 cursor-pointer text-[var(--foreground)] rounded-[6px] py-1 px-4 hover:bg-[var(--card-bg)] hover:text-[var(--foreground)] hover:shadow-2xl whitespace-nowrap ${
                  activeTab === category
                    ? 'bg-[var(--card-bg)] text-[var(--foreground)] shadow-2xl scale-105'
                    : 'bg-transparent'
                }`}
                onClick={() => handleTabChange(category)}
              >
                {category}
              </button>
            ))}
            <span
              className="absolute bottom-0 h-1 bg-[#ee2e3a] transition-all duration-300"
              style={{ width: '60px', ...underlineStyle }}
            />
          </div>
          <div className="w-full flex flex-col gap-6 py-6">
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                {i18n.language === 'ar' ? 'قصة واتساب' : 'WhatsApp Story'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                {whatsappCards?.map((card, index) => (
                  <div
                    key={index}
                    className="group bg-[var(--card-bg)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer w-40 h-64 sm:w-48 sm:h-80"
                    onClick={() => selectCard(card)}
                  >
                    <img
                      src={card.src}
                      alt={`WhatsApp Card ${index + 1}`}
                      className="w-full h-full object-contain rounded-t-lg group-hover:opacity-90 transition-opacity duration-200"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                {i18n.language === 'ar' ? 'منشور لينكدإن' : 'LinkedIn Post'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                {linkedinCards?.map((card, index) => (
                  <div
                    key={index}
                    className="group bg-[var(--card-bg)] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-all duration-300 cursor-pointer w-40 h-64 sm:w-48 sm:h-80"
                    onClick={() => selectCard(card)}
                  >
                    <img
                      src={card.src}
                      alt={`LinkedIn Card ${index + 1}`}
                      className="w-full h-full object-contain rounded-t-lg group-hover:opacity-90 transition-opacity duration-200"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full max-w-md flex items-center gap-2 mb-4">
            <label className="text-sm text-[var(--foreground)] font-medium">
              {t('enable_customization')}
            </label>
            <input
              type="checkbox"
              checked={enableCustomization}
              onChange={() => setEnableCustomization(!enableCustomization)}
              className="h-4 w-4 accent-[#ee2e3a]"
            />
          </div>
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--foreground)] font-medium">
                  (2) {t('guide_name')}
                </span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('enter_name')}
                className="p-2 w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#243e87] focus:border-transparent transition-all duration-200"
              />
            </div>
            {enableCustomization && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--foreground)] font-medium">
                    {t('guide_color')}
                  </span>
                  <input
                    type="color"
                    id="colorPicker"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 bg-transparent border-none cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--foreground)] font-medium">
                    {t('font_language')}
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-[var(--foreground)]">
                      {t('arabic')}
                    </label>
                    <input
                      type="checkbox"
                      checked={fontLanguage === 'arabic'}
                      onChange={() =>
                        setFontLanguage(
                          fontLanguage === 'arabic' ? 'english' : 'arabic'
                        )
                      }
                      className="h-4 w-4 accent-[#ee2e3a]"
                    />
                    <label className="text-sm text-[var(--foreground)]">
                      {t('english')}
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--foreground)] font-medium">
                    {t('guide_font')}
                  </span>
                  {fontLanguage === 'arabic' ? (
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      className="p-1 w-full sm:w-32 bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#243e87]"
                    >
                      <option value="Cairo">Cairo</option>
                      <option value="Tajawal">Tajawal</option>
                      <option value="Amiri">Amiri</option>
                      <option value="Noto Naskh Arabic">
                        Noto Naskh Arabic
                      </option>
                      <option value="Scheherazade">Scheherazade</option>
                      <option value="Lateef">Lateef</option>
                      <option value="Almarai">Almarai</option>
                      <option value="Reem Kufi">Reem Kufi</option>
                    </select>
                  ) : (
                    <select
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                      className="p-1 w-full sm:w-32 bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#243e87]"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Lora">Lora</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Montserrat">Montserrat</option>
                    </select>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--foreground)] font-medium">
                    {t('guide_font_style')}
                  </span>
                  <select
                    value={fontStyle}
                    onChange={(e) => setFontStyle(e.target.value)}
                    className="p-1 w-full sm:w-32 bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#243e87]"
                  >
                    <option value="normal">{t('normal')}</option>
                    <option value="bold">{t('bold')}</option>
                    <option value="italic">{t('italic')}</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[var(--foreground)] font-medium">
                    {t('guide_font_size')}
                  </span>
                  <select
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="p-1 w-full sm:w-32 bg-[var(--card-bg)] border border-[var(--border)] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[#243e87]"
                  >
                    <option value="20">20px</option>
                    <option value="24">24px</option>
                    <option value="28">28px</option>
                    <option value="32">32px</option>
                    <option value="36">36px</option>
                    <option value="40">40px</option>
                    <option value="60">60px</option>
                    <option value="80">80px</option>
                    <option value="100">100px</option>
                    <option value="120">120px</option>
                    <option value="150">150px</option>
                    <option value="180">180px</option>
                    <option value="200">200px</option>
                    <option value="250">250px</option>
                    <option value="300">300px</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 flex flex-col items-center justify-center gap-4">
          {enableCustomization && (
            <span className="text-sm text-[var(--foreground)]/70">
              {i18n.language === 'ar'
                ? `(لتحديد مكان وضع الاسم على الصورة اضغط أو المس الصورة واختر المكان المناسب)`
                : '(Click or touch the image to set name position)'}
            </span>
          )}
          <canvas
            ref={canvasRef}
            className="w-full h-auto border border-[var(--border)] rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.15)] cursor-crosshair"
            onClick={enableCustomization ? handleCanvasClick : undefined}
          />
          <div className="flex gap-4">
            <button
              onClick={downloadCard}
              className="cursor-pointer px-6 py-2 bg-[#ee2e3a] text-white font-semibold rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:bg-[#ee2e3a]/80 hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 bounce-slow"
            >
              {t('save_card')}
            </button>
            <button
              onClick={shareCard}
              className="cursor-pointer px-6 py-2 bg-[#25D366] text-white font-semibold rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:bg-[#25D366]/80 hover:shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 bounce-slow"
            >
              {t('share_card')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSelector;

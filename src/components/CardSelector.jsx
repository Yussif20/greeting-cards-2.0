import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { imageCategories } from '../data';
import debounce from 'lodash/debounce';
import html2canvas from 'html2canvas';
import {
  Download,
  Share2,
  Palette,
  Type,
  ChevronsUpDown,
  Wand2,
  Check,
  Loader2,
} from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const previewRef = useRef(null);
  const namePreviewRef = useRef(null);
  const tabRefs = useRef([]);

  // Font loading
  useEffect(() => {
    setIsLoading(true);
    const loadFonts = async () => {
      try {
        const fontFamilies = [
          'Cairo',
          'Tajawal',
          'Amiri',
          'Noto Naskh Arabic',
          'Scheherazade',
          'Lateef',
          'Almarai',
          'Reem Kufi',
          'Roboto',
          'Lora',
          'Playfair Display',
          'Open Sans',
          'Montserrat',
        ];

        const head = document.head;
        fontFamilies.forEach((fontName) => {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
            /\s+/g,
            '+'
          )}:wght@400;700&display=swap`;
          head.appendChild(link);
        });

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        setFontsLoaded(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Font loading error:', err);
        setFontsLoaded(true);
        setIsLoading(false);
      }
    };

    loadFonts();
  }, []);

  // Handle tab change
  const handleTabChange = (category) => {
    setActiveTab(category);
    updateTabUnderline(category);
  };

  // Update tab underline position
  const updateTabUnderline = (category) => {
    setTimeout(() => {
      const activeIndex = Object.keys(imageCategories).indexOf(category);
      const activeTabRef = tabRefs.current[activeIndex];
      if (activeTabRef) {
        const container = activeTabRef.parentElement;
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTabRef.getBoundingClientRect();

        if (
          tabRect.left < containerRect.left ||
          tabRect.right > containerRect.right
        ) {
          const scrollLeft =
            tabRect.left +
            container.scrollLeft -
            containerRect.left -
            containerRect.width / 2 +
            tabRect.width / 2;
          container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }, 50);
  };

  // Select a card
  const selectCard = (card) => {
    setIsLoading(true);

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = card.src;

    img.onload = () => {
      setSelectedImage(img);
      setSelectedCardType(card.type);

      if (card.type === 'whatsapp') {
        setNamePosition({ x: img.width / 2, y: img.height * 0.8 - 100 });
        setFontSize(80);
      } else {
        setNamePosition({ x: img.width / 2, y: img.height / 2 + 400 });
        setFontSize(180);
      }

      if (!enableCustomization) {
        setColor('#ffffff');
        setFont(fontLanguage === 'arabic' ? 'Cairo' : 'Roboto');
        setFontStyle('normal');
      }

      setIsLoading(false);
      setTimeout(updatePreview, 100);
    };

    img.onerror = () => {
      console.error('Error loading image');
      setIsLoading(false);
    };
  };

  // Update preview with name on card
  const updatePreview = () => {
    const preview = previewRef.current;
    const namePreview = namePreviewRef.current;

    if (!preview || !namePreview || !selectedImage) return;

    preview.style.backgroundImage = `url(${selectedImage.src})`;
    preview.style.backgroundSize = 'contain';
    preview.style.backgroundPosition = 'center';
    preview.style.backgroundRepeat = 'no-repeat';

    namePreview.style.fontFamily = font;
    namePreview.style.color = color;
    namePreview.style.fontSize = `${
      fontSize * (preview.offsetWidth / selectedImage.width)
    }px`;
    namePreview.style.fontWeight = fontStyle === 'bold' ? 'bold' : 'normal';
    namePreview.style.fontStyle = fontStyle === 'italic' ? 'italic' : 'normal';

    const scaleX = preview.offsetWidth / selectedImage.width;
    const scaleY = preview.offsetHeight / selectedImage.height;

    namePreview.style.position = 'absolute';
    namePreview.style.left = `${namePosition.x * scaleX}px`;
    namePreview.style.top = `${namePosition.y * scaleY}px`;
    namePreview.style.transform = 'translate(-50%, -50%)';
    namePreview.innerText = name;
  };

  const debouncedUpdatePreview = debounce(updatePreview, 50);

  // Handle preview click to position text
  const handlePreviewClick = (e) => {
    if (!enableCustomization || !selectedImage || isDragging) return;

    const preview = previewRef.current;
    const rect = preview.getBoundingClientRect();

    const scaleX = selectedImage.width / preview.offsetWidth;
    const scaleY = selectedImage.height / preview.offsetHeight;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setNamePosition({ x, y });
    debouncedUpdatePreview();
  };

  // Mouse/touch events for text dragging
  const handleMouseDown = (e) => {
    if (!enableCustomization || !selectedImage) return;

    e.preventDefault();
    setIsDragging(true);

    const nameEl = namePreviewRef.current;
    const rect = nameEl.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !selectedImage) return;

    e.preventDefault();
    const preview = previewRef.current;
    const rect = preview.getBoundingClientRect();

    const scaleX = selectedImage.width / preview.offsetWidth;
    const scaleY = selectedImage.height / preview.offsetHeight;

    const x = (e.clientX - rect.left - dragOffset.x) * scaleX;
    const y = (e.clientY - rect.top - dragOffset.y) * scaleY;

    setNamePosition({ x, y });
    debouncedUpdatePreview();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (!enableCustomization || !selectedImage) return;

    const touch = e.touches[0];
    setIsDragging(true);

    const nameEl = namePreviewRef.current;
    const rect = nameEl.getBoundingClientRect();

    setDragOffset({
      x: touch.clientX - rect.left - rect.width / 2,
      y: touch.clientY - rect.top - rect.height / 2,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !selectedImage) return;

    const touch = e.touches[0];
    const preview = previewRef.current;
    const rect = preview.getBoundingClientRect();

    const scaleX = selectedImage.width / preview.offsetWidth;
    const scaleY = selectedImage.height / preview.offsetHeight;

    const x = (touch.clientX - rect.left - dragOffset.x) * scaleX;
    const y = (touch.clientY - rect.top - dragOffset.y) * scaleY;

    setNamePosition({ x, y });
    debouncedUpdatePreview();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Download card
  const downloadCard = async () => {
    if (!selectedImage) return;

    setActionLoading(true);

    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = selectedImage.width;
      tempCanvas.height = selectedImage.height;
      const tempCtx = tempCanvas.getContext('2d');

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
      const link = document.createElement('a');
      link.download = 'greeting-card.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Share card
  const shareCard = async () => {
    if (!selectedImage) return;

    setActionLoading(true);

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        scale: 2,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedPreview = clonedDoc.querySelector('#card-preview');
          const clonedText = clonedDoc.querySelector('#name-preview');

          if (clonedPreview && clonedText) {
            clonedPreview.style.width = `${selectedImage.width}px`;
            clonedPreview.style.height = `${selectedImage.height}px`;
            clonedText.style.left = `${namePosition.x}px`;
            clonedText.style.top = `${namePosition.y}px`;
            clonedText.style.fontSize = `${fontSize}px`;
          }
        },
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );
      const file = new File([blob], 'greeting-card.png', { type: 'image/png' });

      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: t('greeting_card'),
          text: t('share_message'),
        });
      } else {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'greeting-card.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Share failed:', err);
    } finally {
      setActionLoading(false);
    }
  };

  // Update preview on relevant state changes
  useEffect(() => {
    if (!selectedImage || !fontsLoaded) return;

    debouncedUpdatePreview();

    const handleResize = () => debouncedUpdatePreview();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      debouncedUpdatePreview.cancel();
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
    fontsLoaded,
    enableCustomization,
  ]);

  // Filter cards by type
  const whatsappCards = imageCategories[activeTab]?.filter(
    (card) => card.type === 'whatsapp'
  );
  const linkedinCards = imageCategories[activeTab]?.filter(
    (card) => card.type === 'linkedin'
  );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col"
      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <main className="flex-1 container mx-auto px-4 py-6 lg:px-8 lg:py-8 flex flex-col">
        {/* Category Tabs */}
        <div className="max-w-5xl mx-auto mb-8">
          {' '}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {' '}
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-2">
              {' '}
              1{' '}
            </span>{' '}
            {t('select_card')}{' '}
          </h2>{' '}
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm p-1 mb-4 overflow-hidden">
            {' '}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-1">
              {' '}
              <div className="flex items-center gap-2">
                {' '}
                {Object.keys(imageCategories).map((category, index) => (
                  <button
                    key={category}
                    ref={(el) => (tabRefs.current[index] = el)}
                    className={`shrink-0 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                      activeTab === category
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => handleTabChange(category)}
                  >
                    {' '}
                    {category}{' '}
                  </button>
                ))}{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
          {/* Card Selection */}
          <div className="flex flex-col">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex-1">
              <div className="space-y-6">
                {/* WhatsApp Cards */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                    {t('whatsapp_story')}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {whatsappCards?.map((card, index) => (
                      <div
                        key={`whatsapp-${index}`}
                        className={`aspect-[9/16] rounded-lg overflow-hidden shadow-md border-2 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg ${
                          selectedImage?.src === card.src
                            ? 'border-blue-500 ring-2 ring-blue-300'
                            : 'border-transparent'
                        }`}
                        onClick={() => selectCard(card)}
                      >
                        <img
                          src={card.src}
                          alt={`WhatsApp Card ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Cards */}
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">
                    {t('linkedin_post')}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {linkedinCards?.map((card, index) => (
                      <div
                        key={`linkedin-${index}`}
                        className={`aspect-video rounded-lg overflow-hidden shadow-md border-2 transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-lg ${
                          selectedImage?.src === card.src
                            ? 'border-blue-500 ring-2 ring-blue-300'
                            : 'border-transparent'
                        }`}
                        onClick={() => selectCard(card)}
                      >
                        <img
                          src={card.src}
                          alt={`LinkedIn Card ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-2">
                    2
                  </span>
                  {t('guide_name')}
                </h2>

                <div className="flex items-center">
                  <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {t('enable_customization')}
                  </label>
                  <div
                    className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${
                      enableCustomization
                        ? 'bg-blue-500 justify-end'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => setEnableCustomization(!enableCustomization)}
                  >
                    <div className="w-4 h-4 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('enter_name')}
                    className="px-4 py-3 w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-800 dark:text-white"
                  />
                </div>

                {enableCustomization && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        <Palette size={16} className="mr-1.5" />
                        {t('guide_color')}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-10 h-10 rounded-md border-none cursor-pointer appearance-none overflow-hidden"
                        />
                        <span className="ml-2 text-sm font-mono text-gray-600 dark:text-gray-400">
                          {color}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t('font_language')}
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="radio"
                            checked={fontLanguage === 'arabic'}
                            onChange={() => setFontLanguage('arabic')}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              fontLanguage === 'arabic'
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {fontLanguage === 'arabic' && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {t('arabic')}
                          </span>
                        </label>

                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="radio"
                            checked={fontLanguage === 'english'}
                            onChange={() => setFontLanguage('english')}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              fontLanguage === 'english'
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {fontLanguage === 'english' && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {t('english')}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        <Type size={16} className="mr-1.5" />
                        {t('guide_font')}
                      </label>
                      <div className="relative">
                        <select
                          value={font}
                          onChange={(e) => setFont(e.target.value)}
                          className="appearance-none w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                        >
                          {fontLanguage === 'arabic' ? (
                            <>
                              <option value="Cairo">Cairo</option>
                              <option value="Tajawal">Tajawal</option>
                              <option value="Amiri">Amiri</option>
                              <option value="Noto Naskh Arabic">
                                Noto Naskh Arabic
                              </option>
                              <option value="Scheherazade">Scheherazade</option>
                              <option value="Almarai">Almarai</option>
                              <option value="Reem Kufi">Reem Kufi</option>
                            </>
                          ) : (
                            <>
                              <option value="Roboto">Roboto</option>
                              <option value="Lora">Lora</option>
                              <option value="Playfair Display">
                                Playfair Display
                              </option>
                              <option value="Open Sans">Open Sans</option>
                              <option value="Montserrat">Montserrat</option>
                            </>
                          )}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronsUpDown size={16} className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t('guide_font_style')}
                      </label>
                      <div className="relative">
                        <select
                          value={fontStyle}
                          onChange={(e) => setFontStyle(e.target.value)}
                          className="appearance-none w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                        >
                          <option value="normal">{t('normal')}</option>
                          <option value="bold">{t('bold')}</option>
                          <option value="italic">{t('italic')}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <ChevronsUpDown size={16} className="text-gray-500" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {t('guide_font_size')}
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="20"
                          max="300"
                          step="5"
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-sm font-mono w-12 text-right text-gray-600 dark:text-gray-400">
                          {fontSize}px
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview and Actions */}
          <div className="flex flex-col">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-xl font-semibold text-gray-800 dark:text-white">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white mr-2">
                    3
                  </span>
                  {t('preview')}
                </h2>

                {enableCustomization && (
                  <div className="flex items-center text-sm text-blue-500 dark:text-blue-400">
                    <Wand2 size={16} className="mr-1" />
                    {t('position_tip')}
                  </div>
                )}
              </div>

              <div className="relative w-full flex items-center justify-center">
                {isLoading ? (
                  <div className="w-full aspect-[4/3] rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('loading_fonts')}
                      </p>
                    </div>
                  </div>
                ) : selectedImage ? (
                  <div
                    id="preview-container"
                    className="w-full flex items-center justify-center"
                  >
                    <div
                      id="card-preview"
                      ref={previewRef}
                      className={`relative rounded-lg shadow-lg bg-center bg-no-repeat bg-contain 
                        ${
                          selectedCardType === 'whatsapp'
                            ? 'aspect-[9/16]'
                            : 'aspect-[16/9]'
                        } 
                        w-full max-w-md overflow-hidden cursor-pointer`}
                      onClick={handlePreviewClick}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      <span
                        id="name-preview"
                        ref={namePreviewRef}
                        className={`absolute ${
                          enableCustomization ? 'cursor-move' : ''
                        } select-none`}
                        style={{
                          WebkitTextStroke:
                            color === '#000000' ? '0.5px white' : 'none',
                          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        {name || 'Text Preview'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-[4/3] rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                      {t('select_card')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <button
                  onClick={downloadCard}
                  disabled={!selectedImage || actionLoading}
                  className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                    !selectedImage || actionLoading
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {actionLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Download className="w-5 h-5 mr-2" />
                  )}
                  {t('save_card')}
                </button>

                <button
                  onClick={shareCard}
                  disabled={!selectedImage || actionLoading}
                  className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                    !selectedImage || actionLoading
                      ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {actionLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Share2 className="w-5 h-5 mr-2" />
                  )}
                  {t('share_card')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CardSelector;

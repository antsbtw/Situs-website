/**
 * 多页面网站 JavaScript 功能
 * 包含多语言系统、移动端菜单、表单处理等通用功能
 */

// ===== 🌍 语言管理系统 =====
let CURRENT_LANGUAGE = 'zh-CN';

/**
 * 获取翻译文本
 */
function t(key, params = {}) {
    if (!window.LANGUAGE_TEXTS || !window.LANGUAGE_TEXTS[CURRENT_LANGUAGE]) {
        console.warn(`语言包未加载: ${CURRENT_LANGUAGE}`);
        return key;
    }
    
    const keys = key.split('.');
    let value = window.LANGUAGE_TEXTS[CURRENT_LANGUAGE];
    
    for (const k of keys) {
        value = value?.[k];
        if (!value) {
            console.warn(`翻译缺失: ${key} (${CURRENT_LANGUAGE})`);
            return key;
        }
    }
    
    if (typeof value === 'string' && Object.keys(params).length > 0) {
        Object.keys(params).forEach(param => {
            value = value.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        });
    }
    
    return value;
}

/**
 * 获取公司信息
 */
function getCompanyInfo(key) {
    if (!window.COMPANY_INFO) {
        console.warn('公司配置未加载');
        return key;
    }
    
    const info = window.COMPANY_INFO;
    if (key.includes('.')) {
        const [category, field] = key.split('.');
        return info[category]?.[CURRENT_LANGUAGE]?.[field] || 
               info[category]?.[field] || 
               key;
    }
    return info[key] || key;
}

/**
 * 切换语言
 */
function switchLanguage(langCode) {
    if (!window.LANGUAGE_TEXTS || !window.LANGUAGE_TEXTS[langCode]) {
        console.error(`不支持的语言: ${langCode}`);
        return;
    }
    
    CURRENT_LANGUAGE = langCode;
    updatePageContent();
    localStorage.setItem('preferred-language', langCode);
    
    // 更新语言切换按钮状态
    updateLanguageButtons(langCode);
    
    console.log(`语言切换为: ${langCode}`);
}

/**
 * 更新语言切换按钮状态
 */
function updateLanguageButtons(activeLanguage) {
    const languageSelect = document.querySelector('.language-selector select');
    if (languageSelect) {
        languageSelect.value = activeLanguage;
    }
}

/**
 * 初始化语言系统
 */
function initializeLanguage() {
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 优先级：保存的语言 > 浏览器语言 > 默认中文
    if (savedLang && window.LANGUAGE_TEXTS && window.LANGUAGE_TEXTS[savedLang]) {
        CURRENT_LANGUAGE = savedLang;
        console.log(`🔄 恢复保存的语言: ${savedLang}`);
    } else if (window.LANGUAGE_TEXTS && window.LANGUAGE_TEXTS[browserLang]) {
        CURRENT_LANGUAGE = browserLang;
        console.log(`🌐 使用浏览器语言: ${browserLang}`);
    } else {
        CURRENT_LANGUAGE = 'zh-CN';
        console.log(`📚 使用默认语言: zh-CN`);
    }
    
    console.log(`语言系统初始化: ${CURRENT_LANGUAGE}`);
}

// ===== 📝 文本映射配置 =====
const TEXT_MAPPINGS = {
    // 基础信息
    "company-name": () => getCompanyInfo('brand.name'),
    
    // 导航
    "nav-home": () => t('navigation.home'),
    "nav-about": () => t('navigation.about'),
    "nav-products": () => t('navigation.products'),
    "nav-manual": () => t('navigation.manual'),
    "nav-contact": () => t('navigation.contact'),
    
    // 首页内容
    "welcome-title": () => t('homepage.welcomeTitle'),
    "company-slogan": () => t('homepage.slogan'),
    "learn-more-btn": () => t('homepage.learnMoreBtn'),
    "our-advantages": () => t('homepage.ourAdvantages'),
    
    // 公司优势
    "advantage-innovation-title": () => t('homepage.advantages.innovation.title'),
    "advantage-innovation-desc": () => t('homepage.advantages.innovation.description'),
    "advantage-security-title": () => t('homepage.advantages.security.title'),
    "advantage-security-desc": () => t('homepage.advantages.security.description'),
    "advantage-customization-title": () => t('homepage.advantages.customization.title'),
    "advantage-customization-desc": () => t('homepage.advantages.customization.description'),
    
    // 关于我们页面 - 修正路径
    "about-page-title": () => t('aboutPage.title'),
    "about-company-intro-title": () => t('aboutPage.companyIntroTitle'),
    "about-company-intro": () => t('aboutPage.companyIntro'),
    "about-vision-title": () => t('aboutPage.visionTitle'),
    "about-vision": () => t('aboutPage.vision'),
    "about-values-title": () => t('aboutPage.valuesTitle'),
    "about-value-1": () => t('aboutPage.values.0'),  // 修正：使用数组索引
    "about-value-2": () => t('aboutPage.values.1'),
    "about-value-3": () => t('aboutPage.values.2'),
    "about-value-4": () => t('aboutPage.values.3'),
    "about-company-photo": () => t('aboutPage.companyPhoto'),
    
    // 产品页面
    "products-page-title": () => t('productsPage.title'),
    
    // 使用手册页面 - 修正路径
    "manual-page-title": () => t('manualPage.title'),
    "manual-quick-start": () => t('manualPage.quickStart'),
    "manual-step-1-title": () => t('manualPage.steps.step1.title'),  // 修正路径
    "manual-step-1-desc": () => t('manualPage.steps.step1.description'),  // 修正路径
    "manual-step-2-title": () => t('manualPage.steps.step2.title'),
    "manual-step-2-desc": () => t('manualPage.steps.step2.description'),
    "manual-step-3-title": () => t('manualPage.steps.step3.title'),
    "manual-step-3-desc": () => t('manualPage.steps.step3.description'),
    "manual-features-title": () => t('manualPage.featuresTitle'),
    "manual-main-features": () => t('manualPage.mainFeatures'),
    "manual-feature-a": () => t('manualPage.features.featureA'),  // 修正路径
    "manual-feature-b": () => t('manualPage.features.featureB'),
    "manual-feature-c": () => t('manualPage.features.featureC'),
    "manual-faq-title": () => t('manualPage.faqTitle'),
    "manual-faq-1-q": () => t('manualPage.faqs.faq1.question'),  // 修正路径
    "manual-faq-1-a": () => t('manualPage.faqs.faq1.answer'),
    "manual-faq-2-q": () => t('manualPage.faqs.faq2.question'),
    "manual-faq-2-a": () => t('manualPage.faqs.faq2.answer'),
    
    // 联系我们页面 - 修正路径
    "contact-page-title": () => t('contactPage.title'),
    "contact-form-name": () => t('contactPage.form.name'),  // 修正路径
    "contact-form-email": () => t('contactPage.form.email'),
    "contact-form-subject": () => t('contactPage.form.subject'),
    "contact-form-message": () => t('contactPage.form.message'),
    "contact-form-submit": () => t('contactPage.form.submitBtn'),  // 修正路径
    "contact-other-methods": () => t('contactPage.otherMethods'),
    "contact-email-label": () => t('contactPage.emailLabel'),
    "contact-phone-label": () => t('contactPage.phoneLabel'),
    "contact-address-label": () => t('contactPage.addressLabel'),
    
    // 联系信息
    "company-email": () => getCompanyInfo('contacts.email'),
    "company-phone": () => getCompanyInfo('contacts.phone'),
    "company-address": () => getCompanyInfo('contacts.address'),

    // 页脚
    "footer-quick-links": () => t('footer.quickLinks'),
    "footer-contact-info": () => t('footer.contactInfo'),
    "footer-follow-us": () => t('footer.followUs'),
    "footer-social-media": () => t('footer.socialMedia'),

    // OBox产品相关
    "obox-name": () => t('oboxMyCloud.name'),
    "obox-tagline": () => t('oboxMyCloud.tagline'),
    "obox-description": () => t('oboxMyCloud.description'),
    "obox-learn-more": () => t('common.buttons.learnMore'),  // 修正：使用通用按钮文本
    "obox-download-now": () => t('oboxMyCloud.downloadNow'),
    
    // OBox产品页面的完整映射
    "obox-watch-demo": () => t('oboxMyCloud.watchDemo'),
    "obox-why-choose": () => t('oboxMyCloud.whyChoose'),
    "obox-feature-setup-title": () => t('oboxMyCloud.featureSetupTitle'),
    "obox-feature-setup-desc": () => t('oboxMyCloud.featureSetupDesc'),
    "obox-feature-privacy-title": () => t('oboxMyCloud.featurePrivacyTitle'),
    "obox-feature-privacy-desc": () => t('oboxMyCloud.featurePrivacyDesc'),
    "obox-feature-global-title": () => t('oboxMyCloud.featureGlobalTitle'),
    "obox-feature-global-desc": () => t('oboxMyCloud.featureGlobalDesc'),
    "obox-feature-management-title": () => t('oboxMyCloud.featureManagementTitle'),
    "obox-feature-management-desc": () => t('oboxMyCloud.featureManagementDesc'),
    "obox-app-screenshots": () => t('oboxMyCloud.appScreenshots'),
    "obox-screenshot1-title": () => t('oboxMyCloud.screenshot1Title'),
    "obox-screenshot1-desc": () => t('oboxMyCloud.screenshot1Desc'),
    "obox-screenshot2-title": () => t('oboxMyCloud.screenshot2Title'),
    "obox-screenshot2-desc": () => t('oboxMyCloud.screenshot2Desc'),
    "obox-screenshot3-title": () => t('oboxMyCloud.screenshot3Title'),
    "obox-screenshot3-desc": () => t('oboxMyCloud.screenshot3Desc'),
    "obox-video-demo-title": () => t('oboxMyCloud.videoDemoTitle'),
    "obox-video-demo-desc": () => t('oboxMyCloud.videoDemoDesc'),
    "obox-key-features": () => t('oboxMyCloud.keyFeatures'),
    "obox-tech-cloud-title": () => t('oboxMyCloud.techCloudTitle'),
    "obox-tech-digitalocean": () => t('oboxMyCloud.techDigitalocean'),
    "obox-tech-google": () => t('oboxMyCloud.techGoogle'),
    "obox-tech-aws": () => t('oboxMyCloud.techAws'),
    "obox-tech-more": () => t('oboxMyCloud.techMore'),
    "obox-tech-clients-title": () => t('oboxMyCloud.techClientsTitle'),
    "obox-tech-outline": () => t('oboxMyCloud.techOutline'),
    "obox-tech-myvpn": () => t('oboxMyCloud.techMyvpn'),
    "obox-tech-singbox": () => t('oboxMyCloud.techSingbox'),
    "obox-tech-automatic": () => t('oboxMyCloud.techAutomatic'),
    "obox-tech-management-title": () => t('oboxMyCloud.techManagementTitle'),
    "obox-tech-limits": () => t('oboxMyCloud.techLimits'),
    "obox-tech-time": () => t('oboxMyCloud.techTime'),
    "obox-tech-share": () => t('oboxMyCloud.techShare'),
    "obox-tech-monitor": () => t('oboxMyCloud.techMonitor'),
    "obox-tech-security-title": () => t('oboxMyCloud.techSecurityTitle'),
    "obox-tech-encryption": () => t('oboxMyCloud.techEncryption'),
    "obox-tech-control": () => t('oboxMyCloud.techControl'),
    "obox-tech-logs": () => t('oboxMyCloud.techLogs'),
    "obox-tech-privacy": () => t('oboxMyCloud.techPrivacy'),
    "obox-target-audience": () => t('oboxMyCloud.targetAudience'),
    "obox-audience-individuals-title": () => t('oboxMyCloud.audienceIndividualsTitle'),
    "obox-audience-individuals-desc": () => t('oboxMyCloud.audienceIndividualsDesc'),
    "obox-audience-teams-title": () => t('oboxMyCloud.audienceTeamsTitle'),
    "obox-audience-teams-desc": () => t('oboxMyCloud.audienceTeamsDesc'),
    "obox-audience-families-title": () => t('oboxMyCloud.audienceFamiliesTitle'),
    "obox-audience-families-desc": () => t('oboxMyCloud.audienceFamiliesDesc'),
    "obox-get-started": () => t('oboxMyCloud.getStarted'),
    "obox-download-desc": () => t('oboxMyCloud.downloadDesc'),
    "obox-app-store": () => t('oboxMyCloud.appStore'),
    "obox-google-play": () => t('oboxMyCloud.googlePlay'),
    "obox-direct-download": () => t('oboxMyCloud.directDownload'),
    "obox-contact-support": () => t('oboxMyCloud.contactSupport'),
    
    // 通用导航和按钮
    "back-to-home": () => t('common.backToHome'),
    "back-to-products": () => t('backToProducts'),
    
    // 通用
    "copyright": () => `© ${getCompanyInfo('foundedYear')} ${getCompanyInfo('brand.name')}. ${t('common.copyright')}.`
};

// ===== 🔄 页面内容更新函数 =====
/**
 * 更新页面中所有使用变量的内容
 */
function updatePageContent() {
    // 更新页面标题和meta信息
    updatePageMeta();
    
    // 更新页面中所有标记的文本
    Object.keys(TEXT_MAPPINGS).forEach(key => {
        const elements = document.querySelectorAll(`[data-text="${key}"]`);
        elements.forEach(element => {
            try {
                const textValue = TEXT_MAPPINGS[key]();
                element.textContent = textValue;
            } catch (error) {
                console.warn(`更新文本失败: ${key}`, error);
                element.textContent = key;
            }
        });
    });
    
    // 更新语言切换按钮状态
    updateLanguageButtons(CURRENT_LANGUAGE);
    
    console.log(`页面内容已更新为: ${getCompanyInfo('brand.name')} (${CURRENT_LANGUAGE})`);
}

/**
 * 更新页面meta信息
 */
function updatePageMeta() {
    // 获取当前页面名称
    const currentPage = getCurrentPageName();
    
    // 更新页面标题
    const pageTitle = getPageTitle(currentPage);
    document.title = pageTitle;
    
    // 更新meta描述
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = `${getCompanyInfo('brand.name')} - ${getCompanyInfo('seo.description')}`;
    }
    
    // 更新meta关键词
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
        metaKeywords.content = getCompanyInfo('seo.keywords');
    }
}

/**
 * 获取当前页面名称
 */
function getCurrentPageName() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename === 'index.html' || filename === '') {
        return 'home';
    } else if (filename === 'about.html') {
        return 'about';
    } else if (filename === 'products.html') {
        return 'products';
    } else if (filename === 'manual.html') {
        return 'manual';
    } else if (filename === 'contact.html') {
        return 'contact';
    } else if (filename === 'obox-mycloud.html') {
        return 'obox-product';
    }
    
    return 'home';
}

/**
 * 根据页面获取页面标题
 */
function getPageTitle(pageName) {
    const titleMap = {
        'home': `${getCompanyInfo('brand.name')} - ${getCompanyInfo('seo.description')}`,
        'about': `${t('pageTitles.about')} - ${getCompanyInfo('brand.name')}`,
        'products': `${t('pageTitles.products')} - ${getCompanyInfo('brand.name')}`,
        'manual': `${t('pageTitles.manual')} - ${getCompanyInfo('brand.name')}`,
        'contact': `${t('pageTitles.contact')} - ${getCompanyInfo('brand.name')}`,
        'obox-product': `${t('oboxMyCloud.name')} - ${getCompanyInfo('brand.name')}`
    };
    
    return titleMap[pageName] || getCompanyInfo('brand.name');
}

// ===== 🚀 网站初始化函数 =====
/**
 * 网站初始化函数（多页面版本）
 */
function initializeWebsite() {
    // 1. 初始化语言系统
    initializeLanguage();
    
    // 2. 更新页面内容
    updatePageContent();
    
    // 3. 初始化通用功能
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollEffects();
    // 注意：移除了 initializePageNavigation()，因为是多页面架构
    
    console.log('网站初始化完成 - 多页面版本');
}

// ===== 📱 移动端菜单功能 =====
/**
 * 初始化移动端菜单
 */
function initializeMobileMenu() {
    // 等待组件加载完成
    setTimeout(() => {
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', function() {
                toggleMobileMenu();
            });
            
            // 点击页面其他地方关闭菜单
            document.addEventListener('click', function(e) {
                if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    closeMobileMenu();
                }
            });
        }
    }, 400);
}

/**
 * 切换移动端菜单显示状态
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks) {
        navLinks.classList.toggle('show');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.textContent = navLinks.classList.contains('show') ? '✕' : '☰';
        }
    }
}

/**
 * 关闭移动端菜单
 */
function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.textContent = '☰';
        }
    }
}

// ===== 📧 联系表单处理 =====
/**
 * 初始化联系表单
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', validateFormField);
            field.addEventListener('input', clearFieldError);
        });
    }
}

/**
 * 处理联系表单提交
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    if (!validateContactForm(form)) {
        showMessage(t('form.validation.required'), 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = t('form.submitting');
    submitBtn.disabled = true;
    
    setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showMessage(t('form.success'), 'success');
        console.log('表单提交成功:', Object.fromEntries(formData));
    }, 2000);
}

/**
 * 验证联系表单
 */
function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateFormField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * 验证单个表单字段
 */
function validateFormField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        errorMessage = t('form.validation.required');
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = t('form.validation.email');
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError({ target: field });
    }
    
    return isValid;
}

/**
 * 显示字段错误信息
 */
function showFieldError(field, message) {
    clearFieldError({ target: field });
    
    field.style.borderColor = '#e74c3c';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

/**
 * 清除字段错误信息
 */
function clearFieldError(e) {
    const field = e.target;
    
    field.style.borderColor = '#ddd';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== 💬 消息提示功能 =====
/**
 * 显示消息提示
 */
function showMessage(message, type = 'info') {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message-toast message-${type}`;
    messageContainer.textContent = message;
    
    Object.assign(messageContainer.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '5px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease',
        maxWidth: '300px'
    });
    
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    messageContainer.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(messageContainer);
    
    setTimeout(() => {
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        messageContainer.style.opacity = '0';
        messageContainer.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (messageContainer.parentNode) {
                messageContainer.parentNode.removeChild(messageContainer);
            }
        }, 300);
    }, 4000);
}

// ===== 📜 滚动效果 =====
/**
 * 初始化滚动效果
 */
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        
        if (header) {
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, 100));
    
    const header = document.querySelector('header');
    if (header) {
        header.style.transition = 'transform 0.3s ease';
    }
}

// ===== 🛠️ 工具函数 =====
/**
 * 节流函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== 🌐 全局函数导出 =====
window.switchLanguage = switchLanguage;

// ===== 🎯 页面加载完成后执行初始化 =====
document.addEventListener('DOMContentLoaded', initializeWebsite);
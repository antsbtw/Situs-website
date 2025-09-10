/**
 * 公司网站主要JavaScript功能
 * 包含多语言系统、页面切换、表单处理、移动端菜单等功能
 */

// ===== 🌍 语言管理系统 =====
let CURRENT_LANGUAGE = 'zh-CN';  // 默认英文

/**
 * 获取翻译文本
 * @param {string} key - 翻译键路径，支持点分隔（如 'homepage.welcomeTitle'）
 * @param {Object} params - 替换参数（可选）
 * @returns {string} 翻译后的文本
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
    
    // 处理参数替换（如果需要）
    if (typeof value === 'string' && Object.keys(params).length > 0) {
        Object.keys(params).forEach(param => {
            value = value.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
        });
    }
    
    return value;
}

/**
 * 获取公司信息
 * @param {string} key - 信息键路径，支持点分隔（如 'brand.name'）
 * @returns {string|number} 公司信息
 */
function getCompanyInfo(key) {
    if (!window.COMPANY_INFO) {
        console.warn('公司配置未加载');
        return key;
    }
    
    const info = window.COMPANY_INFO;
    if (key.includes('.')) {
        const [category, field] = key.split('.');
        // 优先返回当前语言的版本，如果没有则返回通用版本
        return info[category]?.[CURRENT_LANGUAGE]?.[field] || 
               info[category]?.[field] || 
               key;
    }
    return info[key] || key;
}

/**
 * 切换语言
 * @param {string} langCode - 语言代码（如 'zh-CN', 'en-US'）
 */
function switchLanguage(langCode) {
    if (!window.LANGUAGE_TEXTS || !window.LANGUAGE_TEXTS[langCode]) {
        console.error(`不支持的语言: ${langCode}`);
        return;
    }
    
    CURRENT_LANGUAGE = langCode;
    updatePageContent();
    localStorage.setItem('preferred-language', langCode);
    
    // 更新语言切换按钮的激活状态
    updateLanguageButtons(langCode);
    
    console.log(`语言切换为: ${langCode}`);
}

/**
 * 更新语言切换按钮状态
 * @param {string} activeLanguage - 当前激活的语言
 */
function updateLanguageButtons(activeLanguage) {
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        if (buttonLang === activeLanguage) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * 初始化语言系统
 */
function initializeLanguage() {
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 优先级：保存的语言 > 浏览器语言 > 默认英文
    if (savedLang && window.LANGUAGE_TEXTS && window.LANGUAGE_TEXTS[savedLang]) {
        CURRENT_LANGUAGE = savedLang;
    } else if (window.LANGUAGE_TEXTS && window.LANGUAGE_TEXTS[browserLang]) {
        CURRENT_LANGUAGE = browserLang;
    } else {
        CURRENT_LANGUAGE = 'zh-CN'; // 默认英文
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
    
    // 联系信息
    "company-email": () => getCompanyInfo('contacts.email'),
    "company-phone": () => getCompanyInfo('contacts.phone'),
    "company-address": () => getCompanyInfo('contacts.address'),

    // ✅ 新增：页脚映射
    "footer-quick-links": () => t('footer.quickLinks'),
    "footer-contact-info": () => t('footer.contactInfo'),
    "footer-follow-us": () => t('footer.followUs'),
    "footer-social-media": () => t('footer.socialMedia'),
    "contact-email-label": () => t('contactPage.emailLabel'),
    "contact-phone-label": () => t('contactPage.phoneLabel'),

    // OBox产品页面映射 - 添加到现有的TEXT_MAPPINGS中
"obox-name": () => t('oboxMyCloud.name'),
"obox-tagline": () => t('oboxMyCloud.tagline'),
"obox-description": () => t('oboxMyCloud.description'),
"obox-download-now": () => t('oboxMyCloud.downloadNow'),
"obox-watch-demo": () => t('oboxMyCloud.watchDemo'),
"obox-why-choose": () => t('oboxMyCloud.whyChoose'),

// 功能特点
"obox-feature-setup-title": () => t('oboxMyCloud.featureSetupTitle'),
"obox-feature-setup-desc": () => t('oboxMyCloud.featureSetupDesc'),
"obox-feature-privacy-title": () => t('oboxMyCloud.featurePrivacyTitle'),
"obox-feature-privacy-desc": () => t('oboxMyCloud.featurePrivacyDesc'),
"obox-feature-global-title": () => t('oboxMyCloud.featureGlobalTitle'),
"obox-feature-global-desc": () => t('oboxMyCloud.featureGlobalDesc'),
"obox-feature-management-title": () => t('oboxMyCloud.featureManagementTitle'),
"obox-feature-management-desc": () => t('oboxMyCloud.featureManagementDesc'),

// 截图说明
"obox-app-screenshots": () => t('oboxMyCloud.appScreenshots'),
"obox-screenshot1-title": () => t('oboxMyCloud.screenshot1Title'),
"obox-screenshot1-desc": () => t('oboxMyCloud.screenshot1Desc'),
"obox-screenshot2-title": () => t('oboxMyCloud.screenshot2Title'),
"obox-screenshot2-desc": () => t('oboxMyCloud.screenshot2Desc'),
"obox-screenshot3-title": () => t('oboxMyCloud.screenshot3Title'),
"obox-screenshot3-desc": () => t('oboxMyCloud.screenshot3Desc'),

// 视频演示
"obox-video-demo-title": () => t('oboxMyCloud.videoDemoTitle'),
"obox-video-demo-desc": () => t('oboxMyCloud.videoDemoDesc'),

// 技术功能
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

// 适用人群
"obox-target-audience": () => t('oboxMyCloud.targetAudience'),
"obox-audience-individuals-title": () => t('oboxMyCloud.audienceIndividualsTitle'),
"obox-audience-individuals-desc": () => t('oboxMyCloud.audienceIndividualsDesc'),
"obox-audience-teams-title": () => t('oboxMyCloud.audienceTeamsTitle'),
"obox-audience-teams-desc": () => t('oboxMyCloud.audienceTeamsDesc'),
"obox-audience-families-title": () => t('oboxMyCloud.audienceFamiliesTitle'),
"obox-audience-families-desc": () => t('oboxMyCloud.audienceFamiliesDesc'),

// 下载区域
"obox-get-started": () => t('oboxMyCloud.getStarted'),
"obox-download-desc": () => t('oboxMyCloud.downloadDesc'),
"obox-app-store": () => t('oboxMyCloud.appStore'),
"obox-google-play": () => t('oboxMyCloud.googlePlay'),
"obox-direct-download": () => t('oboxMyCloud.directDownload'),
"obox-contact-support": () => t('oboxMyCloud.contactSupport'),

// 通用导航
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
    
    // 更新页面中所有标记的文本（使用新的TEXT_MAPPINGS）
    Object.keys(TEXT_MAPPINGS).forEach(key => {
        const elements = document.querySelectorAll(`[data-text="${key}"]`);
        elements.forEach(element => {
            try {
                const textValue = TEXT_MAPPINGS[key]();
                element.textContent = textValue;
            } catch (error) {
                console.warn(`更新文本失败: ${key}`, error);
                element.textContent = key; // 降级显示key本身
            }
        });
    });
    
    // 更新语言切换按钮状态
    updateLanguageButtons(CURRENT_LANGUAGE);
    
    console.log(`📝 页面内容已更新为: ${getCompanyInfo('brand.name')} (${CURRENT_LANGUAGE})`);
}

/**
 * 更新页面meta信息
 */
function updatePageMeta() {
    // 更新页面标题
    document.title = `${getCompanyInfo('brand.name')} - ${getCompanyInfo('seo.description')}`;
    
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

// ===== 🚀 网站初始化函数 =====
/**
 * 网站初始化函数
 */
function initializeWebsite() {
    // 1. 初始化语言系统
    initializeLanguage();
    
    // 2. 更新页面内容
    updatePageContent();
    
    // 3. 初始化其他功能
    initializeMobileMenu();
    initializeContactForm();
    initializeScrollEffects();
    initializePageNavigation();
    initializeLanguageSwitcher();
    
    console.log('🚀 网站初始化完成');
}

/**
 * 初始化语言切换器
 */
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const langCode = this.getAttribute('data-lang');
            switchLanguage(langCode);
        });
    });
}

// ===== 📱 页面切换功能 =====
/**
 * 显示指定页面，隐藏其他页面
 * @param {string} pageId - 要显示的页面ID
 */
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示选中的页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 滚动到页面顶部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // 更新页面标题
        updatePageTitle(pageId);
        
        // 关闭移动端菜单（如果打开）
        closeMobileMenu();
        
        console.log(`切换到页面: ${pageId}`);
    } else {
        console.error(`页面不存在: ${pageId}`);
    }
}

/**
 * 根据页面ID更新页面标题
 * @param {string} pageId - 页面ID
 */
function updatePageTitle(pageId) {
    const titleMap = {
        'home': `${getCompanyInfo('brand.name')} - ${getCompanyInfo('seo.description')}`,
        'about': `${t('pageTitles.about')} - ${getCompanyInfo('brand.name')}`,
        'products': `${t('pageTitles.products')} - ${getCompanyInfo('brand.name')}`,
        'manual': `${t('pageTitles.manual')} - ${getCompanyInfo('brand.name')}`,
        'contact': `${t('pageTitles.contact')} - ${getCompanyInfo('brand.name')}`
    };
    
    const newTitle = titleMap[pageId] || getCompanyInfo('brand.name');
    document.title = newTitle;
}

/**
 * 初始化页面导航功能
 */
function initializePageNavigation() {
    // 1. 移除所有可能存在的onclick属性，避免重复绑定
    document.querySelectorAll('nav a').forEach(link => {
        link.removeAttribute('onclick');
    });
    
    // 2. 重新绑定导航事件（使用事件委托，避免重复绑定）
    const navContainer = document.querySelector('nav');
    if (navContainer) {
        // 移除可能存在的旧事件监听器
        navContainer.removeEventListener('click', handleNavClick);
        
        // 添加新的事件监听器
        navContainer.addEventListener('click', handleNavClick);
    }
    
    // 3. 检查URL哈希，如果有则切换到对应页面
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
    
    // 4. 监听浏览器前进后退按钮
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });
}

/**
 * 处理导航点击事件
 * @param {Event} e - 点击事件
 */
function handleNavClick(e) {
    const target = e.target;
    
    // 只处理导航链接
    if (target.tagName === 'A' && target.getAttribute('href') === '#') {
        e.preventDefault();
        
        // 根据data-text属性确定页面
        const dataText = target.getAttribute('data-text');
        let pageId = '';
        
        switch(dataText) {
            case 'nav-home': pageId = 'home'; break;
            case 'nav-about': pageId = 'about'; break;
            case 'nav-products': pageId = 'products'; break;
            case 'nav-manual': pageId = 'manual'; break;
            case 'nav-contact': pageId = 'contact'; break;
        }
        
        if (pageId) {
            console.log('🔗 导航点击:', pageId);
            showPage(pageId);
            
            // 更新URL哈希（不触发页面跳转）
            history.pushState(null, null, `#${pageId}`);
        }
    }
}

// ===== 📱 移动端菜单功能 =====
/**
 * 初始化移动端菜单
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        // 点击菜单按钮切换菜单显示
        mobileMenuBtn.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // 点击菜单项后关闭菜单
        const menuItems = navLinks.querySelectorAll('a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
}

/**
 * 切换移动端菜单显示状态
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks) {
        navLinks.classList.toggle('show');
        
        // 更新菜单按钮图标
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
        
        // 恢复菜单按钮图标
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
        
        // 为表单字段添加实时验证
        const formFields = contactForm.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', validateFormField);
            field.addEventListener('input', clearFieldError);
        });
    }
}

/**
 * 处理联系表单提交
 * @param {Event} e - 表单提交事件
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // 验证表单
    if (!validateContactForm(form)) {
        showMessage(t('form.validation.required'), 'error');
        return;
    }
    
    // 显示提交中状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = t('form.submitting');
    submitBtn.disabled = true;
    
    // 模拟表单提交（实际项目中这里应该发送到服务器）
    setTimeout(() => {
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 显示成功消息
        showMessage(t('form.success'), 'success');
        
        console.log('表单提交成功:', Object.fromEntries(formData));
    }, 2000);
}

/**
 * 验证联系表单
 * @param {HTMLFormElement} form - 表单元素
 * @returns {boolean} 验证是否通过
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
 * @param {Event} e - 字段事件
 * @returns {boolean} 字段是否有效
 */
function validateFormField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // 检查必填字段
    if (field.hasAttribute('required') && !value) {
        errorMessage = t('form.validation.required');
        isValid = false;
    }
    
    // 验证邮箱格式
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = t('form.validation.email');
            isValid = false;
        }
    }
    
    // 显示或清除错误信息
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError({ target: field });
    }
    
    return isValid;
}

/**
 * 显示字段错误信息
 * @param {HTMLElement} field - 字段元素
 * @param {string} message - 错误信息
 */
function showFieldError(field, message) {
    // 移除现有错误样式和信息
    clearFieldError({ target: field });
    
    // 添加错误样式
    field.style.borderColor = '#e74c3c';
    
    // 创建错误信息元素
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    // 插入错误信息
    field.parentNode.appendChild(errorElement);
}

/**
 * 清除字段错误信息
 * @param {Event} e - 字段事件
 */
function clearFieldError(e) {
    const field = e.target;
    
    // 恢复边框颜色
    field.style.borderColor = '#ddd';
    
    // 移除错误信息
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== 💬 消息提示功能 =====
/**
 * 显示消息提示
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 ('success', 'error', 'info')
 */
function showMessage(message, type = 'info') {
    // 创建消息容器
    const messageContainer = document.createElement('div');
    messageContainer.className = `message-toast message-${type}`;
    messageContainer.textContent = message;
    
    // 设置样式
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
    
    // 设置背景颜色
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    messageContainer.style.backgroundColor = colors[type] || colors.info;
    
    // 添加到页面
    document.body.appendChild(messageContainer);
    
    // 显示动画
    setTimeout(() => {
        messageContainer.style.opacity = '1';
        messageContainer.style.transform = 'translateY(0)';
    }, 100);
    
    // 自动移除
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
    // 导航栏滚动效果
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', throttle(function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        
        if (header) {
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // 向下滚动，隐藏导航栏
                header.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动，显示导航栏
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, 100));
    
    // 为header添加transition
    const header = document.querySelector('header');
    if (header) {
        header.style.transition = 'transform 0.3s ease';
    }
}

// ===== 🛠️ 工具函数 =====
/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Function} 节流后的函数
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

// ===== 🌐 全局函数导出（供HTML调用） =====
window.showPage = showPage;
window.switchLanguage = switchLanguage;

// ===== 🐛 开发调试功能 =====
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🚀 开发模式已启用');
    
    // 添加一些开发者工具
    window.debugWebsite = {
        showPage: showPage,
        switchLanguage: switchLanguage,
        showMessage: showMessage,
        toggleMobileMenu: toggleMobileMenu,
        currentLanguage: () => CURRENT_LANGUAGE,
        availableLanguages: () => window.LANGUAGE_TEXTS ? Object.keys(window.LANGUAGE_TEXTS) : [],
        t: t,
        getCompanyInfo: getCompanyInfo
    };
}

// ===== ⚠️ 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('网站运行错误:', e.error);
    // 在生产环境中，这里可以发送错误报告到服务器
});

// ===== 📊 页面性能监控 =====
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    console.log(`📊 页面加载完成，耗时: ${loadTime}ms`);
});

// ===== 🎯 页面加载完成后执行初始化 =====
document.addEventListener('DOMContentLoaded', initializeWebsite);
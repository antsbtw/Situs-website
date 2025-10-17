/**
 * 简化的多语言网站 JavaScript 系统
 * 支持扁平化键名的翻译系统
 */

// ===== 🌍 简化的语言管理系统 =====
let CURRENT_LANGUAGE = 'zh-CN';

/**
 * 获取翻译文本（扁平化键名版本）
 */
function getText(key) {
    if (!window.LANGUAGE_TEXTS || !window.LANGUAGE_TEXTS[CURRENT_LANGUAGE]) {
        return key;
    }
    
    const texts = window.LANGUAGE_TEXTS[CURRENT_LANGUAGE];
    return texts[key] || key;
}

/**
 * 切换语言
 */
function switchLanguage(langCode) {
    if (!window.LANGUAGE_TEXTS || !window.LANGUAGE_TEXTS[langCode]) {
        return;
    }
    
    CURRENT_LANGUAGE = langCode;
    applyTranslations();
    localStorage.setItem('preferred-language', langCode);
    updateLanguageSelector(langCode);
}

/**
 * 应用翻译到页面
 */
function applyTranslations() {
    const texts = window.LANGUAGE_TEXTS[CURRENT_LANGUAGE];
    if (!texts) return;
    
    // 更新页面标题
    const titleElement = document.querySelector('title[data-text]');
    if (titleElement) {
        const titleKey = titleElement.getAttribute('data-text');
        if (texts[titleKey]) {
            document.title = texts[titleKey];
        }
    }
    
    // 更新所有带有 data-text 属性的元素
    const elementsWithText = document.querySelectorAll('[data-text]');
    
    elementsWithText.forEach(element => {
        const textKey = element.getAttribute('data-text');
        
        if (texts[textKey]) {
            // 检查元素类型，决定更新哪个属性
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email')) {
                element.placeholder = texts[textKey];
            } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = texts[textKey];
            } else if (element.tagName === 'IMG') {
                element.alt = texts[textKey];
            } else {
                // 对于大部分元素，更新 textContent 或 innerHTML
                if (texts[textKey].includes('<') && texts[textKey].includes('>')) {
                    element.innerHTML = texts[textKey];
                } else {
                    element.textContent = texts[textKey];
                }
            }
        }
    });
}

/**
 * 更新语言选择器显示
 */
function updateLanguageSelector(langCode) {
    const langButton = document.querySelector('.lang-btn');
    
    if (langButton) {
        const langNames = {
            'zh-CN': '中文',
            'en-US': 'English'
        };
        langButton.textContent = langNames[langCode] || langCode;
    }
    
    const langSelector = document.querySelector('.language-selector select');
    if (langSelector) {
        langSelector.value = langCode;
    }
    
    document.documentElement.lang = langCode;
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
    } else if (window.LANGUAGE_TEXTS && window.LANGUAGE_TEXTS[browserLang]) {
        CURRENT_LANGUAGE = browserLang;
    } else {
        CURRENT_LANGUAGE = 'zh-CN';
    }
}

/**
 * Provider Tab 切换功能
 */
function showProvider(providerId) {
    // 隐藏所有provider内容
    const allProviderContent = document.querySelectorAll('.provider-content');
    allProviderContent.forEach(content => {
        content.style.display = 'none';
    });
    
    // 移除所有活跃状态
    const allProviderTabs = document.querySelectorAll('.provider-tab');
    allProviderTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 显示选中的provider内容
    const selectedContent = document.getElementById(providerId + '-setup');
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }
    
    // 添加活跃状态到选中的tab
    const selectedTab = document.querySelector(`.provider-tab[onclick="showProvider('${providerId}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

// ===== 📱 移动端菜单功能 =====
/**
 * 初始化移动端菜单
 */
function initializeMobileMenu() {
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInitialize = () => {
        attempts++;
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            // 移除可能存在的旧事件监听器
            const newBtn = mobileMenuBtn.cloneNode(true);
            mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
            
            // 添加点击事件
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
            });
            
            // 点击导航链接关闭菜单
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
            
            // 点击页面其他地方关闭菜单
            document.addEventListener('click', function(e) {
                if (!newBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    if (navLinks.classList.contains('show')) {
                        closeMobileMenu();
                    }
                }
            });
            
            return true;
        } else {
            if (attempts < maxAttempts) {
                setTimeout(tryInitialize, 200);
            }
            return false;
        }
    };
    
    tryInitialize();
}

/**
 * 切换移动端菜单显示状态
 */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    if (navLinks) {
        const isShowing = navLinks.classList.toggle('show');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.textContent = isShowing ? '✕' : '☰';
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
    }
}

/**
 * 处理联系表单提交
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = getText('contact-form-submitting') || '发送中...';
    submitBtn.disabled = true;
    
    // 模拟表单提交
    setTimeout(() => {
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showMessage(getText('contact-form-success') || '消息发送成功！', 'success');
    }, 2000);
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

// ===== 🚀 网站初始化函数 =====
/**
 * 网站初始化函数
 */
function initializeWebsite() {
    // 1. 初始化语言系统
    initializeLanguage();
    
    // 2. 应用翻译
    applyTranslations();
    
    // 3. 初始化其他功能
    initializeMobileMenu();
    initializeContactForm();
    
    // 4. 设置语言切换事件监听器
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const langCode = this.getAttribute('data-lang');
            switchLanguage(langCode);
        });
    });
    
    // 5. 为语言选择器添加事件监听
    const langSelector = document.querySelector('.language-selector select');
    if (langSelector) {
        langSelector.addEventListener('change', function() {
            switchLanguage(this.value);
        });
    }
}

// ===== 🌐 全局函数导出 =====
window.switchLanguage = switchLanguage;
window.showProvider = showProvider;
window.getText = getText;

// ===== 🎯 页面加载完成后执行初始化 =====
document.addEventListener('DOMContentLoaded', initializeWebsite);
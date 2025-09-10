/**
 * 语言管理器
 * Language Manager
 * 
 * 负责语言包的加载和管理
 */

// 支持的语言列表
window.SUPPORTED_LANGUAGES = {
    'zh-CN': {
        name: '中文',
        nativeName: '中文',
        flag: '🇨🇳',
        dir: 'ltr'  // 文字方向：left-to-right
    },
    'en-US': {
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸', 
        dir: 'ltr'
    }
    // 可以继续添加其他语言：
    // 'ja-JP': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
    // 'ar-SA': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' }
};

// 默认语言
window.DEFAULT_LANGUAGE = 'zh-CN';

// 语言加载状态
window.LANGUAGE_LOAD_STATUS = {};

/**
 * 检查语言包是否已加载
 * @param {string} langCode - 语言代码
 * @returns {boolean}
 */
window.isLanguageLoaded = function(langCode) {
    return window.LANGUAGE_TEXTS && 
           window.LANGUAGE_TEXTS[langCode] && 
           window.LANGUAGE_LOAD_STATUS[langCode] === 'loaded';
};

/**
 * 获取浏览器偏好语言
 * @returns {string}
 */
window.getBrowserLanguage = function() {
    const browserLang = navigator.language || navigator.userLanguage || 'zh-CN';
    
    // 精确匹配
    if (window.SUPPORTED_LANGUAGES[browserLang]) {
        return browserLang;
    }
    
    // 模糊匹配（如 zh-TW 匹配到 zh-CN）
    const langPrefix = browserLang.split('-')[0];
    for (const supportedLang in window.SUPPORTED_LANGUAGES) {
        if (supportedLang.startsWith(langPrefix)) {
            return supportedLang;
        }
    }
    
    return window.DEFAULT_LANGUAGE;
};

/**
 * 动态加载语言包
 * @param {string} langCode - 语言代码
 * @returns {Promise}
 */
window.loadLanguage = function(langCode) {
    return new Promise((resolve, reject) => {
        // 检查是否已加载
        if (window.isLanguageLoaded(langCode)) {
            resolve(langCode);
            return;
        }
        
        // 检查是否支持
        if (!window.SUPPORTED_LANGUAGES[langCode]) {
            reject(new Error(`Unsupported language: ${langCode}`));
            return;
        }
        
        // 标记为加载中
        window.LANGUAGE_LOAD_STATUS[langCode] = 'loading';
        
        // 创建script标签动态加载
        const script = document.createElement('script');
        script.src = `config/languages/${langCode}.js`;
        script.onload = () => {
            window.LANGUAGE_LOAD_STATUS[langCode] = 'loaded';
            console.log(`✅ 语言包已加载: ${langCode}`);
            resolve(langCode);
        };
        script.onerror = () => {
            window.LANGUAGE_LOAD_STATUS[langCode] = 'error';
            console.error(`❌ 语言包加载失败: ${langCode}`);
            reject(new Error(`Failed to load language: ${langCode}`));
        };
        
        document.head.appendChild(script);
    });
};

/**
 * 预加载所有支持的语言
 */
window.preloadAllLanguages = function() {
    const promises = Object.keys(window.SUPPORTED_LANGUAGES).map(lang => 
        window.loadLanguage(lang).catch(err => console.warn(err))
    );
    
    return Promise.allSettled(promises);
};

console.log('🌍 语言管理器已初始化');
console.log('📦 支持的语言:', Object.keys(window.SUPPORTED_LANGUAGES));
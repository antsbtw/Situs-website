/**
 * 组件加载器 - 基于现有文件结构
 */

async function loadComponent(componentPath, targetId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const target = document.getElementById(targetId);
        if (target) {
            target.innerHTML = html;
            console.log(`✅ 组件加载成功: ${componentPath}`);
        } else {
            console.error(`❌ 找不到目标容器: #${targetId}`);
        }
    } catch (error) {
        console.error(`❌ 组件加载失败: ${componentPath}`, error);
    }
}

async function loadAllComponents() {
    // 并行加载header和footer
    await Promise.all([
        loadComponent('components/header.html', 'header-placeholder'),
        loadComponent('components/footer.html', 'footer-placeholder')
    ]);
    
    console.log('✅ 所有组件加载完成');
    
    // 组件加载完成后初始化
    initializeAfterLoad();
}

function initializeAfterLoad() {
    // 🔧 修复：组件加载完成后，重新应用语言设置
    console.log('组件加载完成，开始应用语言设置');
    
    // 🔥 关键修复：调用正确的函数名
    if (typeof applyTranslations === 'function') {
        // 重新应用翻译到新加载的组件
        applyTranslations();
        console.log('✅ 重新应用语言设置完成');
        
        // 🔧 额外修复：确保语言选择器状态正确
        if (typeof updateLanguageSelector === 'function' && typeof CURRENT_LANGUAGE !== 'undefined') {
            updateLanguageSelector(CURRENT_LANGUAGE);
        }
        
        // 🔧 重新初始化移动端菜单（因为header刚加载完成）
        if (typeof initializeMobileMenu === 'function') {
            initializeMobileMenu();
        }
    } else {
        console.warn('❌ script.js 尚未加载完成，无法应用语言设置');
        
        // 🔧 如果script.js还没加载完成，等待一下再试
        setTimeout(() => {
            if (typeof applyTranslations === 'function') {
                applyTranslations();
                console.log('✅ 延迟应用语言设置完成');
            }
        }, 500);
    }
}

// 页面加载完成后自动加载组件
document.addEventListener('DOMContentLoaded', function() {
    loadAllComponents();
});
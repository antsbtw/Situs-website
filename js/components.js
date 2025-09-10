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
    
    // 检查 script.js 是否已经加载并且语言系统已初始化
    if (typeof updatePageContent === 'function') {
        // 重新更新页面内容，这次会包含刚加载的 header 和 footer
        updatePageContent();
        console.log('✅ 重新应用语言设置完成');
    } else {
        console.warn('❌ script.js 尚未加载完成，无法应用语言设置');
    }
}

// 页面加载完成后自动加载组件
document.addEventListener('DOMContentLoaded', function() {
    loadAllComponents();
});
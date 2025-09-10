公司网站项目
一个简洁、现代、响应式的公司官方网站，使用纯HTML、CSS和JavaScript构建，专为GitHub Pages部署优化。
🌟 特性

✅ 响应式设计 - 完美适配桌面端、平板和手机
✅ 单页应用 - 流畅的页面切换体验
✅ 现代化设计 - 简洁美观的用户界面
✅ SEO友好 - 优化的HTML结构和meta标签
✅ 移动端优化 - 触摸友好的交互设计
✅ 零依赖 - 不依赖任何第三方框架
✅ 快速加载 - 优化的代码和资源

📁 项目结构
company-website/
├── index.html          # 主页面文件
├── css/
│   └── style.css       # 样式文件
├── js/
│   └── script.js       # JavaScript功能
├── images/             # 图片资源文件夹
│   └── (放置Logo、产品图片等)
└── README.md           # 项目说明文档
🚀 快速开始
1. 本地开发
bash# 克隆或下载项目文件
git clone [您的仓库地址]

# 进入项目目录
cd company-website

# 用VS Code打开项目
code .

# 安装Live Server插件后，右键index.html选择"Open with Live Server"
# 或直接在浏览器中打开index.html文件
2. 部署到GitHub Pages

创建GitHub仓库

登录GitHub创建新仓库
仓库名可以是：company-website 或 your-username.github.io


上传代码
bashgit init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [您的仓库地址]
git push -u origin main

启用GitHub Pages

进入仓库的Settings页面
找到Pages选项
Source选择"Deploy from a branch"
Branch选择"main"，文件夹选择"/ (root)"
点击Save


绑定自定义域名（可选）

在Cloudflare中添加CNAME记录指向username.github.io
在GitHub Pages设置中添加您的自定义域名



🛠️ 自定义指南
修改公司信息

基本信息

编辑index.html中的公司名称、描述等文本内容
更新<title>标签和meta描述


联系方式

在"联系我们"页面更新邮箱、电话、地址等信息


产品信息

在"产品介绍"页面添加或修改产品描述



更换样式和颜色
编辑css/style.css文件：
css/* 主色调 */
:root {
  --primary-color: #3498db;    /* 主蓝色 */
  --secondary-color: #2c3e50;  /* 深灰色 */
  --accent-color: #e74c3c;     /* 强调红色 */
}
添加图片

将图片文件放入images/文件夹
在HTML中引用：<img src="images/your-image.jpg" alt="描述">
推荐的图片：

logo.png - 公司Logo
hero-bg.jpg - 首页背景图
about-us.jpg - 关于我们页面图片
product-1.jpg - 产品图片



添加新页面

在index.html中添加新的页面内容区域
在导航菜单中添加对应链接
在js/script.js中的titleMap添加页面标题映射

📱 页面说明

首页 - 公司介绍和主要特色展示
关于我们 - 公司详细信息、愿景和价值观
产品介绍 - 产品展示和详细说明
使用手册 - 产品使用指南和常见问题
联系我们 - 联系表单和联系方式

🔧 技术栈

HTML5 - 语义化标签，SEO优化
CSS3 - Flexbox/Grid布局，响应式设计
JavaScript (ES6+) - 现代JavaScript语法
无框架 - 纯原生代码，快速轻量

📋 浏览器支持

✅ Chrome (推荐)
✅ Firefox
✅ Safari
✅ Edge
✅ 移动端浏览器

🎯 SEO优化

语义化HTML结构
合适的标题层级
Meta标签优化
图片Alt属性
响应式设计
快速加载速度

📈 性能优化

CSS和JS文件分离
图片懒加载（可选）
压缩代码（生产环境）
CDN加速（GitHub Pages自带）

🔒 安全考虑

表单验证（前端+后端）
XSS防护
HTTPS强制（GitHub Pages自带）

🤝 贡献指南

Fork本项目
创建功能分支：git checkout -b feature/new-feature
提交更改：git commit -m 'Add some feature'
推送分支：git push origin feature/new-feature
创建Pull Request

📝 许可证
本项目基于MIT许可证 - 查看LICENSE文件了解详情
📞 支持
如果您有任何问题或建议，请：

创建Issue
发送邮件至：[您的邮箱]
访问我们的网站：[您的网站地址]

🗺️ 路线图

 添加多语言支持
 集成CMS内容管理
 添加博客功能
 性能进一步优化
 添加动画效果


开发者： [您的名字]
最后更新： 2025年9月
版本： 1.0.0
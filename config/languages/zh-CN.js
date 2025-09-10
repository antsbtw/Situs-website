/**
 * 中文文本配置文件
 * Chinese (Simplified) Text Configuration
 * 
 * 维护人员：中文翻译团队
 * 最后更新：2025-09-10
 */

window.LANGUAGE_TEXTS = window.LANGUAGE_TEXTS || {};

window.LANGUAGE_TEXTS['zh-CN'] = {
    // 🧭 导航菜单
    navigation: {
        home: "首页",
        about: "关于我们",
        products: "产品介绍", 
        manual: "使用手册",
        contact: "联系我们"
    },
    
    // 📄 页面标题
    pageTitles: {
        home: "首页",
        about: "关于我们",
        products: "产品介绍",
        manual: "使用手册", 
        contact: "联系我们"
    },
    
    // 🏠 首页内容
    homepage: {
        welcomeTitle: "欢迎来到 Situs",
        slogan: "大道至简",
        learnMoreBtn: "了解产品",
        ourAdvantages: "我们的价值",
        
        // 优势介绍
        advantages: {
            innovation: {
                title: "简单易用",
                description: "直观的界面设计，让每个用户都能轻松上手"
            },
            security: {
                title: "持续创新", 
                description: "功能不断迭代优化，为用户带来更好体验"
            },
            customization: {
                title: "隐私至上",
                description: "严格的数据保护政策，您的隐私安全是我们的承诺"
            }
        }
    },
    
    // ℹ️ 关于我们页面
    aboutPage: {
        title: "关于我们",
        companyIntroTitle: "公司简介",
        companyIntro: "我们是一家专注于技术创新的公司，成立于2020年。公司致力于为客户提供优质的技术解决方案，涵盖软件开发、系统集成、技术咨询等多个领域。",
        
        visionTitle: "企业愿景",
        vision: "成为行业领先的技术解决方案提供商，通过创新技术推动行业发展，为客户创造更大价值。",
        
        valuesTitle: "核心价值观",
        values: [
            "诚信为本，客户至上",
            "持续创新，追求卓越", 
            "团队协作，共同成长",
            "社会责任，可持续发展"
        ],
        
        companyPhoto: "公司照片",
        
        teamTitle: "我们的团队",
        teamDescription: "由资深技术专家和行业精英组成的专业团队",
        
        historyTitle: "发展历程", 
        milestones: [
            { year: "2020", event: "公司成立，专注技术创新" },
            { year: "2021", event: "获得首轮投资，团队扩展至20人" },
            { year: "2022", event: "推出核心产品，服务客户超过100家" },
            { year: "2023", event: "获得行业认证，建立技术研发中心" },
            { year: "2024", event: "业务拓展至海外市场" }
        ]
    },
    
    // 🛍️ 产品页面
    productsPage: {
        title: "我们的产品",
        subtitle: "为不同行业提供专业的技术解决方案",
        
        // 产品信息
        productA: {
            title: "企业管理系统",
            description: "集成化的企业资源规划系统，帮助企业提升管理效率，优化业务流程，实现数字化转型。"
        },
        productB: {
            title: "数据分析平台",
            description: "强大的商业智能分析工具，提供实时数据洞察，支持企业做出更明智的决策。"
        },
        productC: {
            title: "移动应用开发",
            description: "专业的移动端解决方案，支持iOS和Android平台，为企业打造优质的移动体验。"
        },
        
        productImages: {
            image1: "企业管理系统界面",
            image2: "数据分析平台界面", 
            image3: "移动应用界面"
        },
        
        categories: {
            software: "软件产品",
            consulting: "咨询服务", 
            integration: "系统集成"
        },
        
        learnMoreBtn: "了解更多",
        contactSalesBtn: "联系销售"
    },
    
    // 📖 使用手册页面
    manualPage: {
        title: "使用手册",
        subtitle: "详细的产品使用指南和常见问题解答",
        
        quickStart: "快速入门",
        userGuide: "用户指南", 
        faq: "常见问题",
        support: "技术支持",
        
        // 快速入门步骤
        steps: {
            step1: {
                title: "步骤1：注册账户",
                description: "访问我们的官方网站，点击注册按钮，填写必要信息完成账户注册"
            },
            step2: {
                title: "步骤2：登录系统", 
                description: "使用注册的账户信息登录系统，首次登录建议修改默认密码"
            },
            step3: {
                title: "步骤3：基本配置",
                description: "根据向导完成基本配置，包括个人信息、偏好设置等"
            }
        },
        
        // 功能说明
        featuresTitle: "功能说明",
        mainFeatures: "主要功能",
        features: {
            featureA: "功能A：用户管理 - 完善的用户权限管理系统，支持角色分配和权限控制",
            featureB: "功能B：数据统计 - 实时数据分析和可视化报表，帮助用户了解业务状况",
            featureC: "功能C：系统集成 - 与第三方系统无缝集成，实现数据互通和业务协同"
        },
        
        // 常见问题
        faqTitle: "常见问题",
        faqs: {
            faq1: {
                question: "Q: 如何重置密码？",
                answer: "A: 在登录页面点击”忘记密码“，输入注册邮箱，系统会发送重置链接到您的邮箱。"
            },
            faq2: {
                question: "Q: 如何联系技术支持？",
                answer: "A: 您可以通过以下方式联系我们：客服邮箱、技术支持热线，或者在线客服系统。"
            }
        }
    },
    
    // 📞 联系页面
    contactPage: {
        title: "联系我们",
        subtitle: "随时为您提供专业的技术支持和咨询服务",
        
        // 联系表单
        form: {
            name: "姓名",
            email: "邮箱", 
            subject: "主题",
            message: "留言",
            submitBtn: "发送留言",
            submitting: "发送中...",
            successMsg: "感谢您的留言！我们会尽快回复您。",
            errorMsg: "发送失败，请检查网络连接后重试。"
        },
        
        // 其他联系方式
        otherMethods: "其他联系方式",
        emailLabel: "邮箱",
        phoneLabel: "电话",
        addressLabel: "地址",
        
        workingHours: "工作时间",
        workingTime: "周一至周五 9:00-18:00",
        
        // 办公地址
        officeTitle: "办公地址",
        visitTitle: "欢迎来访",
        visitNote: "如需到访，请提前预约"
    },
    
    // 🏷️ 通用标签
    common: {
        loading: "加载中...",
        backToHome: "← 返回首页",
        email: "邮箱",
        phone: "电话",
        address: "地址", 
        copyright: "保留所有权利",
        language: "语言",
        
        // 按钮文本
        buttons: {
            learnMore: "了解更多",
            contactUs: "联系我们",
            getStarted: "开始使用", 
            download: "下载",
            submit: "提交",
            cancel: "取消",
            save: "保存",
            edit: "编辑",
            delete: "删除",
            confirm: "确认"
        },
        
        // 状态文本
        status: {
            success: "操作成功",
            error: "操作失败",
            warning: "警告",
            info: "提示",
            processing: "处理中...",
            completed: "已完成"
        },
        
        // 时间相关
        time: {
            today: "今天",
            yesterday: "昨天",
            thisWeek: "本周",
            thisMonth: "本月",
            thisYear: "今年"
        }
    },
    
    // 🦶 页脚内容
    footer: {
        quickLinks: "快速链接",
        contactInfo: "联系信息", 
        followUs: "关注我们",
        socialMedia: "微信 | 微博 | LinkedIn",
        
        // 联系信息
        email: "邮箱: contact@yourcompany.com",
        phone: "电话: +86 xxx-xxxx-xxxx",
        
        // 法律信息
        legal: {
            privacy: "隐私政策",
            terms: "服务条款",
            disclaimer: "免责声明"
        },
        
        copyright: "© 2025 您的公司名称. 保留所有权利."
    }
};

console.log('🇨🇳 中文语言包已加载');
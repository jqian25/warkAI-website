/**
 * WarkAI Knowledge Base & AI Q&A System
 * Provides intelligent answers about WarkAI project and team
 */

class WarkAIKnowledgeBase {
    constructor() {
        this.language = localStorage.getItem('preferredLanguage') || 'zh';
        this.initializeKnowledge();
    }

    initializeKnowledge() {
        this.knowledge = {
            zh: {
                company: {
                    name: 'WarkAI',
                    fullName: 'WarkAI Technology Co., Ltd.',
                    founded: '2024',
                    mission: '通过整合AR、AI和机器人技术，系统性地解决全球劳动力市场的结构性危机，构建下一代人机协作平台，释放"超级个体"的潜力。',
                    vision: '成为全球领先的人机协作技术提供商，让每个人都能通过技术增强自身能力，创造更大价值。',
                    coreValues: '善用善、技术平等、赋能每个人',
                    location: '中国深圳',
                    website: 'https://warkai.com'
                },
                products: {
                    textile: {
                        name: '纺织AI平台',
                        description: '为纺织行业提供AI驱动的质量检测和生产优化解决方案',
                        features: ['实时质量检测', 'AI缺陷识别', '生产效率优化', '成本降低42%']
                    },
                    arGlasses: {
                        name: 'AR眼镜',
                        description: '支持人机交互的增强现实眼镜，集成WarkAI OS',
                        features: ['实时数据叠加', '手势识别', '语音控制', '多语言支持']
                    },
                    warkaiOS: {
                        name: 'WarkAI OS',
                        description: '超级个体AI操作系统，整合AI、AR和机器人技术',
                        features: ['自研大模型', '硬件软件一体化', '数据闭环优化', '脑机接口探索']
                    }
                },
                team: {
                    founder: {
                        name: '钱景',
                        title: '创始人 & CEO',
                        background: '华为前高管，15年科技行业经验，主导过多个大型技术项目'
                    },
                    cto_ar: {
                        name: '吕一飞',
                        title: 'AR CTO',
                        background: '亚马逊前资深工程师，AR技术专家，拥有多项AR相关专利'
                    },
                    lead_ai: {
                        name: '钱开倫',
                        title: 'AI负责人',
                        background: 'UCLA博士，AI领域资深专家，多家顶级科技公司技术领导'
                    },
                    lead_model: {
                        name: '范非易',
                        title: '大模型负责人',
                        background: '伦敦帝国理工学院博士，NLP和多模态模型领域专家'
                    },
                    lead_app: {
                        name: '徐时琛',
                        title: 'APP架构负责人',
                        background: '10年+移动应用开发经验，跨平台架构设计专家'
                    }
                },
                market: {
                    opportunity: '全球劳动力市场面临人口老龄化、技能不匹配、残障人士就业困难等问题',
                    target: '纺织、冷链、制造、酒店等劳动密集型行业',
                    competitors: '与Tesla、Boston Dynamics等国际巨头竞争，但专注于垂直领域',
                    advantage: '成本优势42%、自研大模型、硬件软件一体化、数据闭环'
                },
                financials: {
                    revenue2028: '7亿元',
                    grossMargin: '57%-61%',
                    breakeven: '11个月',
                    seriesA: '800-1000万美元',
                    hardwareRevenue: '70%',
                    softwareRevenue: '20%',
                    governmentSubsidy: '10%'
                },
                faq: {
                    q1: '什么是WarkAI？',
                    a1: 'WarkAI是一家专注于人机协作的AI科技公司，通过整合AR、AI和机器人技术，为劳动密集型行业提供解决方案。',
                    q2: '你们的核心竞争力是什么？',
                    a2: '我们的核心竞争力包括：自研大模型、硬件软件一体化、数据闭环优化和42%的成本优势。',
                    q3: '如何联系WarkAI？',
                    a3: '您可以通过网站的"合作洽谈"页面或发送邮件至contact@warkai.com与我们联系。',
                    q4: '产品何时上市？',
                    a4: '我们的纺织AI平台已与Atour、Hilton等标杆客户达成合作，AR眼镜2.0版本计划2026年发布。',
                    q5: '如何投资WarkAI？',
                    a5: '我们正在进行A轮融资，融资规模为800-1000万美元。感兴趣的投资者可以通过"合作洽谈"与我们联系。'
                }
            },
            en: {
                company: {
                    name: 'WarkAI',
                    fullName: 'WarkAI Technology Co., Ltd.',
                    founded: '2024',
                    mission: 'By integrating AR, AI, and robotics technology, systematically solve the structural crisis in the global labor market, build a next-generation human-machine collaboration platform, and unleash the potential of "super individuals".',
                    vision: 'Become the world\'s leading human-machine collaboration technology provider, enabling everyone to enhance their capabilities through technology and create greater value.',
                    coreValues: 'Do Good with Good, technological equality, empowering everyone with technology',
                    location: 'Shenzhen, China',
                    website: 'https://warkai.com'
                },
                products: {
                    textile: {
                        name: 'Textile AI Platform',
                        description: 'AI-driven quality detection and production optimization solutions for the textile industry',
                        features: ['Real-time Quality Detection', 'AI Defect Identification', 'Production Optimization', '42% Cost Reduction']
                    },
                    arGlasses: {
                        name: 'AR Glasses',
                        description: 'Augmented reality glasses supporting human-machine interaction, integrated with WarkAI OS',
                        features: ['Real-time Data Overlay', 'Gesture Recognition', 'Voice Control', 'Multi-language Support']
                    },
                    warkaiOS: {
                        name: 'WarkAI OS',
                        description: 'Super Individual AI Operating System integrating AI, AR and robotics technology',
                        features: ['Self-developed Large Models', 'Hardware-Software Integration', 'Data Closed-loop Optimization', 'Brain-Computer Interface Exploration']
                    }
                },
                team: {
                    founder: {
                        name: 'Qian Jing',
                        title: 'Founder & CEO',
                        background: 'Former Huawei executive with 15 years of technology industry experience, having led multiple large-scale technology projects'
                    },
                    cto_ar: {
                        name: 'Lü Yifei',
                        title: 'AR CTO',
                        background: 'Former senior engineer at Amazon, AR technology expert with multiple AR-related patents'
                    },
                    lead_ai: {
                        name: 'Qian Kailun',
                        title: 'AI Lead',
                        background: 'PhD from UCLA, senior AI expert with technical leadership positions at multiple top technology companies'
                    },
                    lead_model: {
                        name: 'Fan Feiyi',
                        title: 'Large Model Lead',
                        background: 'PhD from Imperial College London, expert in NLP and multimodal models with extensive R&D experience'
                    },
                    lead_app: {
                        name: 'Xu Shichen',
                        title: 'APP Architecture Lead',
                        background: 'Senior software architect with 10+ years of mobile application development experience'
                    }
                },
                market: {
                    opportunity: 'The global labor market faces challenges including aging populations, skill mismatches, and employment difficulties for people with disabilities',
                    target: 'Labor-intensive industries such as textiles, cold chain, manufacturing, and hospitality',
                    competitors: 'Competing with international giants like Tesla and Boston Dynamics, but focusing on vertical domains',
                    advantage: '42% cost advantage, self-developed large models, hardware-software integration, data closed-loop'
                },
                financials: {
                    revenue2028: '700 million yuan',
                    grossMargin: '57%-61%',
                    breakeven: '11 months',
                    seriesA: '8-10 million USD',
                    hardwareRevenue: '70%',
                    softwareRevenue: '20%',
                    governmentSubsidy: '10%'
                },
                faq: {
                    q1: 'What is WarkAI?',
                    a1: 'WarkAI is an AI technology company focused on human-machine collaboration, providing solutions for labor-intensive industries by integrating AR, AI, and robotics technology.',
                    q2: 'What are your core competencies?',
                    a2: 'Our core competencies include: self-developed large models, hardware-software integration, data closed-loop optimization, and 42% cost advantage.',
                    q3: 'How to contact WarkAI?',
                    a3: 'You can contact us through the "Cooperation" page on our website or email contact@warkai.com.',
                    q4: 'When will the products launch?',
                    a4: 'Our Textile AI Platform has reached cooperation with benchmark customers like Atour and Hilton. AR Glasses 2.0 is planned for release in 2026.',
                    q5: 'How to invest in WarkAI?',
                    a5: 'We are currently in Series A financing with a target of 8-10 million USD. Interested investors can contact us through the "Cooperation" page.'
                }
            },
            ja: {
                company: {
                    name: 'WarkAI',
                    fullName: 'WarkAI Technology Co., Ltd.',
                    founded: '2024',
                    mission: 'AR、AI、ロボット技術を統合することで、世界的な労働力市場の構造的危機を体系的に解決し、次世代の人間とマシンのコラボレーションプラットフォームを構築し、「スーパーインディビジュアル」の可能性を引き出します。',
                    vision: '世界をリードする人間とマシンのコラボレーション技術プロバイダーとなり、すべての人が技術を通じて自身の能力を向上させ、より大きな価値を創造できるようにします。',
                    coreValues: '善をもって善をなす、技術的平等、技術で誰もが力を得られるようにする',
                    location: '中国深圳',
                    website: 'https://warkai.com'
                },
                products: {
                    textile: {
                        name: 'テキスタイルAIプラットフォーム',
                        description: 'テキスタイル業界向けのAI駆動型品質検査と生産最適化ソリューション',
                        features: ['リアルタイム品質検査', 'AI欠陥検出', '生産効率最適化', 'コスト42%削減']
                    },
                    arGlasses: {
                        name: 'ARメガネ',
                        description: '人間とマシンのインタラクションをサポートするAR眼鏡、WarkAI OSを統合',
                        features: ['リアルタイムデータオーバーレイ', 'ジェスチャー認識', '音声制御', 'マルチ言語対応']
                    },
                    warkaiOS: {
                        name: 'WarkAI OS',
                        description: 'AI、AR、ロボット技術を統合するスーパーインディビジュアルAIオペレーティングシステム',
                        features: ['自社開発の大規模モデル', 'ハードウェア・ソフトウェア統合', 'データ閉ループ最適化', '脳コンピュータインターフェイス探索']
                    }
                },
                team: {
                    founder: {
                        name: '銭 景',
                        title: '創業者 & CEO',
                        background: 'ファーウェイの元幹部で、テクノロジー業界での15年の経験を持ち、複数の大規模なテクノロジープロジェクトを主導してきました。'
                    },
                    cto_ar: {
                        name: '呂 一飛',
                        title: 'AR CTO',
                        background: 'アマゾンの元シニアエンジニア、AR技術の専門家で、複数のAR関連特許を保有しています。'
                    },
                    lead_ai: {
                        name: '銭 開倫',
                        title: 'AI リード',
                        background: 'UCLAのコンピュータサイエンス博士号を取得し、複数の大手テクノロジー企業で技術的リーダーシップを担当してきました。'
                    },
                    lead_model: {
                        name: '范 非易',
                        title: '大規模モデル リード',
                        background: 'ロンドン大学インペリアル・カレッジの博士号を取得し、NLPとマルチモーダルモデルの分野で豊富な経験を持っています。'
                    },
                    lead_app: {
                        name: '徐 時琛',
                        title: 'APPアーキテクチャ リード',
                        background: '10年以上のモバイルアプリケーション開発経験を持つシニアソフトウェアアーキテクト'
                    }
                },
                market: {
                    opportunity: '世界的な労働力市場は人口の高齢化、スキルの不一致、障害者の雇用困難などの課題に直面しています',
                    target: 'テキスタイル、コールドチェーン、製造、ホテルなどの労働集約的産業',
                    competitors: 'TeslaやBoston Dynamicsなどの国際的な大手企業と競争していますが、垂直領域に焦点を当てています',
                    advantage: 'コスト42%削減、自社開発の大規模モデル、ハードウェア・ソフトウェア統合、データ閉ループ'
                },
                financials: {
                    revenue2028: '7億元',
                    grossMargin: '57%-61%',
                    breakeven: '11ヶ月',
                    seriesA: '800-1000万米ドル',
                    hardwareRevenue: '70%',
                    softwareRevenue: '20%',
                    governmentSubsidy: '10%'
                },
                faq: {
                    q1: 'WarkAIとは何ですか？',
                    a1: 'WarkAIは人間とマシンのコラボレーションに焦点を当てたAI技術企業で、AR、AI、ロボット技術を統合することで、労働集約的産業向けのソリューションを提供しています。',
                    q2: 'あなたたちのコア競争力は何ですか？',
                    a2: 'コア競争力は、自社開発の大規模モデル、ハードウェア・ソフトウェア統合、データ閉ループ最適化、およびコスト42%削減です。',
                    q3: 'WarkAIに連絡するにはどうすればよいですか？',
                    a3: 'ウェブサイトの「協力」ページから、またはcontact@warkai.comにメールを送信して、お問い合わせください。',
                    q4: '製品はいつ発売されますか？',
                    a4: 'テキスタイルAIプラットフォームはAtourやHiltonなどのベンチマーク顧客との協力に達しており、ARメガネ2.0は2026年のリリースを予定しています。',
                    q5: 'WarkAIに投資するにはどうすればよいですか？',
                    a5: '現在、シリーズA融資を実施しており、目標は800-1000万米ドルです。関心のある投資家は「協力」ページを通じてお問い合わせください。'
                }
            }
        };
    }

    /**
     * Get answer to a question
     */
    getAnswer(question) {
        const lang = this.language;
        const kb = this.knowledge[lang];
        
        // Convert question to lowercase for matching
        const q = question.toLowerCase();

        // Company questions
        if (q.includes('什么是') || q.includes('what is') || q.includes('とは')) {
            return kb.faq.a1;
        }

        // Mission/Vision questions
        if (q.includes('使命') || q.includes('mission') || q.includes('ミッション')) {
            return kb.company.mission;
        }

        if (q.includes('愿景') || q.includes('vision') || q.includes('ビジョン')) {
            return kb.company.vision;
        }

        // Product questions
        if (q.includes('产品') || q.includes('product') || q.includes('製品')) {
            return this.getProductInfo(kb);
        }

        if (q.includes('纺织') || q.includes('textile')) {
            return `${kb.products.textile.name}: ${kb.products.textile.description}`;
        }

        if (q.includes('ar眼镜') || q.includes('ar glasses')) {
            return `${kb.products.arGlasses.name}: ${kb.products.arGlasses.description}`;
        }

        if (q.includes('os') || q.includes('操作系统')) {
            return `${kb.products.warkaiOS.name}: ${kb.products.warkaiOS.description}`;
        }

        // Team questions
        if (q.includes('团队') || q.includes('team') || q.includes('チーム')) {
            return this.getTeamInfo(kb);
        }

        if (q.includes('创始人') || q.includes('founder') || q.includes('創業者')) {
            return `${kb.team.founder.name} - ${kb.team.founder.title}: ${kb.team.founder.background}`;
        }

        // Market questions
        if (q.includes('市场') || q.includes('market') || q.includes('市場')) {
            return `市场机遇: ${kb.market.opportunity}\n目标行业: ${kb.market.target}`;
        }

        // Financial questions
        if (q.includes('融资') || q.includes('financing') || q.includes('融資')) {
            return `Series A融资规模: ${kb.financials.seriesA}\n预计2028年收入: ${kb.financials.revenue2028}`;
        }

        // Competitive advantage
        if (q.includes('竞争') || q.includes('advantage') || q.includes('競争')) {
            return kb.market.advantage;
        }

        // Default response
        return this.getDefaultResponse(lang);
    }

    getProductInfo(kb) {
        return `
WarkAI主要产品包括：
1. ${kb.products.textile.name} - ${kb.products.textile.description}
2. ${kb.products.arGlasses.name} - ${kb.products.arGlasses.description}
3. ${kb.products.warkaiOS.name} - ${kb.products.warkaiOS.description}
        `.trim();
    }

    getTeamInfo(kb) {
        return `
WarkAI核心团队：
- ${kb.team.founder.name} (${kb.team.founder.title})
- ${kb.team.cto_ar.name} (${kb.team.cto_ar.title})
- ${kb.team.lead_ai.name} (${kb.team.lead_ai.title})
- ${kb.team.lead_model.name} (${kb.team.lead_model.title})
- ${kb.team.lead_app.name} (${kb.team.lead_app.title})
        `.trim();
    }

    getDefaultResponse(lang) {
        const responses = {
            zh: '感谢您的提问！请告诉我您对WarkAI的哪些方面感兴趣，比如产品、团队、市场或融资信息。',
            en: 'Thank you for your question! Please let me know which aspect of WarkAI you\'re interested in, such as products, team, market, or financing information.',
            ja: 'ご質問ありがとうございます！WarkAIのどの側面に興味がありますか？例えば、製品、チーム、市場、または融資情報についてお知らせください。'
        };
        return responses[lang] || responses.zh;
    }

    /**
     * Set language
     */
    setLanguage(lang) {
        this.language = lang;
        localStorage.setItem('preferredLanguage', lang);
    }

    /**
     * Get all FAQs
     */
    getFAQs() {
        const kb = this.knowledge[this.language];
        return [
            { q: kb.faq.q1, a: kb.faq.a1 },
            { q: kb.faq.q2, a: kb.faq.a2 },
            { q: kb.faq.q3, a: kb.faq.a3 },
            { q: kb.faq.q4, a: kb.faq.a4 },
            { q: kb.faq.q5, a: kb.faq.a5 }
        ];
    }
}

// Initialize globally
window.warkaiKB = new WarkAIKnowledgeBase();

# WarkAI商业计划书网站

这是一个高达风格的WarkAI商业计划书网站，采用HTML、CSS和JavaScript开发，具有酷炫的动画效果和交互体验。

## 功能特点

- **高达风格设计**：整个网站采用了高达系列的机械感、科技感和军事风格
- **机器人导航界面**：首页展示高达风格的机器人，点击不同部位可以跳转到相应页面
- **变形动画效果**：页面跳转时有类似高达变形的动画效果
- **多语言支持**：支持中文、英文和日语三种语言
- **响应式设计**：适配不同屏幕尺寸的设备
- **专业数据图表**：使用Chart.js展示市场规模、财务预测等数据

## 如何使用

### 方法一：直接打开HTML文件

1. 解压下载的ZIP文件到您的计算机
2. 打开解压后的文件夹
3. 双击`index.html`文件，在浏览器中打开网站

> 注意：直接打开HTML文件可能会导致某些功能无法正常工作，建议使用方法二或方法三

### 方法二：使用Python内置HTTP服务器（推荐）

1. 确保您的计算机已安装Python（3.x版本）
2. 解压下载的ZIP文件到您的计算机
3. 打开命令行终端（Windows用户打开命令提示符或PowerShell，Mac/Linux用户打开终端）
4. 进入解压后的文件夹：
   ```
   cd 解压路径/warkAI_website
   ```
5. 启动HTTP服务器：
   ```
   python -m http.server 8000
   ```
   （如果您使用Python 2.x，请使用`python -m SimpleHTTPServer 8000`）
6. 打开浏览器，访问：`http://localhost:8000`

### 方法三：使用其他Web服务器

您也可以使用Apache、Nginx等Web服务器托管这些文件，或者部署到GitHub Pages、Netlify等静态网站托管服务上。

## 网站导航

- **首页**：高达机器人导航界面
  - 点击**头部**：跳转到团队介绍与愿景页面
  - 点击**核心**：跳转到执行摘要与商业模式页面
  - 点击**手臂**：跳转到核心产品线页面
  - 点击**腿部**：跳转到市场应用与路线图页面
  - 点击**机械坐台**：跳转到WarkAI OS核心技术与AI平台页面

- 每个页面右上角有语言切换按钮，可以切换中文、英文和日语
- 每个页面左上角有返回按钮，点击可以返回首页

## 文件结构

```
warkAI_website/
├── index.html              # 首页
├── css/                    # CSS样式文件
│   ├── gundam-style.css    # 主样式文件
│   ├── summary-gundam.css  # 执行摘要页面样式
│   ├── team.css            # 团队介绍页面样式
│   ├── products.css        # 产品页面样式
│   ├── market.css          # 市场应用页面样式
│   └── technology.css      # 技术平台页面样式
├── js/                     # JavaScript文件
│   ├── gundam-script.js    # 主脚本文件
│   ├── summary-gundam.js   # 执行摘要页面脚本
│   ├── team.js             # 团队介绍页面脚本
│   ├── products.js         # 产品页面脚本
│   ├── market.js           # 市场应用页面脚本
│   └── technology.js       # 技术平台页面脚本
├── pages/                  # 子页面
│   ├── summary.html        # 执行摘要与商业模式
│   ├── team.html           # 团队介绍与愿景
│   ├── products.html       # 核心产品线
│   ├── market.html         # 市场应用与路线图
│   └── technology.html     # WarkAI OS核心技术与AI平台
└── images/                 # 图片资源
    ├── warkai_logo.png     # WarkAI公司logo
    ├── gundam_mecha.png    # 高达机器人导航图
    ├── ar_glasses.png      # AR眼镜产品图
    ├── comm_device.png     # 头戴式通讯设备产品图
    ├── robot_arm.png       # 机械臂产品图
    ├── ai_seal.png         # AI小海豹图片
    └── ...                 # 其他图片资源
```

## 浏览器兼容性

- 推荐使用最新版本的Chrome、Firefox、Edge或Safari浏览器
- 不支持Internet Explorer

## 技术栈

- HTML5
- CSS3（动画、过渡效果、Flexbox布局）
- JavaScript（ES6+）
- Chart.js（数据可视化）
- Anime.js（高级动画效果）

## 版权信息

WarkAI © 2025 | 人机智能新纪元

---

如有任何问题或需要技术支持，请联系WarkAI团队。

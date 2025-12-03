# WarkAI 网站 API 文档

## 概述

本文档描述了WarkAI商业计划书网站的JavaScript API接口，包括各个模块的公共方法、事件系统和扩展接口。

## 核心API

### WarkAIConfig

全局配置对象，提供网站的所有配置信息。

#### 属性

| 属性名 | 类型 | 描述 |
|--------|------|------|
| `system` | Object | 系统信息配置 |
| `theme` | Object | 主题颜色配置 |
| `animations` | Object | 动画配置 |
| `i18n` | Object | 国际化配置 |
| `charts` | Object | 图表配置 |
| `environment` | Object | 环境检测信息 |

#### 使用示例

```javascript
// 获取主题颜色
const primaryColor = WarkAIConfig.theme.primary;

// 获取动画持续时间
const duration = WarkAIConfig.animations.transformDuration.head;

// 检查是否为移动设备
const isMobile = WarkAIConfig.environment.isMobile;
```

### WarkAIUtils

工具函数类，提供各种实用方法。

#### 方法

##### DOM操作

```javascript
// 查询元素
warkAIUtils.$(selector, context)
warkAIUtils.$$(selector, context)

// 创建元素
warkAIUtils.createElement(tag, attributes, content)

// 事件绑定
warkAIUtils.on(element, event, handler, options)
warkAIUtils.off(element, event, handler)
```

##### 动画工具

```javascript
// 淡入淡出
await warkAIUtils.fadeIn(element, duration)
await warkAIUtils.fadeOut(element, duration)

// 平滑滚动
warkAIUtils.scrollTo(element, options)
```

##### 存储工具

```javascript
// 本地存储
warkAIUtils.setStorage(key, value)
warkAIUtils.getStorage(key, defaultValue)
warkAIUtils.removeStorage(key)
```

##### 网络工具

```javascript
// HTTP请求
const data = await warkAIUtils.request(url, options)
```

##### 数学工具

```javascript
// 线性插值
const result = warkAIUtils.lerp(start, end, t)

// 值限制
const clamped = warkAIUtils.clamp(value, min, max)

// 范围映射
const mapped = warkAIUtils.map(value, inMin, inMax, outMin, outMax)

// 随机数
const random = warkAIUtils.random(min, max)
```

##### 颜色工具

```javascript
// 颜色转换
const rgb = warkAIUtils.hexToRgb('#ff0000')
const hex = warkAIUtils.rgbToHex(255, 0, 0)

// 颜色混合
const mixed = warkAIUtils.mixColors('#ff0000', '#0000ff', 0.5)
```

##### 时间工具

```javascript
// 时间格式化
const formatted = warkAIUtils.formatTime(new Date(), 'YYYY-MM-DD HH:mm:ss')

// 延迟执行
await warkAIUtils.delay(1000)
```

##### 调试工具

```javascript
// 日志输出
warkAIUtils.log('info', 'Message', data)

// 性能监控
const result = await warkAIUtils.performance('taskName', async () => {
    // 要监控的代码
})
```

## 国际化API

### WarkAII18n

国际化管理类，处理多语言切换和翻译。

#### 方法

```javascript
// 切换语言
warkAII18n.switchLanguage(lang)

// 获取翻译
const text = warkAII18n.getTranslation(key)

// 获取当前语言
const currentLang = warkAII18n.getCurrentLanguage()

// 获取支持的语言
const languages = warkAII18n.getSupportedLanguages()

// 添加观察者
warkAII18n.addObserver(callback)

// 移除观察者
warkAII18n.removeObserver(callback)
```

#### 事件

```javascript
// 语言切换事件
warkAII18n.addObserver((oldLang, newLang) => {
    console.log(`Language changed from ${oldLang} to ${newLang}`)
})
```

#### 翻译键格式

翻译键使用点分隔的层级结构：

```javascript
// 示例翻译键
'common.loading'        // 通用.加载中
'main.title'           // 主页.标题
'navigation.head'      // 导航.头部
'login.username'       // 登录.用户名
```

#### HTML属性

在HTML元素上使用`data-i18n`属性进行自动翻译：

```html
<h1 data-i18n="main.title">WarkAI: 人机智能新纪元</h1>
<input type="text" data-i18n="login.username" placeholder="用户名">
```

## 变形动画API

### MechaTransformController

机甲变形动画控制器。

#### 方法

```javascript
// 触发变形动画
await mechaController.triggerTransform(partElement)

// 显示HUD全息界面
await mechaController.showHologram(partElement)

// 关闭HUD界面
mechaController.closeHologram()
```

#### 属性

```javascript
// 检查是否正在变形
const isTransforming = mechaController.isTransforming

// 获取变形队列
const queue = mechaController.transformQueue

// 获取当前活动的全息界面
const activeHologram = mechaController.activeHologram
```

#### 变形类型

支持的变形类型：

- `head` - 头部变形
- `core` - 核心变形
- `arms` - 手臂变形
- `legs` - 腿部变形
- `platform` - 平台变形

#### HTML属性

```html
<!-- 变形触发器 -->
<div class="gundam-part head" data-target="pages/team.html">
    <div class="part-label">团队介绍</div>
</div>
```

## 数据可视化API

### DataVisualizationHUD

数据可视化HUD系统。

#### 方法

```javascript
// 显示图表
await dataVizHUD.showChart(chartType)

// 切换图表
dataVizHUD.switchChart(chartType)

// 导出图表
dataVizHUD.exportChart()

// 关闭HUD
dataVizHUD.closeHUD()

// 显示通知
dataVizHUD.showNotification(message, type)
```

#### 图表类型

支持的图表类型：

- `marketSize` - 市场规模分析
- `revenue` - 营收预测
- `userGrowth` - 用户增长趋势
- `marketShare` - 市场份额分布
- `technology` - 技术指标雷达图

#### HTML属性

```html
<!-- 图表触发器 -->
<div class="data-card" data-chart="marketSize">
    <div class="data-title">市场规模</div>
    <div class="data-value">1456亿美元</div>
</div>
```

#### 图表配置

```javascript
// 自定义图表数据
dataVizHUD.chartData.customChart = {
    title: '自定义图表',
    type: 'line',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: '数据系列',
            data: [10, 20, 30, 40],
            borderColor: '#00a3ff'
        }]
    }
}
```

## 导航API

### NavigationController

页面导航控制器。

#### 方法

```javascript
// 导航到页面
navigationController.navigateTo(url)

// 返回上一页
navigationController.goBack()

// 设置返回按钮
navigationController.setupBackButton(element)
```

#### 事件

```javascript
// 导航事件
document.addEventListener('navigation:start', (e) => {
    console.log('Navigation started to:', e.detail.url)
})

document.addEventListener('navigation:complete', (e) => {
    console.log('Navigation completed')
})
```

## 事件系统

### 全局事件

网站使用自定义事件进行模块间通信：

```javascript
// 语言切换事件
document.addEventListener('language:changed', (e) => {
    const { oldLang, newLang } = e.detail
    console.log(`Language changed from ${oldLang} to ${newLang}`)
})

// 变形动画事件
document.addEventListener('transform:start', (e) => {
    const { partType, element } = e.detail
    console.log(`Transform started for ${partType}`)
})

document.addEventListener('transform:complete', (e) => {
    const { partType, element } = e.detail
    console.log(`Transform completed for ${partType}`)
})

// HUD事件
document.addEventListener('hud:show', (e) => {
    const { type, data } = e.detail
    console.log(`HUD shown: ${type}`)
})

document.addEventListener('hud:hide', (e) => {
    console.log('HUD hidden')
})
```

### 自定义事件触发

```javascript
// 触发自定义事件
const event = new CustomEvent('custom:event', {
    detail: { data: 'example' }
})
document.dispatchEvent(event)
```

## 扩展API

### 插件系统

网站支持插件扩展：

```javascript
// 注册插件
WarkAI.registerPlugin('pluginName', {
    init() {
        // 插件初始化
    },
    
    destroy() {
        // 插件销毁
    }
})

// 获取插件
const plugin = WarkAI.getPlugin('pluginName')

// 移除插件
WarkAI.removePlugin('pluginName')
```

### 主题扩展

```javascript
// 注册自定义主题
WarkAI.registerTheme('darkRed', {
    primary: '#ff0000',
    secondary: '#cc0000',
    background: '#1a0000'
})

// 应用主题
WarkAI.applyTheme('darkRed')
```

### 动画扩展

```javascript
// 注册自定义动画
WarkAI.registerAnimation('customTransform', {
    duration: 2000,
    keyframes: {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.2)' },
        '100%': { transform: 'scale(1)' }
    }
})
```

## 错误处理

### 错误类型

```javascript
// 网络错误
try {
    const data = await warkAIUtils.request('/api/data')
} catch (error) {
    if (error.name === 'NetworkError') {
        // 处理网络错误
    }
}

// 动画错误
try {
    await mechaController.triggerTransform(element)
} catch (error) {
    if (error.name === 'AnimationError') {
        // 处理动画错误
    }
}
```

### 全局错误处理

```javascript
// 监听全局错误
window.addEventListener('error', (e) => {
    warkAIUtils.log('error', 'Global error:', e.error)
})

// 监听Promise错误
window.addEventListener('unhandledrejection', (e) => {
    warkAIUtils.log('error', 'Unhandled promise rejection:', e.reason)
})
```

## 性能监控

### 性能API

```javascript
// 监控函数执行时间
const result = await warkAIUtils.performance('functionName', async () => {
    // 要监控的代码
})

// 监控内存使用
if (performance.memory) {
    const memory = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
    }
    console.log('Memory usage:', memory)
}

// 监控FPS
let lastTime = performance.now()
let frameCount = 0

function measureFPS() {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        console.log('FPS:', fps)
        frameCount = 0
        lastTime = currentTime
    }
    
    requestAnimationFrame(measureFPS)
}

if (WarkAIConfig.debug.showFPS) {
    measureFPS()
}
```

## 最佳实践

### 1. 模块使用

```javascript
// 推荐：使用配置对象
const config = WarkAIConfig.animations.transformDuration

// 推荐：使用工具函数
const element = warkAIUtils.$('#myElement')

// 推荐：使用异步/等待
await mechaController.triggerTransform(element)
```

### 2. 事件处理

```javascript
// 推荐：使用事件委托
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-chart]')
    if (trigger) {
        const chartType = trigger.getAttribute('data-chart')
        dataVizHUD.showChart(chartType)
    }
})

// 推荐：清理事件监听器
const controller = new AbortController()
element.addEventListener('click', handler, {
    signal: controller.signal
})
// 在适当时机清理
controller.abort()
```

### 3. 错误处理

```javascript
// 推荐：使用try-catch包装异步操作
try {
    await mechaController.triggerTransform(element)
} catch (error) {
    warkAIUtils.log('error', 'Transform failed:', error)
    // 降级处理
}
```

### 4. 性能优化

```javascript
// 推荐：使用防抖处理频繁事件
const debouncedResize = warkAIUtils.debounce(() => {
    // 处理窗口大小变化
}, 250)
window.addEventListener('resize', debouncedResize)

// 推荐：使用节流处理滚动事件
const throttledScroll = warkAIUtils.throttle(() => {
    // 处理滚动
}, 16) // 60fps
window.addEventListener('scroll', throttledScroll)
```

## 版本兼容性

### API版本

当前API版本：`2.5.0`

### 向后兼容性

- 主版本号变更可能包含破坏性变更
- 次版本号变更保持向后兼容
- 修订版本号仅包含bug修复

### 废弃警告

```javascript
// 检查废弃的API
if (typeof oldAPI !== 'undefined') {
    console.warn('oldAPI is deprecated, use newAPI instead')
}
```

---

**WarkAI © 2025 | 人机智能新纪元**

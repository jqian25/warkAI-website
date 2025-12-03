# WarkAI 网站部署指南

## 概述

本文档详细说明了WarkAI商业计划书网站的部署流程，包括本地开发环境搭建、生产环境部署、性能优化和监控配置。

## 环境要求

### 开发环境

- **Node.js** 16.0+ (用于构建工具)
- **Python** 3.7+ (用于本地服务器)
- **Git** 2.0+ (版本控制)
- **现代浏览器** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)

### 生产环境

- **Web服务器** (Nginx, Apache, 或静态托管服务)
- **HTTPS支持** (推荐)
- **CDN服务** (可选，用于加速)
- **域名** (可选)

## 本地开发

### 1. 项目获取

```bash
# 克隆项目
git clone <repository-url>
cd warkAI_website

# 或直接下载项目文件
wget <project-archive-url>
unzip warkAI_website.zip
cd warkAI_website
```

### 2. 本地服务器启动

#### 使用Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### 使用Node.js

```bash
# 安装serve
npm install -g serve

# 启动服务器
serve . -p 8000
```

#### 使用PHP

```bash
php -S localhost:8000
```

### 3. 访问网站

打开浏览器访问：`http://localhost:8000`

### 4. 开发工具配置

#### VS Code配置

创建`.vscode/settings.json`：

```json
{
    "liveServer.settings.port": 8000,
    "liveServer.settings.root": "/",
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "files.associations": {
        "*.css": "css"
    }
}
```

#### ESLint配置

创建`.eslintrc.js`：

```javascript
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn',
        'no-unused-vars': 'warn'
    }
}
```

## 构建优化

### 1. 文件压缩

#### CSS压缩

```bash
# 安装clean-css-cli
npm install -g clean-css-cli

# 压缩CSS文件
clean-css-cli -o dist/css/style.min.css css/*.css
```

#### JavaScript压缩

```bash
# 安装terser
npm install -g terser

# 压缩JavaScript文件
terser js/*.js -o dist/js/script.min.js --compress --mangle
```

#### HTML压缩

```bash
# 安装html-minifier
npm install -g html-minifier

# 压缩HTML文件
html-minifier --collapse-whitespace --remove-comments --minify-css --minify-js -o dist/index.html index.html
```

### 2. 图片优化

```bash
# 安装imagemin-cli
npm install -g imagemin-cli

# 优化图片
imagemin images/* --out-dir=dist/images --plugin=imagemin-mozjpeg --plugin=imagemin-pngquant
```

### 3. 构建脚本

创建`build.js`：

```javascript
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// 创建dist目录
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true })
}

// 复制HTML文件
execSync('cp *.html dist/')
execSync('cp -r pages dist/')

// 压缩CSS
execSync('clean-css-cli -o dist/css/style.min.css css/*.css')

// 压缩JavaScript
execSync('terser js/*.js -o dist/js/script.min.js --compress --mangle')

// 优化图片
execSync('imagemin images/* --out-dir=dist/images')

// 复制其他文件
execSync('cp -r docs dist/')

console.log('Build completed successfully!')
```

运行构建：

```bash
node build.js
```

## 静态托管部署

### 1. GitHub Pages

#### 配置步骤

1. 将代码推送到GitHub仓库
2. 进入仓库设置页面
3. 在Pages部分选择源分支
4. 等待部署完成

#### GitHub Actions自动部署

创建`.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: |
        npm install -g clean-css-cli terser html-minifier imagemin-cli
    
    - name: Build project
      run: |
        node build.js
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 2. Netlify

#### 手动部署

1. 访问 [Netlify](https://netlify.com)
2. 拖拽项目文件夹到部署区域
3. 等待部署完成

#### Git集成部署

1. 连接GitHub仓库
2. 配置构建设置：
   - Build command: `node build.js`
   - Publish directory: `dist`
3. 触发部署

#### netlify.toml配置

```toml
[build]
  command = "node build.js"
  publish = "dist"

[build.environment]
  NODE_VERSION = "16"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### 3. Vercel

#### 部署配置

创建`vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000"
        }
      ]
    },
    {
      "source": "/js/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000"
        }
      ]
    }
  ]
}
```

## 服务器部署

### 1. Nginx配置

创建`/etc/nginx/sites-available/warkai`：

```nginx
server {
    listen 80;
    server_name warkai.com www.warkai.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name warkai.com www.warkai.com;
    
    # SSL配置
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    # 网站根目录
    root /var/www/warkai;
    index index.html;
    
    # Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # 缓存配置
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # 主页面
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API代理（如果需要）
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/warkai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 2. Apache配置

创建`.htaccess`：

```apache
# 启用重写引擎
RewriteEngine On

# HTTPS重定向
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# 缓存配置
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
</IfModule>

# Gzip压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 安全头
<IfModule mod_headers.c>
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options nosniff
</IfModule>
```

## CDN配置

### 1. 阿里云CDN

#### 配置步骤

1. 登录阿里云控制台
2. 进入CDN服务
3. 添加加速域名
4. 配置源站信息
5. 设置缓存规则

#### 缓存规则配置

```
文件类型: .css, .js
缓存时间: 1年

文件类型: .png, .jpg, .jpeg, .gif, .ico, .svg
缓存时间: 1年

文件类型: .html
缓存时间: 1小时
```

### 2. 腾讯云CDN

#### 配置文件

```json
{
  "domain": "warkai.com",
  "origin": {
    "type": "domain",
    "value": "origin.warkai.com"
  },
  "cache": [
    {
      "type": "file",
      "value": ".css,.js",
      "time": 31536000
    },
    {
      "type": "file", 
      "value": ".png,.jpg,.jpeg,.gif,.ico,.svg",
      "time": 31536000
    },
    {
      "type": "file",
      "value": ".html",
      "time": 3600
    }
  ]
}
```

## 性能优化

### 1. 资源优化

#### 图片优化

```bash
# WebP转换
cwebp images/source.png -o images/source.webp -q 80

# 响应式图片
convert images/source.png -resize 800x600 images/source-800.png
convert images/source.png -resize 400x300 images/source-400.png
```

#### 字体优化

```css
/* 字体预加载 */
@font-face {
  font-family: 'Orbitron';
  src: url('fonts/orbitron.woff2') format('woff2');
  font-display: swap;
}
```

### 2. 代码分割

```javascript
// 动态导入
async function loadChart() {
  const { Chart } = await import('https://cdn.jsdelivr.net/npm/chart.js')
  return Chart
}

// 懒加载模块
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadChart().then(Chart => {
        // 初始化图表
      })
    }
  })
})
```

### 3. 缓存策略

```javascript
// Service Worker缓存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('warkai-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/css/gundam-style.css',
        '/js/gundam-script.js',
        '/images/warkai_dark_logo.png'
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

## 监控配置

### 1. Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. 性能监控

```javascript
// 页面加载性能
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0]
  
  // 发送性能数据
  fetch('/api/performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      loadTime: perfData.loadEventEnd - perfData.loadEventStart,
      domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime
    })
  })
})
```

### 3. 错误监控

```javascript
// 全局错误监控
window.addEventListener('error', (event) => {
  fetch('/api/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  })
})
```

## 安全配置

### 1. HTTPS配置

#### Let's Encrypt证书

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d warkai.com -d www.warkai.com

# 自动续期
sudo crontab -e
# 添加：0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. 安全头配置

```nginx
# 安全头
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self';" always;
```

### 3. 防火墙配置

```bash
# UFW防火墙
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw status
```

## 备份策略

### 1. 代码备份

```bash
# Git备份
git remote add backup https://backup-repo-url.git
git push backup main

# 定时备份脚本
#!/bin/bash
cd /var/www/warkai
git add .
git commit -m "Auto backup $(date)"
git push origin main
git push backup main
```

### 2. 数据备份

```bash
# 网站文件备份
tar -czf warkai-backup-$(date +%Y%m%d).tar.gz /var/www/warkai

# 上传到云存储
aws s3 cp warkai-backup-$(date +%Y%m%d).tar.gz s3://backup-bucket/
```

## 故障排除

### 1. 常见问题

#### 页面无法加载

```bash
# 检查Nginx状态
sudo systemctl status nginx

# 检查错误日志
sudo tail -f /var/log/nginx/error.log

# 检查配置语法
sudo nginx -t
```

#### 静态资源404

```bash
# 检查文件权限
ls -la /var/www/warkai/

# 修复权限
sudo chown -R www-data:www-data /var/www/warkai/
sudo chmod -R 755 /var/www/warkai/
```

#### SSL证书问题

```bash
# 检查证书状态
sudo certbot certificates

# 强制续期
sudo certbot renew --force-renewal
```

### 2. 性能问题

#### 页面加载慢

1. 检查网络延迟
2. 启用Gzip压缩
3. 优化图片大小
4. 使用CDN加速

#### JavaScript错误

1. 检查浏览器控制台
2. 查看错误日志
3. 验证文件完整性

## 维护计划

### 1. 定期维护

- **每周**：检查网站可用性、性能指标
- **每月**：更新依赖包、安全补丁
- **每季度**：备份验证、性能优化
- **每年**：SSL证书续期、架构评估

### 2. 监控指标

- 页面加载时间
- 错误率
- 用户访问量
- 服务器资源使用率

---

**WarkAI © 2025 | 人机智能新纪元**

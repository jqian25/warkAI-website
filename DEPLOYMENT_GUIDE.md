# WarkAI网站部署指南

## 🚀 系统要求

### 服务器环境
- **操作系统**: Ubuntu 20.04+ / CentOS 7+ / Windows Server 2019+
- **Web服务器**: Nginx 1.18+ 或 Apache 2.4+
- **Node.js**: 16.0+ (用于开发工具)
- **Python**: 3.8+ (用于后台管理)
- **内存**: 最小2GB，推荐4GB+
- **存储**: 最小10GB可用空间

### 浏览器支持
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📦 文件结构

```
warkAI_website/
├── index.html                    # 中文版主页
├── index-en.html                # 英文版主页
├── index-ja.html                # 日文版主页
├── login-enhanced.html          # 增强版登录页面
├── css/
│   ├── gundam-style.css         # 基础高达风格样式
│   ├── modules/                 # 模块化CSS
│   │   ├── particle-system.css # 粒子系统
│   │   ├── tron-grid.css       # TRON网格
│   │   ├── data-stream.css     # 数据流
│   │   ├── hologram.css        # 全息投影
│   │   └── energy-circuit.css  # 能量回路
│   └── ...
├── js/
│   ├── modules/                 # 模块化JavaScript
│   │   ├── module-manager.js   # 模块管理器
│   │   ├── tron-grid.js        # TRON网格控制
│   │   ├── data-stream.js      # 数据流控制
│   │   └── ...
│   └── ...
├── images/                      # 图片资源
├── audio/                       # 音频资源
├── pages/                       # 子页面
└── docs/                        # 文档
```

## 🔧 安装步骤

### 1. 基础环境安装

#### Ubuntu/Debian
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Nginx
sudo apt install nginx -y

# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# 安装Python
sudo apt install python3 python3-pip -y

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### CentOS/RHEL
```bash
# 更新系统
sudo yum update -y

# 安装Nginx
sudo yum install epel-release -y
sudo yum install nginx -y

# 安装Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs -y

# 安装Python
sudo yum install python3 python3-pip -y

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. 网站部署

```bash
# 创建网站目录
sudo mkdir -p /var/www/warkai

# 解压网站文件
sudo tar -xzf warkAI_website_final.tar.gz -C /var/www/warkai

# 设置权限
sudo chown -R www-data:www-data /var/www/warkai
sudo chmod -R 755 /var/www/warkai
```

### 3. Nginx配置

创建配置文件 `/etc/nginx/sites-available/warkai`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/warkai;
    index index.html index-en.html;

    # 启用Gzip压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 静态文件缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 主页面路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 多语言支持
    location /en {
        try_files $uri $uri/ /index-en.html;
    }

    location /ja {
        try_files $uri $uri/ /index-ja.html;
    }

    # 安全头设置
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

启用站点:
```bash
sudo ln -s /etc/nginx/sites-available/warkai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. SSL证书配置 (推荐)

使用Let's Encrypt免费SSL证书:

```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo crontab -e
# 添加以下行:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🎛️ 后台管理系统

### 1. 安装依赖

```bash
cd /var/www/warkai
pip3 install flask flask-cors sqlite3 bcrypt
```

### 2. 创建后台服务

创建 `backend/app.py`:

```python
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import bcrypt
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'
CORS(app)

# 初始化数据库
def init_db():
    conn = sqlite3.connect('warkai.db')
    c = conn.cursor()
    
    # 用户表
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  email TEXT UNIQUE NOT NULL,
                  password TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    # 反馈表
    c.execute('''CREATE TABLE IF NOT EXISTS feedback
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER,
                  message TEXT NOT NULL,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  FOREIGN KEY (user_id) REFERENCES users (id))''')
    
    conn.commit()
    conn.close()

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    
    # 密码加密
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    try:
        conn = sqlite3.connect('warkai.db')
        c = conn.cursor()
        c.execute("INSERT INTO users (email, password) VALUES (?, ?)", 
                  (email, hashed))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 409

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    conn = sqlite3.connect('warkai.db')
    c = conn.cursor()
    c.execute("SELECT id, password FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    conn.close()
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user[1]):
        session['user_id'] = user[0]
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/feedback', methods=['POST'])
def submit_feedback():
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    data = request.json
    message = data.get('message')
    
    if not message:
        return jsonify({'error': 'Message required'}), 400
    
    conn = sqlite3.connect('warkai.db')
    c = conn.cursor()
    c.execute("INSERT INTO feedback (user_id, message) VALUES (?, ?)", 
              (session['user_id'], message))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Feedback submitted successfully'}), 201

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=False)
```

### 3. 创建系统服务

创建 `/etc/systemd/system/warkai-backend.service`:

```ini
[Unit]
Description=WarkAI Backend Service
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/warkai/backend
ExecStart=/usr/bin/python3 app.py
Restart=always

[Install]
WantedBy=multi-user.target
```

启动服务:
```bash
sudo systemctl daemon-reload
sudo systemctl start warkai-backend
sudo systemctl enable warkai-backend
```

## 🎵 音频文件配置

### 1. 音频格式支持
- **MP3**: 主要格式，兼容性最好
- **OGG**: 开源格式，质量好
- **WAV**: 无损格式，文件较大

### 2. 音频优化
```bash
# 使用FFmpeg压缩音频
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k output.mp3

# 创建多格式支持
ffmpeg -i bgm.mp3 -codec:a libvorbis bgm.ogg
```

## 🔧 性能优化

### 1. 图片优化
```bash
# 安装优化工具
sudo apt install imagemagick optipng jpegoptim -y

# 优化PNG
find images/ -name "*.png" -exec optipng -o7 {} \;

# 优化JPEG
find images/ -name "*.jpg" -exec jpegoptim --max=85 {} \;
```

### 2. JavaScript/CSS压缩
```bash
# 安装UglifyJS和CleanCSS
npm install -g uglify-js clean-css-cli

# 压缩JavaScript
find js/ -name "*.js" -exec uglifyjs {} -o {}.min \;

# 压缩CSS
find css/ -name "*.css" -exec cleancss -o {}.min {} \;
```

### 3. 启用HTTP/2
在Nginx配置中添加:
```nginx
listen 443 ssl http2;
```

## 📊 监控和维护

### 1. 日志监控
```bash
# 查看Nginx访问日志
sudo tail -f /var/log/nginx/access.log

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 查看后台服务日志
sudo journalctl -u warkai-backend -f
```

### 2. 性能监控
```bash
# 安装htop
sudo apt install htop -y

# 监控系统资源
htop

# 监控磁盘使用
df -h

# 监控网络连接
netstat -tulpn
```

### 3. 备份策略
```bash
# 创建备份脚本
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/warkai_$DATE.tar.gz /var/www/warkai
sqlite3 /var/www/warkai/backend/warkai.db ".backup /backup/warkai_db_$DATE.db"

# 删除30天前的备份
find /backup -name "warkai_*" -mtime +30 -delete
```

## 🚨 故障排除

### 常见问题

1. **页面无法加载**
   - 检查Nginx状态: `sudo systemctl status nginx`
   - 检查配置语法: `sudo nginx -t`
   - 查看错误日志: `sudo tail /var/log/nginx/error.log`

2. **动画效果不流畅**
   - 检查浏览器兼容性
   - 降低动画复杂度
   - 启用硬件加速

3. **登录功能异常**
   - 检查后台服务: `sudo systemctl status warkai-backend`
   - 检查数据库权限
   - 查看应用日志

4. **音频无法播放**
   - 检查音频文件格式
   - 确认浏览器音频权限
   - 检查文件路径

### 联系支持
- 技术支持: tech@warkai.com
- 文档更新: docs@warkai.com
- 问题反馈: feedback@warkai.com

---

**版本**: v2.5.0  
**更新日期**: 2025-10-05  
**维护团队**: WarkAI Technology Co., Ltd.

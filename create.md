

● 项目结构清楚了。Vite + React 前端 + Express 后端。部署方案：

  部署架构

  Nginx (80/443)
  ├── / → dist/ (静态前端)
  └── /api → localhost:3001 (Express 后端)

  步骤

  1. 服务器准备

  宝塔面板装好后，安装：
  - Node.js (软件商店 → Node.js 版本管理器)
  - PM2 (终端运行 npm install -g pm2)

  2. 上传项目

  用宝塔文件管理器或 SFTP 上传整个项目到 /www/wwwroot/your-site/

  3. 构建前端

  终端执行：
  cd /www/wwwroot/your-site
  npm install
  npm run build

  生成 dist/ 目录。

  4. 配置后端

  cd /www/wwwroot/mySelf/server
  npm install

  安全问题：API key 硬编码在 server/index.js。建议改用环境变量：
  # 在 server/ 目录创建 .env
  RESEND_API_KEY=re_MNBccnpJ_KEu9E74Gf2syWKss6bUfdsHd

  然后修改 server/index.js 用 process.env.RESEND_API_KEY。

  5. PM2 启动后端

  cd /www/wwwroot/your-site/server
  pm2 start index.js --name portfolio-api
  pm2 save
  pm2 startup  # 开机自启

  6. 宝塔配置 Nginx

  宝塔 → 网站 → 添加站点 → 填域名

  站点设置 → 配置文件，添加：

  server {
      listen 80;
      server_name your-domain.com;
      root /www/wwwroot/your-site/dist;
      index index.html;

      # 前端路由
      location / {
          try_files $uri $uri/ /index.html;
      }
    
      # API 反向代理
      location /api/ {
          proxy_pass http://127.0.0.1:3001;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
      }
  }

  7. SSL 证书（可选）

  宝塔 → 网站 → SSL → Let's Encrypt 免费证书

---
  检查清单

  ┌────────────────────────┬────────────────────────┐
  │          项目          │          状态          │
  ├────────────────────────┼────────────────────────┤
  │ Node.js 安装           │ 需做                   │
  ├────────────────────────┼────────────────────────┤
  │ 前端构建 npm run build │ 需做                   │
  ├────────────────────────┼────────────────────────┤
  │ 后端 npm install       │ 需做                   │
  ├────────────────────────┼────────────────────────┤
  │ PM2 启动后端           │ 需做                   │
  ├────────────────────────┼────────────────────────┤
  │ Nginx 反向代理配置     │ 需做                   │
  ├────────────────────────┼────────────────────────┤
  │ API key 改环境变量     │ 建议做                 │
  ├────────────────────────┼────────────────────────┤
  │ 防火墙放行 3001 端口   │ 不需要，Nginx 内部代理 │
  └────────────────────────┴────────────────────────┘

  需要我帮你修改 server/index.js 改用环境变量读取 API key 吗？

✻ Cogitated for 45s

※ recap: 你想把 Vite+React 前端 + Express
  邮件后端项目通过宝塔部署到阿里云。我已经给了完整部署步骤，下一步是你按步骤操作，或者我帮你把 API key 改成环境变量读取。
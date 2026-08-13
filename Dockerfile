# --- 第一階段：Build 靜態檔案 ---
FROM node:24-alpine AS builder

WORKDIR /app

# 安裝套件依賴
COPY package*.json ./
RUN npm ci

# 複製原始碼並執行 SSG 生成
COPY . .
RUN npx nuxt generate

# --- 第二階段：Nginx 靜態伺服器 ---
FROM nginx:alpine AS runner

# 複製自訂的 Nginx 設定（解決 SPA/SSG 路由問題）
COPY --from=builder /app/.output/public /usr/share/nginx/html

# 調整 Nginx 支援前端路由與港口設定
RUN echo $'server {\n\
  listen 80;\n\
  location / {\n\
  root /usr/share/nginx/html;\n\
  index index.html index.htm;\n\
  try_files $uri $uri/ /index.html;\n\
  }\n\
  }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
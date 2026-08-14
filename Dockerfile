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

ARG APP_ENV=production
ENV APP_ENV=$APP_ENV

# 複製 SSG 產出的靜態檔案
COPY --from=builder /app/.output/public /usr/share/nginx/html

# 透過 entrypoint 腳本依據環境變數動態生成 Nginx 設定（測試機環境加入防爬蟲 Headers）
RUN echo $'#!/bin/sh\n\
  ROBOTS_HEADER=""\n\
  if [ "$NUXT_ENV" = "staging" ] || [ "$NUXT_ENV" = "dev" ] || [ "$NUXT_ENV" = "test" ] || [ "$NUXT_ENV" = "development" ]; then\n\
  ROBOTS_HEADER="    add_header X-Robots-Tag \\"noindex, nofollow\\" always;\\n    add_header X-UA-Compatible \\"IE=edge\\" always;"\n\
  fi\n\
  \n\
  cat <<EOF > /etc/nginx/conf.d/default.conf\n\
  server {\n\
  listen 80;\n\
  location / {\n\
  root /usr/share/nginx/html;\n\
  index index.html index.htm;\n\
  try_files \$uri \$uri/ /index.html;\n\
  $(echo -e "$ROBOTS_HEADER")\n\
  }\n\
  }\n\
  EOF\n\
  ' > /docker-entrypoint.d/40-configure-nginx.sh && chmod +x /docker-entrypoint.d/40-configure-nginx.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
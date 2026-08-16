# --- 第一階段：Build 靜態檔案 ---
FROM node:24-alpine AS builder

WORKDIR /app

# 宣告 Build 階段環境變數
ARG NUXT_ENV
ENV NUXT_ENV=$NUXT_ENV

ARG NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_API_BASE=$NUXT_PUBLIC_API_BASE

ARG NUXT_PUBLIC_LIFF_ID
ENV NUXT_PUBLIC_LIFF_ID=$NUXT_PUBLIC_LIFF_ID

# 安裝套件依賴
COPY package*.json ./
RUN npm ci

# 複製原始碼並執行 SSG 生成
COPY . .
RUN npx nuxt generate

# --- 第二階段：Nginx 靜態伺服器 ---
FROM nginx:alpine AS runner

# 宣告 Runner 階段環境變數（支援 Build-time 與 Runtime 注入）
ARG NUXT_ENV
ENV NUXT_ENV=$NUXT_ENV

ARG LINE_CHANNEL_ACCESS_TOKEN
ENV LINE_CHANNEL_ACCESS_TOKEN=$LINE_CHANNEL_ACCESS_TOKEN

# 複製 SSG 產出的靜態檔案
COPY --from=builder /app/.output/public /usr/share/nginx/html

# 複製 entrypoint 腳本依據環境變數動態生成 Nginx 設定（測試機環境加入防爬蟲 Headers）
COPY nginx-entrypoint.sh /docker-entrypoint.d/40-configure-nginx.sh
RUN chmod +x /docker-entrypoint.d/40-configure-nginx.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
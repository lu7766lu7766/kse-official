#!/bin/sh
set -e

ROBOTS_HEADER=""
if [ "$CRAWLER_ALLOW" != "true" ]; then
  ROBOTS_HEADER="    add_header X-Robots-Tag \"noindex, nofollow\" always;
    add_header X-UA-Compatible \"IE=edge\" always;"
fi

cat <<EOF > /etc/nginx/conf.d/default.conf
server {
  listen 80;
  root /usr/share/nginx/html;

  # 帶有 Hash 的 Nuxt 靜態打包資源 (JS/CSS/圖片)
  location /_nuxt/ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
$ROBOTS_HEADER
  }

  # 不存在的網址回傳真正的 404（避免 SPA fallback 造成 soft-404 傷 SEO）
  error_page 404 /404.html;

  # HTML 頁面及其他請求：no-cache = 每次向伺服器驗證（ETag），發版後立即生效，但允許 304 省流量
  location / {
    index index.html;
    try_files \$uri \$uri/index.html \$uri.html =404;
    add_header Cache-Control "no-cache" always;
$ROBOTS_HEADER
  }
}
EOF

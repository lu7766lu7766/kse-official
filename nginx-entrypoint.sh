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

  # 帶有 Hash 的 Nuxt 靜態打包資源 (JS/CSS)
  location /_nuxt/ {
    root /usr/share/nginx/html;
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }

  # HTML 頁面及其他請求：禁用瀏覽器快取，確保每次發版即時更新
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files \$uri \$uri/ /index.html;
    add_header Cache-Control "no-cache, no-store, must-revalidate" always;
    add_header Pragma "no-cache" always;
    add_header Expires "0" always;
$ROBOTS_HEADER
  }
}
EOF

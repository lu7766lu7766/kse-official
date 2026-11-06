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

  # 前面有 Railway 的 HTTPS proxy：轉址只送相對路徑，避免 Location 變成 http:// 或帶 :80
  absolute_redirect off;

  # llms.txt / robots.txt / sitemap.xml 含中文，明確宣告 UTF-8 以免被誤判編碼
  charset utf-8;
  charset_types text/plain text/xml application/xml text/css application/javascript application/json;

  # 結尾斜線一律 301 到無斜線版本（首頁除外），避免 /services 與 /services/ 成為重複網址
  # 正規式排除開頭多重斜線，避免 //evil.com/ 被轉成 //evil.com（open redirect）
  rewrite ^/+([^/].*?)/+\$ /\$1 permanent;

  # 舊網址真正的 301（與 nuxt.config.ts routeRules 同步；靜態檔只有 meta refresh，搜尋引擎較慢才轉移權重）
  location = /cases { return 301 /; }
  location = /news/recovery-after-game { return 301 /news/post-workout-recovery; }
  location = /news/fascia-basics { return 301 /news/muscle-vs-fascia; }
  location = /news/core-stability-desk { return 301 /news/pelvic-tilt-causes; }
  location = /news/youth-strength { return 301 /news/yuying-basketball-training; }
  location = /news/sports-massage-for-everyone { return 301 /news/sports-massage-guide; }

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

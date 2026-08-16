#!/bin/sh
set -e

ROBOTS_HEADER=""
if [ "$NUXT_ENV" = "staging" ] || [ "$NUXT_ENV" = "dev" ] || [ "$NUXT_ENV" = "test" ] || [ "$NUXT_ENV" = "development" ]; then
  ROBOTS_HEADER="    add_header X-Robots-Tag \"noindex, nofollow\" always;
    add_header X-UA-Compatible \"IE=edge\" always;"
fi

LINE_TOKEN="$LINE_CHANNEL_ACCESS_TOKEN"

cat <<EOF > /etc/nginx/conf.d/default.conf
server {
  listen 80;

  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files \$uri \$uri/ /index.html;
$ROBOTS_HEADER
  }

  location /api/line-push {
    proxy_pass https://api.line.me/v2/bot/message/push;
    proxy_ssl_server_name on;
    proxy_set_header Host api.line.me;
    proxy_set_header Authorization "Bearer $LINE_TOKEN";
    proxy_set_header Content-Type "application/json";
    proxy_pass_request_body on;
  }
}
EOF

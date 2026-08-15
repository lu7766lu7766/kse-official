#!/bin/sh
set -e

ROBOTS_HEADER=""
if [ "$NUXT_ENV" = "staging" ] || [ "$NUXT_ENV" = "dev" ] || [ "$NUXT_ENV" = "test" ] || [ "$NUXT_ENV" = "development" ]; then
  ROBOTS_HEADER="    add_header X-Robots-Tag \"noindex, nofollow\" always;
    add_header X-UA-Compatible \"IE=edge\" always;"
fi

cat <<EOF > /etc/nginx/conf.d/default.conf
server {
  listen 80;
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files \$uri \$uri/ /index.html;
$ROBOTS_HEADER
  }
}
EOF

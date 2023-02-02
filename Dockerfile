FROM cgr.dev/chainguard/nginx:1.23.3

COPY ./dist /var/lib/nginx/html

COPY ./nginx.conf /etc/nginx

EXPOSE 8080

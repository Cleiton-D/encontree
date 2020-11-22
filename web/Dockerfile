FROM node:lts-alpine as builder

COPY . .
RUN yarn install
RUN yarn build


FROM nginx:stable-alpine

COPY --from=builder build /usr/share/nginx/html
COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80

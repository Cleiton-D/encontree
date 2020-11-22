FROM node:lts-alpine as builder

COPY . .
RUN yarn install
RUn yarn build


FROM node:lts-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir app && chown -R appuser:appgroup ./app

COPY storage ./app/storage
RUN chmod -R 777 ./app/storage

USER appuser

COPY --from=builder dist ./app/dist
COPY --from=builder node_modules ./app/node_modules
COPY package.json ./app/package.json
COPY ormconfig.js ./app/ormconfig.js
COPY init.sh ./app/init.sh

ENV NODE_ENV=production

WORKDIR /app

ENTRYPOINT ["/bin/ash", "-c"]
CMD ["./init.sh"]

EXPOSE 3333

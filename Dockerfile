FROM arm64v8/node:14-alpine
RUN apk --no-cache add curl

ADD ./ /var/server/

CMD ["yarn", "start"]

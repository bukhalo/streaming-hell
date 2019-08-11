FROM node:12-alpine as builder

WORKDIR /app

RUN apk add --no-cache curl git && cd /tmp && \
    curl -#L https://github.com/tj/node-prune/releases/download/v1.0.1/node-prune_1.0.1_linux_amd64.tar.gz | tar -xvzf- && \
    mv -v node-prune /usr/local/bin && rm -rvf * && \
    echo "yarn cache clean && node-prune" > /usr/local/bin/node-clean && chmod +x /usr/local/bin/node-clean

ADD package.json ./
RUN yarn --frozen-lockfile --non-interactive
ADD . ./
RUN yarn build

ENV NODE_ENV=production
RUN yarn --frozen-lockfile --non-interactive --production && node-clean

FROM node:12-alpine

WORKDIR /app

ADD package.json ./

COPY --from=builder ./app/node_modules ./node_modules/
COPY --from=builder ./app/dist ./

CMD ["node", "index.js"]

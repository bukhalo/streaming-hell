# Build dist folder step
FROM node:12-alpine as builder
WORKDIR /app

ARG NPM_AUTH_TOKEN
RUN echo $NPM_AUTH_TOKEN
RUN npm set //npm.pkg.github.com/:_authToken $NPM_AUTH_TOKEN
ADD .npmrc package.json package-lock.json ./
RUN npm ci
ADD . ./
RUN npm run build

# Install dependecies (production only) stage
FROM node:12-alpine as deps
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder ./app/.npmrc ./

ADD package.json package-lock.json ./
RUN npm ci

# Final stage
FROM node:12-alpine
WORKDIR /app

ADD package.json ./

COPY --from=builder ./app/dist ./dist/
COPY --from=deps ./app/node_modules ./node_modules/

CMD ["npm", "run", "start"]

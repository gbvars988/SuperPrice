FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm install --production

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ARG REACT_APP_PRODUCT_SERVICE_URL
ENV REACT_APP_PRODUCT_SERVICE_URL=$REACT_APP_PRODUCT_SERVICE_URL
ARG REACT_APP_USER_SERVICE_URL
ENV REACT_APP_USER_SERVICE_URL=$REACT_APP_USER_SERVICE_URL
ARG REACT_APP_DELIVERY_SERVICE_URL
ENV REACT_APP_DELIVERY_SERVICE_URL=$REACT_APP_DELIVERY_SERVICE_URL

RUN npm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_nodules
COPY --from=builder /app/package.json ./package.json
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -S app && adduser -S app -G app
# give user app ownership of the app directory
RUN chown -R app:app /app
USER app

# these env vars can be overwritten
#ENV REACT_APP_PRODUCT_SERVICE_URL=http://localhost:8080/product-service
#ENV REACT_APP_USER_SERVICE_URL=http://localhost:8081/user-service
#ENV REACT_APP_DELIVERY_SERVICE_URL=http://localhost:8082/delivery-service

EXPOSE 3000

CMD ["npm", "start"]


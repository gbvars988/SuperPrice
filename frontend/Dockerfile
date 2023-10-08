FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install --production

COPY . .
RUN npm run build

ENV NODE_ENV production

RUN addgroup -S app && adduser -S app -G app
# give user app ownership of the app directory
RUN chown -R app:app /app
USER app

# these env vars can be overwritten
ENV REACT_APP_PRODUCT_SERVICE_URL=http://localhost:8080/product-service
ENV REACT_APP_USER_SERVICE_URL=http://localhost:8081/user-service
ENV REACT_APP_DELIVERY_SERVICE_URL=http://localhost:8082/delivery-service

EXPOSE 3000

CMD ["npm", "start"]


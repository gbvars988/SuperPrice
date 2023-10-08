# Build stage
FROM node:20-alpine AS build

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV production

# Copy only the build output from the previous stage
COPY --from=build /app/build ./build
COPY --from=build /app/build ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

RUN addgroup -S app && adduser -S app -G app
# give user app ownership of the app directory
RUN chown -R app:app /app
USER app

# Default env vars (can be overridden)
ENV REACT_APP_PRODUCT_SERVICE_URL=http://SuperPrice2-env.eba-pk5y7qbh.us-east-1.elasticbeanstalk.com:8080/product-service
ENV REACT_APP_USER_SERVICE_URL=http://SuperPrice2-env.eba-pk5y7qbh.us-east-1.elasticbeanstalk.com:8081/user-service
ENV REACT_APP_DELIVERY_SERVICE_URL=http://SuperPrice2-env.eba-pk5y7qbh.us-east-1.elasticbeanstalk.com:8082/delivery-service

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
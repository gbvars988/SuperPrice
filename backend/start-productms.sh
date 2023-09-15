#!/bin/bash

# Navigate to the backend directory relative to the script
cd "$(dirname "$0")"/backend

# Start product microservice
cd product-ms && ./mvnw spring-boot:run
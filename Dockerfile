# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json tsconfig*.json ./
COPY tsconfig.app.json ./
COPY tsconfig.node.json ./
RUN npm install
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

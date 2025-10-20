FROM node:20-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

# Build shared libs first
WORKDIR /libs
COPY libs/package.json libs/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY libs/ ./
RUN pnpm build

# Build host app
WORKDIR /app
COPY host/package.json host/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY host/ ./
RUN pnpm build

FROM nginx:alpine

# Copy custom nginx config
COPY host/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/dist/host /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]

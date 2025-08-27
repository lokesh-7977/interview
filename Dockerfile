# Stage 1: Build Dependencies

FROM node:22-alpine AS build-deps

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache --virtual .build-deps \
    make \
    g++ \
    && npm install -g pnpm \
    && apk del .build-deps

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build Application
FROM build-deps AS build-app

WORKDIR /app

COPY . .

# Build the application (add your build command here if needed)
RUN pnpm build

# Stage 3: Production Image
FROM node:22-alpine AS final

# Update Alpine packages to latest versions to reduce vulnerabilities
RUN apk update && apk upgrade

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache --virtual .runtime-deps \
    && npm install -g pnpm \
    && apk del .runtime-deps

# Copy necessary files from previous stages
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose application port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Command to run the application
CMD ["pnpm", "start:prod"]

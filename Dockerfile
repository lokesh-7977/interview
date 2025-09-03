# Stage 1: Build + Install dependencies + Production prune
FROM node:22-alpine AS build

WORKDIR /app

# Install pnpm globally for build
RUN npm install -g pnpm

# Copy package files only
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including dev)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Prune dev dependencies, clean pnpm store (reduce size)
RUN pnpm prune --prod && pnpm store prune

# (Optional) Gzip static assets if you have them (adjust path if needed)
# RUN find ./dist/public -type f -exec gzip -n -9 -f {} \;

# Stage 2: Production image
FROM node:22-alpine AS final

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S appuser -u 1001

# Update Alpine packages and install dumb-init
RUN apk update && apk upgrade && apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy pruned node_modules and build output
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Adjust ownership
RUN chown -R appuser:nodejs /app

# Use non-root user
USER appuser

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose port
EXPOSE 4000

# Use dumb-init for signal handling
ENTRYPOINT ["dumb-init", "--"]

# Run app with node directly, adjust if your entry is different
CMD ["node", "dist/server.js"]

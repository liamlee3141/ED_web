# Docker Configuration for Decoration Engineering Website
# Multi-stage build for optimized production deployment

# Build stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_GA_TRACKING_ID
ARG VITE_CONTACT_EMAIL

# Set environment variables
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_GA_TRACKING_ID=$VITE_GA_TRACKING_ID
ENV VITE_CONTACT_EMAIL=$VITE_CONTACT_EMAIL

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Create nginx directories
RUN mkdir -p /var/log/nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/log/nginx && \
    chmod -R 755 /usr/share/nginx/html

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Add labels for better container management
LABEL maintainer="MiniMax Agent"
LABEL description="Decoration Engineering Website"
LABEL version="1.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
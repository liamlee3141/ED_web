#!/bin/bash
# Docker Deployment Script for Decoration Engineering Website
# Supports both development and production deployment

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
IMAGE_NAME="decoration-engineering-website"
CONTAINER_NAME="decoration-engineering-web"
PORT="8080"
ENV_FILE=".env"

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo ""
    echo "================================================="
    echo "🐳 $1"
    echo "================================================="
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

# Use docker compose or docker-compose
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

print_header "Docker Deployment for Decoration Engineering Website"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    print_warning "No .env file found. Creating template..."
    cat > $ENV_FILE << EOF
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key

# Optional: Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Optional: Contact Configuration
VITE_CONTACT_EMAIL=contact@your-domain.com
EOF
    print_warning "Please edit .env file with your actual credentials before deploying"
    exit 1
fi

print_status "Environment file found: $ENV_FILE"

# Parse command line arguments
MODE="production"
while [[ $# -gt 0 ]]; do
    case $1 in
        --dev|--development)
            MODE="development"
            shift
            ;;
        --prod|--production)
            MODE="production"
            shift
            ;;
        --port)
            PORT="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  --dev, --development    Deploy in development mode"
            echo "  --prod, --production    Deploy in production mode (default)"
            echo "  --port PORT            Set custom port (default: 8080)"
            echo "  --help                 Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

print_info "Deployment mode: $MODE"
print_info "Port: $PORT"

# Stop and remove existing containers
print_header "Step 1: Cleanup Existing Containers"
if docker ps -q --filter "name=$CONTAINER_NAME" | grep -q .; then
    print_info "Stopping existing container..."
    docker stop $CONTAINER_NAME
    print_status "Container stopped"
fi

if docker ps -aq --filter "name=$CONTAINER_NAME" | grep -q .; then
    print_info "Removing existing container..."
    docker rm $CONTAINER_NAME
    print_status "Container removed"
fi

# Remove existing image if exists
if docker images -q $IMAGE_NAME | grep -q .; then
    print_info "Removing existing image..."
    docker rmi $IMAGE_NAME
    print_status "Image removed"
fi

if [ "$MODE" = "development" ]; then
    print_header "Step 2: Development Deployment"
    
    # Build and run development container
    print_info "Building development image..."
    docker build -f docker/Dockerfile -t $IMAGE_NAME \
        --build-arg VITE_SUPABASE_URL="$(grep VITE_SUPABASE_URL $ENV_FILE | cut -d '=' -f2)" \
        --build-arg VITE_SUPABASE_ANON_KEY="$(grep VITE_SUPABASE_ANON_KEY $ENV_FILE | cut -d '=' -f2)" \
        --build-arg VITE_GA_TRACKING_ID="$(grep VITE_GA_TRACKING_ID $ENV_FILE | cut -d '=' -f2)" \
        --build-arg VITE_CONTACT_EMAIL="$(grep VITE_CONTACT_EMAIL $ENV_FILE | cut -d '=' -f2)" \
        .
    
    print_status "Development image built successfully"
    
    print_info "Starting development container..."
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:80 \
        --restart unless-stopped \
        $IMAGE_NAME
    
    print_status "Development container started"
    
else
    print_header "Step 2: Production Deployment with Docker Compose"
    
    # Use Docker Compose for production
    print_info "Building and starting with Docker Compose..."
    $COMPOSE_CMD -f docker/docker-compose.yml up --build -d
    
    print_status "Production deployment completed"
fi

print_header "Step 3: Deployment Verification"

# Wait for container to be ready
print_info "Waiting for container to be ready..."
sleep 10

# Check if container is running
if docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}" | grep -q $CONTAINER_NAME; then
    print_status "Container is running"
else
    print_error "Container failed to start"
    print_info "Container logs:"
    docker logs $CONTAINER_NAME
    exit 1
fi

# Test HTTP response
print_info "Testing HTTP response..."
if curl -f -s http://localhost:$PORT > /dev/null; then
    print_status "Website is responding correctly"
else
    print_warning "Website might not be ready yet. Check manually."
fi

print_header "Deployment Completed Successfully!"

print_status "Your website is now running in Docker!"
echo "🌐 Local URL: http://localhost:$PORT"
if [ "$MODE" = "production" ]; then
    echo "🐳 Management: docker-compose -f docker/docker-compose.yml"
else
    echo "🐳 Container: $CONTAINER_NAME"
fi
echo ""
print_info "Useful commands:"
echo "📊 View logs: docker logs -f $CONTAINER_NAME"
echo "🔍 Container status: docker ps"
echo "🛑 Stop container: docker stop $CONTAINER_NAME"
if [ "$MODE" = "production" ]; then
    echo "🔄 Update: $COMPOSE_CMD -f docker/docker-compose.yml up --build -d"
    echo "🛑 Stop all: $COMPOSE_CMD -f docker/docker-compose.yml down"
fi
echo "🗑️  Remove: docker rm $CONTAINER_NAME && docker rmi $IMAGE_NAME"
echo ""
print_info "Health check: curl http://localhost:$PORT/health"
print_status "Happy containerizing! 🐳"
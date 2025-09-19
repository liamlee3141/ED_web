#!/bin/bash
# Website Monitoring and Health Check Script
# Comprehensive monitoring for deployed decoration engineering website

set -e

# Configuration
WEBSITE_URL="https://your-domain.com"
CONTACT_EMAIL="admin@your-domain.com"
LOG_FILE="/var/log/website-monitor.log"
ALERT_FILE="/tmp/website-alerts.log"
MAX_RESPONSE_TIME=5  # seconds
CHECK_INTERVAL=300   # 5 minutes

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Functions
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
    log_message "SUCCESS: $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    log_message "WARNING: $1"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    log_message "ERROR: $1"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: $1" >> "$ALERT_FILE"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
    log_message "INFO: $1"
}

# Health check functions
check_website_status() {
    print_info "Checking website status..."
    
    # Check HTTP status code
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$WEBSITE_URL" || echo "000")
    RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" "$WEBSITE_URL" || echo "999")
    
    if [ "$HTTP_STATUS" = "200" ]; then
        print_status "Website is responding (HTTP $HTTP_STATUS)"
    else
        print_error "Website returned HTTP $HTTP_STATUS"
        return 1
    fi
    
    # Check response time
    if [ "$(echo "$RESPONSE_TIME < $MAX_RESPONSE_TIME" | bc -l)" = "1" ]; then
        print_status "Response time: ${RESPONSE_TIME}s (under ${MAX_RESPONSE_TIME}s threshold)"
    else
        print_warning "Slow response time: ${RESPONSE_TIME}s (over ${MAX_RESPONSE_TIME}s threshold)"
    fi
}

check_ssl_certificate() {
    print_info "Checking SSL certificate..."
    
    CERT_EXPIRY=$(echo | openssl s_client -servername "${WEBSITE_URL#https://}" -connect "${WEBSITE_URL#https://}:443" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2)
    CERT_EXPIRY_EPOCH=$(date -d "$CERT_EXPIRY" +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( (CERT_EXPIRY_EPOCH - CURRENT_EPOCH) / 86400 ))
    
    if [ "$DAYS_UNTIL_EXPIRY" -gt 30 ]; then
        print_status "SSL certificate valid for $DAYS_UNTIL_EXPIRY days"
    elif [ "$DAYS_UNTIL_EXPIRY" -gt 7 ]; then
        print_warning "SSL certificate expires in $DAYS_UNTIL_EXPIRY days - renewal needed soon"
    else
        print_error "SSL certificate expires in $DAYS_UNTIL_EXPIRY days - URGENT renewal needed"
    fi
}

check_contact_form() {
    print_info "Checking contact form functionality..."
    
    # Test if contact form endpoint is accessible
    FORM_CHECK=$(curl -s -X POST "$WEBSITE_URL" -H "Content-Type: application/json" -d '{"test":"true"}' -w "%{http_code}" -o /dev/null || echo "000")
    
    if [ "$FORM_CHECK" != "000" ]; then
        print_status "Contact form endpoint is accessible"
    else
        print_warning "Contact form endpoint test failed"
    fi
}

check_chinese_content() {
    print_info "Checking Chinese content rendering..."
    
    # Check if Chinese characters are present in the response
    CHINESE_CHECK=$(curl -s "$WEBSITE_URL" | grep -c "[一-鿿]" || echo "0")
    
    if [ "$CHINESE_CHECK" -gt 0 ]; then
        print_status "Chinese content detected in website"
    else
        print_warning "No Chinese content detected - possible encoding issue"
    fi
}

check_required_assets() {
    print_info "Checking critical assets..."
    
    # Check for critical CSS and JS files
    ASSETS_STATUS=$(curl -s "$WEBSITE_URL" | grep -E '(\.(css|js))' | wc -l)
    
    if [ "$ASSETS_STATUS" -gt 0 ]; then
        print_status "Critical assets (CSS/JS) are loading"
    else
        print_warning "Critical assets may not be loading properly"
    fi
}

check_mobile_responsiveness() {
    print_info "Checking mobile responsiveness..."
    
    # Check for viewport meta tag
    VIEWPORT_CHECK=$(curl -s "$WEBSITE_URL" | grep -c "viewport" || echo "0")
    
    if [ "$VIEWPORT_CHECK" -gt 0 ]; then
        print_status "Mobile viewport configuration detected"
    else
        print_warning "Mobile viewport configuration missing"
    fi
}

check_performance_metrics() {
    print_info "Checking performance metrics..."
    
    # Check page size
    PAGE_SIZE=$(curl -s "$WEBSITE_URL" | wc -c)
    PAGE_SIZE_MB=$(echo "scale=2; $PAGE_SIZE / 1024 / 1024" | bc)
    
    if [ "$(echo "$PAGE_SIZE_MB < 2" | bc -l)" = "1" ]; then
        print_status "Page size: ${PAGE_SIZE_MB}MB (optimal)"
    elif [ "$(echo "$PAGE_SIZE_MB < 5" | bc -l)" = "1" ]; then
        print_warning "Page size: ${PAGE_SIZE_MB}MB (acceptable but could be optimized)"
    else
        print_warning "Page size: ${PAGE_SIZE_MB}MB (large - optimization recommended)"
    fi
}

check_server_resources() {
    if command -v free &> /dev/null; then
        print_info "Checking server resources..."
        
        # Check memory usage
        MEM_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100.0}')
        if [ "$MEM_USAGE" -lt 80 ]; then
            print_status "Memory usage: ${MEM_USAGE}% (healthy)"
        else
            print_warning "Memory usage: ${MEM_USAGE}% (high)"
        fi
        
        # Check disk space
        DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | cut -d'%' -f1)
        if [ "$DISK_USAGE" -lt 80 ]; then
            print_status "Disk usage: ${DISK_USAGE}% (healthy)"
        else
            print_warning "Disk usage: ${DISK_USAGE}% (high)"
        fi
    fi
}

check_nginx_status() {
    if command -v systemctl &> /dev/null; then
        print_info "Checking web server status..."
        
        if systemctl is-active --quiet nginx; then
            print_status "Nginx is running"
        else
            print_error "Nginx is not running"
            # Attempt to restart
            print_info "Attempting to restart Nginx..."
            if systemctl start nginx; then
                print_status "Nginx restarted successfully"
            else
                print_error "Failed to restart Nginx"
            fi
        fi
    fi
}

generate_report() {
    print_info "Generating monitoring report..."
    
    REPORT_FILE="/tmp/website-health-report-$(date +%Y%m%d-%H%M%S).txt"
    
    cat > "$REPORT_FILE" << EOF
=================================================
Website Health Check Report
Generated: $(date)
Website: $WEBSITE_URL
=================================================

SUMMARY:
$(tail -n 20 "$LOG_FILE" | grep "$(date '+%Y-%m-%d')")

ALERTS (Last 24 hours):
$(find "$ALERT_FILE" -mtime -1 -exec cat {} \; 2>/dev/null || echo "No alerts in last 24 hours")

RECOMMENDATIONS:
- Monitor SSL certificate expiration
- Keep response times under ${MAX_RESPONSE_TIME}s
- Maintain server resources below 80% usage
- Regular security updates
- Monitor contact form functionality

=================================================
Next check scheduled in $((CHECK_INTERVAL / 60)) minutes
=================================================
EOF
    
    print_status "Report generated: $REPORT_FILE"
}

send_alert_notification() {
    if [ -s "$ALERT_FILE" ]; then
        print_info "Sending alert notifications..."
        
        # Count alerts in last hour
        RECENT_ALERTS=$(find "$ALERT_FILE" -mmin -60 -exec cat {} \; 2>/dev/null | wc -l)
        
        if [ "$RECENT_ALERTS" -gt 0 ]; then
            # You can integrate with email, Slack, Discord, etc.
            print_warning "$RECENT_ALERTS alerts in the last hour"
            
            # Example: Send email (requires mail command)
            if command -v mail &> /dev/null; then
                tail -n 10 "$ALERT_FILE" | mail -s "Website Alert: $WEBSITE_URL" "$CONTACT_EMAIL"
                print_status "Alert email sent to $CONTACT_EMAIL"
            fi
            
            # Example: Webhook notification (uncomment and configure)
            # curl -X POST "https://hooks.slack.com/your-webhook-url" \
            #     -H "Content-Type: application/json" \
            #     -d "{\"text\":\"Website Alert: $RECENT_ALERTS issues detected on $WEBSITE_URL\"}"
        fi
    fi
}

cleanup_old_logs() {
    print_info "Cleaning up old logs..."
    
    # Keep logs for 30 days
    find "$(dirname "$LOG_FILE")" -name "*.log" -mtime +30 -delete 2>/dev/null || true
    find "/tmp" -name "website-health-report-*" -mtime +7 -delete 2>/dev/null || true
    
    print_status "Log cleanup completed"
}

# Main monitoring function
run_health_check() {
    echo "================================================="
    echo "🔍 Website Health Check - $(date)"
    echo "🌐 URL: $WEBSITE_URL"
    echo "================================================="
    
    # Core health checks
    check_website_status
    check_ssl_certificate
    check_contact_form
    check_chinese_content
    check_required_assets
    check_mobile_responsiveness
    check_performance_metrics
    
    # Server checks (if running on same server)
    check_server_resources
    check_nginx_status
    
    # Reporting and alerts
    generate_report
    send_alert_notification
    cleanup_old_logs
    
    echo "================================================="
    print_status "Health check completed"
    echo "================================================="
}

# Handle command line arguments
case "${1:-}" in
    --once)
        print_info "Running single health check..."
        run_health_check
        ;;
    --continuous)
        print_info "Starting continuous monitoring (every $((CHECK_INTERVAL / 60)) minutes)..."
        while true; do
            run_health_check
            sleep "$CHECK_INTERVAL"
        done
        ;;
    --install-cron)
        print_info "Installing cron job for automated monitoring..."
        SCRIPT_PATH="$(readlink -f "$0")"
        (crontab -l 2>/dev/null; echo "*/5 * * * * $SCRIPT_PATH --once") | crontab -
        print_status "Cron job installed - monitoring every 5 minutes"
        ;;
    --config)
        print_info "Current configuration:"
        echo "Website URL: $WEBSITE_URL"
        echo "Contact Email: $CONTACT_EMAIL"
        echo "Log File: $LOG_FILE"
        echo "Max Response Time: ${MAX_RESPONSE_TIME}s"
        echo "Check Interval: $((CHECK_INTERVAL / 60)) minutes"
        echo ""
        echo "To modify these settings, edit the configuration section at the top of this script."
        ;;
    --help|*)
        echo "Website Monitoring Script"
        echo ""
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --once            Run a single health check"
        echo "  --continuous      Run continuous monitoring"
        echo "  --install-cron    Install automated cron job"
        echo "  --config          Show current configuration"
        echo "  --help            Show this help message"
        echo ""
        echo "Configuration:"
        echo "  Edit the variables at the top of this script to customize:"
        echo "  - WEBSITE_URL"
        echo "  - CONTACT_EMAIL  "
        echo "  - MAX_RESPONSE_TIME"
        echo "  - CHECK_INTERVAL"
        echo ""
        echo "Examples:"
        echo "  $0 --once                 # Single check"
        echo "  $0 --continuous           # Keep monitoring"
        echo "  $0 --install-cron         # Set up automation"
        ;;
esac
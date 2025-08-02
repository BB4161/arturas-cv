#!/bin/bash

# Simple HTTPS development server using Python
# This script serves the CV website with basic security headers

PORT=${1:-8000}

echo "Starting secure development server on port $PORT"
echo "Access your CV at: https://localhost:$PORT"
echo "For mobile testing: https://$(hostname -I | awk '{print $1}'):$PORT"
echo ""
echo "Press Ctrl+C to stop the server"

# Create a simple Python HTTPS server with security headers
python3 -c "
import http.server
import ssl
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler

class SecureHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        self.send_header('X-XSS-Protection', '1; mode=block')
        super().end_headers()

httpd = HTTPServer(('0.0.0.0', $PORT), SecureHTTPRequestHandler)

# Create self-signed certificate for development
if not os.path.exists('server.pem'):
    os.system('openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes -subj \"/C=US/ST=Dev/L=Dev/O=Dev/CN=localhost\"')

httpd.socket = ssl.wrap_socket(httpd.socket, certfile='./server.pem', server_side=True)
httpd.serve_forever()
"

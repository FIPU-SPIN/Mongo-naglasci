from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        SimpleHTTPRequestHandler.end_headers(self)

if __name__ == '__main__':
    port = 5000
    httpd = HTTPServer(('localhost', port), CORSHandler)
    print(f"CORS server radi na portu {port}")
    httpd.serve_forever()
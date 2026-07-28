# Use a lightweight web server image to serve static files
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy our website files into nginx's serving directory
COPY . /usr/share/nginx/html

# Nginx listens on port 80 by default
EXPOSE 80

# Default command (already set by base image, shown here for clarity)
CMD ["nginx", "-g", "daemon off;"]

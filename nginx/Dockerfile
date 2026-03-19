# Use the lightweight Nginx Alpine image
FROM nginx:alpine

# Copy custom Nginx configuration into container
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

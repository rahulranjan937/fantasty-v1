FROM nginx:alpine

# Remove the default nginx configurations
RUN rm /etc/nginx/nginx.conf 
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom configurations and SSL certificates
COPY nginx.conf /etc/nginx/
COPY server.conf /etc/nginx/conf.d/

# Expose ports
EXPOSE 80 

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

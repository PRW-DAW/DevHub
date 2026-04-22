FROM nginx:1.28.3-alpine

LABEL org.opencontainers.image.authors="Francisco José Rodríguez Afonso" \
      org.opencontainers.image.documentation="https://prw-daw.github.io/DevHub/" \
      org.opencontainers.image.source="https://github.com/PRW-DAW/DevHub" \
      org.opencontainers.image.version="0.12.0" \
      org.opencontainers.image.vendor="PRW-DAW" \
      org.opencontainers.image.licenses="CC0-1.0" \
      org.opencontainers.image.title="DevHub | Nginx" \
      org.opencontainers.image.description="¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo profesional al siguiente nivel!"

COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

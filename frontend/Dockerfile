FROM node:24-alpine

LABEL org.opencontainers.image.authors="Francisco José Rodríguez Afonso" \
      org.opencontainers.image.documentation="https://prw-daw.github.io/DevHub/" \
      org.opencontainers.image.source="https://github.com/PRW-DAW/DevHub" \
      org.opencontainers.image.version="0.12.0" \
      org.opencontainers.image.vendor="PRW-DAW" \
      org.opencontainers.image.licenses="CC0-1.0" \
      org.opencontainers.image.title="DevHub | Frontend" \
      org.opencontainers.image.description="¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo profesional al siguiente nivel!"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

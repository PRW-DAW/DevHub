# DevHub

[![GitHub Pages](https://img.shields.io/badge/%20-FFFFFF?style=social&logo=githubpages&logoColor=black&logoSize=auto)](https://prw-daw.github.io/DevHub/)
[![GitHub Stars](https://img.shields.io/github/stars/PRW-DAW/DevHub?style=social&logo=github&logoColor=black&label=Stars&labelColor=FFFFFF&color=FFFFFF)](https://github.com/PRW-DAW/DevHub/stargazers)

[![Docker Container](https://img.shields.io/badge/Backend-2560FF?style=flat&logo=docker&logoColor=FFFFFF)](https://github.com/PRW-DAW/DevHub/pkgs/container/devhub-backend)
[![Docker Pulls](https://img.shields.io/docker/pulls/fjrodafo/devhub-backend?style=flat&logo=docker&logoColor=FFFFFF&label=Pulls&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-backend)
[![Image Size](https://img.shields.io/docker/image-size/fjrodafo/devhub-backend?style=flat&logo=docker&logoColor=FFFFFF&label=Size&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-backend)

[![Docker Container](https://img.shields.io/badge/Frontend-2560FF?style=flat&logo=docker&logoColor=FFFFFF)](https://github.com/PRW-DAW/DevHub/pkgs/container/devhub-frontend)
[![Docker Pulls](https://img.shields.io/docker/pulls/fjrodafo/devhub-frontend?style=flat&logo=docker&logoColor=FFFFFF&label=Pulls&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-frontend)
[![Image Size](https://img.shields.io/docker/image-size/fjrodafo/devhub-frontend?style=flat&logo=docker&logoColor=FFFFFF&label=Size&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-frontend)

[![Docker Container](https://img.shields.io/badge/Nginx-2560FF?style=flat&logo=docker&logoColor=FFFFFF)](https://github.com/PRW-DAW/DevHub/pkgs/container/devhub-nginx)
[![Docker Pulls](https://img.shields.io/docker/pulls/fjrodafo/devhub-nginx?style=flat&logo=docker&logoColor=FFFFFF&label=Pulls&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-nginx)
[![Image Size](https://img.shields.io/docker/image-size/fjrodafo/devhub-nginx?style=flat&logo=docker&logoColor=FFFFFF&label=Size&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-nginx)

## Índice

1. [Introducción](#introducción)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Clona el repositorio](#clona-el-repositorio)
4. [Configuración del proyecto](#configuración-del-proyecto)
5. [Configuración de hosts](#configuración-de-hosts)
6. [Entorno de desarrollo](#entorno-de-desarrollo)
7. [Recursos](#recursos)
8. [Créditos](#créditos)

## Introducción

¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo personal al siguiente nivel!

Este proyecto se ha desarrollado en un sistema [Linux](https://github.com/torvalds/linux). Para obtener más información sobre el sistema, visite el repositorio [Dotfiles](https://github.com/FJrodafo/Dotfiles).

## Estructura del proyecto

```
/
├── backend/
│   ├── .env
│   └── Dockerfile
├── docs/
|   └── *.md
├── frontend/
│   └── Dockerfile
├── nginx/
│   ├── conf.d
│   │   └── default.conf
│   └── Dockerfile
├── CONTRIBUTING
├── LICENSE
├── .dockerignore
├── .env
└── docker-compose.yaml
```

### Backend

```shell
laravel new backend
```

Detalles de la instalación del backend:

1. Which starter kit would you like to install? **> None**
2. Which testing framework do you prefer? **> Pest**
3. Do you want to install Laravel Boost to improve AI assisted coding? **> No**
4. Which database will your application use? **> PostgreSQL**
5. Default database updated. Would you like to run the default database migrations? **> No**
6. Would you like to run npm install and npm run build? **> No**

### Frontend

```shell
npm create vite@latest
```

Detalles de la instalación del frontend:

1. Project name: **frontend**
2. Select a framework: **React**
3. Select a variant: **TypeScript**
4. Install with npm and start now?: **No**

## Clona el repositorio

Abre una terminal en el directorio donde almacenas tus repositorios y clónalo con el siguiente comando:

```shell
# HTTPS
git clone https://github.com/PRW-DAW/DevHub.git
```

```shell
# SSH
git clone git@github.com:PRW-DAW/DevHub.git
```

## Configuración del proyecto

Antes de ejecutar el proyecto, crea el archivo de variables de entorno para Docker:

```shell
cp .env.example .env
```

Luego, edita el archivo `.env` y configura las credenciales:

```conf
# Postgres
POSTGRES_DB=postgres
POSTGRES_USER=fjrodafo
POSTGRES_PASSWORD=password
#POSTGRES_PORT=5432:5432

# Laravel
#LARAVEL_PORT=8000:8000

# React + Vite
#REACT_VITE_PORT=5173:5173

# Nginx
NGINX_PORT=80:80
```

Además, crea el archivo de variables de entorno para Laravel:

```shell
cp backend/.env.example backend/.env
```

Luego, edita el archivo `.env` y configura las credenciales de la base de datos utilizada en Docker:

```conf
APP_NAME="DevHub | API"

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=fjrodafo
DB_PASSWORD=password

SANCTUM_STATEFUL_DOMAINS=devhub.com
FRONTEND_URL=http://devhub.com
SESSION_DOMAIN=devhub.com
```

> [!IMPORTANT]
> 
> `DB_HOST` debe ser `db`, ya que corresponde al nombre del servicio definido en `docker-compose.yml`.

## Configuración de hosts

Para acceder a DevHub con un dominio local personalizado, agregue las siguientes líneas a su archivo `/etc/hosts`:

```conf
127.0.0.1	devhub.com	www.devhub.com
127.0.0.1	devhub.pro	www.devhub.pro
127.0.0.1	api.devhub.com	www.api.devhub.com
127.0.0.1	api.devhub.pro	www.api.devhub.pro
```

## Entorno de desarrollo

Este proyecto utiliza contenedores Docker para facilitar el entorno de desarrollo local.

Para iniciar el entorno de desarrollo, asegúrate de tener instalado [Docker](https://docs.docker.com/engine/install/).

Luego ejecuta los siguientes comandos desde la raíz del proyecto:

```shell
docker compose build
```

> [!NOTE]
> 
> Si desea crear la imagen localmente, descomente la sección `build` en `docker-compose.yaml` y ejecute `docker compose build`. De lo contrario, pase directamente al siguiente paso.

Levanta los contenedores:

```shell
docker compose up -d
```

El primer comando construirá las imágenes necesarias y el segundo levantará los servicios en segundo plano.

Una vez que los contenedores estén activos, puedes acceder a los servicios desde tu navegador:

- Backend (Laravel API): [http://api.devhub.com/](http://api.devhub.com/)
- Frontend (React + Vite): [http://devhub.com/](http://devhub.com/)

Para finalizar el entorno de desarrollo, ejecuta el siguiente comando desde la raíz del proyecto:

```shell
docker compose down
```

Este comando detiene los contenedores sin eliminar los datos locales del desarrollo.

> [!NOTE]
> 
> La primera ejecución puede tardar algunos minutos debido a la instalación de dependencias.
> 
> Si realizas cambios en el código fuente, estos se reflejarán automáticamente gracias a los volúmenes configurados en Docker.

### Build & Push (Ignorar esta subsección)

```shell
docker build \
  -t ghcr.io/prw-daw/devhub-nginx:0 \
  -t ghcr.io/prw-daw/devhub-nginx:0.9 \
  -t ghcr.io/prw-daw/devhub-nginx:0.9.0 \
  -t ghcr.io/prw-daw/devhub-nginx:latest \
  -t fjrodafo/devhub-nginx:0.9.0 \
  -t fjrodafo/devhub-nginx:latest \
  ./nginx

docker build \
  -t ghcr.io/prw-daw/devhub-frontend:0 \
  -t ghcr.io/prw-daw/devhub-frontend:0.9 \
  -t ghcr.io/prw-daw/devhub-frontend:0.9.0 \
  -t ghcr.io/prw-daw/devhub-frontend:latest \
  -t fjrodafo/devhub-frontend:0.9.0 \
  -t fjrodafo/devhub-frontend:latest \
  ./frontend

docker build \
  -t ghcr.io/prw-daw/devhub-backend:0 \
  -t ghcr.io/prw-daw/devhub-backend:0.9 \
  -t ghcr.io/prw-daw/devhub-backend:0.9.0 \
  -t ghcr.io/prw-daw/devhub-backend:latest \
  -t fjrodafo/devhub-backend:0.9.0 \
  -t fjrodafo/devhub-backend:latest \
  ./backend

docker push ghcr.io/prw-daw/devhub-nginx:0
docker push ghcr.io/prw-daw/devhub-nginx:0.9
docker push ghcr.io/prw-daw/devhub-nginx:0.9.0
docker push ghcr.io/prw-daw/devhub-nginx:latest
docker push fjrodafo/devhub-nginx:0.9.0
docker push fjrodafo/devhub-nginx:latest

docker push ghcr.io/prw-daw/devhub-frontend:0
docker push ghcr.io/prw-daw/devhub-frontend:0.9
docker push ghcr.io/prw-daw/devhub-frontend:0.9.0
docker push ghcr.io/prw-daw/devhub-frontend:latest
docker push fjrodafo/devhub-frontend:0.9.0
docker push fjrodafo/devhub-frontend:latest

docker push ghcr.io/prw-daw/devhub-backend:0
docker push ghcr.io/prw-daw/devhub-backend:0.9
docker push ghcr.io/prw-daw/devhub-backend:0.9.0
docker push ghcr.io/prw-daw/devhub-backend:latest
docker push fjrodafo/devhub-backend:0.9.0
docker push fjrodafo/devhub-backend:latest
```

## Recursos

[Node](https://nodejs.org/en/download)
·
[Laravel](https://laravel.com/docs/12.x/installation#creating-a-laravel-project)
·
[Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project)
·
[Docker](https://docs.docker.com/engine/install/)

## Créditos

[Red Cube Illustration](https://www.canva.com/graphics/MAEFh59rD9c/)

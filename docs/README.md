# DevHub

¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo personal al siguiente nivel!

[![GitHub Stars](https://img.shields.io/github/stars/PRW-DAW/DevHub?style=social&logo=github&logoColor=000000&label=Stars&labelColor=ffffff&color=ffffff)](https://github.com/PRW-DAW/DevHub/stargazers)

[![Docker Container](https://img.shields.io/badge/DevHub-Nginx-2560FF?style=flat&logo=docker&logoColor=ffffff&label=&labelColor=2560FF&color=2560FF)](https://github.com/PRW-DAW/DevHub/pkgs/container/devhub-nginx)
[![Docker Pulls](https://img.shields.io/docker/pulls/fjrodafo/devhub-nginx?style=flat&logo=docker&logoColor=ffffff&label=Pulls&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-nginx)
[![Image Size](https://img.shields.io/docker/image-size/fjrodafo/devhub-nginx?style=flat&logo=docker&logoColor=ffffff&label=Size&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-nginx)

[![Docker Container](https://img.shields.io/badge/DevHub-Backend-2560FF?style=flat&logo=docker&logoColor=ffffff&label=&labelColor=2560FF&color=2560FF)](https://github.com/PRW-DAW/DevHub/pkgs/container/devhub-backend)
[![Docker Pulls](https://img.shields.io/docker/pulls/fjrodafo/devhub-backend?style=flat&logo=docker&logoColor=ffffff&label=Pulls&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-backend)
[![Image Size](https://img.shields.io/docker/image-size/fjrodafo/devhub-backend?style=flat&logo=docker&logoColor=ffffff&label=Size&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-backend)

[![Docker Container](https://img.shields.io/badge/DevHub-Frontend-2560FF?style=flat&logo=docker&logoColor=ffffff&label=&labelColor=2560FF&color=2560FF)](https://github.com/PRW-DAW/DevHub/pkgs/container/devhub-frontend)
[![Docker Pulls](https://img.shields.io/docker/pulls/fjrodafo/devhub-frontend?style=flat&logo=docker&logoColor=ffffff&label=Pulls&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-frontend)
[![Image Size](https://img.shields.io/docker/image-size/fjrodafo/devhub-frontend?style=flat&logo=docker&logoColor=ffffff&label=Size&labelColor=2560FF&color=2560FF)](https://hub.docker.com/r/fjrodafo/devhub-frontend)

## Índice

1. [Introducción](#introducción)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Configuración](#configuración)
6. [Configuración de hosts](#configuración-de-hosts)
7. [Entorno de desarrollo](#entorno-de-desarrollo)
8. [Recursos](#recursos)
9. [Créditos](#créditos)

## Introducción

<details>
<summary>Estructura del proyecto</summary>

```
/
├── backend/
│   ├── .env
│   └── Dockerfile
├── frontend/
│   └── Dockerfile
└── docker-compose.yaml
```
</details>

## Backend

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

## Frontend

```shell
npm create vite@latest
```

Detalles de la instalación del frontend:

1. Project name: **frontend**
2. Select a framework: **React**
3. Select a variant: **JavaScript**
4. Use Vite 8 beta (Experimental)?: **No**
5. Install with npm and start now?: **No**

## Configuración

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

Luego ejecuta el siguiente comando desde la raíz del proyecto:

```shell
docker compose up -d --build
```

Este comando construirá las imágenes necesarias y levantará los servicios del backend y frontend en segundo plano.

Una vez que los contenedores estén activos, puedes acceder a los servicios desde tu navegador:

- Backend (Laravel API): http://api.devhub.com/
- Frontend (React + Vite): http://devhub.com/

Para finalizar el entorno de desarrollo, ejecuta el siguiente comando desde la raíz del proyecto:

```shell
docker compose down -v
```

Este comando detiene los contenedores y elimina los datos locales del desarrollo.

> [!NOTE]
> 
> La primera ejecución puede tardar algunos minutos debido a la instalación de dependencias.
> 
> Si realizas cambios en el código fuente, estos se reflejarán automáticamente gracias a los volúmenes configurados en Docker.

## Recursos

Node.js https://nodejs.org/en/download

Laravel https://laravel.com/docs/12.x/installation#creating-a-laravel-project

Vite https://vite.dev/guide/#scaffolding-your-first-vite-project

Docker https://docs.docker.com/engine/install/

## Créditos

Red Cube Illustration https://www.canva.com/graphics/MAEFh59rD9c/

# DevHub

¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo personal al siguiente nivel!

## Índice

1. [Introducción](#introducción)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Configuración](#configuración)
6. [Entorno de desarrollo](#entorno-de-desarrollo)
7. [Recursos](#recursos)

## Introducción

...

## Estructura del proyecto

<details>
<summary>Click me!</summary>

```
App/
├── backend/
│   ├── ...
│   └── Dockerfile
├── frontend/
│   ├── ...
│   └── Dockerfile
└── docker-compose.yaml
```
</details>

## Backend

```shell
laravel new backend
```

Detalles del proyecto:

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

Detalles del proyecto:

1. Project name: **frontend**
2. Select a framework: **React**
3. Select a variant: **JavaScript**
4. Use Vite 8 beta (Experimental)?: **No**
5. Install with npm and start now?: **No**

## Configuración

Antes de ejecutar el proyecto, crea el archivo de variables de entorno:

```shell
cd backend/
cp .env.example .env
```

Luego, edita el archivo `.env` y configura las credenciales de la base de datos utilizada en Docker:

```conf
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

> [!IMPORTANT]
> 
> `DB_HOST` debe ser `postgres`, ya que corresponde al nombre del servicio definido en `docker-compose.yml`.

## Entorno de desarrollo

Este proyecto utiliza contenedores Docker para facilitar el entorno de desarrollo local.

Para iniciar el entorno de desarrollo, asegúrate de tener instalado [Docker](https://docs.docker.com/engine/install/).

Luego ejecuta el siguiente comando desde la raíz del proyecto (Asegúrate de estar en el directorio `App/`):

```shell
docker compose up -d --build
```

Este comando construirá las imágenes necesarias y levantará los servicios del backend y frontend en segundo plano.

Una vez que los contenedores estén activos, puedes acceder a los servicios desde tu navegador:

- Backend (API Laravel): http://localhost:8000
- Frontend (React + Vite): http://localhost:5173

Para finalizar el entorno de desarrollo, ejecuta el siguiente comando desde la raíz del proyecto (Asegúrate de estar en el directorio `App/`):

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

https://laravel.com/docs/12.x/installation#creating-a-laravel-project

https://vite.dev/guide/#scaffolding-your-first-vite-project

https://docs.docker.com/engine/install/
# DevHub

¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo personal al siguiente nivel!

## Índice

1. [Introducción](#introducción)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Configuración](#configuración)
6. [Recursos](#recursos)

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

## Recursos

https://laravel.com/docs/12.x/installation#creating-a-laravel-project

https://vite.dev/guide/#scaffolding-your-first-vite-project
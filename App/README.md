# DevHub

¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo personal al siguiente nivel!

## Índice

1. [Introducción](#introducción)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Backend](#backend)
    1. [Instalación](#instalación)
    2. [Crear una aplicación](#crear-una-aplicación)
4. [Recursos](#recursos)

## Introducción

> [!NOTE]
> 
> Este proyecto ha sido construido desde un sistema operativo Linux, concretamente Debian 13 (Trixie).

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

### Instalación

Si no tiene PHP y Composer instalados en su máquina local, los siguientes comandos instalarán PHP, Composer y el instalador de Laravel en Linux:

```shell
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

Después de ejecutar el comando anterior, debe reiniciar su terminal. Para actualizar PHP, Composer y el instalador de Laravel después de instalarlos mediante `php.new`, puede volver a ejecutar el comando en su terminal.

### Crear una aplicación

Tras instalar PHP, Composer y el instalador de Laravel, estará listo para crear una nueva aplicación de Laravel. El instalador de Laravel le pedirá que seleccione su framework de pruebas, base de datos y kit de inicio preferidos:

<details>
<summary>Detalles</summary>

1. Which starter kit would you like to install? **> None**
2. Which testing framework do you prefer? **> Pest**
3. Do you want to install Laravel Boost to improve AI assisted coding? **> No**
4. Which database will your application use? **> PostgreSQL**
5. Default database updated. Would you like to run the default database migrations? **> No**
6. Would you like to run npm install and npm run build? **> No**
</details>

```shell
laravel new backend
```

Una vez creada la aplicación, puedes iniciar el servidor de desarrollo local de Laravel, el trabajador de cola y el servidor de desarrollo Vite usando el script `dev` Composer:

```shell
cd backend
npm install && npm run build
composer run dev
```

Una vez que haya iniciado el servidor de desarrollo, su aplicación será accesible en su navegador web en [http://localhost:8000](http://localhost:8000).

## Recursos

https://laravel.com/docs/12.x/installation#creating-a-laravel-project
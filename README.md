# Movie Database API

## Descripción

Este proyecto es una API para la gestión de una base de datos de películas, actores, directores y géneros. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las distintas entidades relacionadas con el mundo del cine. Está construida utilizando Node.js, Express y Sequelize como ORM para interactuar con una base de datos SQL.

## Características

- **Películas**: Crear, obtener, actualizar y eliminar películas.
- **Actores**: Crear, obtener, actualizar y eliminar actores.
- **Directores**: Crear, obtener, actualizar y eliminar directores.
- **Géneros**: Crear, obtener, actualizar y eliminar géneros.
- **Asociaciones**: Asignar actores y géneros a películas.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/**: Contiene todo el código fuente de la aplicación.
  - **app.js**: Archivo principal que configura Express.
  - **models/**: Define los modelos de Sequelize para películas, actores, directores y géneros.
  - **routes/**: Define las rutas de la API para las operaciones CRUD.
  - **tests/**: Contiene las pruebas para cada modelo de la API utilizando Jest y Supertest.
  - **utils/**: Incluye utilidades como la configuración de la conexión a la base de datos.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Configuración

1. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto. Debes incluir las siguientes variables:

   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=nombre_de_tu_base_de_datos
   DB_PORT=3306
   ```

2. Asegúrate de tener una base de datos SQL corriendo con los detalles que has especificado en tu archivo `.env`.

## Uso

1. Para ejecutar la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

2. La API estará disponible en `http://localhost:3000/api/v1`.

### Rutas de la API

#### Actores

- `POST /actors`: Crea un nuevo actor.
- `GET /actors`: Obtiene todos los actores.
- `GET /actors/:id`: Obtiene un actor por su ID.
- `PUT /actors/:id`: Actualiza un actor por su ID.
- `DELETE /actors/:id`: Elimina un actor por su ID.

#### Directores

- `POST /directors`: Crea un nuevo director.
- `GET /directors`: Obtiene todos los directores.
- `GET /directors/:id`: Obtiene un director por su ID.
- `PUT /directors/:id`: Actualiza un director por su ID.
- `DELETE /directors/:id`: Elimina un director por su ID.

#### Géneros

- `POST /genres`: Crea un nuevo género.
- `GET /genres`: Obtiene todos los géneros.
- `GET /genres/:id`: Obtiene un género por su ID.
- `PUT /genres/:id`: Actualiza un género por su ID.
- `DELETE /genres/:id`: Elimina un género por su ID.

#### Películas

- `POST /movies`: Crea una nueva película.
- `GET /movies`: Obtiene todas las películas.
- `GET /movies/:id`: Obtiene una película por su ID.
- `PUT /movies/:id`: Actualiza una película por su ID.
- `DELETE /movies/:id`: Elimina una película por su ID.
- `POST /movies/:id/actors`: Asigna actores a una película.
- `POST /movies/:id/genres`: Asigna géneros a una película.

## Pruebas

El proyecto incluye un conjunto de pruebas para asegurar que todas las rutas y funcionalidades de la API funcionan correctamente.

Para ejecutar las pruebas, primero reinicia la base de datos:

```bash
npm run reset:migrate
```

Luego, ejecuta las pruebas con el siguiente comando:

```bash
npm test
```

## Tecnologías Utilizadas

- Node.js
- Express
- Sequelize
- MySQL (o cualquier otro sistema de base de datos compatible con Sequelize)
- Jest
- Supertest

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

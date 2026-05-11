# Prueba Técnica AMS - Fullstack Project

Este repositorio contiene la solución a la prueba técnica, compuesta por un Backend en Java (Spring Boot) y un Frontend en React (Vite).

## 🐳 Ejecución Rápida (Docker Compose)

La forma más sencilla de ejecutar ambos proyectos simultáneamente en cualquier máquina (sin necesidad de tener instalados Java o Node.js) es utilizando Docker Compose.

Desde la raíz del proyecto, ejecuta el siguiente comando:

```bash
docker-compose up -d --build
```

Esto descargará las imágenes base necesarias, compilará ambos proyectos (descargando las dependencias de Maven y npm) y levantará los contenedores:

- **Frontend:** Disponible en [http://localhost:5173](http://localhost:5173)
- **Backend:** Disponible en [http://localhost:5000](http://localhost:5000)

Para probar el backend con el test de prueba de https://github.com/dalogax/backendDevTest basta con ejecutar los comandos de docker-compose que se indican en el mismo repositorio al mismo tiempo que el docker compose de este proyecto.

Para detener la ejecución de ambos servicios:

```bash
docker-compose down
```

---

## ⚙️ Backend (Java & Spring Boot)

El backend es una API REST construida con **Java 21** y **Spring Boot 3.4.0** alojada en la carpeta `/backend`.

### Características principales:

- **Virtual Threads:** Habilitados en `application.properties` para maximizar el rendimiento concurrente.
- **Caché Eficiente:** Implementación de caché local de alto rendimiento utilizando **Caffeine** (`@Cacheable`) para la optimización de las llamadas externas.
- **Construcción:** Se utiliza Maven para la gestión de dependencias y la compilación. El Dockerfile usa un _multi-stage build_ que compila el código y luego ejecuta un JRE mínimo (Alpine).
- **Resiliencia:** Manejo granular de errores y timeouts al consumir recursos de terceros.

### Ejecución Local Manual:

Si tienes Java 21 instalado, puedes entrar a la carpeta `/backend` y ejecutar el Wrapper de Maven:

```bash
./mvnw spring-boot:run
```

---

## 🎨 Frontend (React & Vite)

El frontend es una Single Page Application (SPA) para la tienda de dispositivos móviles, desarrollada con **React**, empaquetada con **Vite** y alojada en la carpeta `/frontend`.

### Características principales:

- **Vite:** Entorno de desarrollo ultrarrápido configurado con un proxy inverso para evitar problemas de CORS y sesión de cookies con el API.
- **Gestión de Datos (React Query v5):** Manejo de peticiones asíncronas con sincronización persistente en el `localStorage` mediante `@tanstack/query-async-storage-persister`, garantizando que la caché sobreviva 1 hora completa.
- **Estado Global (Zustand):** Control del carrito de la compra ágil y con boilerplate mínimo, también persistido para no perder datos al refrescar.
- **Estilos:** Diseño "Mobile First" combinando **Material UI (MUI)** con clases de utilidad en **SCSS**, logrando una estética cuidada, moderna y premium.
- **Internacionalización (i18n):** Soporte bilingüe configurado en namespaces (`common` y `products`) para escalar sin problemas.
- **Testing y Calidad:** Suite de pruebas con **Vitest** y **React Testing Library**, respaldado por comprobación estricta de tipos (`tsc`) y linting de código.

### Comandos Locales Manuales (requiere Node.js 24):

Entra en la carpeta `/frontend` y utiliza `npm` para ejecutar los scripts:

```bash
npm install
npm run start     # Servidor de desarrollo en http://localhost:5173
npm run test  # Ejecuta los tests unitarios y de componentes
npm run lint  # Validación estricta del código
npm run build # Compila la app para producción
```

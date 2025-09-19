# Sistema de Gestión de Tareas (Task Manager)

Este Sistema de Gestión se desarrolla a partir de propuesta de postulación para puesto de desarrollador Junior en la empresa Aabitmedia.

## Descripción

Sistema completo de gestión de tareas con autenticación JWT, desarrollado con arquitectura moderna separando backend y frontend. Incluye interfaz intuitiva con dashboard interactivo y API REST robusta.

**Características principales:**
- **Autenticación segura** con JWT tokens
- **Gestión completa de usuarios** con roles y permisos
- **CRUD completo de tareas** con estados configurables
- **Interfaz moderna y responsiva** con animaciones
- **Dashboard interactivo** con cards y estadísticas
- **Panel de debugging** para desarrollo
- **Dockerización completa** para despliegue
- **Testing integrado** con @SpringBootTest

## Tecnologías Utilizadas

### Backend (Spring Boot)
- **Java 21** - Lenguaje principal
- **Spring Boot 3.x** - Framework principal
- **Spring Security** - Autenticación y autorización
- **Spring Data JPA** - Persistencia de datos
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **Maven** - Gestión de dependencias
- **H2 Database** - Base de datos en memoria (desarrollo)
- **@SpringBootTest** - Testing unitario

### Frontend (React)
- **React 18** - Librería principal
- **JavaScript ES6+** - Lenguaje principal
- **Axios** - Cliente HTTP
- **CSS3** - Estilos modernos con gradientes y animaciones
- **Vite** - Build tool y dev server

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación multi-contenedor
- **Git** - Control de versiones

## Prerequisitos

Antes de ejecutar el proyecto, debe tener instalado:

- **Java 21 o superior**
- **Maven 3.6+**
- **Node.js 18+ y npm**
- **Docker & Docker Compose**
- **Git** 🔧

## Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/jharolsv74/taskManager.git
cd taskManager
```

### 2. Ejecución con Docker (Recomendado)
```bash
# Construir y ejecutar ambos servicios
docker-compose up --build

# Ejecutar en background
docker-compose up -d --build

# Ver logs
docker-compose logs -f
```

**URLs de acceso:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080`

### 3. Ejecución Manual

#### Backend
```bash
cd backend/taskmanager
mvn clean install
mvn spring-boot:run
```
Backend disponible en: `http://localhost:8080`

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend disponible en: `http://localhost:3000`

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción | Público |
|--------|----------|-------------|---------|
| `POST` | `/api/usuarios/registro` | Registrar nuevo usuario | ✅ |
| `POST` | `/api/usuarios/login` | Iniciar sesión | ✅ |

### Usuarios (Protegidos)
| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| `GET` | `/api/usuarios` | Obtener todos los usuarios | 🔒 |
| `GET` | `/api/usuarios/{id}` | Obtener usuario por ID | 🔒 |

### Tareas (Protegidos)
| Método | Endpoint | Descripción | Requiere Auth |
|--------|----------|-------------|---------------|
| `GET` | `/api/tareas/usuario/{usuarioId}` | Obtener tareas del usuario | 🔒 |
| `GET` | `/api/tareas/{id}` | Obtener tarea por ID | 🔒 |
| `POST` | `/api/tareas` | Crear nueva tarea | 🔒 |
| `PUT` | `/api/tareas/{id}` | Actualizar tarea | 🔒 |
| `DELETE` | `/api/tareas/{id}` | Eliminar tarea | 🔒 |

## Configuración

### Backend (application.properties)
```properties
# Puerto del servidor
server.port=8080

# Base de datos H2 (desarrollo)
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.h2.console.enabled=true

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=miClaveSecretaMuySeguraParaJWT2024TaskManager
jwt.expiration=36000000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8080
```

## Testing

### Backend (Spring Boot Tests)
```bash
cd backend/taskmanager

# Ejecutar todos los tests
mvn test
```

**Test incluido:**
- ✅ Test de servicio de usuario

## Estados de las Tareas

El sistema maneja los siguientes estados:

| Estado | Descripción | Color |
|--------|-------------|-------|
| `PENDIENTE` | Tarea recién creada | 🟡 Amarillo |
| `EN_PROGRESO` | Tarea en desarrollo | 🔵 Azul |
| `COMPLETADA` | Tarea finalizada | 🟢 Verde |

## Características del Frontend

### Login Mejorado
- Diseño moderno con gradientes
- Animaciones y transiciones suaves
- Mensajes interactivos con emojis
- Estados de carga con spinner
- Validación en tiempo real

### Dashboard Interactivo
- **Cards informativos** para usuarios y tareas
- **Panel de debugging** con información técnica
- **Botones de acción** (Actualizar, Test API, Logout)
- **Manejo de errores** con mensajes detallados

## Docker

### Estructura de Contenedores
```yaml
services:
  backend:    # Puerto 8080
  frontend:   # Puerto 3000 (Nginx)
```

### Comandos Útiles
```bash
# Construir sin cache
docker-compose build --no-cache

# Ver logs específicos
docker-compose logs backend
docker-compose logs frontend

# Parar servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v
```

## 🔒 Seguridad

### JWT Token
- **Algoritmo**: HS256
- **Expiración**: 10 horas
- **Header**: `Authorization: Bearer <token>`

### CORS
- **Origen permitido**: `http://localhost:3000`
- **Métodos**: GET, POST, PUT, DELETE, OPTIONS
- **Headers**: Authorization, Content-Type

## 📱 Uso del Sistema

### 1. Registro/Login
1. Acceder a `http://localhost:3000`
2. Registrar nuevo usuario o usar credenciales existentes
3. El sistema redirige automáticamente al dashboard

### 2. Dashboard
- **Card Usuarios**: Lista todos los usuarios del sistema
- **Card Tareas**: Muestra tareas del usuario autenticado
- **Panel Debug**: Información técnica para desarrollo

### 3. Gestión de Tareas
- Crear, editar y eliminar tareas
- Cambiar estados (Pendiente → En Progreso → Completada)
- Filtrar por estado y usuario

## Autor

**Jharol Uchuari**
- GitHub: [@jharolsv74](https://github.com/jharolsv74)
- Email: jharol.sv@gmail.com
- Teléfono: +593 987 498 445

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

---
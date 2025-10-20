# NTT Technical Test - Micro Frontend Architecture

Proyecto de prueba técnica que implementa una arquitectura de Micro Frontends usando Angular, Module Federation y NestJS.

## 🏗️ Arquitectura

Este proyecto está compuesto por múltiples aplicaciones independientes:

- **api** (NestJS - Puerto 3001): API de autenticación con Swagger
- **host** (Angular - Puerto 4200): Aplicación principal que orquesta los MFEs
- **login** (Angular - Puerto 4201): MFE de autenticación
- **banner** (Angular - Puerto 4202): MFE de banner informativo
- **members** (Angular - Puerto 4203): MFE de gestión de miembros
- **libs**: Librería compartida (EventBus, GlobalState, servicios)

## 🚀 Inicio Rápido con Docker

### Prerequisitos

- Docker Desktop instalado y ejecutándose
- Git

### Levantar toda la aplicación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd ntt

# Levantar todos los servicios
docker-compose up -d

# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f host
```

### Acceder a las aplicaciones

Una vez levantados los contenedores, puedes acceder a:

- **Host Application**: http://localhost:4200
- **Login MFE**: http://localhost:4201
- **Banner MFE**: http://localhost:4202
- **Members MFE**: http://localhost:4203
- **API + Swagger**: http://localhost:3001/docs

### Detener los servicios

```bash
# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir las imágenes
docker-compose build --no-cache
docker-compose up -d
```

## 💻 Desarrollo Local (Sin Docker)

### Prerequisitos

- Node.js 20+
- pnpm instalado globalmente: `npm install -g pnpm`

### Instalación

**Opción 1: Script automático (recomendado)**
```bash
./install-all.sh
```

**Opción 2: Manual**
```bash
# Instalar dependencias en cada proyecto
cd api && npm install && cd ..
cd libs && pnpm install && pnpm build && cd ..
cd host && pnpm install && cd ..
cd login && pnpm install && cd ..
cd banner && pnpm install && cd ..
cd members && pnpm install && cd ..
```

### Levantar servicios en desarrollo

**Opción 1: Script automático con tmux (recomendado)**
```bash
./start-dev.sh
```

**Opción 2: Manualmente en terminales separadas**

Necesitas 5 terminales diferentes:

**Terminal 1 - API:**
```bash
cd api
npm run start:dev
```

**Terminal 2 - Host:**
```bash
cd host
pnpm start
```

**Terminal 3 - Login MFE:**
```bash
cd login
pnpm start
```

**Terminal 4 - Banner MFE:**
```bash
cd banner
pnpm start
```

**Terminal 5 - Members MFE:**
```bash
cd members
pnpm start
```

## 🧪 Testing

Cada proyecto usa Vitest para testing:

```bash
# Host
cd host && pnpm test

# Login
cd login && pnpm test

# Banner
cd banner && pnpm test

# Members
cd members && pnpm test
```

## 📁 Estructura del Proyecto

```
ntt/
├── api/              # NestJS API (Puerto 3001)
├── host/             # Angular Host Shell (Puerto 4200)
├── login/            # Angular Login MFE (Puerto 4201)
├── banner/           # Angular Banner MFE (Puerto 4202)
├── members/          # Angular Members MFE (Puerto 4203)
├── libs/             # Librería compartida
├── docker-compose.yml
└── README.md
```

## 🔐 Credenciales de Prueba

**Usuario:** `admin@crossref.org`  
**Password:** `admin123`

## 🌐 Module Federation

Los MFEs se comunican usando:
- **Module Federation**: Para cargar dinámicamente componentes remotos
- **EventBus**: Para comunicación entre MFEs
- **GlobalState**: Signals de Angular para estado compartido

## 📝 Documentación Adicional

- [API Documentation (Swagger)](http://localhost:3001/docs)
- [Host README](./host/README.md)
- [Login README](./login/README.md)
- [Banner README](./banner/README.md)
- [Members README](./members/README.md)
- [Libs README](./libs/README.md)

## 🐛 Troubleshooting

### Los MFEs no cargan en el Host

1. Verifica que todos los servicios estén corriendo: `docker-compose ps`
2. Verifica los logs: `docker-compose logs -f`
3. Asegúrate de que no haya conflictos de puertos

### Error de CORS

El API está configurado para aceptar peticiones desde:
- http://localhost:4200 (Host)
- http://localhost:4201 (Login)

Si usas otros puertos, actualiza `api/src/main.ts`

### Rebuild después de cambios

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📞 Soporte

Para preguntas sobre este proyecto técnico, contacta al equipo de desarrollo.

---

**Desarrollado con 💙 para NTT Technical Test**

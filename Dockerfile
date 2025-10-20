# ----------------------------------------------------------------------
# Etapa 1: Builder Base (Instalación de dependencias y construcción)
# ----------------------------------------------------------------------
ARG APP_NAME=host
FROM node:20 as builder
ARG APP_NAME
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV APP_NAME=${APP_NAME}

# Instalar pnpm
RUN corepack enable pnpm

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copiar Librerías Compartidas y construir shared
# (El paquete shared se publica en libs/dist/shared y es dependencia file: de las apps)
COPY libs/ libs/
WORKDIR /app/libs
RUN pnpm install --frozen-lockfile \
 && pnpm run build

# 2. Copiar y construir la aplicación MFE seleccionada (host/login/banner/member)
WORKDIR /app
COPY ${APP_NAME}/ /app/${APP_NAME}/
RUN test -d "/app/${APP_NAME}" || (echo "ERROR: /app/${APP_NAME} no existe. Pasa build-arg APP_NAME correctamente." && exit 1)
WORKDIR /app/${APP_NAME}
# Nota: relajamos el lockfile aquí para evitar fallas con dependencias file: después de construir libs
RUN pnpm install \
 && pnpm run build

# ----------------------------------------------------------------------
# Etapa 2: MFE Runtime (Para Microfrontends - NGINX)
# ----------------------------------------------------------------------
FROM nginx:alpine as mfe-runtime
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# 1. Copiar configuración de NGINX
# Reemplazar la configuración por defecto con nuestro nginx.conf
RUN rm -rf /etc/nginx/conf.d
# El archivo nginx.conf DEBE estar en la raíz del contexto (al lado del Dockerfile)
COPY nginx.conf /etc/nginx/nginx.conf

# 2. Copiar Archivos de Construcción
# Copiar el resultado de la construcción (la carpeta 'dist/<app_name>')
# Esto debe coincidir con la salida de tu proceso de compilación de Angular/Microfrontend.
COPY --from=builder /app/${APP_NAME}/dist/${APP_NAME} /usr/share/nginx/html

# Exponer el puerto 80 (puerto por defecto de NGINX)
EXPOSE 80

# ----------------------------------------------------------------------
# Etapa 3: API Runtime (Para el Backend - Node)
# ----------------------------------------------------------------------
FROM node:20-alpine as api-runtime

# 1. Copiar y construir API
WORKDIR /app/api
COPY api/ /app/api/
RUN corepack enable pnpm \
 && pnpm install --frozen-lockfile \
 && pnpm run build

# 2. Configuración de Ejecución API
EXPOSE 3001
CMD ["node", "dist/main.js"]

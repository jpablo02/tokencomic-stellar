FROM node:20.18.0

WORKDIR /app
COPY . .

# Instala Python, herramientas de compilación Y LIBRERÍAS DEL SISTEMA REQUERIDAS
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    libudev-dev \       
    pkg-config \        
    && rm -rf /var/lib/apt/lists/*

RUN npm ci

# Si usas Next.js
RUN npm run build

CMD ["npm", "start"]
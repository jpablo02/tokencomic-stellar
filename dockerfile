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

COPY .nixpacks/nixpkgs-*.nix .nixpacks/
RUN nix-env -if .nixpacks/nixpkgs-*.nix && nix-collect-garbage -d
RUN nix-env -if .nixpacks/nixpkgs-*.nix --force && nix-collect-garbage -d
RUN npm ci

# Si usas Next.js
RUN npm run build

CMD ["npm", "start"]
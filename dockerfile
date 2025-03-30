FROM node:20.18.0  
WORKDIR /app
COPY . .

# Instalar Python y herramientas de compilación
RUN apt-get update && apt-get install -y python3 build-essential

RUN npm ci
RUN npm run build  # Si usas Next.js

CMD ["npm", "start"]
FROM node:22.14.0

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto de la app
EXPOSE 3000

# Comando por defecto
CMD [ "node", "app.js" ]


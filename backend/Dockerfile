FROM node:24-alpine3.20

WORKDIR /certifier_backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
RUN npx prisma generate 
CMD ["node", "app.js"]
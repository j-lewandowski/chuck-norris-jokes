FROM node:22-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npx prisma generate


EXPOSE 4000

# Command to run the app
CMD [  "npm", "run", "start:migrate:prod" ]
FROM node:9-alpine

# App must run on port 8000
# Add your instructions to dockerize the application


WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

ENTRYPOINT  ["npm", "start"]
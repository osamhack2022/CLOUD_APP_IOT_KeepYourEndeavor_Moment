FROM node:14-alpine

WORKDIR '/app'

COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY . .

CMD ["npm", "start"]
FROM node:18
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN apt-get update && apt-get install -y xdg-utils
RUN npm install
COPY . /app/
CMD ["npm", "start"]
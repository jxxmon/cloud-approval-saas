FROM node:18
WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install
COPY . /app/
# 개발: COPY .env.development .env
# 운영: COPY .env.production .env
CMD ["npm", "start"]

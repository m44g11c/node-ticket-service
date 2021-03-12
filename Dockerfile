FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY .sequelizerc /home/app/

RUN npm ci

#RUN npm i -g nodemon

#RUN npm i -g sequelize
RUN npm i -g sequelize-cli
RUN npm i -g mysql2
#RUN sequelize init

COPY . /home/app

CMD ./scripts/start.sh

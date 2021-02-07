#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npx sequelize db:migrate
  npx sequelize db:seed:all
  npm run test
  npm run start:dev
fi

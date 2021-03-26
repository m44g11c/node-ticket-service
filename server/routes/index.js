const express = require("express");
const ticketsController = require("../controllers").tickets;

module.exports = app => {
  var router = express.Router();

  router.param("uuid", ticketsController.param);
  router.get("/tickets/:uuid", ticketsController.retrieve);
  router.delete("/tickets/:uuid", ticketsController.delete);
  router.get("/tickets", ticketsController.list);
  router.put(
      "/tickets/:uuid",
      ticketsController.validate('update'),
      ticketsController.update
  );
  router.post(
      "/tickets",
      ticketsController.validate('create'),
      ticketsController.create
  );

  app.use('/api/v1', router);
};
const express = require("express");
const ticketsController = require("../controllers").tickets;

module.exports = app => {
  var router = express.Router();

  router.post("/tickets", ticketsController.create);
  router.put("/tickets/:id", ticketsController.update);
  router.get("/tickets", ticketsController.list);
  router.get("/tickets/:id", ticketsController.retrieve);
  router.delete("/tickets/:id", ticketsController.delete);

  app.use('/api/v1', router);
};
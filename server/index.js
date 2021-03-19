const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const Ticket = require("./db/models").ticket;

app.use(express.json());

require("./routes")(app);

app.use(cors());
app.get("/", async (req, res) => {
  try {
    const ticket = await Ticket.findById(1);
    const response = { message: `This response came from the node.js app. Ticket ${ticket.subject} is on the database.` };
    res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});
app.listen(8000, () => console.log("The node.js app is listening on port 8000."));

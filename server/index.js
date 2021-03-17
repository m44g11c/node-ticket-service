const express = require("express");
const app = express();
const cors = require("cors");
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const Ticket = require("./db/models").ticket;

connectToDatabase();

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

function connectToDatabase() {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully!.");

      //Check if database was seeded already, and do it if needed
      Ticket.findById(1).then(ticket => {
        if (!ticket) {
          console.log("Database is not seeded, will run seeds now...");
          const { exec } = require("child_process");
          try {
            exec("/opt/node_modules/.bin/sequelize db:seed:all", (err, stdout, stderr) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(stdout);
            });
          } catch (error) {
            console.log("Error while seeding database: ", error);
          }
        } else {
          console.log("Database already seeded.");
        }
      });
    })
    .catch(err => {
      console.log("Unable to connect to the database:", err);
    });
}

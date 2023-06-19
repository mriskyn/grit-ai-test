require('dotenv').config()
const express = require("express");
const { sequelize } = require("./models");
const routers = require("./routes");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api", routers);

async function main() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

main();

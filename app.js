const express = require("express");
const config = require("config");
const connection = require("./config/connection");

const app = express();

app.use(express.json());

app.use("/api", require("./routes/index.routes"));

const port = config.get("port");

async function start() {
  await connection;
  app.listen(port, console.log(`Server running on port ${port}`));
}

start();

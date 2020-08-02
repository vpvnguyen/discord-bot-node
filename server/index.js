require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: `${process.env.ADMIN ? process.env.ADMIN : "Anon"}'s API Server`,
  });
});

app.use("/api", require("./controller/users.controller"));
app.use("/api", require("./controller/messages.controller"));

app.listen(PORT, () => console.info(`API SERVER RUNNING ON localhost:${PORT}`));

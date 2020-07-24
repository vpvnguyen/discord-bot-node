require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: `${process.env.ADMIN}'s API Server` });
});

app.use("/api", require("./controller/messageHistory.controller"));

app.listen(PORT, () => console.log(`API SERVER RUNNING ON PORT: ${PORT}`));

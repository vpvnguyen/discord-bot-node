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

app.use("/users", require("./routes/users.routes"));
app.use("/api", require("./routes/messages.routes"));

app.listen(PORT, () => console.info(`API SERVER RUNNING ON localhost:${PORT}`));

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { broadcastSetup, broadcastTextUpdate } = require("./broadcast");

const port = 5050;
global.text = "HELLO WORLD";

broadcastSetup();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.put("/doc", async (req, res) => {
  console.log("RECEIVED");
  const { text } = req.body;

  global.text += " " + text;

  await broadcastTextUpdate();

  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

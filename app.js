
const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, "dist")));

// // build mode
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

const ser = http.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});

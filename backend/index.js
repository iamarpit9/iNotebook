
const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();


const app = express();
const port = 5000;

// npm cors
app.use(cors());

// Available Routes // MiddleWare
app.use(express.json());

app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`NoteBook app listening at http://localhost:${port}`);
});
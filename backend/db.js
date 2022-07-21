const mongoose = require("mongoose");

// Connection to Monogo DB Database (Local)

const mongoURI =
  "mongodb://localhost:27017/notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};

module.exports = connectToMongo;

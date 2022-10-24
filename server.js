require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/models.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const connectToDatabase = async () => {
  const connection = await mongoose.connect(
    // process.env.MONGODB_CLOUD_URI || "mongodb://localhost/lukeevents",
    process.env.MONGODB_CLOUD_URI,
    {
      // useCreateIndex: true,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
    }
  );

  console.log(`MongoDB connected to ${connection.connection.host}.`);
};

connectToDatabase();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/api.js")(app);
require("./routes/html.js")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************

require("dotenv").config();

// *** Dependencies
// =============================================================
const express = require("express");
const compression = require("compression");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Compress all responses
app.use(compression());

// Set Handlebars.
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");

app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});

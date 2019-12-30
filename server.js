let express = require("express"); // Using Node module Express
let app = express(); // Referencing express as "app"
var PORT = process.env.PORT || 3000; //Setting port to be preferred to be set to 8080
app.use(express.urlencoded({ extended: true })); // Add ability to read URLencoded payloads 
app.use(express.json()); // Add ability to read JSON payloads
require("./app/routing/apiRoutes")(app);  //Using our api(JSON) routes
require("./app/routing/htmlRoutes")(app); //Using our HTML routes

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
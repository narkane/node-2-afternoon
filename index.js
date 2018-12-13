const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const cont = require("./products_controller");
require("dotenv").config();

app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(dbI => {
    app.set("db", dbI);
  })
  .catch(err => {
    console.log(err);
  });

app.get("/api/products", cont.getAll);
app.get("/api/products:id", cont.getOne);
app.post("/api/products", cont.create);
app.put("/api/products/:id?desc=", cont.update);
app.delete("/api/products/:id", cont.delete);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(` - LISTENING ON PORT: ${port}`);
});

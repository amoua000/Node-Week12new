var express = require("express");
// require("dotenv").config();
var app = express();
const bodyParser = require('body-parser');

var data = require("./public/database.json");

app.use(bodyParser.urlencoded({ extended: true }));
// app.get('/workers',(req,res)=> {
//           res.send('Hello World')

app.get("/workers", (req, res) => {
  if (!data) {
    res.status(404).send("Could not find information");
  }
  //  send everybody that you want with data
  res.send(data);
});

app.get("/workers/:id", (req, res) => {
  // make a function to grab id. find is a method that finds the person were looking for
  const findWorker = data.workers.find(function (employee) {
    // parseInt because it returns a string. req paramas id is what the person fills in
    return parseInt(req.params.id) === employee.id;
  });

  if (!findWorker) {
    res.status(404).send("Could not find information");
  }
  //  send everybody that you want with data
  res.send(findWorker);
});

app.post("/workers", (req, res) => {
  const findEmployee = {
    id: data.workers.length + 1,
    name: req.body.name,
    salary: req.body.salary,
    department: req.body.department,
  };

  if (!findEmployee) {
    res.status(404).send("Could not find information");
  }

  data.workers.push(findEmployee);

  res.send(findEmployee);

  return;
});

app.delete("/workers:id", (req, res) => {
  const findEmployee = data.workers.find(function (employee) {
    return parseInt(req.params.id) === employee.id;
  });

  if (!findEmployee) {
    res.status(404).send("Could not find information");
  }

  const index = data.workers.indexOf(findEmployee);
  data.workers.splice(index, 1);

  res.send(findEmployee);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// highest server port is 8080
app.listen(3000);

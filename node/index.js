const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));

const tasks = [];
let idCount = 0;

router.post("/add", (req, res) => {
  const text = req.body.text;
  const id = idCount++;
  const newTask = {
    id,
    text,
    active: false
  };
  tasks.push(newTask);

  res.json({
    status: "success",
    data: newTask
  });
});

router.post("/toggle", (req, res) => {
  const reqId = req.body.id;

  if (!reqId) {
    throw new Error("POST /toggle has not id in body");
  }

  const findIndex = tasks.findIndex(({ id }) => id === reqId);

  if (findIndex === -1) {
    throw new Error("POST /toggle has not element with id from body");
  }

  tasks[reqId].active = !tasks[reqId].active;

  res.json({
    status: "success",
    data: tasks[reqId]
  });
});

router.get("/get-all", (req, res) => {
  res.json({
    status: "success",
    data: tasks
  });
});

router.post("/remove", (req, res) => {
  const reqId = req.body.id;

  if (!reqId) {
    throw new Error("POST /remove has not id in body");
  }

  const findIndex = tasks.findIndex(({ id }) => id === reqId);

  if (findIndex === -1) {
    throw new Error("POST /remove has not element with id from body");
  }

  tasks.splice(reqId, 1);

  res.json({ status: "success" });
});

app.use("/todo", router);

app.listen(8080, function () {
  console.log("Running on port 8080!");
});

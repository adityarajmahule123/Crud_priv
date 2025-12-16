import dotenv from "dotenv";
import express from "express";
import logger from "./logger.js";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

let teaData = [];
let nextId = 1;

//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).json(newTea);
});

//get all teas
app.get("/teas", (req, res) => {
  res.json(teaData);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    res.status(404).json({ message: "Tea not found" });
    return;
  }
  res.status(200).json(tea);
});

//update  a tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    res.status(404).json({ message: "Tea not found" });
    return;
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).json(tea);
});

//delete a tea
app.delete("/teas/:id", (req, res) => {
  teaData = teaData.filter((t) => t.id !== parseInt(req.params.id));
  res.status(204).send();
  if (!tea) {
    res.status(404).json({ message: "Tea not found" });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

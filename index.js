import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

app.post("/teas", (req, res) => {
  req.body;
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

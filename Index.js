const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x6ceglb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// apis in try finally
async function run() {
  try {
    const tasksCollection = client.db("mytasks").collection("tasks");

    app.post("/add_tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(task);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);
app.get("/", async (req, res) => {
  res.send("My Tasks Application IS RUNNING...");
});

app.listen(port, () => {
  console.log("My Tasks Application IS RUNNING ON PORT:", port);
});

module.exports = app;

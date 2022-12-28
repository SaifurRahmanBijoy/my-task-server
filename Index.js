const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

    app.get("/tasks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const results = await tasksCollection.find(query).toArray();
      res.send(results);
    });

    app.post("/task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      updatedDoc = {
        $set: {
          completed: true,
        },
      };
      const result = await tasksCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.post("/taskup/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      updatedDoc = {
        $set: {
          nice: true,
        },
      };
      const result = await tasksCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const product = { _id: ObjectId(id) };
      const result = await tasksCollection.deleteOne(product);
      res.send(result);
    });
    // ---------<
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

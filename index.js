const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

/** Middlewares */
app.use(cors());
app.use(express.json());

/** Monngodb Connection Related Code */

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@todos.ukwfq5e.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    /** Collections */
    const menuCollection = client.db("bistroBoss").collection("menu");
    const reviewCollection = client.db("bistroBoss").collection("reviews");

    /** CURD SYSTEM OPARETIONS */

    app.get("/menu", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    /** Connection message or alert */
    await client.db("admin").command({ ping: 1 });
    console.log("successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => res.send("Bistro Server running!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

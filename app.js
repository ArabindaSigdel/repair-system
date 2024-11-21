require("dotenv").config();
const express = require("express");
const { mongo, default: mongoose } = require("mongoose");
const app = express();
const port = 8000;
const { MongoClient, ServerApiVersion } = require("mongodb");

//Middle ware for parsing json
app.use(express.json());

// Basic routes
app.get("/", (req, res) => {
  res.send("Welcome to the repair system");
});

app.listen(port, () => {
  console.log(`Server started at:\nhttp://localhost:${port}\n`);
});

const client = new MongoClient(process.env.mongo_connect, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    //Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. DB Connection succesful\n");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dqxuygr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
    try {
      const projectsCollection = client.db("shohan-portfolio").collection("projects");
      const experiencesCollection = client.db("shohan-portfolio").collection("experiences");
      const backendExperiencesCollection = client.db("shohan-portfolio").collection("experiences-backend");

      // Projects
      app.get("/projects", async (req, res) => {
        const query = {};
        const projects = await projectsCollection.find(query).toArray();
        res.send(projects);
      });

      // Get only one project
      app.get("/project/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const project = await projectsCollection.findOne(query);
        res.send(project);
      });

      // Frontend Experiences Collection
      app.get("/experiences", async (req, res) => {
        const query = {};
        const experiences = await experiencesCollection.find(query).toArray();
        res.send(experiences);
      });

      // Backend Experiences Collection
      app.get("/backendExperiences", async (req, res) => {
        const query = {};
        const backendExperiences = await backendExperiencesCollection.find(query).toArray();
        res.send(backendExperiences);
      });

    }
    finally {

    }
}

run().catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("Portfolio server is running");
});

app.listen(port, () => console.log(`Portfolio server running ${port}`));
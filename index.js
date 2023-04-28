const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

async function run() {
    try {

    }
    finally {

    }
}

run().catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("Portfolio server is running");
});

app.listen(port, () => console.log(`Portfolio server running ${port}`));
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const teachersData = require("./mockData");
const Teachers = require("./models/teacher");

const app = express();
const db = mongoose.connection;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/admin", adminRoutes);

mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log(`error connecting database : ${error}`);
    else console.log("Database is successfully connected");
  }
);

db.once("open", async (req, res) => {
  if ((await Teachers.countDocuments().exec()) > 0) {
    console.log("teachers Data already added in the collection");
    return;
  }

  Teachers.insertMany(teachersData)
    .then(() => console.log("Teachers Data added Successfully"))
    .catch((err) => console.log(`Error : ${err}`));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

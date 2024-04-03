const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application
app.use(bodyParser.json());

const Records = require("./routes/records");

app.use("/api", Records);

app.get('/', (req, res) => {
  res.send('Welcome to the Children Database API');
});

const MongoRUI = process.env.NEXT_PUBLIC_ATLAS_URI;
//Connection from Mongoose to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(MongoRUI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

connectToDB();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
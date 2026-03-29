require("dotenv").config();

const express = require('express');
const {connectToMongoDb} = require('./connect');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
const noteRoute = require('./routes/note.js');
const userRoute = require('./routes/user.js');
const cookieParser = require("cookie-parser");
const {restrictToLoggedUserOnly} = require('./middleware/auth.js');
const cors = require('cors');

app.use(cookieParser());
app.use('/home', userRoute);

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req, res) => {
  res.send('This is it');
});

app.use('/notes', restrictToLoggedUserOnly, noteRoute);


connectToMongoDb(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected...");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });


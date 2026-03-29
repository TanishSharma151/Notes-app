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

const allowedOrigins = [
  "http://localhost:5173",
  "https://notes-app-wv8f.onrender.com", 
  "https://notes-app-five-peach.vercel.app/"
];

app.use(cors({
  origin: function (origin, callback){
    if (!origin) return callback(true, null);

    if ( allowedOrigins.includes(origin)){
      return callback(null, true);
    }
    else{
       return callback(new Error("Not allowed by CORS"));
    }
  },

  credentials : true,
}));

app.use(cookieParser());
app.use('/home', userRoute);

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


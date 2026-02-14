const express = require('express');
const {connectToMongoDb} = require('./connect');
const app = express();
const PORT = 8000;
app.use(express.json());
const noteRoute = require('./src/routes/note.js');
const userRoute = require('./src/routes/user.js');
const cookieParser = require("cookie-parser");
const {restrictToLoggedUserOnly, checkAuth} = require('./src/middleware/auth.js');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use('/home', userRoute);
app.get('/', (req, res) => {
  res.send('This is it');
});

app.use('/notes', restrictToLoggedUserOnly, noteRoute);

connectToMongoDb(process.env.MONGODB ?? 'mongodb://localhost:27017/notes-app').then(()=>{
    console.log("MongoDB connected...");
}).then(()=>{
    app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})
});


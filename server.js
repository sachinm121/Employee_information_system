// config 
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

//database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open",() => console.log("conncted to the database "));

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
);

app.use((req,res,next) =>{
    res.locals,message = req.session.message;
    delete req.session.message;
    next();
})

// fetch static files 
app.use(express.static("uploads"));

//set template engine
app.set("view engine","ejs");


// app.get("/" , (req,res) => {
//     res.send("Hello from server side");
// })

//route prefix
app.use("",require("./routes/routes"));

app.listen(PORT, (err) =>{
    if(err)throw err
    console.log(`Server running on http://localhost:${PORT}`);
})
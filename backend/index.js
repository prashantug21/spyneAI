const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3001;
const CLIENT_URL=process.env.CLIENT_URL
const database = process.env.DATABASE_URL;

mongoose
  .connect(database)
  .then(async () => {
    console.log("Connected to DB");
  })
  .catch(async (err) => {
    console.log(err);
  });

app.use(cookieParser())
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Headers allowed in requests
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));


const sendOTP = require('./Routes/sendOTP');
const signUP = require('./Routes/signUp');
const home = require('./Routes/home');
const listAll = require('./Routes/listAll');
const listOne = require('./Routes/listOne');
const login = require('./Routes/login')
const deleteProduct = require('./Routes/deleteProduct')
const auth = require('./Routes/middleware/authentication')
const addProduct = require('./Routes/addProduct')
const updateProduct = require('./Routes/updateProduct')
const logout = require('./Routes/logout')
const doc=require('./Routes/doc')



app.post("/sendotp", sendOTP);
app.post("/signup", signUP);
app.post("/login", login)
app.post("/product", auth, addProduct)
app.get("/home", auth, home);
app.get("/product", auth, listAll);
app.get("/product/:itemid", auth, listOne);
app.put("/product/:itemid", auth, updateProduct)
app.delete("/product/:itemid", auth, deleteProduct)
app.get("/logout", logout)
app.get("/api/docs",doc)


app.listen(port, () => {
  console.log(`Example router listening on port ${port}`);
});


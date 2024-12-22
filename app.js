const express = require("express")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { connectdb } = require("./config/db");
const { userRouter } = require("./routes/userRoute");
const { eventRouter } = require("./routes/eventRoute");


require("dotenv").config()


// app config

const app = express();
const PORT = process.env.PORT


// Middleware

app.use(express.json());


// Routes

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);


//Database config

connectdb();


//Connect server

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})



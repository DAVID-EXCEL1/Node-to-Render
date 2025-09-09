const express = require('express');
const app = express();
const dotenv = require("dotenv")
const ejs = require('ejs');
app.set('view engine', 'ejs');
const mongoose = require("mongoose")
dotenv.config()
const customerRouter = require("./routes/user.route")

// Set your bodyparser
// In Node.js, when someone sends data to your server (for example, filling a form and clicking submit), that data doesn’t automatically come as a nice object. Instead, it usually comes in a raw format like a string or buffer.

// Body-parser is like a translator.
// It takes that raw incoming request data and converts it into a usable JavaScript object, so you can easily access it in your code.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const URI = process.env.URI


mongoose.connect(URI)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("MongoDB connection error:", err);
})


// Schema = structure & rules of your MongoDB document

// Model = actual object you use to interact with MongoDB (built from schema)

// let customerModel = mongoose.model("Customer", customerSchema);


let allCustomers = [];

app.use("/user", customerRouter)

const port = process.env.PORT || 3201;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

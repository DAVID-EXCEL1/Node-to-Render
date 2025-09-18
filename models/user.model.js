const mongoose = require("mongoose")


// In databases, a schema defines the structure/shape of your data.
// schema is like a blueprint for your database documents.
// Schema is used to...
// To enforce structure in MongoDB documents
// To validate data before saving
// To define relationships (e.g., User has many Posts)
// To add methods & middleware to database models
let customerSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: [true,"Email has been taken, please choose another one"]},
    password: {type: String, required: true},
    profilePicture: {type: String, default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"}

});

module.exports = mongoose.model("Customer", customerSchema)

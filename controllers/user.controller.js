const customerModel = require("../models/user.model")


const getSignup = (req, res) => {
    res.render('signup');
}

const postRegister = (req, res) => {
    console.log(req.body);
    // res.send("Confirmed")
    // allCustomers.push(req.body);
    let newCustomer = new customerModel(req.body);
    newCustomer.save()
        .then(() => {
            // res.send("Registration successful!");
            res.redirect("/user/dashboard");
        })
        .catch((err) => {
            console.error("Error registering customer:", err);
            // res.status(500).send("Internal server error");
        });
}

const getSignIn = (req, res) => {
    res.render('signin');
}

const postLogin = (req, res) => {
    res.send("Confirmed again")
}

const getDashboard = (req, res) => {
    customerModel.find()
        .then((allCustomers) => {
            console.log(allCustomers);
            res.render('index', { allCustomers });
        })
        .catch((err) => {
            console.error("Error fetching customers:", err);
            res.status(500).send("Internal server error");
        });
}

module.exports = { getSignup, postRegister, getSignIn, postLogin, getDashboard }
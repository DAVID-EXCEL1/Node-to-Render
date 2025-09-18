const customerModel = require("../models/user.model")
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const getSignup = (req, res) => {
    res.render('signup');
}

const postRegister = (req, res) => {
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // overwrite the plain password with the hashed one
    req.body.password = hashedPassword;

    console.log(req.body);
    // create a new customer with hashed password
    let newCustomer = new customerModel(req.body);

    newCustomer.save()
        .then(() => {
            newCustomer.password = hashedPassword;
            console.log("Customer registered successfully");

            // res.send("Registration successful!");
            // Transporter means the information about the service you are using to send email
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'davidsome2004@gmail.com',
                    // a special password generated from google account settings not your original password
                    // Step one: Enable 2-step verification
                    // Step two: Generate app password
                    pass: 'tqeynzmwvsthpfhj'
                }
            });
            // This is the information about the email you are sending
            let mailOptions = {
                from: 'davidsome2004@gmail.com',
                to: [req.body.email, "davidexcel2304@gmail.com", "doogunfiditimi@student.lautech.edu.ng", "adedayodaniel1711@gmail.com", "adeolaprecious006@gmail.com"], // list of receivers
                subject: 'Welcome to Our Application',

                // You can also send HTML formatted emails
                html: `
                                    <div style="background: #f4f6fb; padding: 40px 0; font-family: 'Segoe UI', Arial, sans-serif;">
                                        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden;">
                                            <div style="background: linear-gradient(90deg, #4f8cff 0%, #38c6fa 100%); padding: 24px 32px; color: #fff; text-align: center;">
                                                <h1 style="margin: 0; font-size: 2rem; font-weight: 700; letter-spacing: 1px;">Welcome to Our Application</h1>
                                            </div>
                                            <div style="padding: 32px 32px 24px 32px; text-align: center;">
                                                <p style="font-size: 1.1rem; margin-bottom: 16px; color: #333;">🎉 <strong>Congratulations!</strong> Your sign-up was successful!</p>
                                                <p style="font-size: 1rem; margin-bottom: 16px; color: #555;">Thank you for registering. We are excited to have you on board.</p>
                                                <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                                                <p style="font-size: 0.95rem; color: #888;">Best Regards,<br><span style="font-weight: 600; color: #4f8cff;">Your Application Team</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    `
            };

            // This is what will actually send the email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.redirect("/user/signin"); 
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
    const { email, password } = req.body;

    console.log("Login form submitted data:", req.body);

    customerModel.findOne({ email })
        .then((foundCustomer) => {
            if (!foundCustomer) {
                console.log("Invalid email");
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // Compare provided password with hashed one
            const isMatch = bcrypt.compareSync(password, foundCustomer.password);

            if (!isMatch) {
                console.log("Invalid password");
                return res.status(400).json({ message: "Invalid email or password" });
            }

            // ✅ Success
            console.log("Login successful for:", foundCustomer.email);
            return res.json({
                message: "Login successful",
                user: {
                    id: foundCustomer._id,
                    firstName: foundCustomer.firstName,
                    email: foundCustomer.email
                }
            });
        })
        
        .catch((err) => {
            console.error("Error logging in:", err);
            res.status(500).json({ message: "Internal server error" });
        });
};


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
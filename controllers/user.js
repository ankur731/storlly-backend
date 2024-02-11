const User = require("../models/user");
const userSchema = require("../validations/user");
const nodemailer = require("nodemailer");

const sendMail = (req, res, next) => {
  console.log(req.body);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ankur37tiwari@gmail.com",
      pass: "kbfagpqvwgkhwlnl",
    },
  });
  var message = `<h1>Hello ${req.body?.name} Thanks for visiting our site.</h1>`;
  var mailOptions = {
    from: 'ankur37tiwari@gmail.com',
    to: req.body.email,
    subject: "You just logged in Ankur Tiwari project",
    text: "Name : "+req.body?.name+" Email : "+req.body?.email+" Phone number : "+req.body?.phone+" Date of Birth: "+req.body?.dateOfBirth,
    html:message
  };
  

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json(error);
    } else {
      // res.status(200).json('Email sent: ' + info.response);
      next();
    }
  });
};
const signupUser = async function (req, res) {
  console.log("Hello", req.body);
  const { name, email, phone, dateOfBirth } = req.body;

  try {
    const parseStatus = userSchema.safeParse({
      name,
      email,
      phone,
      dateOfBirth,
    });

    if (!parseStatus.success) {
      // Use a 400 status code for a bad request
      return res.status(400).json({
        msg: "Invalid input",
        errors: parseStatus.error.errors[0]?.message || "Invalid Input",
      });
    }

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      dateOfBirth: dateOfBirth,
    });

    await newUser.save();
    res.status(201).json({
      msg: "User signup successfully",
    });
  } catch (error) {
    console.error("Error ", error);
    res.status(500).json({ message: "Error in adding user" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signupUser, getUsers, sendMail };

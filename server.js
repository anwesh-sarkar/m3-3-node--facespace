"use strict";

const express = require("express");
const morgan = require("morgan");

const { users } = require("./data/users");

let currentUser = {};

// declare the 404 function
const handleFourOhFour = (req, res) => {
  res.status(404).send("I couldn't find what you're looking for.");
};

// homepage
const handleHomepage = (req, res) => {
  res.status(200).render("pages/homepage", { users: users });
};

// profile page
const handleProfilePage = (req, res) => {
  let id = req.params._id;
  const user = users.find((item) => id === item._id);

  // Create an array containing objects, where each object is a friend of the user and has properties
  const friends = user.friends.map((id) => {
    return users.find((item) => id === item._id);
  });

  if (user) {
    res.status(200).render("pages/profile", {
      user: user,
      friends: friends,
    });
  }
};

// signin page
const handleSignin = (req, res) => {
  res.status(200).render("pages/signin");
};

// Get name from form in sign-in page
const handleName = (req, res) => {
  let firstName = req.query.firstName;
  let user = users.find((user) => user.name == firstName);

  if (user) {
    res.status(200).redirect(`users/${user._id}`);
  } else {
    res.status(404).redirect("/signin");
  }
};

// -----------------------------------------------------
// server endpoints
express()
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .set("view engine", "ejs")

  // endpoints
  .get("/", handleHomepage)

  // profile page endpoint
  .get("/users/:_id", handleProfilePage)

  // Sign-in endpoint
  .get("/signin", handleSignin)

  // endpoint to receive data from sign-in form
  .get("/getname", handleName)

  // a catchall endpoint that will send the 404 message.
  .get("*", handleFourOhFour)

  .listen(8000, () => console.log("Listening on port 8000"));

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
  let id = req.params.id;
  console.log(id);
  res.send(id);
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
  .get("/users/:id", handleProfilePage)

  // a catchall endpoint that will send the 404 message.
  .get("*", handleFourOhFour)

  .listen(8000, () => console.log("Listening on port 8000"));

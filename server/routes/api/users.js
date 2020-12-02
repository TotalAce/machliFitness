// Requiring our models and passport as we've configured it
const db = require("../../models");
const passport = require("../../config/passport");
const express = require("express");
const router = express.Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
  // res.redirect("/members")
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function (req, res) {
  // console.log(req.body);
  db.User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isTrainer: req.body.isTrainer
  })
    .then(function () {
      db.User.findAll({
        where: {
          username: req.body.username
        }
      }).then(function (data) {
        // res.json(data);

        let UserId = data[0].dataValues.id;

        if (req.body.isTrainer === true) {
          db.Trainer.create({
            username: req.body.username,
            UserId: UserId
          }).then(() => {
            res.send("Successfully added Trainer")
            console.log(req.body);
          })
            .catch(function (err) {
              res.status(401).json(err);
            });
        }
        else if (req.body.isTrainer === false) {
          db.Client.create({
            username: req.body.username,
            UserId: UserId
          }).then(() => {
            res.send("Successfully added Client")
            console.log(req.body);
          })
            .catch(function (err) {
              res.status(401).json(err);
            });
        }
      });

      // res.redirect(307, "/login");
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

// // Route for getting some data about our user to be used client side
// router.get("/user_data", function (req, res) {
//   if (!req.user) {
//     // The user is not logged in, send back an empty object
//     res.json({});
//   } else {
//     // Otherwise send back the user's email and id
//     // Sending back a password, even a hashed password, isn't a good idea
//     res.json({
//       email: req.user.email,
//       id: req.user.id
//     });
//   }
// });

module.exports = router;

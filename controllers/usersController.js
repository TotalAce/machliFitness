const db = require("../models");

function create(req, res) {
    db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isTrainer: req.body.isTrainer,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }).then(function (data) {
        // console.log(data);
        // console.log("user id", data.dataValues.id);
        // console.log("isTrainer", data.dataValues.isTrainer);
        let id = data.dataValues.id;
        let trainer = data.dataValues.isTrainer

        if (trainer === true) {
            db.Trainer.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                UserId: id
            }).then((data2) => {
                res.send(data2)
            }).catch(function (err) {
                res.status(401).json(err)
            });
        } else {
            db.Client.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                UserId: id
            }).then((data3) => {
                res.send(data3)
            }).catch(function (err) {
                res.status(401).json(err)
            });
        } 
        // console.log(data);
    }).catch(function (err) {
        // res.status(401).json(err);
        res.send(err)
    });

}

module.exports = { create }
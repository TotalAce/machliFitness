const db = require("../models");

module.exports = {

    createNote: (req, res) => {
        db.Note.create(
            {
                date: req.body.date,
                note: req.body.note,
                completed: req.body.completed,
                ClientId: req.body.ClientId
            })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
            })
    },


}
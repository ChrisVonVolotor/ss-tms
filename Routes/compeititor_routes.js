var express = require('express');
const competitorRoutes = express.Router();
let Competitor = require('../Schema/Competitor.model');

competitorRoutes.route('/').get(function(req, res) {
    Competitor.find(function(err, competitors) {
        if (err) {
            console.log(err);
        } else {
            res.json(competitors);
        }
    });
});

competitorRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Competitor.findById(id, function(err, competitor) {
        res.json(competitor);
    });
});

competitorRoutes.route('/add').post(function(req, res) {
    let competitor = new Competitor(req.body);
    competitor.save()
        .then(_competitor => {
            res.status(200).json({'competitor': 'competitor added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

competitorRoutes.route('/update/:id').post(function(req, res) {
    Competitor.findById(req.params.id, function(err, competitor) {
        if (!competitor)
            res.status(404).send("data is not found");
        else
        competitor.Competitor_firstName = req.body.Competitor_firstName;
        competitor.Competitor_lastName = req.body.Competitor_lastName;

        competitor.save().then(_competitor => {
                res.json('Competitor updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

competitorRoutes.route('/delete/:id').post(function(req, res) {
    Competitor.findById(req.params.id, function(err, competitor) {
        if (!competitor)
            res.status(404).send("data is not found");
        else
        Competitor.findByIdAndDelete(req.params.id).then(_competitor => {
            res.json(competitors);
        })
        .catch(err => {
            res.status(400).send("Delete not possible");
        });
    });
});

module.exports = competitorRoutes;
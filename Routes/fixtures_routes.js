let Fixtures = require('../Schema/Fixtures.model.js');
let Competitor = require('../Schema/Competitor.model.js');
var express = require('express');
var mongo = require('mongodb');
var roundrobin = require('roundrobin');
const fixturesRoutes = express.Router();





fixturesRoutes.route('/').get(function(req, res) {
    Fixtures.find(function(err, fixtures) {
        if (err) {
            console.log(err);
        } else {
            fixtures.sort(function (objA, objB) {
                var Match_RoundA = (objA.Match_Round);
                var Match_RoundB = (objB.Match_Round);
            
                if(Match_RoundA > Match_RoundB) {
                    return 1;
                } else if (Match_RoundA < Match_RoundB) {
                    return -1;
                } else {
                    var Match_BoutA = objA.Match_Bout;
                    var Match_BoutB = objB.Match_Bout;
            
                    if(Match_BoutA > Match_BoutB) {
                        return 1;
                    } else if (Match_BoutA < Match_BoutB) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
            res.json(fixtures);
        }
    });
});

fixturesRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Fixtures.findById(id, function(err, fixtures) {
        res.json(fixtures);
    });
});

fixturesRoutes.route('/update/:id').post(function(req,res){
    var pts1 = 0;
    var pts2 = 0;
    Fixtures.findById(req.params.id, function(err, fixtures) {
        if (!fixtures)
            res.status(404).send("data is not found");
        else


        pts1 = fixtures.Match_Competitor1_Score;
        pts2 = fixtures.Match_Competitor2_Score;
        fixtures.Match_Round = req.body.Match_Round,
        fixtures.Match_Bout= req.body.Match_Bout,
        fixtures.Match_Competitor1_Score= req.body.Match_Competitor1_Score,
        fixtures.Match_Competitor2_Score= req.body.Match_Competitor2_Score,
        fixtures.Match_Completed= req.body.Match_Completed

        fixtures.save().then(_fixtures => {
            console.log('Fixture updated!');
            console.log(_fixtures.Match_Completed);
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
    });


    
    res.json("Fixture Updated")

});


fixturesRoutes.route('/create').post(function(req, res){ 
    Fixtures.remove(function(err,removed) {
        console.log(removed);
    });


    let listComp = req.body.competitors;
    let n = listComp.length;
    let robins = req.body.robins;
    
    let fixtures = roundrobin(n, listComp);
    for (let rr = 0; rr < robins; rr++) {
        let loopRoundAdder;
        for (let r = 0; r < fixtures.length; r++) {
            loopRoundAdder = fixtures.length * rr;
            for (let b = 0; b < fixtures[r].length; b++) {
                let match = {};
                if(rr % 2 == 0){
                     match = {
                        Match_Round: r+1 + loopRoundAdder,
                        Match_Bout: b+1,
                        Match_Competitor1: fixtures[r][b][1],
                        Match_Competitor2: fixtures[r][b][0]
                    }
                }else{
                     match = {
                        Match_Round: r+1 + loopRoundAdder,
                        Match_Bout: b+1,
                        Match_Competitor2: fixtures[r][b][1],
                        Match_Competitor1: fixtures[r][b][0]
                    }
                }
                
                let fix = new Fixtures(match);
                fix.save();
            }
            
        }
    }        


    res.json(fixtures);
});

module.exports = fixturesRoutes;
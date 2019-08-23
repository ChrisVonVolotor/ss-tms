const mongoose = require('mongoose');
let Competitor = require('../Schema/Competitor.model');

const Schema = mongoose.Schema;

let Fixtures = new Schema({
        Match_Round:{
            type:Number,
            required: true
        },
        Match_Bout:{
            type:Number,
            required: true
        },
        Match_Competitor1:{
            type: Object,
            required:true
        },
        Match_Competitor2:{
            type: Object,
            required:true
        },
        Match_Competitor1_Score:{
            type: Number,
            default: 0
        },
        Match_Competitor2_Score:{
            type: Number,
            default: 0
        },
        Match_Completed: {
            type: Boolean,
            default: false
        }
    }
);



module.exports = mongoose.model('Fixtures', Fixtures);
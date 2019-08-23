const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Competitor = new Schema(
    {
        Competitor_firstName:{
            type:String
        },
        Competitor_lastName:{
            type:String
        },
        Competitor_points:{
            type: Number,
            default: 0
        }
    }
);

module.exports = mongoose.model('Competitor', Competitor);
import mongoose from 'mongoose';
import Venue from './venue';
import Employee from './employee';
let Schema = mongoose.Schema;

let AnalyticSchema = new Schema({
  name: { type: String, required: true},
  analytics: {
        date: Date,
        hours: Number,
        totalSales: Number,
        totalItemsSold: Number,
        comps: Number,
        spills: Number,
    }
});

module.exports = mongoose.model('Analytics', AnalyticSchema);
import mongoose from 'mongoose';
import Venue from './venue';
import Employee from './employee';
let Schema = mongoose.Schema;

let AnalyticSchema = new Schema({
  date: { type: Date, required: true},
  hours: Number,
  totalSales: Number,
  totalItemsSold: Number,
  comps: Number,
  spills: Number,
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
});

module.exports = mongoose.model('Analytics', AnalyticSchema);
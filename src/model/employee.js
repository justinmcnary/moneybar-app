import mongoose from 'mongoose';
import Venue from './venue';
let Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
  title: { type: String, required: true },
  name: {type: String, required: true},
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  analytics: [{type: Schema.Types.ObjectId, ref: 'Analytics'}]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
import mongoose from 'mongoose';
import Employee from './employee';
let Schema = mongoose.Schema;

let VenueSchema = new Schema({
  name: { type: String, required: true},
  venueType: { type: String, required: true},
  location : {
        street: String,
        state: String,
        zipcode: String,
        phone: String
  },
  employee: [{type: Schema.Types.ObjectId, ref: 'Employee'}]
});

module.exports = mongoose.model('Venue', VenueSchema);
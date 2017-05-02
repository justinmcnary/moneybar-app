import mongoose from 'mongoose';
import { Router } from 'express';
import Venue from '../model/venue';
import Employee from '../model/employee';
import Analytics from '../model/analytics';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();


  // CRUD Create Read Update Delete

  // '/v1/venue/add' -- Create
  api.post('/add', (req, res) => {
    let newVenue = new Venue();
    newVenue.name = req.body.name;
    newVenue.venueType = req.body.venueType;
    newVenue.location.street = req.body.location.street;
    newVenue.location.state = req.body.location.state;
    newVenue.location.zipcode = req.body.location.zipcode;
    newVenue.location.phone = req.body.location.phone;
    newVenue.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Venue saved succesfully' });
    });
  });

  // '/v1/venue'/ -- Read
  api.get('/', (req, res) => {
    Venue.find({}, (err, venues) => {
      if (err) {
        res.send(err);
      }
      res.json(venues);
    });
  });

 // 'v1/venue/:id' -- Read
  api.get('/:id', (req, res) => {
    Venue.findById(req.params.id, (err, venue) => {
      if (err) {
        res.send(err);
      }
      res.json(venue);
    });
  });

// 'v1/venue/:id' -- Update
  api.put('/:id', (req, res) => {
    Venue.findById(req.params.id, (err, venue) => {
      if (err) {
        res.send(err);
      }
      venue.name = req.body.name;
      venue.venueType = req.body.venueType;
      venue.location.street = req.body.location.street;
      venue.location.state = req.body.location.state;
      venue.location.zipcode = req.body.location.zipcode;
      venue.location.phone = req.body.location.phone;
      venue.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Venue info updated" });
      });
    });
  });

// 'v1/venue/:id' -- Delete
  api.delete('/:id', (req, res) => {
    Venue.remove({
      _id: req.params.id
    }, (err, venue) => {
      if (err) {
        res.send(err);
      }
      Employee.remove({
        venue: req.params.id
      }, (err, employee) => {
        if (err) {
          res.send(err);
        }
      res.json({message: "Venue and Employees Removed"});
      }); 
    });
  });

// add employee for a specific venue id
// '/v1/venue/employees/add/:id'
  api.post('/employee/add/:id', (req, res) => {
    Venue.findById(req.params.id, (err, venue) => {
      if (err) {
        res.send(err);
      }
      let newEmployee = new Employee();

      newEmployee.title = req.body.title;
      newEmployee.name = req.body.name;
      newEmployee.venue = venue._id;
      newEmployee.save((err, employee) => {
        if (err) {
          res.send(err);
        }
        venue.employee.push(newEmployee);
        venue.save(err => {
          if (err) {
          res.send(err);
          }
          res.json({ message: "Venue employee added"});
        });
      });
    });
  });

  //get employees for a specific venue id
  // '/v1/venue/employees/:id'
  api.get('/employees/:id', (req, res) => {
    Employee.find({venue: req.params.id}, (err, employees) => {
      if (err) {
        res.send(err);
      }
      res.json(employees);
    });
  });

  //search for specific kind of venue venueType
  // 'v1/venue/venueType/:venueType
  api.get('/venueType/:venueType', (req, res) => {
    Venue.find({venueType: req.params.venueType}, (err, venues) => {
      if (err) {
        res.send(err);
      }
      res.json(venues);
    });
  });

  return api;
}
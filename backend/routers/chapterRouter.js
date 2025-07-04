const Model = require('../models/chapterModel');
const { Router } = require('express');
const router = Router();

//add user data
router.post('/add', (req, res) => {
  console.log(req.body);
  // res.send('Respond from User Router');

  new Model(req.body)
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post('/authenticate', (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) res.json(result);
      else res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get('/getall', (req, res) => {
  Model.find({})
    .populate('trainer')
    .then((result) => {
      console.log(result);
      if (result) res.json(result);
      else res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get('/getbyid/:id', (req, res) => {
  Model.findById(req.params.id)
    .populate('trainer')
    .then((result) => {
      console.log(result);
      if (result) res.json(result);
      else res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put('/update/:id', (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('trainer')
    .then((result) => {
      console.log(result);
      if (result) res.json(result);
      else res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.delete('/delete/:id', (req, res) => {
  Model.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      if (result) res.json(result);
      else res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get('/getbytrainer/:id', (req, res) => {
  Model.find({ trainer: req.params.id })
    .then((result) => {
      console.log(result);
      if (result) res.json(result);
      else res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;

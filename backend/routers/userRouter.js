const Model = require('../models/userModel');
const { Router } = require('express');
const router = Router();

//add user data
router.post('/add', (req, res) => {
    console.log(req.body);
   // res.send('Respond from User Router');

    new Model(req.body).save()
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/getall', (req, res) => {
    Model.find({})
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/getbyemail/:email', (req, res) => {
    Model.findOne({email : req.params.email})
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.post('/authenticate', (req, res) => {
    console.log(req.body);
    Model.findOne(req.body)
    .then((result) => {
        console.log(result);
        if(result) {
            Model.findByIdAndUpdate(result._id, { lastLogin: new Date(), $inc: { timesLoggedin: 1 } }).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.error(err);
            });
            
            res.json(result);
        }
        else res.status(401).json({ message: 'Invalid Credentials'});
        
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
} );


module.exports = router;
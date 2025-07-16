const Model = require("../models/trainerModel");
const { Router } = require("express");
const router = Router();

//add user data
router.post("/add", (req, res) => {
  // res.send('Respond from User Router');

  new Model(req.body)
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Ошибка при создании тренера:", err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/getall", (req, res) => {
  Model.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Model.findById(req.params.id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Trainer not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: "Trainer not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.post("/authenticate", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) res.json(result);
      else res.status(401).json({ message: "Invalid Credentials" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;

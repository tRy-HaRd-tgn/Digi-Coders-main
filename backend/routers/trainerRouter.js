const Model = require("../models/trainerModel");
const { Router } = require("express");
const router = Router();

//add user data
router.post("/add", (req, res) => {
  console.log("Получен запрос на регистрацию тренера:", req.body);
  // res.send('Respond from User Router');

  new Model(req.body)
    .save()
    .then((result) => {
      console.log("Тренер успешно создан:", result);
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

router.put("/update/:id", (req, res) => {
  Model.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.json(result);
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

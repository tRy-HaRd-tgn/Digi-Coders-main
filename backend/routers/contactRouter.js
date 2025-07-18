const Model = require("../models/contactModel");
const { Router } = require("express");
const router = Router();

//add user data
router.post("/add", (req, res) => {
  // Серверная валидация
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    return res
      .status(500)
      .json({ error: "Все поля обязательны для заполнения." });
  }
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

router.post("/authenticate", (req, res) => {
  Model.findOne(req.body)
    .then((result) => {
      if (result) res.json(result);
      else res.status(401).json({ message: "Неверные учетные данные" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;

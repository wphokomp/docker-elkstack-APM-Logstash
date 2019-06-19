const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hero = require("../models/hero");

router.get("/", (req, res, next) => {
  Hero.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  var hero = new Hero({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    power: req.body.power,
    about: req.body.about,
    imgUrl: req.body.imgUrl
  });
  hero
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /products",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// FindByName
// router.get('/:name', (req, res, next) => {
//     const name = req.params.name;

//     Hero.findOne()
// });

router.get("/:heroId", (req, res, next) => {
  const id = req.params.heroId;

  Hero.findById(id)
    .exec()
    .then(result => {
      console.log("From database", result);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          Message: "Not found!"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ error: err });
    });
});

router.patch("/:heroId", (req, res, next) => {
  const id = req.params.heroId;
  const updateOps = {};

  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Hero.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err
      });
    });
});

router.delete("/:heroId", (req, res, next) => {
  const id = req.params.heroId;

  Hero.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err
      });
    });
});

module.exports = router;

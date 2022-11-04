const db = require("../models");
const Seed = db.seed;
const utils = require("../app_utils");

// Find a single Tutorial with an id
exports.findOneById = (req, res) => {
    const id = req.params.id;

    Seed.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Seed with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Seed with id=" + id
        });
      }); 
};

exports.condensedSeedById = (req, res) => {
    const id = req.params.id;
    console.log("Searching for seed id: "+ id);
    Seed.findOne({
      where: {id: id}, include: { all: true, nested: true}} )
      .then(data => {
        if (data) {
          console.log("found seed: " + data.id);
          res.send(utils.condense_seed(data));
        } else {
          res.status(404).send({
            message: `Cannot find Seed with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Seed with id=" + id
        });
      }); 

};

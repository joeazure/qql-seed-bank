const db = require("../models");
const Sequelize = require('sequelize');
const Seed = db.seed;
const utils = require("../app_utils");

exports.getNRandom = (req, res) => {
  console.log('Getting some randoms...');
  const cnt = parseInt(req.params.count);

  Seed.findAll(
    { limit: cnt,
      order: [Sequelize.fn( 'RAND' )], 
      include: { all: true, nested: true},     
    })
    .then(data => {
      if (data) {
        console.log("Selected seeds. Generating output...");
        seeds = [];
        // Iterate over all the seeds
        data.forEach(s => {
          console.log("Adding a seed");
          seeds.push(utils.condense_seed(s));
        });
        const returnData = {};
        returnData["seeds"] = seeds;
        res.send(returnData);
      } else {
        res.status(404).send({
          message: "Cannot find any seeds"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Seeds"
      });
    }); 

};

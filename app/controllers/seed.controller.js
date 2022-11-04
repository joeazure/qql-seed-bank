const db = require("../models");
const Seed = db.seed;

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

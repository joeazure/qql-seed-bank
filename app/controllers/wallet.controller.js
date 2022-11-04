const db = require("../models");
const Wallet = db.wallet;

// Find a single Tutorial with an id
exports.findOneById = (req, res) => {
    const id = req.params.id;

    Wallet.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Wallet with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Wallet with id=" + id
        });
      }); 
};

module.exports = app => {
    const wallets = require("../controllers/wallet.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
   // router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", wallets.findOneById);
  
    // Update a Tutorial with id
    //router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    //router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    //router.delete("/", tutorials.deleteAll);
  
    app.use('/api/wallets', router);
  };

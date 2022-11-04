module.exports = app => {
    const seeds = require("../controllers/seed.controller.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    //router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
   // router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    //router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Seed with id
    router.get("/:id", seeds.findOneById);

    router.get("/:id/condensed", seeds.condensedSeedById);
  
    // Update a Tutorial with id
    //router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    //router.delete("/:id", tutorials.delete);
  
    // Delete all Tutorials
    //router.delete("/", tutorials.deleteAll);
  
    app.use('/api/seeds', router);
  };
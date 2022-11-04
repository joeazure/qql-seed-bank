module.exports = (sequelize, Sequelize) => {
    const Trait = sequelize.define("trait", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      seed_id: {
          type: Sequelize.INTEGER
      },
      version: {
          type: Sequelize.INTEGER,
      },
      flowField: {
        type: Sequelize.STRING
      },
      turbulence: {
        type: Sequelize.STRING
      },
      margin: {
        type: Sequelize.STRING
      },
      colorVariety: {
        type: Sequelize.STRING
      },
      colorMode: {
        type: Sequelize.STRING
      },
      structure: {
        type: Sequelize.STRING
      },
      bullseyeRings1: {
        type: Sequelize.STRING
      },
      bullseyeRings2: {
        type: Sequelize.STRING
      },
      bullseyeRings3: {
        type: Sequelize.STRING
      },
      bullseyeRings7: {
        type: Sequelize.STRING
      },
      ringThickness: {
        type: Sequelize.STRING
      },
      ringSize: {
        type: Sequelize.STRING
      },
      sizeVariety: {
        type: Sequelize.STRING
      },
      colorPalette: {
        type: Sequelize.STRING
      },
      spacing: {
        type: Sequelize.STRING
      }
    });

    Trait.associate = function(models) {
      Trait.belongsTo(models.seed, {foreignKey: "seed_id", as: "seed"})
    };
    return Trait;
}
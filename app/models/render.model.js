module.exports = (sequelize, Sequelize) => {
    const Render = sequelize.define("render", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      seed_id: {
        type: Sequelize.INTEGER
      },
      backgroundColor: {
          type: Sequelize.STRING
      },
      numColors: {
          type: Sequelize.INTEGER
      },
      numPoints: {
          type: Sequelize.INTEGER
      },
      colorList: {
          type: Sequelize.STRING
      }
    });

    Render.associate = function(models) {
        Render.belongsTo(models.seed, {foreignKey: "seed_id", as: "seed"})
        Render.hasOne(models.output, {foreignKey: "render_id", as: "output"})
    };
    return Render;
}

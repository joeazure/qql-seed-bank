module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      host: {
        type: Sequelize.STRING
      },
      folderPath: {
          type: Sequelize.STRING
      }
    });

    Location.associate = function(models) {
      Location.hasMany(models.output, {foreignKey: "location_id", as: "outputs"})
    };
    return Location;
}
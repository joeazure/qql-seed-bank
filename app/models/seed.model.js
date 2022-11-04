module.exports = (sequelize, Sequelize) => {
    const Seed = sequelize.define("seed", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      full_hexseed: {
          type: Sequelize.STRING
      },
      wallet_id: {
          type: Sequelize.INTEGER,
      },
      algorithm_hexseed: {
          type: Sequelize.STRING
      }
    });
    Seed.associate = function(models) {
        Seed.belongsTo(models.wallet, {foreignKey: "wallet_id", as: "wallet"})
        Seed.hasOne(models.render, {foreignKey: "seed_id", as: "render"})
        Seed.hasOne(models.trait, {foreignKey: "seed_id", as: "trait"})
    };
    return Seed;
}

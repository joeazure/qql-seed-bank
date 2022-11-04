module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      address: {
        type: Sequelize.STRING,
        unique: true
      }
    });

    Wallet.associate = function(models) {
      Wallet.hasMany(models.seed, {foreignKey: "wallet_id", as: "seeds"})
    };

    return Wallet;
  };


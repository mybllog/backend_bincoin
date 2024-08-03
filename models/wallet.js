module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
           
        },
        deposit_id: {
            type: DataTypes.INTEGER,
           
        },
        balances:{
            type: DataTypes.DECIMAL(12,2),
            defaultValue:0.00
        },
        currency:{
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    return Wallet;
};

const { wallet } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Withdraw = sequelize.define('Withdraw', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          withdrawal_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generates UUID
            unique: true,
            allowNull: false,
        },
          user_id: {
            type: DataTypes.INTEGER,
            
        },

          wallet_id:{
            type: DataTypes.INTEGER,
          },

        amount: {
            type: DataTypes.DECIMAL(12, 2),
            defaultValue: 0.0,
            
        },

        currency: {
      type: DataTypes.STRING,
      allowNull:false
      
    },

        
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
   
    });

    return Withdraw;
};

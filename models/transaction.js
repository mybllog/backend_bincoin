module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        deposit_id: {
            type: DataTypes.UUID,
           
        },
        withdraw_id: {
            type: DataTypes.UUID,
          
        },
        account_type: {
          type: DataTypes.ENUM('deposit', 'withdrawal'),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(12, 2),
            defaultValue: 0.0,
            
        },
       charge:{
            type:DataTypes.DECIMAL(12, 2),
            allowNull:false,
            defaultValue:1000.00
       },
       currency:{
        type: DataTypes.STRING,
        allowNull:false
    },
       
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
   
    });

    return Transaction;
};

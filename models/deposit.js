module.exports = (sequelize, DataTypes) => {
    const Deposit = sequelize.define('Deposits', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          deposit_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generates UUID
            unique: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            
        },
        amount: {
          type:DataTypes.DECIMAL(12, 2),
            allowNull:false,
           
        },
       charge:{
           type:DataTypes.DECIMAL(12, 2),
            allowNull:false,
            defaultValue:1000.00
       },
       total:{
           type:DataTypes.DECIMAL(12, 2),
            allowNull:false,
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

    return Deposit;
};

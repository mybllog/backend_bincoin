module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define('confirmation_token', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
   
    });

    return Token;
};

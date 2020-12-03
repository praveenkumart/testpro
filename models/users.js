module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstname: type.STRING,
        lastname: type.STRING,
        email: type.STRING,
        age: type.INTEGER,
        is_active: type.INTEGER,

    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: true,
            // validate

        })
}   
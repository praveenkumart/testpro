module.exports = (sequelize, type) => {
    return sequelize.define('logs', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: type.STRING,
        newsletter_name: type.STRING,
        status: type.STRING,
        is_active: type.INTEGER,

    }, {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: true,
            // validate

        })
}   
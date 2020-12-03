'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.js')[env];
var db = {};

var credentials = require('../config/constant.json')['local'];

var sequelize = new Sequelize(credentials.db.database, credentials.db.username, credentials.db.password, {
    host: credentials.db.host,
    dialect: 'mysql',
    operatorsAliases: true,
    freezeTableName: true,
    logging: true,
    pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000,
        handleDisconnects: true
    },
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.  ');

    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = require(path.join(__dirname, file))(sequelize,
            Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
sequelize.sync({ alter: true }).then(function () {

})
db.sequelize = sequelize;
// db.Sequelize = sequelize;

module.exports = db;
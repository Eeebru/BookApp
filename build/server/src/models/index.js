'use strict';

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';

var config = require(__dirname + '/../config/config.js')[env];

var db = {};
console.log('this is the environment ==> ', env);
var sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db; // import fs from 'fs';
// import path from 'path';
// import Sequelize from 'sequelize';
// import configJson from '../config/config';
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
// const config = configJson[env];
// console.log('this is the environment: ', env);
// const db = {};
// let sequelize;
// if (config.environment === 'production') {
//   sequelize = new Sequelize(
//       process.env[config.use_env_variable], config
//     );
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS, {
//       host: process.env.DB_HOST,
//       port: process.env.DB_PORT,
//       dialect: 'postgres',
//       dialectOption: {
//         ssl: true,
//         native: true
//       },
//       logging: true
//     }
//   );
// } else {
//   sequelize = new Sequelize(
//      config.database, config.username, config.password, config
//   );
// }
// fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (file.indexOf('.') !== 0) && 
//            (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach((file) => {
//     const model = sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// export default db;
//# sourceMappingURL=index.js.map
'use strict';
const db = require('./conn');
const chalk = require('chalk');

// Require our models. Running each module registers the model into sequelize
// so any other part of the application can simply call sequelize.model('User')
// to get access to the User model.
require('./models');



module.exports = db;
// module.exports = syncedDbPromise;

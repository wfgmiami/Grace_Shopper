'use strict';

const path = require('path');
const secret = process.env.SECRET || '1701-FLX-NY';

const rootPath = path.join(__dirname, '../../');
const serverRoot = path.join(__dirname, '../');

module.exports = app => {
  app.set('projectRoot', rootPath);
  app.set('jwtSecret', secret);
  app.set('serverRoot', serverRoot);
};

const nginx = require('./nginx');
const { baseInfrastructure } = require('kelda');

// This will default to using the infrastructure called `default`.
const inf = baseInfrastructure();

nginx.createContainer().deploy(inf);

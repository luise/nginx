const app = require('./app');
const { baseInfrastructure } = require('@quilt/quilt');

// This will default to using the infrastructure called `default`.
const inf = baseInfrastructure();

inf.deploy(app.createContainer());

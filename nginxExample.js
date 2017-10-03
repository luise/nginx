const nginx = require('./nginx');
const { baseInfrastructure } = require('@quilt/quilt');

// This will default to using the infrastructure called `default`.
const inf = baseInfrastructure();

inf.deploy(nginx.createContainer());

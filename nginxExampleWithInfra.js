const nginx = require('./nginx');
const { Infrastructure, Machine } = require('kelda');

// Setup the infrastructure.
const baseMachine = new Machine({
  provider: 'Amazon',
  size: 't2.micro',
  // Be sure not to use spot instances, because t2.micro
  // instances aren't available as spot instances.
  preemptible: false,
});

// Create Master and Worker Machines.
const infra = new Infrastructure(baseMachine, baseMachine);

nginx.createContainer().deploy(infra);

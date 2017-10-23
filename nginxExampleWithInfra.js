const nginx = require('./nginx');
const { Machine, createDeployment } = require('kelda');

const deployment = createDeployment();

// Setup the infrastructure.
const baseMachine = new Machine({
  provider: 'Amazon',
  size: 't2.micro',
  // Be sure not to use spot instances, because t2.micro
  // instances aren't available as spot instances.
  preemptible: false,
});

// Create Master and Worker Machines.
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(1));

nginx.createContainer().deploy(deployment);

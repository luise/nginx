'use strict';

const app = require('./app');
const {Machine, createDeployment} = require('@quilt/quilt');

const deployment = createDeployment({});

// Setup the infrastructure.
const baseMachine = new Machine({
  provider: 'Amazon',
  size: 't2.micro',
  // Be sure not to use spot instances, because t2.micro
  // instances aren't available as spot instances.
  preemptible: false,
  // Replace with your GitHub username to allow logging into machines.
  // sshKeys: githubKeys("CHANGE_ME"),
});

// Create Master and Worker Machines.
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(1));

deployment.deploy(app.createService());

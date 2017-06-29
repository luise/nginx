'use strict';

const app = require('./app');
const fs = require('fs');
const path = require('path');
const {Machine, createDeployment} = require('@quilt/quilt');

// Get a SSH public key to use by looking for one in ~/.ssh/id_rsa.pub.
const publicKeyFile = path.join(process.env.HOME, '.ssh/id_rsa.pub');
if (!fs.existsSync(publicKeyFile)) {
    throw new Error('No SSH public key found in ' + publicKeyFile +
        '. Use the ssh-keygen command to generate one.');
}
const sshPublicKey = fs.readFileSync(publicKeyFile, 'utf8');

const deployment = createDeployment({});

// Setup the infrastructure.
const baseMachine = new Machine({
  provider: 'Amazon',
  size: 't2.micro',
  // Be sure not to use spot instances, because t2.micro
  // instances aren't available as spot instances.
  preemptible: false,
  sshKeys: [sshPublicKey],
});

// Create Master and Worker Machines.
deployment.deploy(baseMachine.asMaster());
deployment.deploy(baseMachine.asWorker().replicate(1));

deployment.deploy(app.createService());

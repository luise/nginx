# Nginx for Kelda.js

This repository implements an Nginx specification for Kelda.js.
The blueprint in `nginxExample.js` will launch an Nginx application on the
user's `default` infrastructure. Such an infrastructure can be created with the
`kelda init` command.

The `nginxExampleWithInfra.js` blueprint launches the same Nginx app, but
specifies the infrastructure directly in the blueprint with the Kelda API.
It is therefore possible to run this blueprint without running `kelda init`.

## More Info
For information about how to run this blueprint with Kelda, see
[the Kelda documentation](http://docs.kelda.io).

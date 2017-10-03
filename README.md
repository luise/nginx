# Nginx for Quilt.js

This repository implements an Nginx specification for Quilt.js.
The blueprint in `nginxExample.js` will launch an Nginx application on the
user's `default` infrastructure. Such an infrastructure can be created with the
`quilt init` command.

The `nginxExampleWithInfra.js` blueprint launches the same Nginx app, but
specifies the infrastructure directly in the blueprint with the Quilt API.
It is therefore possible to run this blueprint without running `quilt init`.

## Tutorial
For more details about how to get Nginx up and running with Quilt, check
out [the tutorial](http://docs.quilt.io/#getting-started).

## More Info
For information about how to run this blueprint with Quilt, see
[the Quilt documentation](http://docs.quilt.io).

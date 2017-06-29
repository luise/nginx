# Nginx for Quilt.js

This repository implements an Nginx specification for Quilt.js.
The blueprint, in `main.js`, will launch 2 Amazon AWS instances
that run in the free tier, which means that running the spec will
be free as long as the user hasn't exceeded AWS's
[free tier allowance](https://aws.amazon.com/free/). One of the
instances will be used as the Quilt master, and the other one
will serve `index.html` on the public internet.

For information about how to run this blueprint with Quilt, see
[the Quilt documentation](http://docs.quilt.io).

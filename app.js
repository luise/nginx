'use strict';

const fs = require('fs');
const path = require('path');
const {Container, Service, publicInternet} = require('@quilt/quilt');

const image = 'nginx:1.10';

/**
 * Creates and configures one container that runs nginx.
 *
 * @param {number} port The port that nginx should listen on. Defaults to
 *     80 if not specified.
 * @return {Service} A service that wraps the container running nginx.
 */
exports.createService = function(port) {
  port = port || 80;
  if (typeof port !== 'number') {
    throw new Error('port must be a number');
  }

  const nginxConfTemplate = fs.readFileSync(
      path.join(__dirname, 'default.tmpl'), {encoding: 'utf8'});
  const nginxConf = applyTemplate(nginxConfTemplate, {'port': port});

  // Create a Nginx Docker container, encapsulating it within the service
  // "web_tier".
  const webTier = new Service('web_tier', [
    new Container(image).withFiles({
      '/etc/nginx/conf.d/default.conf': nginxConf,
    }),
  ]);
  webTier.allowFrom(publicInternet, port);

  return webTier;
};

/**
 * Replaces the keys defined by `vars` with their corresponding values in
 * `template`. A variable is denoted in the template using {{key}}.
 *
 * @param {string} template A template containing variables to replace.
 * @param {Object.<string, string>} vars Maps string variables to the value
 *     that they should be replaced with.
 * @return {string} `template` with all of the variables replaced.
 */
function applyTemplate(template, vars) {
  for (let k in vars) {
    if (typeof k === 'string') {
      template = template.replace('{{'+k+'}}', vars[k]);
    }
  }
  return template;
}

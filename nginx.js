const fs = require('fs');
const path = require('path');
const { Container, publicInternet } = require('kelda');

const image = 'nginx:1.10';
// Directory where the website HTML files will be stored.
const siteSourceDirectory = '/site/';
const indexFilename = 'index.html';

/**
 * Replaces the keys defined by `vars` with their corresponding values in
 * `template`. A variable is denoted in the template using {{key}}.
 *
 * @param {string} template A template containing variables to replace.
 * @param {Object.<string, string>} vars Maps string variables to the value
 *     that they should be replaced with.
 * @return {string} `template` with all of the variables replaced.
 */
function applyTemplate(templateArg, vars) {
  let template = templateArg;
  Object.keys(vars).forEach((k) => {
    if (typeof k === 'string') {
      template = template.replace(`{{${k}}}`, vars[k]);
    }
  });
  return template;
}

/**
 * Creates and configures one container that runs nginx.
 *
 * @param {number} port The port that nginx should listen on. Defaults to
 *     80 if not specified.
 * @return {Container} A container running nginx.
 */
exports.createContainer = function createContainer(port = 80) {
  if (typeof port !== 'number') {
    throw new Error('port must be a number');
  }

  const nginxConfTemplate = fs.readFileSync(
    path.join(__dirname, 'nginx_defaults.conf.tmpl'), { encoding: 'utf8' });
  const nginxConf = applyTemplate(nginxConfTemplate, {
    port,
    source_dir: siteSourceDirectory,
    index_filename: indexFilename,
  });

  const indexFileData = fs.readFileSync(
    path.join(__dirname, indexFilename), { encoding: 'utf8' });

  const files = { '/etc/nginx/conf.d/default.conf': nginxConf };
  files[path.join(siteSourceDirectory, indexFilename)] = indexFileData;

  // Create a Nginx Docker container.
  const webTier = new Container('web_tier', image, {
    filepathToContent: files,
  });
  webTier.allowFrom(publicInternet, port);

  return webTier;
};

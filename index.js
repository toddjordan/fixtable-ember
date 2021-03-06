/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

function importFontAwesome(app) {
  var fontAwesomePath = path.join(app.bowerDirectory, 'font-awesome');

  var fontAwesomeCssPath = path.join(fontAwesomePath, 'css');
  app.import({
    development: path.join(fontAwesomeCssPath, 'font-awesome.css'),
    production: path.join(fontAwesomeCssPath, 'font-awesome.min.css')
  });

  var fontAwesomeFontPath = path.join(fontAwesomePath, 'fonts');
  fs.readdirSync(fontAwesomeFontPath)
    .forEach(fileName =>
      app.import(path.join(fontAwesomeFontPath, fileName), { destDir: '/fonts' }));
}

function importFixtable(app) {
  var fixtablePath = path.join(app.bowerDirectory, 'fixtable/dist/');
  app.import({
    development: path.join(fixtablePath, 'fixtable.css'),
    production: path.join(fixtablePath, 'fixtable.min.css')
  });
  app.import({
    development: path.join(fixtablePath, 'fixtable.js'),
    production: path.join(fixtablePath, 'fixtable.min.js')
  });
}

module.exports = {
  name: 'fixtable-ember',

  included(parent) {
    this._super.included.apply(this, arguments);

    // Find the top-level app if this is nested within other addons
    while (parent.app) {
      parent = parent.app;
    }

    importFontAwesome(parent);
    importFixtable(parent);

    parent.import('vendor/styles/fixtable-ember.css');
  }
};

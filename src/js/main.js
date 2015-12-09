'use strict';

var angular = require('angular');

angular.module('app', [
    require('angular-ui-bootstrap'),
    require('angular-translate'),
    require('angular-ui-router')
]);

require('./controllers');
require('./services');
require('./directives');
require('./filter');
require('./config');
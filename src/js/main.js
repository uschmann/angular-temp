'use strict';
var angular = require('angular');
var app = angular.module('app', [
    require('angular-ui-bootstrap')
]);

require('./controllers');
require('./services');
require('./directives');
require('./filter');
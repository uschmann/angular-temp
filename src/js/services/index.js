'use strict';
var app = require('angular').module('app');

app.factory('demoService', require('./demoService'));
app.factory('todoService', require('./todoService'));
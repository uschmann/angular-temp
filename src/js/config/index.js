'use strict';

var app = require('angular').module('app');

app.config(require('./translateProvider'));
app.config(require('./routes'));
'use strict';

module.exports = function demoFilter() {
    return function(input) {
        return input.toUpperCase();
    };
};

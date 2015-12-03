'use strict';

module.exports = function() {

    var service = {};

    service.getHeadline = function getHeadline() {
        return 'Hello foo!';
    };

    return service;
};
'use strict';

module.exports = function($translate) {

    var service = {};

    service.getHeadline = function getHeadline() {
        return $translate.instant('APP_NAME');
    };

    return service;
};
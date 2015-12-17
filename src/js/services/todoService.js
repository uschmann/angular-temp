'use strict';

module.exports = function ($q, $timeout) {
    var service = {};

    service.loadAllTodos = function loadAllTodos() {
        var defer = $q.defer();
        $timeout(function () {
            defer.resolve([
                {
                    id: 1,
                    title: 'buy milk',
                    description: 'At kaiser´s'
                },
                {
                    id: 2,
                    title: 'buy shit',
                    description: 'blah'
                }
            ]);
        }, 1000);

        return defer.promise;
    };

    return service;
};
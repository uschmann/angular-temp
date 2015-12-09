'use strict';

module.exports = function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/home/home.html'
        })
        .state('todos', {
            url: '/todos',
            templateUrl: 'partials/todos/todos.html'
        })
        .state('todos.create', {
            url: '/create',
            templateUrl: 'partials/todos/create.html'
        });
};
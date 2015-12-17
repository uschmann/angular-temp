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
            resolve: {
                todos: function(todoService) {
                    console.log('resolve');
                    return todoService.loadAllTodos();
                }
            },
            controller: function($scope, todos) {
                $scope.todos = todos;
                console.log(todos);
                console.log('controller instanciated');
            },
            templateUrl: 'partials/todos/todos.html'
        })
        .state('todos.create', {
            url: '/create',
            templateUrl: 'partials/todos/create.html'
        });
};
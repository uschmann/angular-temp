angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("directives/demo-view.html","<h2>{{\'APP_NAME\' | translate}}</h2>");
$templateCache.put("partials/home/home.html","<h1>Home</h1>");
$templateCache.put("partials/todos/create.html","<h1>Create todo</h1>");
$templateCache.put("partials/todos/todos.html","<div class=\"container-fluid\"><div class=\"col-md-1\"><h1>Todos</h1></div><ui-view class=\"col-md-4\"></ui-view></div>");}]);
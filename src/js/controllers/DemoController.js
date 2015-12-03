'use strict';
module.exports = function DemoController($scope, demoService) {
    $scope.title = demoService.getHeadline();
};
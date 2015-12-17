'use strict';

module.exports = function DemoController($scope, demoService, $translate) {
    $scope.title = demoService.getHeadline();

    $scope.changeLanguage = function changeLanguage(languageKey) {
        $translate.use(languageKey);
        $scope.title = demoService.getHeadline();

        var foo = 'bar';
    };
};
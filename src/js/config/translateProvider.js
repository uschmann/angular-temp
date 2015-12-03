'use strict';

module.exports = function translateProvider($translateProvider) {
    $translateProvider.preferredLanguage('en');
    $translateProvider.translations('en', require('../lang/en.js'));
    $translateProvider.translations('de', require('../lang/de.js'));
    $translateProvider.useSanitizeValueStrategy('escape');
};
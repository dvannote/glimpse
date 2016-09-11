var glimpse = angular.module('glimpse', ['ui.router']);


glimpse.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true);
}]);

glimpse.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: '/partials/landing.html'
        })

});
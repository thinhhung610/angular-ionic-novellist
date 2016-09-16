// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('vnnovel', ['ionic', 'vnnovel.controllers', 'vnnovel.services'])

.run(function ($ionicPlatform, $rootScope, $ionicLoading) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    // Config for global loading
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template: '<a class="button button-icon icon ion-loading-c light"></a>'})
    });

    $rootScope.$on('loading:hide', function() {
        $ionicLoading.hide()
    });
})

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('novel-index', {
            url: '/novels',
            templateUrl: 'templates/novel-index.html',
            controller: 'NovelIndexCtrl'
        })

        .state('novel-detail', {
            url: '/novel/:novelId',
            templateUrl: 'templates/novel-detail.html',
            controller: 'NovelDetailCtrl'
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/novels');

    // Config for global loading
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    });

});
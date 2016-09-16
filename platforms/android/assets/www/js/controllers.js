var mainController = angular.module('vnnovel.controllers', []),
    jsonUrl = "http://prod.kubiweb.fr/vnnovel/";

mainController.controller('NovelIndexCtrl', function ($scope, NovelService, $ionicLoading) {

    $scope.searchKey = "";

    $scope.clearSearch = function () {
        $scope.searchKey = "";
        findAllNovels();
    }

    $scope.search = function () {
        NovelService.findByName($scope.searchKey).then(function (novels) {
            $scope.novels = novels;
        });
    }

    var findAllNovels = function () {
        NovelService.setUrl(jsonUrl+'employees.json');
        NovelService.findAll().then(function (novels) {
            $scope.novels = novels;
        });
    }

    findAllNovels();
})

.controller('NovelDetailCtrl', function ($scope, $stateParams, NovelService, $ionicLoading) {
    NovelService.setUrl(jsonUrl+'employees.json');
    NovelService.findById($stateParams.novelId).then(function(novel) {
        $scope.novel = novel;
    });
});
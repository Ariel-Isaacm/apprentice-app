'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, $http) {
    var refreshContent = function(){
      $http.get('http://localhost:8080/games')
      .then(function(response){
            $scope.games = response.data;
      });
    };
    refreshContent();
    $scope.getGameDetails = function(gameId){
      $http.get('http://localhost:8080/game/'+gameId)
      .then(function(response){
        $scope.showDetails = true;
        $scope.gameDetail = response.data;
        console.log(response);
      });
    };
    $scope.hideDetails = function(){
        $scope.showDetails = false;
        $scope.gameDetail = {};
    };

    $scope.saveGame = function(){
        $http.put('http://localhost:8080/game/'+$scope.gameDetail.id, $scope.gameDetail)
        .then(function(response){
          console.log(response);
          refreshContent();
        });
    };

    $scope.deleteGame = function(){
      var address = 'http://localhost:8080/game/'+$scope.gameDetail.id;
      console.log(address);
      $http.delete(address)
      .then(function(response){
          console.log(response);
          refreshContent();
          $scope.showDetails = false;
          $scope.gameDetail = {};
      });
    };

  });

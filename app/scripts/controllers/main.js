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
    $scope.games =[];
    $scope.isModifying = false;
    $scope.thisGame = {};
    var callGames = function (){
      $http.get("https://ns-apprentice.herokuapp.com/games")
      .then(function(response){
        console.log(response.data);
        $scope.games = response.data;
      });
    };
    callGames();

    $scope.modifyGame = function(game){
      $scope.isModifying = true;
      $scope.thisGame = game;
    };

    $scope.saveGame = function(){
        $http.put("https://ns-apprentice.herokuapp.com/game/"+$scope.thisGame.id, $scope.thisGame)
        .then(function(response){
            console.log(response);
            $scope.isModifying = false;
        });
    };

    $scope.deleteGame = function(game){
        $http.delete("https://ns-apprentice.herokuapp.com/game/"+game.id)
        .then (function(response){
            console.log(response);
            callGames();
        });
    };
  });

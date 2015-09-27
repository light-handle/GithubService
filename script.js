// Code goes here

(function() {

  var app = angular.module("GithubViewer", []); //Array describes the dependencies for the module

  var MainController = function($scope, github, $interval, $log, $anchorScroll, $location) //Services to use are passed as parameters to Angular Controller. $interval service for Controller
    {

      var onUserComplete = function(data) {
        $scope.user = data;
        github.getRepos($scope.user).then(onRepos, onError);
      };

      var onError = function(reason) {
        $scope.error = "Could not fetch the data";
      };

      //$http.get("https://api.github.com/users/light-handle")
      //   .then(onUserComplete, onError);

      var onRepos = function(data) {
        $scope.repos = data;
        $location.hash("userDetails"); //has = fragment Identifier
        $anchorScroll();
      };

      var decrementCountDown = function() {
        $scope.countdown -= 1;
        if ($scope.countdown < 1) {
          $scope.search($scope.username);
        }
      };

      var countdownInterval = null;
      var startCountdown = function() {
        countdownInterval = $interval(decrementCountDown, 1000, $scope.countdown);
      };

      $scope.search = function(username) {
        //console.log($log);
        $log.info("Searching for " + username);
        github.getUser(username).then(onUserComplete, onError);
        if (countdownInterval) {
          $interval.cancel(countdownInterval);
          $scope.countdown =  null;
        }
      };

      $scope.message = "Github Viewer";
      $scope.username = "angular";
      $scope.repoSortOrder = "-stargazers_count";
      $scope.countdown = 5;
      startCountdown();

    };

  //Why Does this not work??? Ask Mazher or Andrew. I have defined my own custom service "github"
  //app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]); //Array is given so when javascript is minified, the services and data is not lost.
  app.controller("MainController", MainController);
}());
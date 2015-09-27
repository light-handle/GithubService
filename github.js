(function() {
  
  var github = function($http)  //Service, $http service to get user and repos
  {
    var getUser = function(username)
    {
      return $http.get("https://api.github.com/users/" + username)
             .then(function(response)
             {
               return response.data;
             });
    };
    
    var getRepos = function(user)
    {
      return $http.get(user.repos_url)
                  .then(function(response)
                  {
                    return response.data;
                  });
    }
    
    return {   // Revealing Module design pattern. Return github Service API.
      getUser: getUser,
      getRepos: getRepos
    };
  };
  
  var module = angular.module("GithubViewer"); //Reference to GithubViewer module that will allow to register the service
  module.factory("github", github); //Register the Service with Angular so other components can use it. With Factory
                                  // you can specify a name of service and something that points to the function that returns the
                                  //object with the API. i.e. Return github with object with methods .getUser and .getRepos.
  
}());
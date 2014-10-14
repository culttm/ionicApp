 // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ToDo', ['ionic'])

  .run(function($ionicPlatform) {
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
  })
 
  .controller('ToDoCtrl', ['$scope', '$http', '$ionicModal', function($scope, $http, $ionicModal){

    
    if (!angular.isUndefined(window.localStorage['tasks']) ) {

          $scope.tasks = JSON.parse(window.localStorage['tasks']);

    } else{

      $scope.tasks = [
          {
            title:'First title', 
            description:'First description', 
            done:false
          }
      ];

    };

 


  $ionicModal.fromTemplateUrl('views/showModal.html', {
  
    scope: $scope,
    animation: 'nav-title-slide-ios7'
 
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.taskCurrentId = -1;

  $scope.addTask = function() {

      $scope.modal.show();

      $scope.activeTask = {
        title: "",
        description:"",
        done:false
      }
      saveItems();
      $scope.taskCurrentId = -1;

  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.openTask = function(id){
      
      var task = $scope.tasks[id];

      $scope.taskCurrentId = id;

      $scope.activeTask = {
        title: task.title,
        description:task.description,
        done:task.done
      }

      $scope.modal.show();

  };
  

  $scope.deleteTask = function(id){
    $scope.tasks.splice(id, 1);
    saveItems();
  };


  $scope.submitTask = function(task){


    if(!angular.isUndefined(task)){

      if ($scope.taskCurrentId == -1) {

        $scope.tasks.push({
            title:task.title,
            description:task.description,
            done:task.done
        });

      } else{

        var id = $scope.taskCurrentId;

            $scope.tasks[id].title = task.title;
            $scope.tasks[id].description = task.description;
            $scope.tasks[id].done = task.done;
      };

      saveItems();
      $scope.modal.hide();
    }
  };

  $scope.saveItems = function(){
    saveItems();
  };

  function saveItems(){
    window.localStorage['tasks'] = angular.toJson($scope.tasks);
  }





}])

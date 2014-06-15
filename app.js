angular.module('App', ['google-maps'])

  .controller('AppCtrl', function($rootScope, appLoading) {
    $rootScope.topScope = $rootScope;
    $rootScope.$on('$routeChangeStart', function() {
      appLoading.loading();
    });
  })
  
  .controller('home', function($scope, appLoading) {
    appLoading.ready();
  })
  .controller('about', function($scope, appLoading) {
  	//$scope.$on('$viewContentLoaded', function() {});
    appLoading.ready();
  })
  .controller('contact', function($scope, appLoading) {
    appLoading.ready();
   	$scope.map = {
	  center: {
	    latitude: 40.709708, 
	    longitude: -121.909190
	  },
	  zoom: 14,
	  options: {
        disableDefaultUI: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN
      },
	};
  })
  .controller('pics', function($scope, appLoading) {
    appLoading.ready();
  })

  .config(function($routeProvider) {
    $routeProvider.when('/home', {
      controller : 'home',
      templateUrl : './templates/home_tpl.html'
    }).when('/about', {
      controller : 'about',
      templateUrl : './templates/about_tpl.html'  
    }).when('/contact', {
      controller : 'contact',
      templateUrl : './templates/contact_tpl.html'  
    }).when('/pics', {
      controller : 'pics',
      templateUrl : './templates/pics_tpl.html'  
    }).otherwise({
      redirectTo: '/home'
    });
  })

  .factory('appLoading', function($rootScope) {
    var timer;
    return {
      loading : function() {
        clearTimeout(timer);
        $rootScope.status = 'loading';
        if(!$rootScope.$$phase) $rootScope.$apply();
      },
      ready : function(delay) {
        function ready() {
          $rootScope.status = 'ready';
          if(!$rootScope.$$phase) $rootScope.$apply();
        }

        clearTimeout(timer);
        delay = delay == null ? 500 : false;
        if(delay) {
          timer = setTimeout(ready, delay);
        }
        else {
          ready();
        }
      }
    };
  });
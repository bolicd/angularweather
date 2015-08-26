// CONTROLLERS

weatherApp.controller('homeController',["$scope","$location","forecastService", function($scope,$location,forecastService){
	
	$scope.city =  forecastService.city;
	
	
	$scope.$watch('city', function(){
			forecastService.city = $scope.city;
	});
	
	$scope.submitForecast = function(){
		$location.path("/forecast");
	};

}]);

weatherApp.controller('forecastController',["$scope","$resource","$routeParams","$location","forecastService",function($scope,$resource,$routeParams,$location,forecastService){
	
	$scope.city =  forecastService.city;
	$scope.days = $routeParams.days || '2';
	$scope.typeTemp = $location.search().tempConvert || 1;
	
	console.log("TypeTemp is: " + $scope.typeTemp);
	
	$scope.linkPath =   $location.path() ;
	$scope.queryParams = $location.search();
	console.log("Path je: "+ $scope.linkPath);
	console.log(" Query " + JSON.stringify($routeParams));
	
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
					{ callback: "JSON_CALLBACK"},
					{ get: {method: "JSONP"} });

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days } );
	
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273))+ 32);
	}
	
	
	$scope.convertTemperature = function(temp,type){
		//Convert to specified type
		// 1 = Fahrenheit, 2 = Celsius, 3 = Kelvin
		var returnValue = "";
		
		switch (type){
			case '1':
				// Fahrenheit
				returnValue = Math.round((1.8 * (temp - 273))+ 32);
				break;
			case '2':
				// Celsius
				returnValue = Math.round(temp - 273.15);
				break;
			case '3':
				return temp;
				break;
			default:
				return temp;
				break;
		}
		
		return returnValue;
		
	};
	
	$scope.convertToDate = function(dt) {
		
		return new Date(dt * 1000);
	
	}
}]);
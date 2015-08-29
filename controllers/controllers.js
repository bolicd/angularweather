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
	
	$scope.linkPath =   $location.path() ;
	$scope.queryParams = $location.search();
	$scope.tempDesc="N/A";

	
	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",
					{ callback: "JSON_CALLBACK"},
					{ get: {method: "JSONP"} });

	$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days } );
	console.log($scope.weatherResult);
	
	$scope.convertToFahrenheit = function(degK) {
		return Math.round((1.8 * (degK - 273))+ 32);
	}
	
	
	$scope.convertTemperature = function(temp,type){
		//Convert to specified type
		// 1 = Fahrenheit, 2 = Celsius, 3 = Kelvin
		var returnValue = "";
		
		console.log(type);
		
		switch (type){
			case '1':
				// Fahrenheit
				returnValue = Math.round((1.8 * (temp - 273))+ 32);
				$scope.tempDesc="F";
				break;
			case '2':
				// Celsius
				returnValue = Math.round(temp - 273.15);
				$scope.tempDesc="C";
				break;
			case '3':
				$scope.tempDesc="K";
				returnValue=temp;
				break;
		}
		
		return returnValue;
		
	};
	
	$scope.convertToDate = function(dt) {
		
		return new Date(dt * 1000);
	
	}
}]);
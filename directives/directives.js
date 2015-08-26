//DIRECTIVES

weatherApp.directive("forecastDetail",function(){
		return {
			restrict: 'E',
			templateUrl: "pages/forecastdetail.html",
			replace:true,
			scope: {
				day:"=",
				convertDateFunction:"&",
				convertTemperatureFunction:"&",
				convertDateFormat:"@",
				temperatureType:"@"
			}
		}
});

// focus directive 
// will focus given input and select all text
weatherApp.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
							 _element[0].select();
            }, 0);
        }
    };
});

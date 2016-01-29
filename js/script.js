$(function() {
	
	if("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			console.log(position);console.log("working");
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			console.log(lat, lon);
			
			// weather
			$.ajax({
				beforeSend: function(request){
					request.setRequestHeader('x-api-key','d930af1818b033767e24ff8a28186c43');
				},
				complete: function(){
					$('body').addClass('loaded');
					$('#loader-wrapper').addClass('loaded');
				},
				dataType:'jsonp',
				jsonp: 'callback',
				url:'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&'+'lon='+lon+'&units=metric&APPID=d930af1818b033767e24ff8a28186c43',
				
				success: function(response){
					var celsius = Math.round(response.main.temp);
					var fahrenheit = Math.round(celsius*9/5+32); //C*9/5+32
					console.log(fahrenheit);
					var temp= celsius;
					$('.main').text(response.weather[0].main+', '+temp+"℃");     
					$('.city').text(response.name+', '+ response.sys.country);
			 
					$('.fahrenheit').click(function(){
						$('.main').text(response.weather[0].main+', '+fahrenheit+'℉'); 
						$('.celsius').removeClass('hide');
						$('.fahrenheit').addClass('hide');
			 		});
					$('.celsius').click(function(){
						$('.main').text(response.weather[0].main+', '+celsius+"℃"); 
						$('.fahrenheit').removeClass('hide');
						$('.celsius').addClass('hide');
					});
				 
					if(response.weather[0].icon !== null){
						console.log("its working!!!!");
						// Clear Sky Day
						if(response.weather[0].icon == '01d'){
							$('.removeClound').removeClass('cloud');
							console.log("its a clear day")
						}  // few clounds
						else if (response.weather[0].icon == '02d'){
							console.log('few clounds');
						} // scattered clouds
						else if(response.weather[0].icon == '03d'){
							console.log('scattered clouds');
							$('.remove').removeClass('sun');
							$('p').css({'text-shadow':'0 0 0'});
						}//broken clouds 
						else if (response.weather[0].icon == '04d'){
							console.log('broken clouds ');
							$('.remove').removeClass('sun');
							$('p').css({'text-shadow':'0 0 0'});
							$('#clouds').css({'background': '-moz-linear-gradient(top, #6D6968 0%, #fff 100%)'});
						} // shower rain 
						else if (response.weather[0].icon == '09d'){
							console.log('shower rain');
							$('.drops').addClass('rain');
							$('.drops').removeClass('hide');
							$('#clouds').css({'background': '-moz-linear-gradient(top, #6D6968 0%, #fff 100%)'});
						}// rain
						else if (response.weather[0].icon == '10d'){
							console.log('rain rain go away');
							$('.drops').addClass('rain');
							$('.drops').removeClass('hide');
							$('.remove').removeClass('sun');
							$('p').css({'text-shadow':'0 0 0'});
							$('#clouds').css({'background': '-moz-linear-gradient(top, #6D6968 0%, #fff 100%)'});
						}//thunder
						else if (response.weather[0].icon == '11d'){
							console.log('thunder');
							$('.removeThunder').addClass('thunder');
							$('.removeThunder').removeClass('hide');
							$('.drops').addClass('rain');
							$('.drops').removeClass('hide');
							$('.remove').removeClass('sun');
							$('p').css({'text-shadow':'0 0 0'});
							$('#clouds').css({'background': '-moz-linear-gradient(top, #6D6968 0%, #fff 100%)'});
						}
						else {
							console.log('the weather is shit',response.weather[0].icon);
						}
					} else {
						console.log('main if not working');
					}
				}// end of success
			});// end of ajax
		});
	} else {
		alert("No soup for you!  Your browser does not support this feature");
	}

}); // end of jquery
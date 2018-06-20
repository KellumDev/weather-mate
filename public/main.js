/*

need to add an icon for the following 
clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night

if any of the following icons are pressented 
-display an associated gif in div element

*/ 



$(function() {

 var $h1 = $("h1");
   
 var $zip = $("input[name='zip']");
	
	
$("form").on("submit", function(event) {
 	event.preventDefault();
 	
	var zipCode = $.trim($zip.val());
 	$h1.text("Loading...");
 
	var request = $.ajax({
	url: "/" + zipCode,
	dataType: "json"
});

request.done(function(data) {
	var temperature = data.temperature;
	var icon = data.icon;
	var humidity= data.humidity; 
	var windSpeed= data.windSpeed; 
	var precip = data.precip; 
	var brief = data.brief;
  	var spacde = data.icon; 
  	var where = data.city +","+ data.state

	// if(icon === "clear-day"){

	//  spacde = '<img src="/img/sunny.gif" alt="sun">'
	// }
	// else if(icon === "clear-night"){
	// spacde = '<img src="/img/sunny.gif" alt="sun">' 
	// }
	// else if(icon === "rain"){
	// 	spacde = '<img src="/img/rainy.gif" alt="rainy">' 
	// }
	// else if(icon === "snow"){
	// 	spacde = '<img src="/img/snow.gif" alt="snow">' 
	// }
	// else if(icon === "partly-cloudy-day"){
	// 	spacde = '<img src="../img/partly-sunny.gif" alt="partly-sunny">' 
	// } 
	// else if(icon === "wind"){
	// spacde = '<img src="/img/windy.gif" alt="windy">' 
	// }
	// else if(icon === "fog"){
	// 	spacde = '<img src="/img/foggy.gif" alt="fog">' 
	// }

	 

	$h1.html(
		'<div>' + Date() + '</div>' + 
		'<br><div>' + spacde + '</div>' +
		'<br><div class="where">' + where + '</div>' +
		'<div class="seperate">' + "Right now: "+ brief + '</div>' +
		'<br><div>'+ " Temperature: "+ temperature + '</div>' +
		'<br><div>'+ "Humidity: "+ humidity + '</div>' +
		'<br><div>'+ "Wind Speed: " + windSpeed + '</div>' 


		);
	 
	
	  
});

request.fail(function() {
	$h1.text("Error!");
	});
});
});


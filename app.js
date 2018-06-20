var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIo = require("forecastio");

var app = express(); 

var port = process.env.PORT || 8080; 

var weather = new ForecastIo("f86bf0ead620e4ae0bd2210787abfbdb"); 
 
//serve static files 
app.use(express.static(path.resolve(__dirname, "public")));

//serve ejs views from view directory 
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
res.render("index");
}); 

//api for the ZIP codes and tempareature
app.get(/^\/(\d{5})$/, function(req, res, next) {
	// api docs for zippity-do-dah : https://www.npmjs.com/package/zippity-do-dah
	/*
	zippity-do-dah is a collection of data and utilities to lookup postal-code 
	based location information.
	 */
	var zipcode = req.params[0];
	var location = zipdb.zipcode(zipcode);
	
	if (!location.zipcode) {
		next();
		return;
	}

	var latitude = location.latitude;
	var longitude = location.longitude;
	var where = zipdb.zipcode(zipcode)
	weather.forecast(latitude, longitude, function(err, data) {
	
	if (err) {
		next();
		return;
	}
	
	res.json({
		city: where.city,
		state: where.state,
		zipcode: zipcode,
		temperature: data.currently.temperature,
		icon: data.currently.icon,
	humidity: data.currently.humidity, 
	windSpeed: data.currently.windSpeed, 
	precip: data.currently.precipType,
	brief: data.minutely.summary

	//summary: data.currently.summary
	});
	
	});
});

app.use(function(req,res){
	res.status(404).render("404");
}); 

app.listen(port, function(){
	console.log("the server is running on port 8080");

	
	 
});

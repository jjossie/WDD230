$(function () {

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            getData(lat, lon);
        });
        
    }
    else{
        window.alert("Your browser does not support location or it is turned off. Location-based weather data will not display.");
    }
    function getData(lat, lon){
        $.ajax({
            url: "https://api.wunderground.com/api/f9257c30517cc1f7/geolookup/q/" + lat + "," + lon + ".json",
            dataType: "jsonp",
            success: function (data) {
                //Create a location string and apply the data to the HTML
                var location = "" + data.location.city + ", " + data.location.state;

                //apply text
                $('#location-title').text(location);
                $('title').prepend(location + " ");

                //create an API call URL, get the weather conditions
                var conditionsURL = "https://api.wunderground.com/api/f9257c30517cc1f7/conditions/forecast/q/" + data.location.state + "/" + data.location.city + ".json";
                getConditions(conditionsURL);

            }

        });
    }
    function getConditions(url){
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function (data){
                //Get weather data into vars
                console.log(data);
                var current = data.current_observation;
                var today = data.forecast.simpleforecast.forecastday[0];
                
                var hi = Math.round(today.high.fahrenheit);
                var lo = Math.round(today.low.fahrenheit);
                var temp = Math.round(current.temp_f);
                var conditions = current.weather;
                var imgStr = "<img src='" + current.icon_url + "' alt='" + current.icon + "' > ";
                var wind = today.avewind;   
                var precip = today.pop;
                
                //Insert into page
                $('#current-temp').html(temp + "&deg;F");
                $('#hi').html(hi + "&deg;F");
                $('#lo').html(lo + "&deg;F");
                $('#temperatures').prepend(imgStr);
                $('#current-conditions').html(conditions);
                $('#precip-chance').html(precip + "%");
                $('#wind > p').html(wind.mph + "mph " + wind.dir);
                

                
            }     
        });
    }

});

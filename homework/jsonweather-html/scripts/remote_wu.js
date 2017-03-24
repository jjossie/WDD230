// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({
            url: "https://api.wunderground.com/api/f9257c30517cc1f7/geolookup/q/" + lat + "," + long + ".json",
            dataType: "jsonp",
            success: function (data) {
                //Create a location string and apply the data to the HTML
                var location = "" + data.location.city + ", " + data.location.state;

                // clear text
                status.html("");
                //apply text
                $('#cityDisplay').text(location);
                $('title').prepend(location + " ");

                //create an API call URL, get the weather conditions
                var conditionsURL = "https://api.wunderground.com/api/f9257c30517cc1f7/conditions/q/" + data.location.state + "/" + data.location.city + ".json";
                getConditions(conditionsURL);

            }

        });
        //         });

    }

    function getConditions(url) {

        //get the weather conditions json object
        $.ajax({
            url: url,
            dataType: "jsonp",
            success: function applyWeatherData(weatherData) {

                //apply the weather data to the page
                console.log(weatherData);
                var temp = weatherData.current_observation.temp_f;

                $('#currentTemp').html(Math.round(temp) + "&deg;  F");

                var weatherConditions = weatherData.current_observation.weather;
                $('#summary').html(weatherConditions + "");

                var feelsLike = weatherData.current_observation.feelslike_f;
                $('#add2').html("Feels like " + feelsLike + "&deg; F" );

                var imgString = "<img src = '" + weatherData.current_observation.icon_url + "' alt = '" + weatherData.current_observation.icon + "'>";
                $('#add1').html(imgString);
            }
        });
    }


    //    function successFunction(parsed_json) {
    //        var location = parsed_json['location']['city'];
    //        var temp_f = parsed_json['current_observation']['temp_f'];
    //        alert("Current temperature in " + location + " is: " + temp_f);
    //        $("#cover").fadeOut(250);
    //    }

    // A function for changing a string to TitleCase
    function toTitleCase(str) {
        return str.replace(/\w+/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
});

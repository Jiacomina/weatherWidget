// https://api.darksky.net/forecast/d77118a60fbebfa1cb5a648f42f623a9/37.8267,-122.4233
//https://darksky.net/dev/img/attribution/poweredby-oneline-darkbackground.png
//https://darksky.net/dev/img/attribution/poweredby-oneline.png
//https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d77118a60fbebfa1cb5a648f42f623a9/37.8267,-122.4233?'
console.clear();
$(document).ready(function() {
   var metric = true;
   //check that geolocation feature supported by browser
   if ("geolocation" in navigator) {
      console.log("Geolocation supported");
   } else {
      console.log("Geolocation not supported");
      throw new Error("User does not support geolocation");
   }
   
   //get location
   navigator.geolocation.getCurrentPosition(success, error, {
      timeout: 20000,
      maximumAge: 0,
      enableHighAccuracy: false
   });
   
   
   // extract longitude and latitude
   function success(position) {
      $(".loading-display").css("visibility", "hidden");
      var longitude = position.coords.longitude.toFixed(4);
      var latitude = position.coords.latitude.toFixed(4);
      console.log(
         "Coordinates are Longitude: " + longitude + " Latitude: " + latitude
      );

      //get weather data from DarkSky as JSON array
      var darkSkyURL = "https://api.darksky.net/forecast/d77118a60fbebfa1cb5a648f42f623a9/";
      var callback = "?callback=?"; // makes it a jsonP request

      var requestURL = darkSkyURL + latitude + "," + longitude + callback;
      console.log(requestURL);
      // fetch json data from Dark Sky API
      $.getJSON(requestURL, function(json) {
         
         // split timezone array, format is Country/city
         var locArray = json.timezone.split("/");

         $(".loc-name").html(locArray[1] + ", " + locArray[0]);
         $(".coordinates").html(
            "Latitude: " + latitude + " and Longitude: " + longitude
         );
         //show icons
         $(".small-icon").css("visibility","visible");
         //get temperature
         setTemp(json.currently.temperature, metric);

         //get description
         $(".curr-description").html(json.currently.summary);
          $(".hour-description").html(json.hourly.summary);
         
         //get time
         var date = new Date(json.currently.time*1000);
         var month = date.getMonth();
         var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
         $(".time").html(date.getDay() + " " + monthNames[month]  + " " + date.getFullYear());
         
         // get chance of rain
         $(".precip").html(json.currently.precipProbability.toFixed(1) + "%");
  // wind speed
         $(".wind").html((json.currently.windSpeed/3.6).toFixed(1) + " m/s");
         //sunset time
         var sunsetTime = new Date(json.daily.data[0].sunsetTime*1000);
     $(".sunset").html(sunsetTime.getHours()%12 + ':' + sunsetTime.getMinutes()); 
         //cloud cover
     $(".clouds").html(json.currently.cloudCover.toFixed(1) + "%");   
         // when F button pressed, change to Farenheight
         $(".faren").on("click", function() {
            metric = false;
            $(".faren").css({ color: "black", "pointer-events": "none" });
            $(".celsius").css({ color: "#b3b3b3", "pointer-events": "auto" });
            setTemp(json.currently.temperature, metric);
         });
         
         // when C button pressed, change to Celsius
         $(".celsius").on("click", function() {
            metric = true;
            $(".celsius").css({ color: "black", "pointer-events": "none" });
            $(".faren").css({ color: "#b3b3b3", "pointer-events": "auto" });
            setTemp(json.currently.temperature, metric);
         });
      });
   }
   function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
   }

   // function that toggles temperature display for selected temp scale.
   function setTemp(temp, metric) {
      if (metric) {
         temp = ((temp - 32) * 5 / 9).toFixed(1) + "°C";
      } else {
         temp += "°F";
      }
      $(".current-temp").html(temp);
      $(".temp-format").css("visibility", "visible");
   }
});
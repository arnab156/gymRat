
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBWF8f_8Z4z5IGWptXstjE2iekutxcJXTo",
  authDomain: "gymmap-55791.firebaseapp.com",
  databaseURL: "https://gymmap-55791.firebaseio.com",
  projectId: "gymmap-55791",
  storageBucket: "gymmap-55791.appspot.com",
  messagingSenderId: "373050790653"
};
firebase.initializeApp(config);
var database = firebase.database();

// Initialize and add the map
function initialize() {
  // The location of Uluru
  var chicago = {lat: 41.8781, lng: -87.6298};
  // The map, centered at Uluru
  var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 16, center: chicago});

}

var latitude = 0.00;
var longitude = 0.00;
function GetLocation() {
  $(".gymName").empty();
  $("#foodList").empty();
  $("#weathertext").empty();
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("txtAddress").value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
      var location = {lat:latitude, lng:longitude }
      var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: location});
      var marker = new google.maps.Marker({position: location, map: map});
      // var queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=gym&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:8000@" + latitude +"," + longitude + "&key=AIzaSyBFYURsPVRuZ1KsfdbtECIAnmyp_ZnmwX4";

      var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude +"," + longitude + "&rankby=distance&type=gym&fields=photos,formatted_address,name,opening_hours,rating,contact&key=AIzaSyBFYURsPVRuZ1KsfdbtECIAnmyp_ZnmwX4"
      
      $.ajax({
          url: queryURL,
          method: "GET",
        
        }).then(function(response) {
          // console.log(response);
          var gymsList = [];
          for (i=0;i<response.results.length;i++) {
            // for (i=0;i<5;i++) { //limit to 5 results
            gymsList[i] = response.results[i];
            console.log(gymsList);
          }
          for (i=0;i<5;i++) { //limit to 5 random results from the 20 results
            var gym = gymsList[Math.floor(Math.random() * gymsList.length)];   
            console.log(gym);
            var name = gym.name;
            var rating = gym.rating;
            var address = gym.vicinity;
            $( ".gymName" ).append( name );
            $( ".gymName" ).append(", Rating: " +rating );
            $( ".gymName" ).append("<br> Address: " +address + "<hr>");
          }
      });
      
      var weatherQueryURL = "http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+ "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"

      $.ajax({
        url: weatherQueryURL,
        method: "GET"
      })
        .then(function(response) {
          var p = $("<p id ='weathertext'>");
          p.text("It is "  +response.main.temp + "°F in "+response.name + " today. " + "Humidity is " + response.main.humidity+ "% & wind speed is " + response.wind.speed + "mph. Expect " + response.weather[0].description +" today." );
          $("#logo-container-text").append(p);
        
        });

        var foodQueryURL = "http://food2fork.com/api/search?key=a0a2d68b0e22e76478684b9f9bf70bb4&q=healthy"

        $.ajax({
          url: foodQueryURL,
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
            var foodObject = JSON.parse(response)
            console.log(foodObject);
            var randomFood =[];
            for (i=0; i<5;i++){
              randomFood[i]= foodObject.recipes[Math.floor(Math.random() * foodObject.recipes.length)]; 
              console.log(randomFood);
              var title = randomFood[i].title;
              console.log (title);
              var url = randomFood[i].source_url
              console.log (url);
              $("#foodTitle").text("Healthy Food Recipes");
              var a = $("<a>");
              a.attr("href", url);
              a.text(title);
              $("#foodList").append(a);
              $("#foodList").append("<br>");
              // $("#foodList").append(title + "<br>");
              // $("#foodList").append( "<a>"+ url + "<hr>");
            }
          });
    } else {
          alert("Request failed.")
      }
  });
}; // end of getLocation()

var ratName ="";
var ratEmail = "";
var ratPref = "";
var ratZip = 0;

$("#addRat").on("click", function(event) {
  event.preventDefault();
  
  ratName = $("#ratName").val();
  ratEmail = $("#ratEmail").val();
  ratPref =$("#ratPref").val();
  ratZip=$("#ratZip").val();

  database.ref().push({
    Name : ratName,
    Email : ratEmail,
    PreferredGym : ratPref,
    Zipcode: ratZip,
  });

  function resetFunction() {
    document.getElementById("GymRatForm").reset();
  }
  resetFunction();
});

//Triggers Modal
var elem = document.querySelector('.modal');
var options = {};
var instance = new M.Modal(elem, options);



// edamam API ID 4063fbaf


// nutritionix.com applicatio id  fd846903 , Application Keys 80f1404b052e259836f5a5c4fe09326b

//food2fork.com api a0a2d68b0e22e76478684b9f9bf70bb4

function load(){
  $.ajax({
          url:"http://itunes.apple.com/search?limit=10",
          data:{term:$('#keyword').val(),entity:"song"},
          type:"GET",
          dataType: "jsonp",
          success: function(data, dataType){
                  console.log(data);
                  var songArray = data.results;
                  console.log(songArray);
                  var results = data.results;
                  var imgurl = results[0]['artworkUrl100'];
                  var mediaurl = results[0]['previewUrl'];
                  $('#artwork').attr('src', imgurl);
                  $('#audio').attr('src', mediaurl);
                  
                  
                  // var songList = [];
                  // for (var i = 0; i < songArray.length; i++) {
                  //     songList[i]= songArray[i].previewUrl;
                                         
                  // }
                  // console.log (songList);

          }
  })
}

// console.log(load);

function play() {
  $('#audio')[0].play();
}
function stop() {
  $('#audio')[0].pause();
};

        
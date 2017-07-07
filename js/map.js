var urls = [
 {
  name: 'Lombard Street(San Francisco)',
  icon: 'camera',
  location: {
   lat: 37.773972,
   lng: -122.431297
  }
 },
 {
  name: 'Golden gate',
  icon: 'camera',
  location: {
   lat: 37.8199,
   lng: -122.4783
  }
 },
 {
  name: 'Napa valley',
  icon: 'camera',
  location: {
   lat: 38.5025,
   lng: -122.2654
  }
 },
 {
  name: 'Universal Studios Hollywood',
  icon: 'camera',
  location: {
   lat: 34.1381,
   lng: -118.3534
  }
 },
 {
  name: 'Disney World',
  icon: 'camera',
  location: {
   lat: 33.812511,
   lng: -117.918976
  }
 },
 {
  name: 'Quincy Market',
  icon: 'restaurant',
  location: {
   lat: 42.3602,
   lng: -71.0548
  }
 },
 {
  name: 'Toro Bravo',
  icon: 'restaurant',
  location: {
   lat: 45.54099,
   lng: -122.664231
  }
 },
 {
  name: 'Yellowstone National Park',
  icon: 'tree',
  location: {
   lat: 44.4280,
   lng: -110.5885
  }
 },
 {
  name: 'Grand Canyon National Park',
  icon: 'tree',
  location: {
   lat: 36.1070,
   lng: -112.1130
  }
 },
 {
  name: 'Yosemite National Park',
  icon: 'tree',
  location: {
   lat: 37.8651,
   lng: -119.5383
  }
 },
 {
  name: 'Zion National Park',
  icon: 'tree',
  location: {
   lat: 37.2982,
   lng: -113.0263
  }
 },
 {
  name: 'Great Smoky Mountains National Park',
  icon: 'tree',
  location: {
   lat: 35.6532,
   lng: -83.5070
  }
 }
];

// Array to store markers
var markers = [];
console.log(markers.length);
var infowindow;
var map;

function mapError(){
 console.log('error error !');
}

function initMap() {
 // Create a map object and specify the DOM element for display.
 map = new google.maps.Map(document.getElementById('map'), {
   center: urls[0].location,
   scrollwheel: false,
   zoom: 5
 });

 infowindow = new google.maps.InfoWindow();
 var bounds = new google.maps.LatLngBounds();

 urls.forEach(function(url){
  var marker = new google.maps.Marker({
    position: url.location,
    map: map,
    icon: `http://maps.google.com/mapfiles/ms/micons/${url.icon}.png`,
    title: url.name,
    animation: google.maps.Animation.DROP
  });

  markers.push(marker);

  marker.addListener('click', function(){
   bounceMarker(this);
   showMoreInfo(this);
   changeIcon(this);
  });

  marker.addListener('mouseover', function(){
   showLessInfo(this);
  });

  bounds.extend(marker.position);
 });

 map.fitBounds(bounds);
 console.log(markers.length);
}

function bounceMarker(marker) {
 // Set the BOUNCE animation on the marker
 marker.setAnimation(google.maps.Animation.BOUNCE);
 // Remove the BOUNCE animation on the marker after one cycle
 setTimeout(function(){ marker.setAnimation(null); }, 750);
}

function changeIcon(marker){
 // Change the icon to red-dot
 marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
}

// Fills the info window
function showMoreInfo(marker){
 if(infowindow.maker != marker){
  infowindow.marker = marker;
  setContent(marker, infowindow);
  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function() {
   infowindow.marker = null;
  });
 }
}

function showLessInfo(marker){
 if(infowindow.maker != marker){
  infowindow.marker = marker;
  infowindow.setContent(`${marker.title}`);
  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function() {
   infowindow.marker = null;
  });
 }
}

function setContent(marker, infowindow){

 var wikiAPI = `http://en.wikipedia.org/w/api.php?action=opensearch&search=${marker.title}&format=json&callback=wikiCallback`;
 console.log(wikiAPI);
 var wikiData = null;

 $.ajax({
     url: wikiAPI,
     dataType: "jsonp",
     success: function (data, textStatus, jqXHR) {
      console.log(data);
      for(let i = 0; i < data[1].length; i++){
       wikiData = `<p>${data[2][0]}</p>
                   <a href="${data[3][0]}"  target="_blank">${data[1][0]}</a>`;
      }
      setWikiLink(marker, wikiData, infowindow);
      },
     error: function (errorMessage) {
      console.log("Unable to get data from wikipedia...")
     }
 });
}

function setWikiLink(marker, wikiData, infowindow){
 if(wikiData !== null){
  infowindow.setContent(`<h2>${marker.title}</h2>
                         ${wikiData}`
                        );
 }else{
  infowindow.setContent(`<h2>${marker.title}</h2>`);
 }

}

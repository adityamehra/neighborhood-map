var urls = [
 {
  name: 'Crooked road, San Francisco',
  label: 'A',
  location: {
   lat: 37.773972,
   lng: -122.431297
  }
 },
 {
  name: 'Golden gate, San Francisco',
  label: 'B',
  location: {
   lat: 37.8199,
   lng: -122.4783
  }
 },
 {
  name: 'Napa valley, California',
  label: 'C',
  location: {
   lat: 38.5025,
   lng: -122.2654
  }
 },
 {
  name: 'Universal studios, Los Angeles',
  label: 'D',
  location: {
   lat: 34.1381,
   lng: -118.3534
  }
 },
 {
  name: 'Disney, Los Angeles',
  label: 'E',
  location: {
   lat: 33.812511,
   lng: -117.918976
  }
 }
];

var markers = [];

function initMap() {
 // Create a map object and specify the DOM element for display.
 var map = new google.maps.Map(document.getElementById('map'), {
   center: urls[0].location,
   scrollwheel: false,
   zoom: 5
 });

 var placeInfoWindow = new google.maps.InfoWindow();

 urls.forEach(function(url){
  var marker = new google.maps.Marker({
    position: url.location,
    map: map,
    label: url.label,
    title: url.name,
    animation: google.maps.Animation.DROP
  });
  markers.push(marker);
  marker.addListener('click', function(){
   fillInfoWindow(this, placeInfoWindow, map);
  });
 });
}

function fillInfoWindow(marker, infowindow, map){
 if(infowindow.maker != marker){
  infowindow.marker = marker;
  infowindow.setContent(`${marker.title}`);
  infowindow.open(map, marker);
  infowindow.addListener('closeclick', function() {
   infowindow.marker = null;
  });
 }
}

var ViewModel = function() {
 var that = this;
 this.listOfUrls = ko.observableArray([]);
 urls.forEach(function(url){
  that.listOfUrls.push(url);
 });
}

ko.applyBindings(new ViewModel());

"use strict";

var places = [
 {
  name: 'Lombard Street(San Francisco)',
  icon: 'camera',
  location: {
   lat: 37.773972,
   lng: -122.431297
  }
 },
 {
  name: 'Golden gate Bridge',
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
  name: 'Union Oyster House',
  icon: 'restaurant',
  location: {
   lat: 42.3613,
   lng: -71.0569
  }
 },
 {
  name: "Mike's Pastry",
  icon: 'restaurant',
  location: {
   lat: 42.3642,
   lng: -71.0542
  }
 },
 {
  name: 'Appalachian National Scenic Trail',
  icon: 'hiker',
  location: {
   lat: 38.9177,
   lng: -78.0493
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

var names = [];

places.forEach(function(place){
 names.push(place.name);
});

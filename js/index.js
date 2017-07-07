console.log(markers.length);

var ViewModel = function() {

 var that = this;

 this.listOfMarkers = ko.observableArray([]);

 markers.forEach(function(marker){
  that.listOfMarkers.push(marker);
 });

 console.log(markers.length);

 this.showItem = function(clickedItem){
  bounceMarker(clickedItem);
  showMoreInfo(this);
 }
}

ko.applyBindings(new ViewModel());

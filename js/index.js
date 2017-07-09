var ViewModel = function() {

    var that = this;

    this.listOfMarkers = ko.observableArray([]);

    markers.forEach(function(marker){
     that.listOfMarkers.push(marker);
    });

    // https://stackoverflow.com/questions/20857594/knockout-filtering-on-observable-array
    this.palceToBeSearched = ko.observable();

    // this function filters the list based on the search query...
    this.filteredPlaces = ko.computed( function() {
   		var filter = that.palceToBeSearched();
   		if (!filter) {
      that.listOfMarkers().forEach(function(marker){
       marker.setMap(map);
      });
   			return that.listOfMarkers();
   		} else {
   			return ko.utils.arrayFilter(that.listOfMarkers(), function(marker) {
       filter = filter.toLowerCase();
   				var string = marker.title.toLowerCase();
   				var result = (string.search(filter) >= 0);
       if(result === false){
        marker.setMap(null);
       }
   				return result;
   			});
   		}
   	});

    // links the click on listView with the map...
    this.showItem = function(clickedItem){
     bounceMarker(clickedItem);
     showMoreInfo(clickedItem);
    }
}

ko.applyBindings(new ViewModel());

var autoFill = function(searchTerm) {
	//autofill the searchbox with the searchTerm parameter when you click it in the suggested terms list
	$("#searchBox").val(searchTerm);
	search();
}

var query = function() {
	if ($("#searchBox").val().length > 3) {
		obj = {};
		obj.data = $("#searchBox").val(); //grab the text from the search box as our query
		$.ajax({
		    type: "GET",
		    url: "/query",
		    dataType: "json",
		    data: obj,
		    success: function(data) { //data is what we receive from the server (app.js) in the app.get("/query") function
		    	var dataString;
		    	$("#autoComplete").empty(); //empty out the last results
		    	$.each(data[1], function(k, v) {
					dataString = "<p class='suggestion' onclick='autoFill(\"" + v + "\");'>"+ v +"</p>";
					$("#autoComplete").append(dataString);  //add our results to the autoComplete div
		    	});
		    }, error: function() {
		    }, complete: function() {
		    }
		});
	} else {
		 $("#autoComplete").empty(); //empty out the last results
	}
}
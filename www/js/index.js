var obj = {};
function contact() {
	obj = {};
	obj.name = "Joey";
	obj.email = "Joey@joey.com";
	obj.phone = "5135555555";
	obj.message = "This is a test message";
	$.ajax({
	    type: "GET",
	    url: "/contact",
	    dataType: "json",
	    data: obj,
	    success: function() {
	    	alert("Success!");
	    }, error: function() {
	        
	    }, complete: function() {
	    	alert("Success!");
	    }
	});
}
var search = function() {
	obj = {};
	obj.data = $("#searchBox").val(); //grab the text from the search box as our query
	$.ajax({
	    type: "GET",
	    url: "/search",
	    dataType: "json",
	    data: obj,
	    success: function(data) {
	    	var dataString = "First result: " + JSON.stringify(data.body[0].title);
	    	$(["#firstResponse", "#responseData"]).empty(); //empty out the last results
	    	$("#firstResponse").text(dataString); //add our response data to the page
	    	$("#responseData").text(JSON.stringify(data));
	    }, error: function() {
	    }, complete: function() {
	    }
	});
}
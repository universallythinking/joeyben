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
	    	var dataString;
	    	$("#responseData").empty(); //empty out the last results
	    	$.each(data.body, function(k, v) {
				dataString = "<p class='record' data='" + v.videoId + "' onclick='playVideo(" + k + ");'>Result " + k + " Title: " + v.title + "</p>";
				$("#responseData").append(dataString);  //add our nth response data to the responseData DIV
	    	});
	    }, error: function() {
	    }, complete: function() {
	    }
	});
}

var videoUrl;

window.playVideo = function(n) {
	videoUrl = "https://www.youtube.com/embed/" + $(".record").eq(n).attr("data") + "?rel=0&autoplay=1&fs=1&playsinline=1&enablejsapi=1&mute=0&showinfo=0&controls=0";
	$("#currentVideo").attr("src", videoUrl);
}

$("#searchBox").keydown(function(e){
    if (e.keyCode == 13) {
    	search();
    }
});
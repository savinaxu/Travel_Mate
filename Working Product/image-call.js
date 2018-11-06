$(function() {


var search;
var API_KEY = '10550959-d75d5c93391ba85fb4ccf5e31';
var queryURL = "https://pixabay.com/api/?key="+API_KEY+"&q="+ search + "&per_page=3";


$(document).on("click", "#search-click", function() {
    console.log(placeNames);
    event.preventDefault();
    $("#display-image").empty();
    search = $("#search-input").val();

    $.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);
    var imageURL = response.hits[0].largeImageURL
    console.log(imageURL);
    

    $("#display-location").text(search);
    var newPic = $("<img>");
    newPic.attr("src", imageURL);
    $("#display-image").append(newPic);
})
})
});
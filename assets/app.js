//original array of ideas
var topics = ["trains", "plane", "automobile", "iceland", "everest", "barcelona", "helicopter", "egypt", "dublin", "airport", "alaska"];
//function to to start handling click of created buttons
var gifup = function() {
    $("#travel").html("")
    var thing = $(this).attr("data-thing");
    giffyness(thing);
}
//function that creates the buttons in the array. first deletes existing buttons. adds click event to buttons. puts on page. 
var topicbtn = function() {
    $("#travelButtons").html("");
    for(i=0;i<topics.length;i++) {
        var newbtn = $("<button>");
        newbtn.text(topics[i]);
        newbtn.addClass("topiclick btn");
        newbtn.attr("data-thing", topics[i]);
        newbtn.on("click", gifup);
        $("#travelButtons").append(newbtn);
    }
}

//changes animation state
var animation = function() {
    var state = $(this).attr("data-state")

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    if(state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
//call on page load
topicbtn();

//ajax call and fills buttons with data and junk.
var giffyness = function(topicsearch) {
    var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + topicsearch + "&api_key=TuHl7HKAs0teB4wZYddJHr3SiuEcTFRJ&limit=10"
    $.ajax({
        url: queryurl,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='gifdivs'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var thingimg = $("<img>");
          thingimg.attr("src", results[i].images.fixed_height_still.url);
          thingimg.attr("data-still", results[i].images.fixed_height_still.url);
          thingimg.attr("data-animate", results[i].images.fixed_height.url);
          thingimg.attr("data-state", "still");
          thingimg.addClass("gif");
          thingimg.on("click", animation);

          gifDiv.prepend(thingimg);
          gifDiv.prepend(p);

          $("#travel").append(gifDiv);
        }
      });
}
//click of add button.
$(".sbtn").on("click", function() {
    topics.push($(".inptxt").val().trim());
    topicbtn();
});




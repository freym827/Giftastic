//original array of ideas
var topics = ["rihanna", "kehlani", "robyn", "carly rae jepsen", 
"lauryn hill", "lana del rey", "ke$ha", "amy winehouse", "beyonce", "katy parry", "lady gaga", "shakira", "taylor swift", "ariana grande", 
"hilary duff", "adele", "SZA", "madonna", "cardi b", "blastoise", "natalie imbruglia", "kelly clarkson", "nicki minaj", "lorde"];
var morebtn = $(".morebtn");
//number of gifs to be displayed on page
var gifcount = 0;
//current singer to search for
var singer = "";
//function to to start handling click of created buttons, taking name of button, and passing it to be searched in giffy string
var gifup = function() {
    $("#travel").html("")
    singer = $(this).attr("data-thing");
    gifcount = 10;
    giffyness();
    morebtn.css("display", "block");
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
var giffyness = function() {
    var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + singer + "&api_key=TuHl7HKAs0teB4wZYddJHr3SiuEcTFRJ&rating=pg&limit=" + gifcount;
    $.ajax({
        url: queryurl,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data;
        //formatted to get 10 gifs at a time
        for (var i = (gifcount - 10); i < gifcount; i++) {
          var gifDiv = $("<div class='gifdivs'>");

          var rating = results[i].rating;
          var caption = results[i].title;
          var source = results[i].source_tld
          if(source == "") {
              source = "No source available"
          }
          var p = $("<p>").text("Rating: " + rating);
          var p2 = $("<p>").text(caption);
          var p3 = $("<p>").text("Source: " + source);

          var thingimg = $("<img>");
          //setting still picture, saving still picture and animated gif, giving state and class to each image. 
          thingimg.attr("src", results[i].images.fixed_height_still.url);
          thingimg.attr("data-still", results[i].images.fixed_height_still.url);
          thingimg.attr("data-animate", results[i].images.fixed_height.url);
          thingimg.attr("data-state", "still");
          thingimg.addClass("gif");
          //setting click event
          thingimg.on("click", animation);

          gifDiv.prepend(thingimg);
          gifDiv.prepend(p2);
          gifDiv.prepend(p3);
          gifDiv.prepend(p);
          gifDiv.css("border", "4px inset #999")
          gifDiv.css("padding", "10px")

          $("#travel").append(gifDiv);
        }
      });
}
//click of add button button
$(".sbtn").on("click", function() {
    var input = $(".inptxt").val().trim();
    var int = topics.indexOf(input)
    if(input == "") {
        $(".inptxt").val("")
        return;
    }
    if(int == -1) {
    topics.push(input);
    topicbtn();
    }
    $(".inptxt").val("")
});

//more button puts 10 more gifs on page
morebtn.on("click", function() {
    gifcount += 10;
    giffyness();
});




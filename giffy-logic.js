//==================================================
//added onscroll to top button:
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("topBtn").style.display = "block";
  } else {
    document.getElementById("topBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//==================================================

var topics = ["Monday", "Tuesday", "Thursday", "Wednesday", "Friday", "Sunday", "Saturday"];

var myFavs = [];

function displayGifInfo() {

  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=VKv6S2W7YwMKENoOu1Ws7SkfPe1iEiCh&q=" + gif + "&limit=10&offset=0&rating=PG-13&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response)

    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifCard = $("<div class='card'>");
      var imageURL = results[i].images.fixed_width_still.url;
      var image = $("<img>").attr("src", imageURL);
      image.attr("data-state", "still")
      image.addClass("gif");
      image.addClass("card-img-top");
      gifCard.append(image);
      var cardBody = $("<div class='card-body'>");
      gifCard.append(cardBody);
      var rated = results[i].rating;
      var faHeart = $("<span class='far fa-heart'>");
      var pMuted = $("<p>").text("#" + gif + " | Rated: " + rated);
      pMuted.addClass("card-text");
      pMuted.addClass("text-muted");
      pMuted.attr("font-size", "small");
      pMuted.append(faHeart);
      cardBody.append(pMuted);
      $(".card-columns").prepend(gifCard);
    }
  })
};
        
function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    a.addClass("btn btn-outline-secondary");
    a.addClass("gif-btn");
    a.attr("type", "button");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttons-view").append(a);
  }
};

$("#gif-search-btn").on("click", function (event) {
  event.preventDefault();
  var gif = $("#add-topic").val().trim();
  if (gif == "") {
    renderButtons();
  }
  else {
    topics.push(gif);
    renderButtons();
    $("#add-topic").val("")
  }
});

$(document).on("click", ".gif-btn", displayGifInfo);

renderButtons();

//Could not figure out how to append the attributes demonstrated in class to images pulled from GIPHY, but found this solution by karthick6891 (https://jsfiddle.net/karthick6891/L9t0t1r2), and it works, and it's almost midnight, so this will have to be it for now. :)
$('body').on('click', '.gif', function() {
  var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

$('body').on('click', '.fa-heart', function() {
  if($(this).hasClass('fas')){  
    $(this).removeClass('fas');
    $(this).addClass('far');
  } else {
    $(this).removeClass('far')
    $(this).addClass('fas')
  }});

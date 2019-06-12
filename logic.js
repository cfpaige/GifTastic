var gifs = ["Monday", "Tuesday", "Thursday", "Wednesday", "Friday", "Sunday", "Saturday"];

function displayGifInfo() {

        var gif = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=VKv6S2W7YwMKENoOu1Ws7SkfPe1iEiCh&q=" + gif + "&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response)

            var results = response.data;

            // for (var i = 0; i < results.length; i++)
                
                var gifCard = $("<div class='card'>");
                var imageURL = results[i].images.fixed_width_still.url;
                var image = $("<img>").attr("src", imageURL);
                image.addClass("card-img-top");
                gifCard.append(image);
                var cardBody = $("<div class='card-body'>");
                gifCard.append(cardBody);
                var rated = results[i].rating;
                var pMuted = $("<p>").text("Rated " + rated);
                pMuted.addClass("card-text");
                pMuted.addClass("text-muted");
                pMuted.attr("size", "small");
                cardBody.append(pMuted);
                $("#card-columns").prepend(gifCard);
        })};


    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < gifs.length; i++) {

            var a = $("<button>");
            a.addClass("btn btn-outline-secondary");
            a.addClass("gif-btn");
            a.attr("type", "button");
            a.attr("data-name", gifs[i]);
            a.text(gifs[i]);
            $("#buttons-view").append(a);
        }
    }

    $("#gif-search-btn").on("click", function (event) {
        event.preventDefault();

        var gif = $("#add-topic").val().trim();

        gifs.push(gif);

        renderButtons();
    });

    $(document).on("click", ".gif-btn", displayGifInfo);

    renderButtons();
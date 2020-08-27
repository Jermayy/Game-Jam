$(document).ready(() => {
    console.log("ready!");

    $("#submitBtn").on("click", event => {
        event.preventDefault();

        const gameNameValue = $("#gameSearch")
            .val()
            .trim();

        const genreValue = $("#genre").val();
        console.log(genreValue);

        const platformValue = $("#platforms").val();
        console.log(platformValue);

        if (genreValue === "none" && platformValue === "none") {
            $.get("/api/games/" + gameNameValue, data => {
                console.log(data);
            });
        } else if (genreValue === "none") {
            $.get(
                "/api/gamesplatforms/" + gameNameValue + "/" + platformValue,
                data => {
                    console.log(data);
                }
            );
        } else if (platformValue === "none") {
            $.get("/api/gamesgenre/" + gameNameValue + "/" + genreValue, data => {
                console.log(data);
            });
        } else {
            $.get(
                "/api/gamesgenreplatform/" +
                gameNameValue +
                "/" +
                genreValue +
                "/" +
                platformValue,
                data => {
                    console.log(data);
                    console.log(data[0].game);
                }
            );
        }
    });
});





// API query:
const getImage = (gameQuery) => {
    apiKey = "";
    let queryURL = "https://www.gamespot.com/api/games/?api_key=" + apiKey + gameQuery;


    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);

    });

}

// https://www.gamespot.com/api/games/?api_key=<apiKey>&filter=name:Doom&format=json
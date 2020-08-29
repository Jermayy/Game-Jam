$(document).ready(() => {
  //A function to empty input field values when we post something to our database
  function emptyInputFields() {
    $("#addGameInputName").val("");
    $("#addGameGenre").val("");
    $("#addGamePlatforms").val("");
    $("#addGameYear").val("");
    $("#addGamePublisher").val("");
    $("#addGameGlobalSales").val("");
    $("#addGameIGNScore").val("");
  }
  //retaining the input fileds value from the url so we have our search keywords and clauses back in place after the redirect
  function populateInputFields() {
    const urlAdress = window.location.href.split("/");
    if (urlAdress[urlAdress.length - 2] === "games") {
      //cleaning the values for any %20s added to them by the browser if there is any space in their name
      const gameName = urlAdress[urlAdress.length - 1].split("%20").join(" ");
      //assigning the captured game name value from the url as the default value for the search box
      $("#gameSearch").attr("value", gameName);
    } else if (urlAdress[urlAdress.length - 3] === "gamesgenre") {
      const gameName = urlAdress[urlAdress.length - 2].split("%20").join(" ");
      $("#gameSearch").attr("value", gameName);
      //making the captured genre value as the default value for the dropdown list for genre. Same thing applies for dropdwon list of platforms
      $(
        "#genre option[value=" +
          "'" +
          urlAdress[urlAdress.length - 1] +
          "'" +
          "]"
      ).attr("selected", "selected");
    } else if (urlAdress[urlAdress.length - 3] === "gamesplatforms") {
      const gameName = urlAdress[urlAdress.length - 2].split("%20").join(" ");
      const plaformName = urlAdress[urlAdress.length - 1]
        .split("%20")
        .join(" ");
      $("#gameSearch").attr("value", gameName);
      $("#platforms option[value=" + "'" + plaformName + "'" + "]").attr(
        "selected",
        "selected"
      );
    } else if (urlAdress[urlAdress.length - 4] === "gamesgenreplatform") {
      const gameName = urlAdress[urlAdress.length - 3].split("%20").join(" ");
      const plaformName = urlAdress[urlAdress.length - 1]
        .split("%20")
        .join(" ");
      $("#gameSearch").attr("value", gameName);
      $("#platforms option[value=" + "'" + plaformName + "'" + "]").attr(
        "selected",
        "selected"
      );
      $(
        "#genre option[value=" +
          "'" +
          urlAdress[urlAdress.length - 2] +
          "'" +
          "]"
      ).attr("selected", "selected");
    }
  }
  //runing the function above on page load to ensure populating the input fields
  window.onload = populateInputFields;

  //Running different get routes for different search query types when the user clikcs the search button
  $("#submitBtn").on("click", event => {
    event.preventDefault();
    //Getting the values out of the input fields and dropdown boxes and storing them inside const variables
    let gameNameValue = $("#gameSearch")
      .val()
      .trim();

    let genreValue = $("#genre").val();
    console.log(genreValue);

    let platformValue = $("#platforms").val();
    console.log(platformValue);

    // Don't do anything if the name field hasn't been filled out
    if (!gameNameValue) {
      return;
    }

    //checking the input values to choose appropriate get route to retrieve results
    if (genreValue === "none" && platformValue === "none") {
      $.get("/api/games/" + gameNameValue, data => {
        console.log(data);
      });

      //redirecting the page to the new url to display the results using handlbars
      window.location.replace(
        "http://localhost:8080/api/games/" + gameNameValue
      );
    } else if (genreValue === "none") {
      $.get(
        "/api/gamesplatforms/" + gameNameValue + "/" + platformValue,
        data => {
          console.log(data);
        }
      );
      //redirecting the page to the new url to display the results using handlbars
      window.location.replace(
        "http://localhost:8080/api/gamesplatforms/" +
          gameNameValue +
          "/" +
          platformValue
      );
      //retaining the input fileds value from the url so we have our search keywords and clauses back in place after the redirect
      gameNameValue = gameNameValue;
      platformValue = platformValue;
      genreValue = "none";
    } else if (platformValue === "none") {
      $.get("/api/gamesgenre/" + gameNameValue + "/" + genreValue, data => {
        console.log(data);
      });
      //redirecting the page to the new url to display the results using handlbars
      window.location.replace(
        "http://localhost:8080/api/gamesgenre/" +
          gameNameValue +
          "/" +
          genreValue
      );
      //retaining the input fileds value from the url so we have our search keywords and clauses back in place after the redirect
      gameNameValue = gameNameValue;
      genreValue = genreValue;
      platformValue = "none";
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
        }
      );
      //redirecting the page to the new url to display the results using handlbars
      window.location.replace(
        "http://localhost:8080/api/gamesgenreplatform/" +
          gameNameValue +
          "/" +
          genreValue +
          "/" +
          platformValue
      );
      //retaining the input fileds value from the url so we have our search keywords and clauses back in place after the redirect
      gameNameValue = gameNameValue;
      genreValue = genreValue;
      platformValue = platformValue;
    }
  });

  //Adding new games to both tables using only necessary fields for our search queries when the user clicks add a game button
  $("#addGameButtton").on("click", event => {
    event.preventDefault();

    // Don't do anything if the name, year, publisher, global sales or IGN scores field hasn't been filled out
    if (
      !$("#addGameInputName")
        .val()
        .trim() ||
      $("#addGamePlatforms").val() === "none" ||
      $("#addGameGenre").val() === "none" ||
      !$("#addGameYear")
        .val()
        .trim() ||
      !$("#addGamePublisher")
        .val()
        .trim() ||
      !$("#addGameGlobalSales")
        .val()
        .trim() ||
      !$("#addGameIGNScore")
        .val()
        .trim()
    ) {
      return;
    }

    const game = {
      name: $("#addGameInputName")
        .val()
        .trim(),
      platform: $("#addGamePlatforms").val(),
      year: $("#addGameYear")
        .val()
        .trim(),
      genre: $("#addGameGenre").val(),
      publisher: $("#addGamePublisher")
        .val()
        .trim(),
      Global_Sales: $("#addGameGlobalSales")
        .val()
        .trim()
    };
    $.post("/api/games", game);

    const score = {
      game: $("#addGameInputName")
        .val()
        .trim(),
      platform: $("#addGamePlatforms").val(),
      score: $("#addGameIGNScore")
        .val()
        .trim(),
      genre: $("#addGameGenre").val()
    };
    $.post("/api/scores", score);

    alert("New game has been added to the database");
    //Calling emptyInputFields function to empty out the fields after we have our success alert
    emptyInputFields();
  });
});

// API query:
// const getImage = gameQuery => {
//   apiKey = "";
//   const queryURL =
//     "https://www.gamespot.com/api/games/?api_key=" + apiKey + gameQuery;

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(response => {
//     console.log(response);
//   });
// };

// https://www.gamespot.com/api/games/?api_key=<apiKey>&filter=name:Doom&format=json

$(document).ready(() => {
  //retaining the input fileds value from the url so we have our search keywords and clauses back in place after the redirect
  function populateInputFields() {
    const urlAdress = window.location.href.split("/");
    if (urlAdress[urlAdress.length - 2] === "games") {
      //cleaning the values for any %20s added to them by the browser if there is any space in their name
      const gameName = urlAdress[urlAdress.length - 1].split("%20").join(" ");
      //assigning the captured game name value from the url as the default value for the search box
      $(".formSearchInputBar").attr("value", gameName);
    } else if (urlAdress[urlAdress.length - 3] === "gamesgenre") {
      const gameName = urlAdress[urlAdress.length - 2].split("%20").join(" ");
      $(".formSearchInputBar").attr("value", gameName);
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
      $(".formSearchInputBar").attr("value", gameName);
      $("#platforms option[value=" + "'" + plaformName + "'" + +"]").attr(
        "selected",
        "selected"
      );
    } else if (urlAdress[urlAdress.length - 4] === "gamesgenreplatform") {
      const gameName = urlAdress[urlAdress.length - 3].split("%20").join(" ");
      const plaformName = urlAdress[urlAdress.length - 1]
        .split("%20")
        .join(" ");
      $(".formSearchInputBar").attr("value", gameName);
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
});

// API query:
const getImage = gameQuery => {
  apiKey = "";
  const queryURL =
    "https://www.gamespot.com/api/games/?api_key=" + apiKey + gameQuery;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    console.log(response);
  });
};

// https://www.gamespot.com/api/games/?api_key=<apiKey>&filter=name:Doom&format=json

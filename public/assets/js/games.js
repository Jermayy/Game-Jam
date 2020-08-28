$(document).ready(() => {
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
      //retaining the input fileds value from the url so we have our search keywords and clauses back in place after the redirect
      const urlAdress = window.location.href.split("/");
      $(".formSearchInputBar").attr("value", urlAdress[urlAdress.length - 1]);
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

// $.get("/api/posts" + categoryString, (data) => {
//     console.log("Posts", data);
//     posts = data;
//     if (!posts || !posts.length) {
//         displayEmpty();
//     } else {
//         initializeRows();
//     }
// });

// $(".create-form").on("submit", (event) => {
//     // Make sure to preventDefault on a submit event.
//     event.preventDefault();

//     const newCat = {
//         name: $("#ca").val().trim(),
//         sleepy: $("[name=sleepy]:checked").val().trim()
//     };

//     // Send the POST request.
//     $.ajax("/api/cats", {
//         type: "POST",
//         data: newCat
//     }).then(
//         () => {
//             console.log("created new cat");
//             // Reload the page to get the updated list
//             location.reload();
//         }
//     );
// });

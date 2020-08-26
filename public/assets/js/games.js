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
        }
      );
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

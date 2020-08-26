$(document).ready(function() {
    console.log("ready!");

    $("#submitBtn").on("click", event => {
        event.preventDefault();

        const searchValue = $("#gameSearch").val().trim();

        $.get("/api/games/name/" + searchValue, (data) => {
            console.log(data);

        })


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
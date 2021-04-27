import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import MovieService from "./js/api.js";
import User from "./js/user.js";

let user1;
// let user2;
let currentUser;



// function switchUser() {
//   if (currentUser.userName === "user1") {
//     currentUser = user2;
//   } else {
//     currentUser = user1;
//   }
// }


function getElements(response) {
  console.log(response);
  $("#showPoster").html(`<img src="https://image.tmdb.org/t/p/w500/${response.results[0].poster_path}"/>`);
}

$(document).ready(function () {
  user1 = new User("user1");
  // user2 = new User(userName);
  currentUser = user1;
  let currentMovie = currentUser.movieArray[0];
  console.log(currentUser.movieArray);
  MovieService.getMovieInfoAPI(currentMovie)
    .then(function (response) {
      getElements(response);
    });


  $("#yes").click(function () {
    currentMovie = currentUser.movieArray[0];
    currentUser.moviesLiked.push(currentMovie);
    currentUser.movieArray.shift();
    console.log(currentUser.moviesLiked);
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
      });
  });
  $("#no").click(function () {
    currentUser.movieArray.shift();
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
      });
  });
});

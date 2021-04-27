import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import MovieService from "./js/api.js";
import User from "./js/user.js";

let user1;
let user2;
let currentUser;

function switchUser() {
  if (currentUser.userName === "user1") {
    currentUser = user2;
  } else {
    currentUser = user1;
  }
}

function getElements(response) {
  $("#showPoster").html(`<img src="https://image.tmdb.org/t/p/w500/${response.results[0].poster_path}"/>`);
}

// function returnMatches() {
//   const match = user1.moviesLiked.filter(element => user2.moviesLiked.includes(element));
//   return match;
// }

function compareMovies(currentMovie) {
  if (currentUser.userName === "user1") {
    user2.moviesLiked.forEach(function (element) {
      if (currentMovie.includes(element)) {
        alert("It's a match!");
      }
    });
  } else {
    user1.moviesLiked.forEach(function (element) {
      if (element.includes(currentMovie)) {
        alert("It's a match!");
      }
    });
  }
  console.log(user1, user2);
}

$(document).ready(function () {
  user1 = new User("user1");
  user2 = new User("user2");
  currentUser = user1;
  let currentMovie = currentUser.movieArray[0];
  MovieService.getMovieInfoAPI(currentMovie)
    .then(function (response) {
      getElements(response);
    });

  $("#yes").click(function () {
    currentMovie = currentUser.movieArray[0];
    currentUser.moviesLiked.push(currentMovie);
    compareMovies(currentMovie);
    currentUser.movieArray.shift();
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

  $("#switch").click(function () {
    switchUser();
    console.log(currentUser);
  });
});








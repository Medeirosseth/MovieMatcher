import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import MovieService from "./js/api.js";
import User from "./js/user.js";
import PopulateMovies from "./js/originalMovie.js";

// let user1;
// let user2;
let currentUser;


function switchUser(user1, user2) {
  if (currentUser.userID === 1) {
    currentUser = user2;
    return currentUser;
  } else {
    currentUser = user1;
    return currentUser;
  }
}

function getElements(response) {
  // console.log(currentUser, user1, user2);
  $("#movieTitle").text(response.results[0].original_title);
  $("#movieOverview").text(response.results[0].overview);
  $("#moviePoster").html(
    `<img src="https://image.tmdb.org/t/p/w500${response.results[0].poster_path}" id="poster"/>`
  );
}

function compareMovies(currentMovie, user1, user2) {
  if (currentUser.userID === 1) {
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
}

$(document).ready(function () {
  let user1 = new User(1, "user1");
  let user2 = new User(2, "user2");
  PopulateMovies.apiArray()
    .then(function (response) {
      user1.getArray(response);
      user2.getArray(response);
    });
  currentUser = user1;
  let currentMovie = currentUser.movieArray[0];


  $("#inputForm").submit(function (event) {
    event.preventDefault();
    currentUser.userName = $("#userNameInput").val();
    $("#userNameInput").val("");
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
      });
    $("#showMovies").toggle();
    $(".userInput").slideToggle();
  });

  $("#yes").click(function () {
    // let currentMovie = currentUser.movieArray[0];
    currentUser.moviesLiked.push(currentMovie);
    compareMovies(currentMovie, user1, user2);
    currentUser.movieArray.shift();
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
      });
  });

  $("#no").click(function () {
    // let currentMovie = currentUser.movieArray[0];
    currentUser.movieArray.shift();
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
      });
  });

  $("#switch").click(function () {
    switchUser(user1, user2);
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
      });
    $("#showMovies").toggle();
    $(".userInput").slideToggle();
    console.log(currentUser);
  });

  $("#show-matches").click(function () {
    // returnMatches();
    $("#showMovies").toggle();



  });
});








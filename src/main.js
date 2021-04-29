import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import MovieService from "./js/api.js";
import User from "./js/user.js";
import TrailerService from "./js/trailerApi.js";
import PopulateMovies from "./js/originalMovie.js";

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
  $("#movieTitle").text(response.results[0].original_title);
  $("#movieOverview").text(response.results[0].overview);
  $("#moviePoster").html(
    `<img src="https://image.tmdb.org/t/p/w500${response.results[0].poster_path}" id="poster"/>`
  );
}

function returnMatches(user1, user2) {
  const match = user1.moviesLiked.filter((element) =>
    user2.moviesLiked.includes(element));
  match.forEach(function (element) {
    $("#name-place").text(
      `${user1.userName} matched these movies with ${user2.userName}`
    );
    $("#ulMatches").append(`<li>${element}</li>`);
  });
  return match;
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

function youTubeConcat(ytTrailer) {
  $("#youtube-place").html(
    `<iframe id="trailer" src="https://www.youtube.com/embed/${ytTrailer}"></iframe>`
  );
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
  let ytTrailer;

  $("#inputForm").submit(function (event) {
    event.preventDefault();
    currentUser.userName = $("#userNameInput").val();
    youTubeConcat(ytTrailer);
    $("#userNameInput").val("");
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
        let movieJsonID = response.results[0].id;
        TrailerService.getTrailerApi(movieJsonID)
          .then(function (trailerResponse) {
            let ytTrailer = trailerResponse.results[0].key;
            youTubeConcat(ytTrailer);
          });
      });
    $("#showMovies").toggle();
    $(".userInput").slideToggle();
  });

  $("#yes").click(function () {
    currentUser.moviesLiked.push(currentMovie);
    compareMovies(currentMovie, user1, user2);
    currentUser.movieArray.shift();
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
        let movieJsonID = response.results[0].id;
        TrailerService.getTrailerApi(movieJsonID)
          .then(function (trailerResponse) {
            ytTrailer = trailerResponse.results[0].key;
            youTubeConcat(ytTrailer);
          });
      });
  });

  $("#no").click(function () {
    currentUser.movieArray.shift();
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
        let movieJsonID = response.results[0].id;
        TrailerService.getTrailerApi(movieJsonID)
          .then(function (trailerResponse) {
            ytTrailer = trailerResponse.results[0].key;
            youTubeConcat(ytTrailer);
          });
      });
  });

  $("#switch").click(function () {
    switchUser(user1, user2);
    currentMovie = currentUser.movieArray[0];
    MovieService.getMovieInfoAPI(currentMovie)
      .then(function (response) {
        getElements(response);
        let movieJsonID = response.results[0].id;
        TrailerService.getTrailerApi(movieJsonID)
          .then(function (trailerResponse) {
            ytTrailer = trailerResponse.results[0].key;
            youTubeConcat(ytTrailer);
          });
      });
    $("#showMovies").toggle();
    $(".userInput").slideToggle();
  });

  $("#show-matches").click(function () {
    returnMatches(user1, user2);
    $("#showMovies").slideUp();
    $("#showMoviesInCommon").fadeIn();
  });

  $("#returnButton").click(function () {
    $("#showMoviesInCommon").fadeOut();
    $("#showMovies").slideDown();
  });
});

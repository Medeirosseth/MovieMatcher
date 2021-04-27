import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import MovieService from "./js/api.js";

function getElements(response) {
  console.log(response);
  $("#showPoster").html(
    `<img src="https://image.tmdb.org/t/p/w500/${response.results[0].poster_path}"/>`
  );
}

$(document).ready(function () {
  const movieArray = ["Fight club", "Ghostbusters"];
  console.log(movieArray);
  let currentMovie = movieArray[0];
  MovieService.getMovieInfoAPI(currentMovie).then(function (response) {
    getElements(response);

    $("#no").click(function () {
      movieArray.shift();
      console.log("our new movie array: ", movieArray);
      MovieService.getMovieInfoAPI(currentMovie).then(function (response) {
        getElements(response);
      });
    });
  });
});

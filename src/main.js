import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import MovieService from './js/api.js';




///// checklist
// user constructors
// movie databases
// API
// function that compares users movies liked
// yes - pushes movie title to the liked movie array,  





function getElements(response) {
  console.log(response);
  $("#showPoster").html(`<img src="https://image.tmdb.org/t/p/w500/${response.results[0].poster_path}"/>`)
}


$(document).ready(function () {
  const movieArray = ["Fight club", "Ghostbusters"];
  let currentMovie = movieArray[0];
  MovieService.getMovieInfoAPI(currentMovie)
    .then(function (response) {
      getElements(response);

      $("#button").click(function () {
        // currentMovie = movieArray[i] += 1;
        console.log(currentMovie);
        MovieService.getMovieInfoAPI(currentMovie)
          .then(function (response) {
            getElements(response);
          });
      });

    });
});
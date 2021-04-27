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

function compareMovies() {
  let matchArray = [];
  user1.moviesLiked.forEach(function (element) {
    if (user2.moviesLiked.includes(element)) {
      matchArray.push(element)
      console.log(matchArray)
    }

  })
}




//     for (let i = 0; i < user2.moviesLiked.length - 1; i++) {
//       if (user2.moviesLiked.includes(element)) {
//       }
//     }
//   });
// }






// function compareMovies(thing1, thing2) {
//   let matchArray = []
//   thing1.forEach(element) {
//     for(let i=0; i < thing2.length -1; i++){
//       if (thing2.includes(element)) {
//         matchArray.push(element)
//       }
//     }
//   }
//   return matchArray;
// }




function getElements(response) {
  // console.log(response);
  $("#showPoster").html(`<img src="https://image.tmdb.org/t/p/w500/${response.results[0].poster_path}"/>`);
}

$(document).ready(function () {
  user1 = new User("user1");
  user2 = new User("user2");
  currentUser = user1;
  let currentMovie = currentUser.movieArray[0];
  // console.log(currentUser.movieArray);
  MovieService.getMovieInfoAPI(currentMovie)
    .then(function (response) {
      getElements(response);
    });


  $("#yes").click(function () {
    currentMovie = currentUser.movieArray[0];
    currentUser.moviesLiked.push(currentMovie);
    console.log(user1.moviesLiked, user2.moviesLiked);
    compareMovies();
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
  });
});

export default class TrailerServive {
  static getTrailerApi(movieJsonID) {
    return fetch(
      `http://api.themoviedb.org/3/movie/${movieJsonID}/videos?api_key=${process.env.API_KEY}`
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}
//response.results[0].id

/// get response.results[0].id

//movieIDResponse.results[0].key -- 2nd dealie

//https://www.youtube.com/watch?v=${`movieIDResponse.results[0].key`}

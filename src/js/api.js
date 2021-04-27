export default class MovieService {
  static getMovieInfoAPI() {
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=Crash&page=1&include_adult=false`)
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

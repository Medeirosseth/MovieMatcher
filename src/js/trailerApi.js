export default class TrailerService {
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

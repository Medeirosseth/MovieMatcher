export default class MovieService {
  static getMovieInfo() {
    return new promise(function (resolve, reject) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}f&language=en-US&query=Fast&page=1&include_adult=false`;
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}


//database[0].name
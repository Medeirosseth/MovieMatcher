export default class User {
  constructor(userID, userName) {
    this.userID = userID;
    this.userName = userName;
    this.movieArray = [];
    this.moviesLiked = [];
  }

  getArray(response) {
    let nameArray = [];
    for (let i = 0; i < response.results.length; i++) {
      nameArray.push(response.results[i].title);
    }
    this.movieArray = nameArray;
  }
};

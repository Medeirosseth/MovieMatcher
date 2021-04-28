export default class User {
  constructor(userID, userName) {
    this.userID = userID;
    this.userName = userName;
    this.movieArray = [
      "The Fast and the Furious",
      "2 Fast 2 Furious",
      "The Fast and The Furious: Tokyo Drift",
      "Fast Furious 2009",
      "Fast Five",
      "Fast and Furious 6",
      "Furious 7",
      "The Fate of the Furious",
      "Fast and Furious Presents: Hobbs & Shaw",
      "gone in 60 seconds",
    ];
    this.moviesLiked = [];
    // this.userID = 0;
  }
}

// addUser() {
//   userID = this.assignID();
//   this.userID.push(user);
// }

// assignID() {
//   this.userID += 1;
//   return this.userID;
// }

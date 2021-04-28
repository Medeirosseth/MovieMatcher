export default class User {
  constructor(userID) {
    this.userID = userID;
    this.userName = 0;
    this.movieArray = [];
    this.moviesLiked = [];
  }

  getArray(response) {
    let nameArray = [];
    for (let i = 0; i < response.results.length; i++) {
      nameArray.push(response.results[i].title);
    }
    // console.log(nameArray);
    this.movieArray = nameArray;
  }


}




// this.userID = 0;
// addUser() {
//   userID = this.assignID();
//   this.userID.push(user);
// }







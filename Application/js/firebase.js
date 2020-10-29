firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    sessionStorage.setItem('userUid', user.uid);

    document.getElementById("userID").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "inline";
    document.getElementById("loginBtn").style.display = "none";

    if (window.location.href.indexOf("login") > -1) {
      document.getElementById("login_div").style.display = "none";
    }

    // if (window.location.href.indexOf("movie") > -1) {
    //   document.getElementById("favThisMovie").style.display = "inline";
    //   document.getElementById("removeMovie").style.display = "none";
    // }

    var user = firebase.auth().currentUser;

    if (user != null) {


      firebase.firestore().collection('users').doc(user.uid).get().then(function(doc) {
          if (doc.exists) {
              document.getElementById("userID").innerHTML = doc.data().username;

              if (window.location.href.indexOf("user") > -1) {
                document.getElementById("userName").innerHTML = "<strong>Username: </strong>" +  doc.data().username;
                document.getElementById("userEmail").innerHTML = "<strong>Email: </strong>" + user.email;
                getFavoriteMovies();
              }
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });



    }

  } else {
    // No user is signed in.

    document.getElementById("userID").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "inline";
    if (window.location.href.indexOf("login") > -1) {
      document.getElementById("login_div").style.display = "block";
    }

    // if (window.location.href.indexOf("movie") > -1) {
    //   document.getElementById("addFav").style.display = "none";
    //   document.getElementById("removeFav").style.display = "inline";
    // }
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(cred => {
    window.location.href = "./user.html";
  }).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });



}

function loginFromSignup(userEmail, userPass){

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(user) {
    window.location.href = "./user.html";
  }).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function signup() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(cred => {

    var uname = cred.user.email;
    uname = uname.split("@");
    uname = uname[0];

    console.log(uname);

    // write new doc to collection
    firebase.firestore().collection('users').doc(cred.user.uid).set({
      username: uname,
      useruid: cred.user.uid,
      email: cred.user.email,
      favoriteMovies: []
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    loginFromSignup(userEmail, userPass);

  }).catch(function(error) {

    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

function logout(){
  firebase.auth().signOut().then(function() {
    window.location.href = "./index.html";
  }, function(error) {
    console.log(error);
  });
}

function passResetFromSignup() {
  var user = firebase.auth().currentUser;
  var userEmail = document.getElementById("email_field").value;

  firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
    alert("Password reset email will been sent to your inbox soon.");
  }).catch(function(error) {
    console.log(error);
  });
}

function passResetFromUserPage() {
  var user = firebase.auth().currentUser;
  var userEmail = user.email;

  firebase.auth().sendPasswordResetEmail(userEmail).then(function() {
    alert("Password reset email will been sent to your inbox soon.");
  }).catch(function(error) {
    console.log(error);
  });
}

function getFavoriteMovies() {

  var user = firebase.auth().currentUser;
  var userUid = user.uid;

  firebase.firestore().collection('users').doc(userUid).onSnapshot(doc => {

    const data = doc.data();

    for (let i = 0; i < data.favoriteMovies.length; i++) {
      $('#favMovies').append(`<a onclick="movieSelected('` + data.favoriteMovies[i] + `')" class="btn btn-dark" href="#"><li id="favMovie` + i + `" class="list-group-item text-dark"></li></a>`);
      getMovieForFavList(data.favoriteMovies[i], i);
    }

  })
}

function addFavorite(movieId) {

  var user = firebase.auth().currentUser;

  // document.getElementById("addFav").style.display = "none";
  // document.getElementById("removeFav").style.display = "inline";



  if (user) {
    var userUid = user.uid;

    firebase.firestore().collection('users').doc(userUid).update({
        favoriteMovies: firebase.firestore.FieldValue.arrayUnion(movieId)
    });

  } else {
    window.location.href = "./login.html";
  }
}

function removeFavorite(movieId) {

  var user = firebase.auth().currentUser;

  // document.getElementById("addFav").style.display = "inline";
  // document.getElementById("removeFav").style.display = "none";

  if (user) {
    var userUid = user.uid;

    firebase.firestore().collection('users').doc(userUid).update({
        favoriteMovies: firebase.firestore.FieldValue.arrayRemove(movieId)
    });

  } else {
    window.location.href = "./login.html";
  }
}

function isAFavorite(movieId) {

  //let userUid = sessionStorage.getItem('userUid');

  firebase.firestore().collection('users').doc(userUid).get().then(function(doc) {

    const data = doc.data();

    for (let i = 0; i < data.favoriteMovies.length; i++) {
      if (movieId == data.favoriteMovies[i]) {


        break;
      } else {

      }
    }

  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

}

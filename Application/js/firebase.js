firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("userID").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "inline";
    document.getElementById("loginBtn").style.display = "none";
    if (window.location.href.indexOf("login") > -1) {
      document.getElementById("login_div").style.display = "none";
    }

    var user = firebase.auth().currentUser;

    if(user != null) {

      var username = user.email;
      username = username.split("@");
      document.getElementById("userID").innerHTML = username[0];

      if (window.location.href.indexOf("user") > -1) {
        document.getElementById("userName").innerHTML = "<strong>Username: </strong>" + username[0];
        document.getElementById("userEmail").innerHTML = "<strong>Email: </strong>" + user.email;

      }

    }

  } else {
    // No user is signed in.

    document.getElementById("userID").style.display = "none";
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("loginBtn").style.display = "inline";
    if (window.location.href.indexOf("login") > -1) {
      document.getElementById("login_div").style.display = "block";
    }
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {

    window.location.href = "./index.html";

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
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {

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
    console.log("logout success");
  }, function(error) {
    console.log(error);
  });
}

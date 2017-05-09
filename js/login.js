$(document).ready(function() {
  var dbRef = firebase.database().ref();

  const $email = $('#email');
  const $password = $('#password');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignIn = $('#btnSignIn');

  //sign up
  $btnSignUp.click(function(e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e) {
      console.log(e.message);
    });

  });
  //Listening Login user
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      location.replace('FireBaseTest.html');
    } else {
      console.log("not logged in");
    }
  });
  //SignIn
  $btnSignIn.click(function(e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    //sign up
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e) {
      console.log(e.message);
    });
  });

});

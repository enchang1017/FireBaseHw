$(document).ready(function() {

  $('#btnChatRoom').click(function() {
    location.replace('FireBaseTest.html');
  });
  var dbRef = firebase.database().ref('profile');
  var $btnChatRoom = $('#btnChatRoom');
  var $userName = $('#userName');
  var $occupation = $('#occupation');
  var $age = $('#age');
  var $file = $('#file');
  var $description = $('#description');
  var $btnSubmit = $('#btnSubmit');
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref('profile/' + user.uid).once('value').then(function(snapshot) {
        var data = snapshot.val();
        if (data == null) {
          //no user data
          firebase.database().ref('profile/' + user.uid).update({
            userName: '',
            occupation: '',
            age: '',
            description: ''
          });
        } else {
          // has user data
          console.log('has user data')
        }
      });

      firebase.database().ref('profile/' + user.uid).once('value').then(function(snapshot) {
        var data = snapshot.val();
        $userName.val(data.userName)
        $occupation.val(data.occupation)
        $age.val(data.age)
        $description.val(data.description)
      });

      $btnSubmit.click(function() {
        var userName = $userName.val();
        var occupation = $occupation.val();
        var age = $age.val();
        var description = $description.val();

        console.log(userName);
        console.log(occupation);
        console.log(age);
        console.log(description);

        firebase.database().ref('profile/' + user.uid).update({
          userName: userName,
          occupation: occupation,
          age: age,
          description: description
        });
      });

      $file.change(function(e) {
        var file = e.target.files[0];

        var metadata = {
          'contentType': file.type
        };

        //push
        var storageRef = firebase.storage().ref();
        storageRef.child('images/' + user.uid).put(file, metadata).then(function(snapshot) {
          console.log('Uploaded', snapshot.totalBytes, 'bytes.');
          console.log(snapshot.metadata);
          photoURL = snapshot.metadata.downloadURLs[0];
          console.log('File available at', photoURL);
        }).catch(function(error) {
          console.error('Upload failed', error);

        });
      });
    } else {
      // No user is signed in.
    }
  });

  //window.onload = function() {

  //}
});

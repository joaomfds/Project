function initializeParse(){
  Parse.initialize("instagram5208", "instagram5208oijopiajaoijwogeij934oin83hnvASC");
  Parse.serverURL = 'https://frozen-sierra-62859.herokuapp.com/parse/';
}

function signUp(form) {
  var username = form.username.value;
  sessionStorage.setItem('username', username);
  var password = form.password.value;
  sessionStorage.setItem('password', password);

  var user = new Parse.User();

  user.set("username", username);
  user.set("password", password);

  return user.signUp(null, {
    success: function(user) {
      form.submit();
      alert("Account Successfully Created!");
    }, error: function(user,error){
      alert("Account Not Created!");
    }
  });
}

function logIn(form) {
  var username = form.username.value;
  sessionStorage.setItem('username', username);
  var password = form.password.value;
  sessionStorage.setItem('password', password);
  return Parse.User.logIn(username, password);
}

function tryLogin(form) {
  initializeParse();

  return logIn(form).then(function(user) {
    window.location.href="activity_user_feed.html";

  }, function(user, error) {
    return signUp(form);
  });
}

function uploadImages() {
  initializeParse();
  var username = sessionStorage.getItem('username', username);
  var password = sessionStorage.getItem('password', password);

  $(function() {
    var file;

    // Set an event listener on the Choose File field.
    $('#fileselect').bind('change', function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {
      var serverUrl = 'https://frozen-sierra-62859.herokuapp.com/parse/files/' + file.name;

      $.ajax({
        type: 'POST',
        beforeSend: function(request) {
          request.setRequestHeader('X-Parse-Application-Id', 'instagram5208');
          request.setRequestHeader('X-Parse-REST-API-Key', 'instagram5208oijopiajaoijwogeij934oin83hnvASC');
          request.setRequestHeader('Content-Type', file.type);
        },
        url: serverUrl,
        data: file,
        processData: false,
        contentType: false,
        success: function(data) {
          if (window.confirm('File available at: ' + data.url)){
            window.open(data.url);
            var Image = Parse.Object.extend("Image");
            var object = new Image();

            object.set('username', username);
            object.set('url', data.url)
            object.set({image: {"name": data.name,"url": data.url,"__type": "File"}});
            object.save();
            console.log('file saved!');
            window.location.reload();
          }else{
            document.getElementById('resultURL').value = data.url;
          }
          // document.getElementById('resultURL').value = data.url;
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
          window.alert('ERROR');
        }
      });
    });
  });
}

function showImages(username){

  document.title = username;

  var Image = Parse.Object.extend("Image");
  var query = new Parse.Query(Image);
  var imageArray = Array();

  query.equalTo("username", username);
  query.descending("createdAt");

  query.find({
    success: function(results) {
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        var createdAt = (object.get("createdAt"));
        var image = object.get("image");
        var imageUrl = image.url();
        imageArray[i] = imageUrl;
      }
      text = "<p>"
      for (var i = 0; i < imageArray.length; i++) {

        text += "<img src='" + imageArray[i] +"'/>"
      }
      text += "</p>"
      document.getElementById('images').innerHTML =text;
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

function showUserList(){
  initializeParse();

  var myObjectIds = Array();
  var userArray= Array();

  // Assume Parse.Object myPost was previously created.
  var User = Parse.Object.extend("User");
  var query = new Parse.Query(User);
  query.ascending("username");
  query.find({
    success: function(results) {

      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        var object = results[i];
        userArray[i] = (object.get("username"));
        myObjectIds[i] = object.id;
      }
      text = "<div>";
      for (i = 0; i < myObjectIds.length; i++) {
        var userImage = userArray[i];
        text += "<button type=button id=clickable onclick=showImages('"+ userImage + "');   >" + userArray[i] + "</button>";
      }
      text += "</div>";
      document.getElementById("demo").innerHTML = text;
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });
}

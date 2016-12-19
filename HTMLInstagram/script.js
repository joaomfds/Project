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

  user.set("username", username);    // in my app, email==username
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

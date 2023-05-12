//on window load run submit function
window.onload = function() {
  let form = document.getElementById("form");
  form.addEventListener("submit", submit);
}
//prevent default from action and grab user information from form
function submit(event) {
  event.preventDefault();
  let usernameInput = document.getElementById("username");
  let passwordInput = document.getElementById("password");
  //make a user object
  let username = usernameInput.value;
  let password = passwordInput.value;
  let user = {
    "username": username,
    "password": password
  }
  login(user);
}
//make a post request
async function login(user) {
  let request = {
    "method": "POST",
    "headers":{
      "Content-type": "application/json"
    },
    //add user info as request body
    "body": JSON.stringify(user)
  }
  //wait for a response
  let response = await fetch("/login", request);
  //return if there is no response
  if(!response) {
    return;
  }
  //console log response status
  if(response.ok) {
    console.log("Logged in");
  } else {
    console.log("Server responded with a status " + response.status +" " + response.statusText);
  }
}
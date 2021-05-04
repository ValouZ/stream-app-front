const signUpButton = document.getElementById("app-submit");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

signUpButton.addEventListener("click", (e) => {
  e.preventDefault();
  signUp();
});

function signUp() {
  let username = usernameInput.value,
    password = passwordInput.value;

  let body = JSON.stringify({ username: username, password: password });

  let headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  let request = {
    method: "POST",
    body: body,
    headers: headers,
  };

  fetch("http://localhost:8080/users/create", request)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      // if (data.token) {
        // document.location.href="/index.html?created";
      // }
    });
}

const loginButton = document.getElementById("app-submit");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

function login() {
  let username = usernameInput.value,
    password = passwordInput.value;

  let body = JSON.stringify({ username: username, password: password });

  let headers = {
    "Content-type": "application/json; charset=UTF-8",
  };

  console.log(body);
  let request = {
    method: "POST",
    body: body,
    headers: headers,
  };

  fetch("http://localhost:8080/users/login", request)
    .then((response) => response.json())
    .then(function (data) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
        // document.location.href="http://localhost:1234/user.html";
      }
    });
}

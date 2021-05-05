const loginButton = document.getElementById("app-submit");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const userColors = ["#01FF6E", "#EFE740", "#EA4A21", "#E93D4F", "#7CEAEA"];

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

  let request = {
    method: "POST",
    body: body,
    headers: headers,
  };

  fetch("http://localhost:8080/users/login", request)
    .then((response) => response.json())
    .then(function (data) {
      if (data.token) {
        let index = getRandomInt(userColors.length);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("color", userColors[index]);
        console.log(localStorage.getItem("color"));
        document.location.href = "/channels.html";
      }
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const loginButton = document.getElementById("app-submit");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const cyan = "#01FF6E";
const redCoral = "#E93D4F";
const orange = "#EA4A21";
const yellow = "#EFE740";
const flashyGreen = "#01FF6E";
const pink = "#ff34f0";
const paleBlue = "#a4a1ff";
const palePink = "#ffa1c2";
const flashOrange = "#f08c1c";
const paleGreen = "#88f679";
const palePurple = "#d35dff";
const blue = "#00c9ff";
const purple = "#ba00ff";
const pastelGreen = "#48e391";

const userColors = [
  cyan,
  redCoral,
  orange,
  yellow,
  flashyGreen,
  pink,
  paleBlue,
  palePink,
  flashOrange,
  palePurple,
  blue,
  purple,
  pastelGreen,
];

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

  // fetch("http://localhost:8080/users/login", request)
  fetch("https://nameless-falls-18273.herokuapp.com/users/login", request)
    .then((response) => response.json())
    .then(function (data) {
      if (data.token) {
        let index = getRandomInt(userColors.length);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("color", userColors[index]);
        document.location.href = "/channels.html";
      }
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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

const colors = [
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

let streamsSection = document.querySelector("#app-streams");

displayUsers();

function displayUsers() {
  let token = localStorage.getItem("token");
  let authorization = "Bearer " + token;
  let headers = new Headers();
  headers.append("Content-type", "application/json; charset=UTF-8");
  headers.append("Authorization", authorization);
  let request = {
    method: "GET",
    headers: headers,
  };

  let api = "https://nameless-falls-18273.herokuapp.com/users";
  // let api = "http://localhost:8080/users/";

  fetch(api, request)
    .then((response) => response.json())
    .then(function (data) {
      data.forEach((data) => {
        let username = localStorage.getItem("username");
        if (data.username !== username) {
          let name = data.username;
          let stream = document.createElement("a");
          stream.classList.add("stream");
          stream.classList.add("flex");
          stream.classList.add("flex-jcc");
          stream.href = "/live.html?room=" + name;

          let index = getRandomInt(colors.length);
          stream.style.background = colors[index];
          let streamer = document.createElement("h2");
          streamer.classList.add("stream__user");
          let streamerContent = document.createTextNode(name);
          streamer.appendChild(streamerContent);
          stream.appendChild(streamer);
          streamsSection.appendChild(stream);
        }
      });
    });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

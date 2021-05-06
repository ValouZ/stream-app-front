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

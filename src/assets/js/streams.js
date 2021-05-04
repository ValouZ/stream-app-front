let streamsSection = document.querySelector("#app-streams");

displayUsers();

function displayUsers() {
  let token = localStorage.getItem("token");
  let headers = {
    "Content-type": "application/json; charset=UTF-8",
  };
  let authorization = JSON.stringify({ Authorization: "Bearer " + token });
  let request = {
    method: "GET",
    headers: headers,
    Authorization: authorization,
  };
  let api = "http://localhost:8080/users";

  fetch(api, request)
    .then((response) => response.json())
    .then(function (data) {
      data.forEach((data) => {
        if (data.username !== localStorage.getItem("username")) {
          let stream = document.createElement("a");
          stream.classList.add("stream");
          stream.classList.add("flex");
          stream.classList.add("flex-jcc");
          stream.href = "/stream.html";
          let streamer = document.createElement("h2");
          streamer.classList.add("stream__user");
          let streamerContent = document.createTextNode(data.username);
          streamer.appendChild(streamerContent);
          stream.appendChild(streamer);
          streamsSection.appendChild(stream);
        }
      });
    });
}

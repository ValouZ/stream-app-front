const qs = require("qs");
redirection();

function redirection() {
  // permet de récupérer le dernier morceau de l'url
  let lastIndexofURN = document.location.href.lastIndexOf("/");
  let slicedURN = document.location.href.slice(lastIndexofURN);
  if (
    !(
      slicedURN === "/" ||
      slicedURN === "/index.html" ||
      slicedURN === "/sign-up.html"
    )
  ) {
    // Si on n'est pas sur la page d'accueil
    if (!localStorage.getItem("token")) {
      document.location.href = "/index.html";
    }

    let dcButton = document.querySelector("#app-dc");
    dcButton.addEventListener("click", dc);

    // Si on est sur la page channels
    if (slicedURN == "/channels.html") {
      displayUserName();
    }

    let result = qs.parse(location.search, { ignoreQueryPrefix: true });
    let room = result.room;

    // Si on a un nom dans l'url
    if (room) {
      let streamerSpan = document.querySelector("#app-streamer");
      streamerSpan.textContent = room;
    }
  } else {
    // Si on est sur la page d'accueil
    if (localStorage.getItem("token")) {
      document.location.href = "/channels.html";
    }
  }
}

function dc() {
  localStorage.clear();
  document.location.href = "/index.html";
}

function displayUserName() {
  let token = localStorage.getItem("token");
  let authorization = "Bearer " + token;
  let headers = new Headers();
  headers.append("Content-type", "application/json; charset=UTF-8");
  headers.append("Authorization", authorization);
  let request = {
    method: "GET",
    headers: headers,
  };
  let idUser = localStorage.getItem("userId");
  let api = "http://localhost:8080/users/" + idUser;
  let userSpan = document.querySelector("#app-user");

  fetch(api, request)
    .then((response) => response.json())
    .then(function (data) {
      localStorage.setItem("username", data.username);
      userSpan.textContent = data.username;
    });
}

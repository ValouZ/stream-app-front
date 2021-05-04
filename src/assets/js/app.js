redirection();

function redirection() {
  // permet de récupérer le dernier morceau de l'url
  let lastIndexofURN = document.location.href.lastIndexOf("/");
  let slicedURN = document.location.href.slice(lastIndexofURN);
  console.log(slicedURN);
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

    displayUserName();
    let result = slicedURN.match(/\/live.html\?user=[a-zA-Z]+/g);
    if (result) {
      let streamerSpan = document.querySelector("#app-streamer");
      let streamerNameIndex = window.location.search.lastIndexOf("=");
      let streamerName = window.location.search.slice(streamerNameIndex + 1);
      streamerSpan.textContent = streamerName;
    }
  } else {
    // Si on est sur la page d'accueil
    if (localStorage.getItem("token")) {
      document.location.href = "/channels.html";
    }
  }
}

function dc() {
  localStorage.removeItem("token");
  document.location.href = "/index.html";
}

function displayUserName() {
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

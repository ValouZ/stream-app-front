redirection();


let dcButton = document.querySelector("#app-dc");

dcButton.addEventListener("click", dc);

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
      document.location.href = "/";
    }
  } else {
    // Si on est sur les autres pages
    if (localStorage.getItem("token")) {
      document.location.href = "/user.html";
    }
  }
}

function dc() {
  console.log(dcButton);
}

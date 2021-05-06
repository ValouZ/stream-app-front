const io = require("socket.io-client");
const qs = require("qs");

const msg = document.querySelector("#msg");
const submit = document.querySelector("#submit");
const messages = document.querySelector("#messages");
const numberOfViewers = document.querySelector("#number-viewers");

const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");
const room = qs.parse(location.search, { ignoreQueryPrefix: true }).room;

const socket = io("https://nameless-falls-18273.herokuapp.com", {
  withCredentials: true,
  "Access-Control-Allow-Credentials": true,
});

socket.emit("joinRoom", {
  id: userId,
  username: username,
  room: room,
  color: localStorage.getItem("color"),
});

// Recupérer room et users
socket.on("roomUsers", ({ room, users }) => {
  outputUsers(users);
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  socket.emit("chat message", msg.value);
  msg.value = "";
  msg.focus();
  return false;
});

socket.on("chat message", function (msgObject) {
  console.log(msgObject);
  let p = document.createElement("p");
  p.innerHTML = `<span style=color:${msgObject.color}> ${msgObject.username}</span> : ${msgObject.msg}`;
  messages.appendChild(p);

  //scroll down
  messages.scrollTop = messages.scrollHeight;
});

// Ajout nom room à la page

function outputUsers(users) {
  //   userList.innerHTML = `
  //     ${users.map((user) => `<li> ${user.username}</li>`).join('')}
  // `;
  console.log(users.length);
  numberOfViewers.textContent = users.length;
}

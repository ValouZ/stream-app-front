const io = require("socket.io-client");
const qs = require("qs");

const msg = document.querySelector("#msg");
const submit = document.querySelector("#submit");
const messages = document.querySelector("#messages");

const username = localStorage.getItem("username");
const userId = localStorage.getItem("userId");
const room = qs.parse(location.search, { ignoreQueryPrefix: true }).room;

const socket = io("http://localhost:8080", {
  withCredentials: true,
  "Access-Control-Allow-Credentials": true,
});

socket.emit("joinRoom", {
  id: userId,
  username: username,
  room: room,
});

// Recupérer room et users
socket.on("roomUsers", ({ room, users }) => {
  console.log(users);
  // ouptputRoomName(room);
  outputUsers(users);
});

submit.addEventListener("click", function (e) {
  e.preventDefault();
  socket.emit("chat message", { username: username, msg: msg.value });
  msg.value = "";
  msg.focus();
  return false;
});

socket.on("chat message", function (msgObject) {
  console.log(msgObject);
  let p = document.createElement("p");
  let msg = document.createTextNode(msgObject.username + " : " + msgObject.msg);
  p.appendChild(msg);
  messages.appendChild(p);

  //scroll down
  messages.scrollTop=messages.scrollHeight;
});

// Ajout nom room à la page

function outputUsers(users) {
  //   userList.innerHTML = `
  //     ${users.map((user) => `<li> ${user.username}</li>`).join('')}
  // `;
  console.log(users);
}

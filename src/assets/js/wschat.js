console.log("wschat");
const io = require("socket.io-client");

// console.log(localStorage.getItem("username"));

// $(function () {
//   var socket = io();

//   $("form").submit(function (e) {
//     e.preventDefault();
//     socket.emit("chat message", $("#msg").val());
//     $("#msg").val("");
//     return false;
//   });

//   socket.on("chat message", function (msg) {
//     $("#messages").append($("<p>").text(msg));
//   });
// });

function chat() {
  const socket = io("http://localhost:8080", {
    withCredentials: true,
    "Access-Control-Allow-Credentials": true,
  });
  const msg = document.querySelector("#msg");
  const submit = document.querySelector("#submit");
  const messages = document.querySelector("#messages");

  submit.addEventListener("click", function (e) {
    e.preventDefault();
    username = localStorage.getItem("username");
    socket.emit("chat message", { username: username, msg: msg.value });
    msg.value = "";
    return false;
  });

  socket.on("chat message", function (msgObject) {
    console.log(msgObject);
    let p = document.createElement("p");
    let msg = document.createTextNode(
      msgObject.username + " : " + msgObject.msg
    );
    p.appendChild(msg);
    messages.appendChild(p);
  });
}

chat();

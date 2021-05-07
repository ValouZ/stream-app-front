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
  // const socket = io("http://localhost:8080/", {
  withCredentials: true,
  "Access-Control-Allow-Credentials": true,
});

//______Pour le live

const videoGrid = document.getElementById("video-grid");
console.log(videoGrid);
const myVideo = document.createElement("video");
// const myPeer = new Peer(userId, {
//   host: "/",
//   port: "3001",
// });
// console.log(myPeer);

// myPeer.on("open", (id) => {
//   socket.emit("joinRoom", {
//     id: userId,
//     username: username,
//     room: room,
//     color: localStorage.getItem("color"),
//   });
//   console.log("creation Mypeer");
// });

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

//______Pour le live

myVideo.muted = true;
// const peers = {};

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);
    // myPeer.on("call", (call) => {
    //   console.log("call");
    //   call.answer(stream);
    //   console.log(stream);
    //   const video = document.createElement("video");
    //   call.on("stream", (userVideoStream) => {
    //     console.log("-------");
    //     console.log(call);
    //     console.log("-------");
    //     addVideoStream(video, userVideoStream);
    //   });
    // });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  })
  .catch((e) => {
    console.log("erreur: ", e);
  });

// socket.on("user-disconected", (userId) => {
//   console.log(userId);
//   if (peers[userId]) {
//     peers[userId].close();
//   }
// });

// function connectToNewUser(userId, stream) {
//   setTimeout(() => {
//   console.log("UserId : " + userId);
//   const call = myPeer.call(userId, stream);
//   console.log(call);
//   const video = document.createElement("video");
//   console.log("avant stream");
//   call.on("stream", function (userVideoStream) {
//     console.log(userVideoStream);
//     addVideoStream(video, userVideoStream);
//   });
//   console.log("entre les 2");
//   call.on("close", () => {
//     video.remove();
//   });
//   call.on("error", () => {
//     console.log("ERREUR");
//     setTimeout(() => {
//       connectToNewUser(userId, stream);
//     }, 3000);
//   });

//   console.log("peers");
//   peers[userId] = call;
//   console.log(peers);
//   console.log(peers[userId]);
//   }, 3000);

// }

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.style.borderColor = localStorage.getItem("color");
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

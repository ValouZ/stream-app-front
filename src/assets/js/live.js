// console.log("live");

// // const socket = io('/');
// const videoGrid = document.getElementById('video-grid');
// const myVideo = document.createElement('video')

// myVideo.muted = true

// navigator.mediaDevices.getUserMedia({ 
//   video: true,
//   audio: true
// }).then(stream => {
//   addVideoStream(myVideo, stream)
//   connectToNewUser(userId, stream)
// })

// // socket.on('joinRoom', userID, username, room, color);

// // socket.on('userconnected', userID =>{
// //   console.log("utilisateur connecté");
// // });

// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })
// }

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })
//   videoGrid.append(video)
// }
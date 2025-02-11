// Your PeerJS setup
const peer = new Peer();
const callBtn = document.getElementById("callBtn");
const peerIdInput = document.getElementById("peerIdInput");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const yourPeerId = document.getElementById("yourPeerId");

let localStream;
let peerConnection;

// Access the webcam and microphone
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localVideo.srcObject = stream;
    localStream = stream;
  })
  .catch((err) => {
    console.error("Failed to get media:", err);
  });

// Call button functionality
callBtn.addEventListener("click", () => {
  const peerId = peerIdInput.value;

  if (peerId) {
    const call = peer.call(peerId, localStream);
    call.on("stream", (remoteStream) => {
      remoteVideo.srcObject = remoteStream;
    });

    call.on("close", () => {
      alert("Call ended!");
    });
  } else {
    alert("Please enter a Peer ID!");
  }
});

// When someone connects to your Peer
peer.on("call", (call) => {
  alert("Incoming call!");
  call.answer(localStream); // Answer the call with your local stream
  call.on("stream", (remoteStream) => {
    remoteVideo.srcObject = remoteStream;
  });
});

// Display your own Peer ID
peer.on("open", (id) => {
  yourPeerId.textContent = `Your Peer ID: ${id}`;
});

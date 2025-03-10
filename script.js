// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

let username = localStorage.getItem("username") || "Guest";
document.getElementById("username").value = username;

function saveProfile() {
    username = document.getElementById("username").value;
    localStorage.setItem("username", username);
}

// Sending Messages
function sendMessage() {
    let message = document.getElementById("messageInput").value;
    db.collection("messages").add({
        user: username,
        text: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById("messageInput").value = "";
}

// Load Messages
db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    let chatBox = document.getElementById("messages");
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
        let msg = doc.data();
        chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.text}</p>`;
    });
});

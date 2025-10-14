import { initializeApp, database } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";

//Credenciais referentes ao Realtime Database Do Projeto.
const firebaseConfig = 
{
    apiKey: "AIzaSyAP4ZiS0AHTReVWpU-oX_eJ-60454x7zSU",
    authDomain: "projetotcc-espnow.firebaseapp.com",
    databaseURL: "https://projetotcc-espnow-default-rtdb.firebaseio.com",
    projectId: "projetotcc-espnow",
    storageBucket: "projetotcc-espnow.firebasestorage.app",
    messagingSenderId: "844655080516",
    appId: "1:844655080516:web:e718d9fc67dbb2bc8db811"
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);

//Inicialização do Realtime Database e armazenamento da referência para o serviço
const database = firebase.database();

var dadoRef = firebase.database().ref('posts/' + postId + '/starCount');
dadoRef.on('value', (snapshot) => {
    const dado = snapshot.val();
    updateStarCount(elemento, dado);
});

function atualizarDados(elemento, dado)
{


}
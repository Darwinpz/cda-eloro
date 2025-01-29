$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDm8QDwDpsYhNODQ3ngeHJ4oXHlozuZMsA",
        authDomain: "cda-eloro.firebaseapp.com",
        databaseURL: "https://cda-eloro-default-rtdb.firebaseio.com",
        projectId: "cda-eloro",
        storageBucket: "cda-eloro.appspot.com",
        messagingSenderId: "233327337988",
        appId: "1:233327337988:web:06c34b8e725c6013610b51",
        measurementId: "G-115B1JBCT9"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var id = document.getElementById("id").value;

    database.ref('users/' + id).once('value')
        .then(function (datos) {

            const data = datos.val()

            if (data) {

                document.getElementById("id").innerText = id;
                document.getElementById("ced").innerText = data.ced;
                document.getElementById("name").innerText = data.firstName;
                document.getElementById("email").innerText = data.email;
                document.getElementById("rol").innerText = data.rol;
                document.getElementById("canton").innerText = data.canton;
                document.getElementById("phone").innerText = data.phone;

                if (data.foto != null) {

                    document.getElementById("img_trabajador").src = data.foto;

                } else {
                    document.getElementById("img_trabajador").src = "/img/perfil.png";
                }

            }else{
                alert("USUARIO NO EXISTE")
                window.location.href = "/usuario"
            }

        })

});
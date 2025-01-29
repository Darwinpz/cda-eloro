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

    var coleccionUsuarios = database.ref().child("users");

    var dataSet = [];

    var table = $('#table_trabajadores').DataTable({
        lengthMenu:  [30, 35, 40, 45, 50],
        data: dataSet,
        columnDefs: [
            {
                targets: 0,
                searchable: false,
                visible: false, //ocultamos la columna de ID que es la [0]                        
            },
            {
                targets: -1,
                data: null,
                render: function (data, type, row) {
                    if (data[5] != null){
                        return "<a type='button' class='btn btn-success mb-2 btn-ver' ><i class='fas fa-eye'></i></a>";
                    }else{
                        return  "<a type='button' class='btn btn-primary mb-2 btn-ver' ><i class='fas fa-eye'></i></a>";
                    }
                }
                
            }
        ],
        pagingType: "full_numbers", //con esto salen los botones de primero anterior siguiente ultimo y los numeros de pagina
        pageLength: 30, //para que se filtren por 30
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json" //Para que salga en español
        }
    });

    coleccionUsuarios.on('child_changed', datos => {
        
        dataSet = [datos.key, datos.child("ced").val(),datos.child("lastName").val()+" "+datos.child("firstName").val(), datos.child("email").val(), datos.child("rol").val(), datos.child("photo").val()];
        table.row(filaEditada).data(dataSet).draw();

    });

    coleccionUsuarios.on("child_added", datos => {
        dataSet = [datos.key, datos.child("ced").val(), datos.child("lastName").val()+" "+datos.child("firstName").val(), datos.child("email").val(), datos.child("rol").val(), datos.child("photo").val()];
        table.rows.add([dataSet]).draw();
    });

    coleccionUsuarios.on("child_removed", datos => {
        dataSet = [datos.key, datos.child("ced").val(), datos.child("lastName").val()+" "+datos.child("firstName").val(), datos.child("email").val(), datos.child("rol").val(), datos.child("photo").val()];
        table.row(filaEditada).data(dataSet).draw();
    });


    $("#table_trabajadores").on("click", ".btn-ver", function () {
        filaEditada = table.row($(this).parents('tr'));
        let fila = $('#table_trabajadores').dataTable().fnGetData($(this).closest('tr'));
        let id = fila[0];

        database.ref('users/' + id).once('value')
            .then(function (datos) {

                const data = datos.val()

                document.getElementById("id").innerText = id;
                document.getElementById("ced").innerText = data.ced;
                document.getElementById("name").innerText = data.firstName;
                document.getElementById("email").innerText = data.email;
                document.getElementById("rol").innerText = data.rol;
                document.getElementById("canton").innerText = data.canton;
                document.getElementById("phone").innerText = data.phone;

                if(data.photo != null){

                    document.getElementById("img_trabajador").src = data.photo;

                }else{
                    document.getElementById("img_trabajador").src = "/img/perfil.png";
                }
                

                $('#modaltrabajador').modal('show');


            })

    });

})

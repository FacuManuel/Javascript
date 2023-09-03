

// Función mostrar saludo inicial.
function saludo() {
  Swal.fire({
    title: 'Nike Friends',
    text: 'Bienvenido a Tienda en Línea',
    imageUrl: './images/java.jpg',
    imageWidth: 400,
    imageHeight: 400,
    imageAlt: 'imagen nike :D',
  });
  console.log("Saludo de inicio");
}
document.addEventListener("DOMContentLoaded", function () {

  saludo();
});


// Carga el arreglo de usuarios registrados
const usuariosRegistradosJSON = localStorage.getItem('usuariosRegistrados');
if (usuariosRegistradosJSON) {
  usuariosRegistrados = JSON.parse(usuariosRegistradosJSON);
}
for (var i = 0; i < usuariosRegistrados.length; i++) {
  var usuario = usuariosRegistrados[i];
  console.log('Usuario:', usuario.username);
  console.log('Contraseña:', usuario.password);
  console.log('Dirección:', usuario.direccion);
  console.log('DNI:', usuario.dni);
  console.log('Edad:', usuario.edad);


}



//funcion para mostrar fecha y hora.
function fechaHora() {
  var fechaHoraActual = new Date();
  var nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  var diaSemana = fechaHoraActual.getDay();
  var nombreDia = nombresDias[diaSemana];
  var dia = fechaHoraActual.getDate();
  var mes = fechaHoraActual.getMonth() + 1;
  var año = fechaHoraActual.getFullYear();
  var hora = fechaHoraActual.getHours();
  var minutos = fechaHoraActual.getMinutes();
  var segundos = fechaHoraActual.getSeconds();
  var fechaHoraFormateada = `${nombreDia}, ${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;
  return fechaHoraFormateada;}
var fechaHora = fechaHora();
console.log(fechaHora);
  



 //arreglo de usuarios
var usuariosRegistrados = [{
  username: 'facundo',
  password: 'facundo',
  direccion: 'san bartolome 20',
  dni: '12345678',
  edad: 29
},
{
  username: 'a',
  password: 'a',
  direccion: 'dirección2',
  dni: '98765432',
  edad: 30
},
];




function mostrarLoginOLogoutPopup() {
  const currentUser = localStorage.getItem('currentUser');
  const perfilBtn = document.getElementById('perfilBtn');
  console.log('currentUser:', currentUser); 


  if (currentUser) { // Si hay una sesión abierta
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, Cerrar Sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Sesión cerrada ${fechaHora}`);

        Swal.fire({
          icon: 'success',
          title: 'Sesión Cerrada',
          text: 'Tu sesión ha sido cerrada correctamente.',
        });


        cerrarSesionYRecargar(); //funcion de cerrar sesion y recarga de pagina


    
      }
    });
  } else {
    Swal.fire({
      title: 'Inicio de Sesión',
      html:
        '<input id="username" class="swal2-input" placeholder="Usuario">' +
        '<input id="password" type="password" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Iniciar Sesión',
      cancelButtonText: 'Registrarse',
    }).then((result) => {
      if (result.isConfirmed) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const usuarioEncontrado = usuariosRegistrados.find(user => user.username === username);

        if (usuarioEncontrado && usuarioEncontrado.password === password) {
          localStorage.setItem('currentUser', username);
          console.log(`Sesión iniciada ${fechaHora}`);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de Sesión Exitoso',
            text: '¡Bienvenido, ' + username + '!',
          });
          perfilBtn.textContent = 'Cerrar Sesión';
          perfilBtn.removeEventListener('click', mostrarLoginPopup);
          perfilBtn.addEventListener('click', mostrarLoginOLogoutPopup);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Credenciales incorrectas. Inténtalo de nuevo o regístrate.',
          });
        }
      } else if (result.dismiss === Swal.DismissReason.close) {

      } else {
       
        Swal.fire({
          title: 'Registro',
          html:
            '<input id="newUsername" class="swal2-input" placeholder="Nuevo Usuario">' +
            '<input id="newPassword" type="password" class="swal2-input" placeholder="Nueva Contraseña">' +
            '<input id="direccion" class="swal2-input" placeholder="Dirección">' +
            '<input id="dni" class="swal2-input" placeholder="DNI">' +
            '<input id="edad" class="swal2-input" placeholder="Edad">',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Registrar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            const newUsername = document.getElementById('newUsername').value;
            const newPassword = document.getElementById('newPassword').value;
            const newDireccion = document.getElementById('direccion').value;
            const newDNI = document.getElementById('dni').value;
            const newEdad = document.getElementById('edad').value;

            usuariosRegistrados.push({
              username: newUsername,
              password: newPassword,
              direccion: newDireccion,
              dni: newDNI,
              edad: newEdad,
            });

            //nuevo usuario en Local Storage
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));
            //localStorage.setItem(newUsername, JSON.stringify({ password: newPassword }));

            Swal.fire({
              icon: 'success',
              title: 'Registro Exitoso',
              text: 'Usuario registrado con éxito. Ahora puedes iniciar sesión.',
            });
          }
        });
      }
    });
  }
}



// Evento emergente de inicio de sesión, registro o cierre de sesión
document.getElementById('perfilBtn').addEventListener('click', mostrarLoginOLogoutPopup);



// Función para cerrar sesión al cargar la página
function cerrarSesionAlCargar() {
  const currentUser = localStorage.getItem('currentUser');
  const perfilBtn = document.getElementById('perfilBtn');

  if (currentUser) {
    localStorage.removeItem('currentUser');
    perfilBtn.textContent = 'Iniciar Sesión';
    perfilBtn.removeEventListener('click', mostrarLoginOLogoutPopup);
    perfilBtn.addEventListener('click', mostrarLoginPopup);
  }
}
function cerrarSesionYRecargar() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    localStorage.removeItem('currentUser');
    location.reload();}}
document.addEventListener("DOMContentLoaded", function () {
  cerrarSesionAlCargar(); 
  saludo();
  document.getElementById('perfilBtn').addEventListener('click', mostrarLoginOLogoutPopup);
});
 


//boton info 
document.getElementById('infoBtn').addEventListener('click', function () {

  Swal.fire({
    title: '3ra Pre Entrega del proyecto para CoderHouse',
    text: '- Optimizacion del Proyecto- Codificacion de Funciones; Ampliar y refinar flujo de trabajo; Modificacion del Dom; salida de resultdos por html;definir eventos; almacenamiento de datos y recuperacion. ',
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });
});



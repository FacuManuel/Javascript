// Función para cargar los usuarios registrados desde localStorage usando Promesas
function cargarUsuariosRegistrados() {
  return new Promise((resolve, reject) => {
    const usuariosRegistradosJSON = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosJSON) {
      resolve(JSON.parse(usuariosRegistradosJSON));
    } else {
      reject(new Error('No se encontraron usuarios registrados en localStorage.'));
    }
  });
}

// Función para mostrar un saludo inicial.
function mostrarSaludo() {
  Swal.fire({
    title: 'Nike Friends',
    text: '¡Bienvenido a Tienda en Línea!',
    imageUrl: './images/java.jpg',
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: 'Imagen de Nike',
    customClass: {

      popup: 'custom-swal-popup', 
    },
    background: ` url('images/blanco.png')`, 
    backdrop: `
      rgba(0,0,0)
      url('images/warning.jpg')
      top
      no-repeat
    `,
  });
}

// Función para obtener la fecha y hora actual formateada.
function obtenerFechaHoraActual() {
  const fechaHoraActual = new Date();
  const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const diaSemana = fechaHoraActual.getDay();
  const nombreDia = nombresDias[diaSemana];
  const dia = fechaHoraActual.getDate();
  const mes = fechaHoraActual.getMonth() + 1;
  const año = fechaHoraActual.getFullYear();
  const hora = fechaHoraActual.getHours();
  const minutos = fechaHoraActual.getMinutes();
  const segundos = fechaHoraActual.getSeconds();
  const fechaHoraFormateada = `${nombreDia}, ${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;
  return fechaHoraFormateada;
}

//arreglo de usuarios registrados
let usuariosRegistrados = [
  {
    usuario: 'facundo',
    contraseña: 'facundo',
    direccion: 'san bartolomé 20',
    dni: '12345678',
    edad: 29
  },
  {
    usuario: 'a',
    contraseña: 'a',
    direccion: 'dirección2',
    dni: '98765432',
    edad: 30
  }
];

function cargarUsuariosRegistrados() {
  return new Promise((resolve, reject) => {
    const usuariosRegistradosJSON = localStorage.getItem('usuariosRegistrados');
    if (usuariosRegistradosJSON) {
      resolve(JSON.parse(usuariosRegistradosJSON));
    } else {
      reject(new Error('No se encontraron usuarios registrados en localStorage.'));
    }
  });
}


// Función para iniciar sesión
function iniciarSesion(username, contraseña) {
  const usuarioEncontrado = usuariosRegistrados.find(user => user.usuario === username);

  if (usuarioEncontrado && usuarioEncontrado.contraseña === contraseña) {
    localStorage.setItem('usuarioActual', username);
    Swal.fire({
      icon: 'success',
      title: 'Inicio de Sesión Exitoso',
      text: '¡Bienvenido, ' + username + '!',
      customClass: {
        popup: 'custom-swal-popup',
      },
      background: ` url('images/negro.jpg')`,
      backdrop: `
        rgba(0,0,0)
        url('images/warning.jpg')
        bottom
        no-repeat`,
    });
    const perfilBtn = document.getElementById('perfilBtn');
    perfilBtn.textContent = 'Cerrar Sesión';
    perfilBtn.removeEventListener('click', mostrarLoginOLogoutPopup);
    perfilBtn.addEventListener('click', mostrarLoginOLogoutPopup);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error de inicio de sesión',
      text: 'Credenciales incorrectas. Inténtalo de nuevo o regístrate.',
    });
  }
}

// Evento emergente de inicio de sesión, registro o cierre de sesión
document.getElementById('perfilBtn').addEventListener('click', mostrarLoginOLogoutPopup);

// Función para abrir el perfil o cerrar sesión
function mostrarLoginOLogoutPopup() {
  const usuarioActual = localStorage.getItem('usuarioActual');
  const perfilBtn = document.getElementById('perfilBtn');

  if (usuarioActual) { // Si hay una sesión abierta
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, Cerrar Sesión',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'custom-swal-popup',
      },
      background: ` url('images/negro.jpg')`,
      backdrop: `
        rgba(0,0,0)
        url('images/warning.jpg')
        bottom
        no-repeat
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('usuarioActual');
        Swal.fire({
          icon: 'success',
          title: 'Sesión Cerrada',
          text: 'Tu sesión ha sido cerrada correctamente.',
          customClass: {
            popup: 'custom-swal-popup',
          },
          background: ` url('images/negro.jpg')`,
          backdrop: `
            rgba(0,0,0)
            url('images/warning.jpg')
            bottom
            no-repeat`,
        });
        cerrarSesionYRecargar(); // Función para cerrar sesión y recargar la página
      }
    });
  } else {
    Swal.fire({
      title: 'Inicio de Sesión',
      html:
        '<input id="usuario" class="swal2-input" placeholder="Usuario">' +
        '<input id="contraseña" type="password" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: 'Iniciar Sesión',
      cancelButtonText: 'Registrarse',
      customClass: {
        popup: 'custom-swal-popup',
      },
      background: ` url('images/negro.jpg')`,
      backdrop: `
        rgba(0,0,0)
        url('images/warning.jpg')
        bottom
        no-repeat`,
    }).then((result) => {
      if (result.isConfirmed) {
        const username = document.getElementById('usuario').value;
        const contraseña = document.getElementById('contraseña').value;
        iniciarSesion(username, contraseña);
      } else if (result.dismiss === Swal.DismissReason.close) {
        // El usuario cerró el diálogo
      } else {
        Swal.fire({
          title: 'Registro',
          html:
            '<input id="nuevoUsuario" class="swal2-input" placeholder="Nuevo Usuario">' +
            '<input id="nuevaContraseña" type="password" class="swal2-input" placeholder="Nueva Contraseña">' +
            '<input id="direccion" class="swal2-input" placeholder="Dirección">' +
            '<input id="dni" class="swal2-input" placeholder="DNI">' +
            '<input id="edad" class="swal2-input" placeholder="Edad">',
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: 'Registrar',
          cancelButtonText: 'Cancelar',
          customClass: {
            popup: 'custom-swal-popup',
          },
          background: ` url('images/negro.jpg')`,
          backdrop: `
            rgba(0,0,0)
            url('images/warning.jpg')
            bottom
            no-repeat`,
        }).then((result) => {
          if (result.isConfirmed) {
            const nuevoUsuario = document.getElementById('nuevoUsuario').value;
            const nuevaContraseña = document.getElementById('nuevaContraseña').value;
            const direccion = document.getElementById('direccion').value;
            const dni = document.getElementById('dni').value;
            const edad = document.getElementById('edad').value;

            usuariosRegistrados.push({
              usuario: nuevoUsuario,
              contraseña: nuevaContraseña,
              direccion: direccion,
              dni: dni,
              edad: edad,
            });

            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados));

            Swal.fire({
              icon: 'success',
              title: 'Registro Exitoso',
              text: 'Usuario registrado con éxito. Ahora puedes iniciar sesión.',
              customClass: {
                popup: 'custom-swal-popup',
              },
              background: ` url('images/negro.jpg')`,
              backdrop: `
                rgba(0,0,0)
                url('images/warning.jpg')
                bottom
                no-repeat`,
            });
          }
        });
      }
    });
  }
}

// Función para cerrar sesión al cargar la página
function cerrarSesionAlCargar() {
  const usuarioActual = localStorage.getItem('usuarioActual');
  const perfilBtn = document.getElementById('perfilBtn');

  if (usuarioActual) {
    perfilBtn.textContent = 'Cerrar Sesión';
    perfilBtn.removeEventListener('click', mostrarLoginOLogoutPopup);
  } else {
    perfilBtn.textContent = 'Iniciar Sesión';
    perfilBtn.removeEventListener('click', mostrarLoginOLogoutPopup);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  cerrarSesionAlCargar();
  mostrarSaludo();
  document.getElementById('perfilBtn').addEventListener('click', mostrarLoginOLogoutPopup);
});

// Función para cerrar sesión y recargar la página
function cerrarSesionYRecargar() {
  localStorage.removeItem('usuarioActual');
  location.reload();
}

// Botón de información
document.getElementById('infoBtn').addEventListener('click', function () {
  Swal.fire({
    title: 'Entrega del proyecto final para CoderHouse',
    text: '- Optimización del Proyecto- Codificación de Funciones; Modificación del DOM; salida de resultados por HTML; definir eventos; almacenamiento de datos y recuperación, librerias, promises, asincronia, arrays, objetos,itineraores, fetch ',
    icon: 'success',
    confirmButtonText: 'Cerrar',
    customClass: {
      popup: 'custom-swal-popup',
    },
    background: ` url('images/negro.jpg')`,
    backdrop: `
      rgba(0,0,0)
      url('images/warning.jpg')
      bottom
      no-repeat
    `,
  });
});
// Arreglo de productos
const productos = [
  {
    nombre: "AR Black",
    descripcion: "zapatillas nike ar negras, estilo llama, encantadoras, compralas ya",
    precio: 10.99,
    imagen: "./images/1.jpg"
  },
  {
    nombre: "OrStreet",
    descripcion: "nikes estilo callejero color naranja, grafitti, estilo único",
    precio: 17.99,
    imagen: "./images/2.jpg"
  },
  {
    nombre: "Nike Prime",
    descripcion: "nike edición 2023, blancas negras y símbolo llamativo, ¿qué esperas?",
    precio: 15.00,
    imagen: "./images/3.jpg"
  },
  {
    nombre: "AllBlack",
    descripcion: "zapatillas nike completamente dark, detalles en naranja",
    precio: 10.00,
    imagen: "./images/4.jpg"
  },
  {
    nombre: "nikeOG",
    descripcion: "zapatillas nike og, edición limitada, lengua alta",
    precio: 12.99,
    imagen: "./images/5.jpg"
  },
  {
    nombre: "AirClassics",
    descripcion: "Zapatillas nike air clasic, las de siempre",
    precio: 11.99,
    imagen: "./images/6.jpg"
  },
  {
    nombre: "AR Black",
    descripcion: "zapatillas nike ar negras, estilo llama, encantadoras, compralas ya",
    precio: 12.50,
    imagen: "./images/1.jpg"
  },
  {
    nombre: "OrStreet",
    descripcion: "nikes estilo callejero color naranja, grafitti, estilo único",
    precio: 15.99,
    imagen: "./images/3.jpg"
  }
];

// Carrito de compras
const carrito = [];

document.addEventListener('DOMContentLoaded', function () {
  // Buscar productos en el navbar
  function buscarProductos() {
    const términoDeBúsqueda = document.getElementById('search-input').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => {
      const nombreDelProducto = producto.nombre.toLowerCase();
      return nombreDelProducto.includes(términoDeBúsqueda);
    });

    const contenedorResultadosDeBúsqueda = document.createElement('div');
    if (productosFiltrados.length > 0) {
      productosFiltrados.forEach(producto => {
        const tarjetaDelProducto = document.createElement('div');
        tarjetaDelProducto.classList.add('product-card');

        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;

        const nombreProducto = document.createElement('h3');
        nombreProducto.textContent = producto.nombre;

        const descripcionProducto = document.createElement('p');
        descripcionProducto.textContent = producto.descripcion;

        const precioProducto = document.createElement('p');
        precioProducto.textContent = 'Precio: $' + producto.precio.toFixed(2);

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.classList.add('miBoton');
        botonAgregar.addEventListener('click', () => agregarAlCarrito(producto));

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar del carrito';
        botonEliminar.classList.add('eliminar-producto');
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(producto));

        tarjetaDelProducto.appendChild(imagenProducto);
        tarjetaDelProducto.appendChild(nombreProducto);
        tarjetaDelProducto.appendChild(descripcionProducto);
        tarjetaDelProducto.appendChild(precioProducto);
        tarjetaDelProducto.appendChild(botonAgregar);
        tarjetaDelProducto.appendChild(botonEliminar);

        contenedorResultadosDeBúsqueda.appendChild(tarjetaDelProducto);
      });
    } else {
      contenedorResultadosDeBúsqueda.textContent = 'No se encontraron productos.';
    }

    Swal.fire({
      title: 'Resultados de Búsqueda',
      html: contenedorResultadosDeBúsqueda.innerHTML,
      icon: 'success',
      confirmButtonText: 'Cerrar'
    });
  }

  // Agregar evento al botón "Search"
  const searchButton = document.querySelector('.btn.btn-success');
  searchButton.addEventListener('click', buscarProductos);
});

// Botón carrito navbar
const carritoBtn = document.getElementById('carritoBtn');
carritoBtn.addEventListener('click', () => mostrarCarrito());

// Función para mostrar el contenido del carrito en una ventana emergente
function mostrarCarrito() {
  if (carrito.length === 0) {
    Swal.fire({
      title: 'Carrito de Compras',
      text: 'El carrito está vacío.',
      icon: 'info',
      confirmButtonText: 'Cerrar'

    });
    return;
  }

  // Crea el contenido HTML para mostrar los productos en el carrito
  const contenidoCarrito = document.createElement('div');
  carrito.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.innerHTML = `
      <h4>${producto.nombre}</h4>
      <p>Descripción: ${producto.descripcion}</p>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
    `;
    contenidoCarrito.appendChild(productoDiv);
  });

  // Calcula el total del carrito
  const totalCarrito = carrito.reduce((total, producto) => total + producto.precio, 0).toFixed(2);


  function vaciarCarrito() {
    carrito.length = 0; // Esto vacía el arreglo carrito
   
  }
  // Muestra la ventana emergente con el contenido del carrito
  Swal.fire({
    title: 'Carrito de Compras',
    html: contenidoCarrito.innerHTML + `<p>Total: $${totalCarrito}</p>`,
    icon: 'success',
    confirmButtonText: 'Cerrar',
    denyButtonText: 'pagar',
    showDenyButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
    } else if (result.isDenied) {
      Swal.fire('Gracias por tu compra', '', 'success'), vaciarCarrito();
    }
  })
}

////////////////////////////////////////////// correccion de errores sabado 9, 9 ,2023 /////////////////////////////////////



// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  // Agrega el producto al arreglo del carrito
  carrito.push(producto);
  // Actualiza la vista del carrito
  mostrarCarrito();
  //console.log(`producto añadido`);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(producto) {
  // Encuentra el índice del producto en el carrito
  const index = carrito.findIndex(item => item.nombre === producto.nombre);
  // Si el producto se encuentra en el carrito, elimínalo
  if (index !== -1) {
    carrito.splice(index, 1);
  }
   Swal.fire({
    title: 'Producto Eliminado',
    text: `El producto "${producto.nombre}" se ha eliminado del carrito.`,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  });
  //console.log(`producto eliminado`);
}
  
// Lista de tarjetas de productos
const tarjetasProductos = document.querySelectorAll('.product-card');

tarjetasProductos.forEach(tarjeta => {
  const botonAgregar = tarjeta.querySelector('.miBoton');
  const botonEliminar = tarjeta.querySelector('.eliminar-producto');

  // Agregar evento al botón "Agregar al carrito"
  botonAgregar.addEventListener('click', function () {
    const nombreProducto = tarjeta.querySelector('h3').textContent;
    const descripcionProducto = tarjeta.querySelector('p').textContent;
    const precioProducto = parseFloat(tarjeta.querySelector('.precio').textContent.replace('Precio: $', ''));

    // Crear un objeto producto con la información
    const producto = {
      nombre: nombreProducto,
      descripcion: descripcionProducto,
      precio: precioProducto
    };

    // Llamar a la función para agregar al carrito
    agregarAlCarrito(producto);
    //console.log(`producto añadido`);
  });

  // Agregar evento al botón "Eliminar del carrito"
  botonEliminar.addEventListener('click', function () {
    // Obtener información del producto desde la tarjeta actual
    const nombreProducto = tarjeta.querySelector('h3').textContent;

    // Crear un objeto producto con el nombre
    const producto = {
      nombre: nombreProducto
    };

    // Llamar a la función para eliminar del carrito
    eliminarDelCarrito(producto);
  });
});

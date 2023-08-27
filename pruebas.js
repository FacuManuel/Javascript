


<header>
        <div>
            <h1>Tienda en línea</h1>
        </div>

        
            <div class="carrito-content">
                <h2>Carrito de Compras</h2>
                <ul id="lista-productos"></ul>
                <button class="carrito-button">Carrito (0)</button>
                <button class="eliminar-carrito">Vaciar Carrito</button>
                <button class="finalizar-compra">Finalizar Compra</button>
                <span class="total-carrito">Total: $0.00</span>
            </div>
        

    
    </header>




<a class="nav-link" href="#" onclick="mostrarCarrito()">Carrito de Compras</a>

<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="search-input">
<button class="btn btn-success" type="button" onclick="buscarProductos()">Search</button>




// Función mostrar saludo inicial.
function saludo() {

  Swal.fire({
    title: 'Nike Friends',
    text: 'Bienvenido a Tienda en Linea',
    imageUrl: `https://th.bing.com/th/id/OIP.QDRpUOZsEaFX7qbcbdZgTgHaHa?pid=ImgDet&rs=1`,
    imageWidth: 400,
    imageHeight: 400,
    imageAlt: 'imagen nike :D',
  })

  console.log("Saludo de inicio");
}
saludo();
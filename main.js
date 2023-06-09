const productos = [
    {
        id: "zapatilla01",
        titulo: "Adidas 1",
        imagen: "./img/zapatilla01.jpg",
        precio: 25000,
    },

    {
        id: "zapatilla02",
        titulo: "Adidas 2",
        imagen: "./img/zapatilla02.jpg",
        precio: 65000,
    },

    {
        id: "zapatilla03",
        titulo: "Adidas 3",
        imagen: "./img/zapatilla03.jpg",
        precio: 35000,
    },

    {
        id: "zapatilla04",
        titulo: "Nike 1",
        imagen: "./img/zapatilla04.jpg",
        precio: 55000,
    },

    {
        id: "zapatilla05",
        titulo: "Nike 2",
        imagen: "./img/zapatilla05.jpg",
        precio: 21000,
    },

    {
        id: "zapatilla06",
        titulo: "Puma 1",
        imagen: "./img/zapatilla06.jpg",
        precio: 45000,
    },
]

const contenedorProductos = document.querySelector("#contenedorProductos");
const contenedorCarrito = document.querySelector("#contenedorCarrito");

let productosCarrito = [];

function cargaProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
      <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
      <div class="descripcionProducto">
          <h3 class="nombreProducto">${producto.titulo}</h3>
          <p class="precioProducto">${producto.precio}</p>
          <button id="${producto.id}" class="productoAgregar">agregar</button>
      </div>
    `;

        const botonAgregar = div.querySelector('.productoAgregar');
        botonAgregar.addEventListener('click', agregarAcarrito);

        contenedorProductos.append(div);
    });
}

function agregarAcarrito(e) {
    const id = e.currentTarget.id;
    const productoExistente = productosCarrito.find(item => item.producto.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        const productoAgregado = {
            producto: productos.find(producto => producto.id === id),
            cantidad: 1
        };
        productosCarrito.push(productoAgregado);
    }

    cantCarrito();
    guardarCarritoLocalStorage();
}

const cantCarrito = () => {
    const contadorCarrito = document.querySelector("#contadorCarrito");
    let totalProductos = 0;

    productosCarrito.forEach(item => {
        totalProductos += item.cantidad;
    });

    contadorCarrito.textContent = totalProductos;
};

function buscarProductos() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const resultados = productos.filter(producto => producto.titulo.toLowerCase().includes(searchTerm));
    mostrarResultados(resultados);
}

function mostrarResultados(resultados) {
    contenedorProductos.innerHTML = "";

    resultados.forEach(producto => {
        const div = document.createElement("div");
        div.innerHTML = `
    <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
    <div class="descripcionProducto">
      <h3 class="nombreProducto">${producto.titulo}</h3>
      <p class="precioProducto">${producto.precio}</p>
      <button id="${producto.id}" class="productoAgregar">agregar</button>
    </div>
  `;

        const botonAgregar = div.querySelector('.productoAgregar');
        botonAgregar.addEventListener('click', agregarAcarrito);

        contenedorProductos.append(div);
    });
}

function cargarCarritoDesdeLocalStorage() {
    const carritoStorage = localStorage.getItem("productosCarrito");
    if (carritoStorage) {
        productosCarrito = JSON.parse(carritoStorage);
        cantCarrito();
    }
}

function guardarCarritoLocalStorage() {
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
}

cargarCarritoDesdeLocalStorage();
cargaProductos();
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", buscarProductos);

let proximosArt = document.getElementById("contenedorProximamente");

const traerDatos = async () => {
    try {
        const response = await fetch("./data.json");
        const data = await response.json();

        data.forEach((producto) => {
            const div = document.createElement("div");
            div.innerHTML = `
      <img class="productoImagen" src="${producto.imagen}" alt="${producto.nombre}">
      <div class="descripcionProducto">
          <h3 class="nombreProducto">${producto.nombre}</h3>
          <p class="precioProducto">${producto.precio}</p>
      </div>
    `;

            proximosArt.append(div);
        });
    } catch (error) {
        console.log(error);
    }
};

traerDatos();


Swal.fire(
    'Bienvenido Proyecto Final!',
    'Click para continar',
    'success'
)

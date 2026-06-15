const API_URL = "https://inventario-backend-n9vp.onrender.com/productos";

async function obtenerProductos() {

    try {

        const res = await fetch(API_URL);

        const datos = await res.json();

        const tabla = document.getElementById("tabla");

        tabla.innerHTML = "";

        datos.forEach(prod => {

            tabla.innerHTML += `
            <tr>

                <td>${prod.nombre}</td>

                <td>$${prod.precio}</td>

                <td>${prod.existencia}</td>

                <td>

                    <button
                        class="btn-editar"
                        onclick="editarProducto('${prod._id}')">
                        Editar
                    </button>

                    <button
                        class="btn-eliminar"
                        onclick="eliminarProducto('${prod._id}')">
                        Eliminar
                    </button>

                </td>

            </tr>
            `;
        });

    } catch (error) {

        console.error(error);

    }
}

document.getElementById("formProducto")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nuevoProducto = {

        nombre: document.getElementById("nombre").value,

        precio: Number(
            document.getElementById("precio").value
        ),

        existencia: Number(
            document.getElementById("existencia").value
        )

    };

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(nuevoProducto)

    });

    document.getElementById("formProducto").reset();

    obtenerProductos();

});

async function eliminarProducto(id){

    const confirmar = confirm(
        "¿Eliminar producto?"
    );

    if(!confirmar) return;

    await fetch(`${API_URL}/${id}`,{
        method:"DELETE"
    });

    obtenerProductos();
}

async function editarProducto(id){

    const nombre = prompt("Nombre:");

    const precio = prompt("Precio:");

    const existencia = prompt("Existencia:");

    if(!nombre) return;

    await fetch(`${API_URL}/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            nombre,

            precio:Number(precio),

            existencia:Number(existencia)

        })

    });

    obtenerProductos();
}

obtenerProductos();
const API_URL = "https://inventario-backend-n9vp.onrender.com/productos";

// GET - OBTENER PRODUCTOS
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
                    <td>${prod.precio}</td>
                    <td>${prod.existencia}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// POST - ENVIAR PRODUCTO
document.getElementById("formProducto").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevoProducto = {
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        existencia: Number(document.getElementById("existencia").value)
    };

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (res.ok) {
            alert("Producto guardado correctamente");
            document.getElementById("formProducto").reset();
            obtenerProductos();
        }

    } catch (error) {
        console.error("Error al enviar producto:", error);
    }
});

// CARGAR AL INICIO
obtenerProductos();                                                                                                             
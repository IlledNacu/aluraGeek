const url = "http://localhost:3000/products";
const formulario = document.querySelector("[data-formulario]");

async function listaImagenes() {
    try {
        let fetchImagen = await fetch(url);
        let datosImagenes = await fetchImagen.json();

        const card = document.querySelector("[data-ul]");
        datosImagenes.forEach(elemento => {
            const contenido = `<li class="card">
            <img class="card__image" src="${elemento.imagen}" alt="imagen">
            <div class="card-container--info">
                <h3 class="card__title">${elemento.nombre}</h3>
                <div class="card-container--value">
                    <p>$ ${elemento.precio}</p>
                    <a href="" class="boton-borrar" data-id="${elemento.id}"><img src="./images/trash3-fill.svg"></a>
                </div>
            </div>
        </li>`;
            card.innerHTML = card.innerHTML + contenido;
        });

        document.querySelectorAll('.boton-borrar').forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.currentTarget.getAttribute('data-id');
                eliminarProducto(id);
            });
        });
    }catch (error) {
        console.log(error);
    }
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        // Eliminar del DOM
        const card = document.querySelector(`li[data-id="${id}"]`);
        card.parentNode.removeChild(card);
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
}

async function enviarVideo(nombre, precio, imagen){
    const conexion = await fetch(url, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            nombre:nombre,
            precio:precio,
            imagen:imagen
        })
    });
    const conexionConvertida = conexion.json();

    //Control de errores
    if(!conexion.ok){
        throw new Error("Ha ocurrido un error al enviar el producto");
    }

    return conexionConvertida
}


async function crearVideo(evento) {
    evento.preventDefault();//previene que se ejecute la acción por defecto del submit

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    //Realización con control de errores
    try {
        await enviarVideo(nombre, precio, imagen);
    }catch(e){
        alert(e);
    }
}

formulario.addEventListener("submit", evento => crearVideo(evento));

listaImagenes();
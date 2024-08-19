function cargarPagina() {
    console.log('Entró a la función');
    let principal = document.querySelector('#contenido');
    fetch('./sitio/inicio.html')
        .then(respuesta => respuesta.text())
        .then(datos => principal.innerHTML = datos)
        .catch(principal.innerHTML = '404 - Algo salió mal');
    console.log('Fin de la función');
}

window.addEventListener('DOMContentLoaded', evento => cargarPagina());

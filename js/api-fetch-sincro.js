function cargarDatos(url) {
    let dinamico = document.querySelector('#dinamico');
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let lista = document.createElement('ul');
            
            datos.forEach(d => {
                let item = document.createElement('li');
                let texto = `
                    <hr><br>
                    ID: ${d.id} -
                    Name: ${d.name} -
                    Username: ${d.username} -
                    Email: ${d.email}<br>
                    Address: ${d.address.street}, ${d.address.suite}, ${d.address.city}, ${d.address.zipcode}<br>
                    Geo: Lat ${d.address.geo.lat}, Lng ${d.address.geo.lng}<br>
                    Phone: ${d.phone} - 
                    Website: ${d.website}<br>
                    Company: ${d.company.name} - ${d.company.catchPhrase} - ${d.company.bs}<br>
                    &#160<br>
                `;
                item.innerHTML = texto;
                lista.appendChild(item);
            });
            
            dinamico.innerHTML = ''; // Clear any existing content
            dinamico.appendChild(lista);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            dinamico.innerHTML = 'Error loading data';
        });
}

async function cargarPagina(pagina, datosDinamicos) {
    console.log('Entró a la función');
    let principal = document.querySelector('#contenido');
    let datos = await fetch(pagina)
        .then(respuesta => respuesta.text())
        .catch('404 - Algo salió mal');
    principal.innerHTML = datos;
    if (datosDinamicos) {
        cargarDatos(datosDinamicos);
    }
    console.log('Fin de la función');
}

export { cargarPagina };
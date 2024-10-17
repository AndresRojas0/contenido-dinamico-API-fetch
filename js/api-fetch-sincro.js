function cargarDatos(url) {
    let dinamico = document.querySelector('#dinamico');
    
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            cardContainer.style.display = 'flex';
            cardContainer.style.flexWrap = 'wrap';
            cardContainer.style.justifyContent = 'space-around';
            
            datos.forEach(d => {
                let card = document.createElement('div');
                card.className = 'user-card';
                card.style.width = '300px';
                card.style.margin = '10px';
                card.style.padding = '15px';
                card.style.border = '1px solid #ddd';
                card.style.borderRadius = '8px';
                card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

                card.innerHTML = `
                    <h2 style="color: #333; margin-bottom: 10px;">${d.name}</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><th style="text-align: left; padding: 5px; border-bottom: 1px solid #ddd;">Username</th><td style="padding: 5px; border-bottom: 1px solid #ddd;">${d.username}</td></tr>
                        <tr><th style="text-align: left; padding: 5px; border-bottom: 1px solid #ddd;">Email</th><td style="padding: 5px; border-bottom: 1px solid #ddd;">${d.email}</td></tr>
                        <tr><th style="text-align: left; padding: 5px; border-bottom: 1px solid #ddd;">Phone</th><td style="padding: 5px; border-bottom: 1px solid #ddd;">${d.phone}</td></tr>
                        <tr><th style="text-align: left; padding: 5px; border-bottom: 1px solid #ddd;">Website</th><td style="padding: 5px; border-bottom: 1px solid #ddd;">${d.website}</td></tr>
                        <tr><th style="text-align: left; padding: 5px; border-bottom: 1px solid #ddd;">Company</th><td style="padding: 5px; border-bottom: 1px solid #ddd;">${d.company.name}</td></tr>
                        <tr><th style="text-align: left; padding: 5px; border-bottom: 1px solid #ddd;">Address</th><td style="padding: 5px; border-bottom: 1px solid #ddd;">${d.address.street}, ${d.address.suite}, ${d.address.city}, ${d.address.zipcode}</td></tr>
                    </table>
                `;
                
                cardContainer.appendChild(card);
            });
            
            dinamico.innerHTML = '';
            dinamico.appendChild(cardContainer);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            dinamico.innerHTML = 'Error loading data';
        });
}

async function cargarPagina(pagina, datosDinamicos){
    console.log('Entró a la función');
    let principal = document.querySelector('#contenido');
    try {
        let datos = await fetch(pagina);
        let contenido = await datos.text();
        principal.innerHTML = contenido;
        
        if (datosDinamicos) {
            cargarDatos(datosDinamicos);
        }
    } catch (error) {
        console.error('Error:', error);
        principal.innerHTML = "404 - Algo salió mal!";
    }
    console.log('Fin de la función');
}

export { cargarPagina };
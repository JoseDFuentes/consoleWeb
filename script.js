
document.addEventListener('DOMContentLoaded', init);
const container = document.querySelector('.container');

async function init() {

     await genButtons();

}



async function genButtons() {

    const contacts = await obtenerDatosDB('./data1.json');

    const contact = obtenerParametro('contacto');

    contacts.filter(f => f.Contacto == contact).forEach(element => {



        const telefonos = element.Telefonos.split('|');

        telefonos.forEach(tel => {

            const btncnt = document.createElement('div');
            btncnt.classList.add("container-link");

            const btn = document.createElement('a');

            btn.textContent = `Enviar a ${element.Alias} Telefono: ${tel}`;
            const link = sendMessage(element.Codigo, tel.replace(/\s+/g, ''), element.Personas);
            btn.href = link;
            btn.target = "_blank";

            btncnt.appendChild(btn);

            container.appendChild(btncnt);


        })


        
    });



}


function sendMessage(codigo, telefono, personas) {

    const enlace = `https://www.flexico.me/invitaboda/index.html?gscd=${codigo}`;
    const mensaje = personas > 1 ? `¡Nos casamos y los invitamos a nuestra boda!` : `¡Nos casamos y te invitamos a nuestra boda!`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceCodificado = encodeURIComponent(enlace);
    return `https://wa.me/${telefono}?text=${mensajeCodificado}%0A%0A${enlaceCodificado}`;
}


async function obtenerDatosDB(filename) {


    const ret = await fetch (filename)
        .then((response)=> {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo");
            }

            const data = response.json();
            return data;
        }).then ( data => {
            return data;
        }).catch((error)=> { console.log(error)});

   return ret;

}

function obtenerParametro(nombreParametro) {
    var url = window.location.href;
    var index = url.indexOf('?');

    if (index !== -1) {
        var parametrosString = url.substring(index + 1);
        var parametrosArray = parametrosString.split('&');

        for (var i = 0; i < parametrosArray.length; i++) {
            var parametro = parametrosArray[i].split('=');
            var nombre = parametro[0];
            var valor = parametro[1];

            if (nombre === nombreParametro) {
                return valor;
            }
        }
    }
    return null;
}
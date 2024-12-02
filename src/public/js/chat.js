const socket = io()

const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');
let user

Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Ingrese usuario para continuar",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then( resultado => {
    user = resultado.value
    console.log(user)
})

chatBox.addEventListener('change', (e) => {
    if(chatBox.value.trim().length > 0){
        socket.emit('mensaje',{ usuario:user, mensaje: chatBox.value, hora: new Date()})
        chatBox.value = ""
    }
})

socket.on('respuesta', info => {
    messageLogs.innerHTML = ""
    info.forEach(msj => {
        messageLogs.innerHTML += `<p>${msj.hora}hs.   Usuario ${msj.usuario} dice: ${msj.mensaje}</p>`
    });
})
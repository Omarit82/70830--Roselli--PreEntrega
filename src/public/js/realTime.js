const socket = io()

const btnErase  = document.querySelectorAll('.btnErase');
const contenedor = document.getElementById('contenedor');

btnErase.forEach(button => {
    button.addEventListener('click',(e)=>{
        const idButton = e.target.getAttribute('data-id')
        socket.emit('eraseProduct',{id:idButton});
    })
});

const form = document.getElementById('add');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const info = new FormData(form);
    const envio ={};
    info.forEach((value, key) =>{ 
        if(key === "stock" || key == "price"){
            envio[key] = parseFloat(value);
        }else {
            envio[key] = value
        }
        
    })
    envio["status"] = true;
    form.reset();
    socket.emit('addProduct',envio)
})

socket.on('respuesta', info => {
    contenedor.innerHTML=""
    info.forEach(card => {
        contenedor.innerHTML += `
        <div class="card borderCard m-3" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">Description: ${card.description}</p>
                <p class="card-text">Code: ${card.code}</p>
                <p class="card-text">Category: ${card.category}</p>
                <p class="card-text">Price:$ ${card.price}</p>
                <p class="card-text">Stock: ${card.stock}</p>
                <button class="btn btn-danger btnErase" data-id="${card.id}">Eliminar</button>
            </div>
        </div>`
    });
})
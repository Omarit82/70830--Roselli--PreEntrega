const load = document.getElementById('carga');

load.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Submit")
    const info = new FormData(load);
    fetch("/api/products",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:info
    }).then((response)=>{
        if(!response.ok){
            throw new Error("Error en la solicitud")
        }
        return response.json();
    }).then((responseData)=>{
        console.log("Respuesta del servidor: ",responseData)
    }).catch ((error)=>{
        console.log("Error!: ",error)
    });
    load.reset();
})

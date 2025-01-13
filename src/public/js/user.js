const form = document.getElementById('formulario');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const info = new FormData(form);
    console.log(info);
    form.reset();
})
const formulario = document.querySelector('#formulario')

document.addEventListener('DOMContentLoaded', () => {
    App.init()
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(formulario["titulo"].value + " " + formulario["descripcion"].value)

    App.createTask(formulario["titulo"].value, formulario["descripcion"].value)

})
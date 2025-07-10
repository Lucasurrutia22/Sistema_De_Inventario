// Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario y el div de mensaje
    const form = document.querySelector('.recupera-container form');
    const mensajeDiv = document.getElementById('mensaje');

    // Escucha el evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío real del formulario

        // Muestra el mensaje de éxito
        mensajeDiv.style.display = 'block';
        mensajeDiv.style.color = '#388e3c';
        mensajeDiv.style.background = '#e8f5e9';
        mensajeDiv.style.padding = '0.7rem 1rem';
        mensajeDiv.style.borderRadius = '6px';
        mensajeDiv.style.marginBottom = '1rem';
        mensajeDiv.textContent = '¡Has enviado correctamente el código de recuperación de clave! Revisa tu correo electrónico.';

        // Limpia el campo de email
        form.reset();

        // Opcional: Oculta el mensaje después de unos segundos
        setTimeout(() => {
            mensajeDiv.style.display = 'none';
        }, 5000);
    });
});

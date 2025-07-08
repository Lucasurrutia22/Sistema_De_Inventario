// Escucha el evento "submit" del formulario con id "loginForm"
document.getElementById("loginForm").addEventListener("submit", function(event) {

  // Previene que el formulario se envíe y recargue la página
  event.preventDefault(); 

  // Obtiene el valor ingresado en el campo "usuario"
  const usuario = document.getElementById("usuario").value;

  // Obtiene el valor ingresado en el campo "clave"
  const clave = document.getElementById("clave").value;

  // Referencia al contenedor donde se mostrará el mensaje de error
  const errorDiv = document.getElementById("mensajeError");

  // Verifica si el usuario y clave coinciden con los valores correctos
  if (usuario === "admin" && clave === "1234") {
    // Si son correctos, redirige al usuario a la página de inventario
    window.location.href = "inventario.html";
  } else {
    // Si no son correctos, muestra mensaje de error
    errorDiv.textContent = "Usuario o contraseña incorrectos.";
    errorDiv.style.display = "block"; // Hace visible el mensaje
  }
});

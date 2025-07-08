// Recuperar productos del localStorage
let productos = JSON.parse(localStorage.getItem("inventario")) || [];

// Función para agregar un producto al inventario
function agregarProducto() {
  const nombre = document.getElementById("producto").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const minimo = parseInt(document.getElementById("minimo").value);

  if (nombre && !isNaN(cantidad) && !isNaN(minimo)) {
    productos.push({ nombre, cantidad, minimo });
    localStorage.setItem("inventario", JSON.stringify(productos));
    mostrarInventario();

    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("minimo").value = "";
  } else {
    alert("Por favor, completa todos los campos correctamente.");
  }
}

// Función para eliminar un producto
function eliminarProducto(index) {
  productos.splice(index, 1);
  localStorage.setItem("inventario", JSON.stringify(productos));
  mostrarInventario();
}

// Función para mostrar los productos divididos en dos tablas
function mostrarInventario() {
  const tablaReposicion = document.querySelector("#tabla-reposicion tbody");
  const tablaSuficiente = document.querySelector("#tabla-suficiente tbody");
  tablaReposicion.innerHTML = "";
  tablaSuficiente.innerHTML = "";

  productos.forEach((prod, index) => {
    const fila = `
      <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.minimo}</td>
        <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
      </tr>
    `;

    if (prod.cantidad < prod.minimo) {
      tablaReposicion.innerHTML += fila;
    } else {
      tablaSuficiente.innerHTML += fila;
    }
  });
}

// Función para cerrar sesión
function cerrarSesion() {
  window.location.href = "login.html";
}

// ✅ Función para descargar inventario en CSV
function descargarInventarioCSV() {
  if (productos.length === 0) {
    alert("No hay productos para exportar.");
    return;
  }

  const encabezado = "Producto,Cantidad,Mínimo\n";
  const filas = productos.map(p => `${p.nombre},${p.cantidad},${p.minimo}`).join("\n");
  const csvContent = encabezado + filas;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "inventario.csv";
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Mostrar los datos al cargar
mostrarInventario();

async function descargarInventarioPDF() {
    if (productos.length === 0) {
      alert("No hay productos para exportar.");
      return;
    }
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    doc.setFontSize(16);
    doc.text("Inventario de Productos", 20, 20);
  
    let y = 35;
    doc.setFontSize(12);
    doc.text("Producto", 20, y);
    doc.text("Cantidad", 90, y);
    doc.text("Mínimo", 140, y);
  
    y += 10;
  
    productos.forEach((p, i) => {
      doc.text(p.nombre, 20, y);
      doc.text(p.cantidad.toString(), 90, y);
      doc.text(p.minimo.toString(), 140, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
  
    doc.save("inventario.pdf");
  }
  

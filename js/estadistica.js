// Leer productos reales del localStorage
const productos = JSON.parse(localStorage.getItem("inventario")) || [];

// Obtener categorías únicas y sumar cantidades por categoría
const categorias = [];
const cantidades = [];
const colores = [
    '#4f8cff', '#0078d4', '#8f94fb', '#4e54c8', '#1a237e', '#43e97b', '#38f9d7', '#ff9800'
];

productos.forEach(prod => {
    let idx = categorias.indexOf(prod.nombre);
    if (idx === -1) {
        categorias.push(prod.nombre);
        cantidades.push(prod.cantidad);
    } else {
        cantidades[idx] += prod.cantidad;
    }
});

// Paleta de colores para barras (se repite si hay más categorías)
// const colores = [
//     '#4f8cff', '#0078d4', '#8f94fb', '#4e54c8', '#1a237e', '#43e97b', '#38f9d7', '#ff9800'
// ];

// Obtener contexto del canvas
const ctx = document.getElementById('graficoInventario').getContext('2d');

// Crear gráfico de barras
const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categorias,
        datasets: [{
            label: 'Cantidad en Inventario',
            data: cantidades,
            backgroundColor: categorias.map((_, i) => colores[i % colores.length]),
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Inventario por Categoría',
                color: '#1a237e',
                font: { size: 20, weight: 'bold', family: 'Segoe UI' }
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                        return `Cantidad: ${context.parsed.y.toLocaleString()}`;
                    }
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                color: '#1a237e',
                font: { weight: 'bold', size: 14 },
                formatter: function(value) {
                    return value.toLocaleString();
                }
            }
        },
        animation: {
            duration: 1200,
            easing: 'easeOutBounce'
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#1a237e', font: { size: 14 } },
                grid: { color: '#e0e7ff' }
            },
            x: {
                ticks: { color: '#1a237e', font: { size: 14 } },
                grid: { display: false }
            }
        }
    },
    plugins: [ChartDataLabels] // Asegúrate de incluir el plugin ChartDataLabels en tu HTML
});

// Segundo gráfico: Proporción de productos (Pie Chart)
const ctxPie = document.getElementById('graficoProporcion').getContext('2d');
const pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: categorias,
        datasets: [{
            data: cantidades,
            backgroundColor: categorias.map((_, i) => colores[i % colores.length]),
            borderWidth: 2,
            borderColor: '#fff',
            hoverOffset: 16
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    color: '#1a237e',
                    font: { size: 14, weight: 'bold' }
                }
            },
            title: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const value = context.parsed;
                        const percent = ((value / total) * 100).toFixed(1);
                        return `${context.label}: ${value} (${percent}%)`;
                    }
                }
            }
        },
        animation: {
            animateRotate: true,
            duration: 1400,
            easing: 'easeOutElastic'
        }
    }
});

// Mostrar resumen de totales
document.getElementById('totalProductos').textContent = cantidades.reduce((a, b) => a + b, 0);
document.getElementById('totalCategorias').textContent = categorias.length;
// Simulación de datos de inventario (puedes reemplazar por datos reales)
const categorias = ['Pasta de Diente', 'Shampo', 'Desodorante', 'Jabon', 'Otros'];
const cantidades = [120, 80, 150, 60, 40];

const ctx = document.getElementById('graficoInventario').getContext('2d');
const grafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: categorias,
        datasets: [{
            label: 'Cantidad en Inventario',
            data: cantidades,
            backgroundColor: [
                '#4f8cff', '#0078d4', '#8f94fb', '#4e54c8', '#1a237e'
            ],
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#1a237e' }
            },
            x: {
                ticks: { color: '#1a237e' }
            }
        }
    }
});
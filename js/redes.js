// Número de WhatsApp a copiar
const numeroWsp = "+56912345678";

function copiarWsp() {
    navigator.clipboard.writeText(numeroWsp).then(() => {
        const msg = document.getElementById('wsp-copiado');
        msg.style.display = 'inline-block';
        setTimeout(() => {
            msg.style.display = 'none';
        }, 1800);
    });
}
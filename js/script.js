// --- LÓGICA DE LA CALCULADORA (TERMÓMETRO) ---
const inputs = ['edad', 'kms'];
inputs.forEach(id => {
  const num = document.getElementById(id);
  const range = document.getElementById(id + 'Range');
  // Sincronizar inputs
  if(num && range){
    num.addEventListener('input', () => range.value = num.value);
    range.addEventListener('input', () => num.value = range.value);
  }
});

function calcularRiesgo() {
  const edad = parseInt(document.getElementById('edad').value) || 0;
  const kms = parseInt(document.getElementById('kms').value) || 0;
  const infracciones = parseInt(document.getElementById('infracciones').value) || 0;

  // Fórmula simple de ejemplo
  let baseScore = 0;

  // Edad: Menores de 25 y mayores de 70 tienen más riesgo
  if (edad < 25) baseScore += 30;
  else if (edad > 70) baseScore += 25;
  else baseScore += 10;

  // Kms: Más de 20,000 al año sube riesgo
  baseScore += (kms / 100000) * 40; 

  // Infracciones: Impacto directo
  baseScore += (infracciones * 15);

  // Limitar 0-100
  let totalRiesgo = Math.min(Math.max(baseScore, 0), 100);

  actualizarTermometro(totalRiesgo);
}

function actualizarTermometro(valor) {
  const liquido = document.getElementById('liquido');
  const bulbo = document.getElementById('bulbo');
  const texto = document.getElementById('scoreText');
  const mensaje = document.getElementById('mensajeRiesgo');

  // Animación de altura
  liquido.style.height = valor + '%';
  texto.innerText = Math.round(valor) + '%';

  // Cambio de color según severidad (Verde -> Amarillo -> Rojo)
  let color;
  let estado;

  if (valor < 30) {
    color = 'var(--accent)'; // Verde
    estado = "Riesgo Bajo - ¡Eres un conductor ideal!";
  } else if (valor < 70) {
    color = 'var(--warning)'; // Amarillo
    estado = "Riesgo Medio - Precaución estándar.";
  } else {
    color = 'var(--danger)'; // Rojo
    estado = "RIESGO ALTO - Se requiere revisión manual.";
  }

  bulbo.style.backgroundColor = color;
  mensaje.style.color = color;
  mensaje.innerText = estado;
  mensaje.style.fontWeight = "bold";
}

// Calcular al inicio
calcularRiesgo();


// --- LÓGICA DE PÓLIZAS ---
function descargarPoliza(nombre) {
  // Simula una descarga
  const btn = event.target;
  const originalText = btn.innerText;
  
  btn.innerText = "⌛ Generando PDF...";
  btn.style.opacity = "0.7";
  
  setTimeout(() => {
    alert(`📄 El documento para la póliza "${nombre}" se ha descargado correctamente.`);
    btn.innerText = originalText;
    btn.style.opacity = "1";
  }, 1500);
}

function pagar() {
  const confirmacion = confirm("Serás redirigido a la pasarela de pagos segura. ¿Continuar?");
  if(confirmacion) alert("Redirigiendo al banco...");
}


// --- LÓGICA DE SINIESTROS ---
function reportarSiniestro(e) {
  e.preventDefault(); // Evita recargar la página
  
  const form = document.getElementById('claimForm');
  const successMsg = document.getElementById('successMessage');
  const folioSpan = document.getElementById('folio');

  // Simular proceso de envío
  const btn = form.querySelector('button[type="submit"]');
  btn.innerText = "ENVIANDO DATOS...";
  btn.disabled = true;

  setTimeout(() => {
    // Generar folio random
    const folio = "SIN-" + Math.floor(Math.random() * 10000);
    folioSpan.innerText = folio;

    // Ocultar form y mostrar éxito
    form.style.display = 'none';
    successMsg.style.display = 'block';
    
    // Scroll al mensaje
    successMsg.scrollIntoView({ behavior: 'smooth' });
  }, 2000);
}
// Definimos un WebComponent para mostrar cada cita
class CitaItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const titulo = this.getAttribute('titulo');
    const fecha = this.getAttribute('fecha');
    const hora = this.getAttribute('hora');
    const tipo = this.getAttribute('tipo');

    this.shadowRoot.innerHTML = `
      <style>
        .cita {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 10px;
          font-family: Arial, sans-serif;
        }
        .cita h3 {
          margin: 0 0 5px 0;
          color: #f06292;
        }
        .cita p {
          margin: 2px 0;
        }
      </style>
      <div class="cita">
        <h3>${titulo}</h3>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Hora:</strong> ${hora}</p>
        <p><strong>Tipo:</strong> ${tipo}</p>
      </div>
    `;
  }
}

// Registrar el WebComponent
customElements.define('cita-item', CitaItem);

const form = document.getElementById('agendaForm');
const lista = document.getElementById('listaCitas');

// Recuperar citas guardadas al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
  citasGuardadas.forEach(cita => mostrarCita(cita));
});

// Evento submit del formulario
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener valores
  const titulo = document.getElementById('tituloCita').value.trim();
  const fecha = document.getElementById('fechaCita').value;
  const hora = document.getElementById('horaCita').value;
  const tipo = document.getElementById('tipoCita').value;

  // Validación: no permitir campos vacíos
  if (!titulo || !fecha || !hora || !tipo) {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  // Crear objeto cita
  const nuevaCita = { titulo, fecha, hora, tipo };

  // Mostrar cita en pantalla
  mostrarCita(nuevaCita);

  // Guardar en LocalStorage
  const citasGuardadas = JSON.parse(localStorage.getItem("citas")) || [];
  citasGuardadas.push(nuevaCita);
  localStorage.setItem("citas", JSON.stringify(citasGuardadas));

  // Limpiar formulario
  form.reset();
});

// Función para mostrar cita en pantalla
function mostrarCita(cita) {
  const citaItem = document.createElement('cita-item');
  citaItem.setAttribute('titulo', cita.titulo);
  citaItem.setAttribute('fecha', cita.fecha);
  citaItem.setAttribute('hora', cita.hora);
  citaItem.setAttribute('tipo', cita.tipo);
  lista.appendChild(citaItem); // <-- se agrega dentro de #listaCitas
}



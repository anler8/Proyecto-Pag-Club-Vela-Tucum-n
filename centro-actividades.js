// =======================
// Centro de Actividades Dinámico
// =======================

// Countdown Timer
function iniciarCountdown() {
  // Fecha objetivo: 30 días desde hoy
  const fechaObjetivo = new Date();
  fechaObjetivo.setDate(fechaObjetivo.getDate() + 30);

  function actualizarCountdown() {
    const ahora = new Date();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia > 0) {
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = dias
        .toString()
        .padStart(2, "0");
      document.getElementById("hours").textContent = horas
        .toString()
        .padStart(2, "0");
      document.getElementById("minutes").textContent = minutos
        .toString()
        .padStart(2, "0");
      document.getElementById("seconds").textContent = segundos
        .toString()
        .padStart(2, "0");
    }
  }

  actualizarCountdown();
  setInterval(actualizarCountdown, 1000);
}

// Galería de fotos
function cargarGaleriaFotos() {
  const galeria = document.getElementById("photo-gallery");
  const fotos = [
    {
      src: "/assets/seccion-hero/imagencvt1.jpg",
      titulo: "Regata Matutina",
      descripcion: "Competidores navegando en las primeras horas del día",
    },
    {
      src: "/assets/seccion-hero/imagencvt2.jpg",
      titulo: "Entrenamiento ILCA",
      descripcion: "Navegantes perfeccionando sus técnicas en clase ILCA",
    },
    {
      src: "/assets/seccion-hero/imagencvt3.jpg",
      titulo: "Escuela de Optimist",
      descripcion: "Los más jóvenes aprendiendo los fundamentos de la vela",
    },
    {
      src: "/assets/seccion-hero/imagencvt4.jpg",
      titulo: "Competencia Regional",
      descripcion: "Los mejores navegantes de la región compitiendo",
    },
    {
      src: "/assets/seccion-hero/imagencvt5.jpg",
      titulo: "Club en Acción",
      descripcion: "Vista panorámica del club durante una jornada activa",
    },
  ];

  galeria.innerHTML = fotos
    .map(
      (foto, index) => `
    <div class="relative group cursor-pointer" onclick="abrirModalFoto('${foto.src}', '${foto.titulo}', '${foto.descripcion}')">
      <img 
        src="${foto.src}" 
        alt="${foto.titulo}"
        class="w-full h-24 md:h-32 object-cover rounded-lg"
      />
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
        </svg>
      </div>
    </div>
  `
    )
    .join("");
}

// Próximos eventos
function cargarProximosEventos() {
  const eventosContainer = document.getElementById("upcoming-events");
  const eventos = [
    {
      titulo: "Regata Nocturna",
      fecha: "28 de Abril",
      hora: "19:00",
    },
    {
      titulo: "Escuela de Micro",
      fecha: "5 de Mayo",
      hora: "10:00",
    },
    {
      titulo: "Torneo Nacional ILCA",
      fecha: "12 de Mayo",
      hora: "09:00",
    },
  ];

  eventosContainer.innerHTML = eventos
    .map(
      (evento) => `
    <div class="evento-mini">
      <h4>${evento.titulo}</h4>
      <p>${evento.fecha} - ${evento.hora}</p>
    </div>
  `
    )
    .join("");
}

// Estadísticas en vivo (simuladas)
function actualizarEstadisticas() {
  const miembros = document.getElementById("active-members");
  const barcos = document.getElementById("boats-water");
  const eventos = document.getElementById("events-week");

  // Simular cambios en tiempo real
  setInterval(() => {
    const miembrosActuales = parseInt(miembros.textContent);
    const cambio = Math.floor(Math.random() * 3) - 1; // -1, 0, o 1
    const nuevosMiembros = Math.max(
      20,
      Math.min(35, miembrosActuales + cambio)
    );

    if (nuevosMiembros !== miembrosActuales) {
      miembros.style.transform = "scale(1.2)";
      miembros.textContent = nuevosMiembros;
      setTimeout(() => {
        miembros.style.transform = "scale(1)";
      }, 200);
    }
  }, 5000);

  setInterval(() => {
    const barcosActuales = parseInt(barcos.textContent);
    const cambio = Math.floor(Math.random() * 3) - 1;
    const nuevosBarcos = Math.max(5, Math.min(12, barcosActuales + cambio));

    if (nuevosBarcos !== barcosActuales) {
      barcos.style.transform = "scale(1.2)";
      barcos.textContent = nuevosBarcos;
      setTimeout(() => {
        barcos.style.transform = "scale(1)";
      }, 200);
    }
  }, 8000);
}

// Inicializar todo cuando el DOM esté listo
function inicializarCentroActividades() {
  iniciarCountdown();
  cargarGaleriaFotos();
  cargarProximosEventos();
  actualizarEstadisticas();
}

// =======================
// Funciones del Modal de Fotos
// =======================

// Abrir modal con foto
function abrirModalFoto(src, titulo, descripcion) {
  const modal = document.getElementById("photo-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");

  modalImage.src = src;
  modalImage.alt = titulo;
  modalTitle.textContent = titulo;
  modalDescription.textContent = descripcion;

  modal.classList.remove("hidden");
  modal.classList.add("show");
  document.body.classList.add("modal-open"); // Agregar clase para blur del fondo
}

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById("photo-modal");
  modal.classList.add("hidden");
  modal.classList.remove("show");
  document.body.classList.remove("modal-open"); // Remover clase para quitar blur del fondo
}

// Event listeners para el modal
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("photo-modal");
  const closeButton = document.getElementById("close-modal");

  // Cerrar con botón X
  closeButton.addEventListener("click", cerrarModal);

  // Cerrar haciendo clic fuera de la imagen
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      cerrarModal();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      cerrarModal();
    }
  });
});

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    if (typeof inicializarCentroActividades === "function") {
      inicializarCentroActividades();
    }
  }, 100);
});

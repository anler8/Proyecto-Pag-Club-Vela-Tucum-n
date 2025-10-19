// =======================
// Inicialización de componentes
// =======================
function inicializarComponentes() {
  // Los componentes se inicializan desde sus respectivos archivos
  // centro-actividades.js maneja el centro de actividades dinámico
}

// =======================
// Alternar menú móvil con animación suave
// =======================
const botonMenu = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
let menuAbierto = false;

botonMenu.addEventListener("click", () => {
  if (!menuAbierto) {
    menu.style.maxHeight = "1000px"; // Altura suficientemente grande
    menuAbierto = true;
  } else {
    menu.style.maxHeight = "0px";
    menuAbierto = false;
  }
});

// Cerrar menú hamburguesa al hacer clic en un enlace
const enlacesMenu = document.querySelectorAll("#menu a");
enlacesMenu.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    menu.style.maxHeight = "0px";
    menuAbierto = false;
  });
});

// =======================
// Desplegable con animaciones suaves (escritorio)
// =======================
const togglesDesplegable = document.querySelectorAll("[data-dropdown-toggle]");

togglesDesplegable.forEach((toggle) => {
  const idMenu = toggle.getAttribute("data-dropdown-toggle");
  const menuDesplegable = document.getElementById(idMenu);
  const flecha = toggle.querySelector("svg");
  let estaAbierto = false;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    // Cerrar todos los demás desplegables
    document.querySelectorAll("[id^='menu-']").forEach((menu) => {
      if (menu !== menuDesplegable && !menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        menu.classList.remove("opacity-100", "scale-100");
        menu.classList.add("opacity-0", "scale-95");

        const otroToggle = document.querySelector(
          `[data-dropdown-toggle="${menu.id}"]`
        );
        if (otroToggle) {
          const otraFlecha = otroToggle.querySelector("svg");
          if (otraFlecha) otraFlecha.classList.remove("rotate-180");
        }
      }
    });

    // Alternar este menú
    if (estaAbierto) {
      // Cerrar
      menuDesplegable.classList.remove("opacity-100", "scale-100");
      menuDesplegable.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        menuDesplegable.classList.add("hidden");
      }, 300);
      if (flecha) flecha.classList.remove("rotate-180");
      estaAbierto = false;
    } else {
      // Abrir
      menuDesplegable.classList.remove("hidden");
      setTimeout(() => {
        menuDesplegable.classList.remove("opacity-0", "scale-95");
        menuDesplegable.classList.add("opacity-100", "scale-100");
      }, 10);
      if (flecha) flecha.classList.add("rotate-180");
      estaAbierto = true;
    }
  });

  // Cerrar al hacer clic afuera
  document.addEventListener("click", (e) => {
    if (
      !toggle.contains(e.target) &&
      !menuDesplegable.contains(e.target) &&
      estaAbierto
    ) {
      menuDesplegable.classList.remove("opacity-100", "scale-100");
      menuDesplegable.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        menuDesplegable.classList.add("hidden");
      }, 300);
      if (flecha) flecha.classList.remove("rotate-180");
      estaAbierto = false;
    }
  });
});

// =======================
// Desplegable móvil con animaciones suaves
// =======================
const desplegablesMoviles = document.querySelectorAll(".mobile-dropdown");

desplegablesMoviles.forEach((desplegable) => {
  const toggle = desplegable.querySelector(".mobile-dropdown-toggle");
  const menuDesplegable = desplegable.querySelector(".mobile-dropdown-menu");
  const flecha = desplegable.querySelector(".mobile-dropdown-arrow");
  let estaAbierto = false;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();

    if (!estaAbierto) {
      // Abrir
      menuDesplegable.style.maxHeight = menuDesplegable.scrollHeight + "px";
      flecha.classList.add("rotate-180");
      estaAbierto = true;
    } else {
      // Cerrar
      menuDesplegable.style.maxHeight = "0px";
      flecha.classList.remove("rotate-180");
      estaAbierto = false;
    }
  });
});

// =======================
// Barra de navegación: fondo al hacer scroll (solo para home)
// =======================
window.addEventListener("scroll", () => {
  const barraNavegacion = document.getElementById("navbar");
  const botonMenu = document.getElementById("menu-btn");
  const paginaActual = barraNavegacion.getAttribute("data-page");

  // Solo aplicar efectos de scroll en la home y en escritorio
  if (paginaActual === "home" && window.innerWidth >= 768) {
    if (window.scrollY > 50) {
      barraNavegacion.classList.add("bg-white", "shadow-md", "text-black");
      barraNavegacion.classList.remove("text-white");
      botonMenu.classList.add("text-gray-800");
      botonMenu.classList.remove("text-white");
    } else {
      // Barra de navegación transparente arriba del todo
      barraNavegacion.classList.remove("bg-white", "shadow-md", "text-black");
      barraNavegacion.classList.add("text-white");
      botonMenu.classList.remove("text-gray-800");
      botonMenu.classList.add("text-white");
    }
  }
});

// =======================
// Inicializar barra de navegación según página y tamaño
// =======================
function inicializarBarraNavegacion() {
  const barraNavegacion = document.getElementById("navbar");
  const botonMenu = document.getElementById("menu-btn");
  const paginaActual = barraNavegacion.getAttribute("data-page");

  if (paginaActual === "home") {
    if (window.innerWidth < 768) {
      // En móvil, barra de navegación siempre blanca
      barraNavegacion.classList.add("bg-white", "shadow-md", "text-black");
      barraNavegacion.classList.remove("text-white");
      botonMenu.classList.add("text-gray-800");
      botonMenu.classList.remove("text-white");
    } else {
      // En escritorio, depende del scroll actual
      if (window.scrollY > 50) {
        barraNavegacion.classList.add("bg-white", "shadow-md", "text-black");
        barraNavegacion.classList.remove("text-white");
        botonMenu.classList.add("text-gray-800");
        botonMenu.classList.remove("text-white");
      } else {
        barraNavegacion.classList.remove("bg-white", "shadow-md", "text-black");
        barraNavegacion.classList.add("text-white");
        botonMenu.classList.remove("text-gray-800");
        botonMenu.classList.add("text-white");
      }
    }
  } else {
    // En todas las demás páginas, barra de navegación siempre blanca
    barraNavegacion.classList.add("bg-white", "shadow-md", "text-black");
    barraNavegacion.classList.remove("text-white");
    botonMenu.classList.add("text-gray-800");
    botonMenu.classList.remove("text-white");
  }
}

// Ejecutar al cargar la página
inicializarBarraNavegacion();

// Ejecutar al cambiar tamaño de ventana
window.addEventListener("resize", inicializarBarraNavegacion);

// Inicializar componentes cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  // Los componentes se inicializan desde sus respectivos archivos
  inicializarComponentes();
});

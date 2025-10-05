// =======================
// Swiper config
// =======================
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// =======================
// Toggle menú móvil con animación suave
// =======================
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    menu.style.maxHeight = "1000px"; // Altura suficientemente grande
    menuOpen = true;
  } else {
    menu.style.maxHeight = "0px";
    menuOpen = false;
  }
});

// Cerrar menú hamburguesa al hacer clic en un enlace
const menuLinks = document.querySelectorAll("#menu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.style.maxHeight = "0px";
    menuOpen = false;
  });
});

// =======================
// Dropdown con animaciones suaves (desktop)
// =======================
const dropdownToggles = document.querySelectorAll("[data-dropdown-toggle]");

dropdownToggles.forEach((toggle) => {
  const menuId = toggle.getAttribute("data-dropdown-toggle");
  const dropdownMenu = document.getElementById(menuId);
  const arrow = toggle.querySelector("svg");
  let isOpen = false;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();

    // Cerrar todos los demás dropdowns
    document.querySelectorAll("[id^='menu-']").forEach((menu) => {
      if (menu !== dropdownMenu && !menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        menu.classList.remove("opacity-100", "scale-100");
        menu.classList.add("opacity-0", "scale-95");

        const otherToggle = document.querySelector(
          `[data-dropdown-toggle="${menu.id}"]`
        );
        if (otherToggle) {
          const otherArrow = otherToggle.querySelector("svg");
          if (otherArrow) otherArrow.classList.remove("rotate-180");
        }
      }
    });

    // Alternar este menú
    if (isOpen) {
      // Cerrar
      dropdownMenu.classList.remove("opacity-100", "scale-100");
      dropdownMenu.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        dropdownMenu.classList.add("hidden");
      }, 300);
      if (arrow) arrow.classList.remove("rotate-180");
      isOpen = false;
    } else {
      // Abrir
      dropdownMenu.classList.remove("hidden");
      setTimeout(() => {
        dropdownMenu.classList.remove("opacity-0", "scale-95");
        dropdownMenu.classList.add("opacity-100", "scale-100");
      }, 10);
      if (arrow) arrow.classList.add("rotate-180");
      isOpen = true;
    }
  });

  // Cerrar al hacer clic afuera
  document.addEventListener("click", (e) => {
    if (
      !toggle.contains(e.target) &&
      !dropdownMenu.contains(e.target) &&
      isOpen
    ) {
      dropdownMenu.classList.remove("opacity-100", "scale-100");
      dropdownMenu.classList.add("opacity-0", "scale-95");
      setTimeout(() => {
        dropdownMenu.classList.add("hidden");
      }, 300);
      if (arrow) arrow.classList.remove("rotate-180");
      isOpen = false;
    }
  });
});

// =======================
// Dropdown móvil con animaciones suaves
// =======================
const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");

mobileDropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".mobile-dropdown-toggle");
  const dropdownMenu = dropdown.querySelector(".mobile-dropdown-menu");
  const arrow = dropdown.querySelector(".mobile-dropdown-arrow");
  let isOpen = false;

  toggle.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isOpen) {
      // Abrir
      dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + "px";
      arrow.classList.add("rotate-180");
      isOpen = true;
    } else {
      // Cerrar
      dropdownMenu.style.maxHeight = "0px";
      arrow.classList.remove("rotate-180");
      isOpen = false;
    }
  });
});

// =======================
// Navbar: fondo al hacer scroll (solo para home)
// =======================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const currentPage = navbar.getAttribute("data-page");

  // Solo aplicar efectos de scroll en la home y en desktop
  if (currentPage === "home" && window.innerWidth >= 768) {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white", "shadow-md", "text-black");
      navbar.classList.remove("text-white");
      menuBtn.classList.add("text-gray-800");
      menuBtn.classList.remove("text-white");
    } else {
      // Navbar transparente arriba del todo
      navbar.classList.remove("bg-white", "shadow-md", "text-black");
      navbar.classList.add("text-white");
      menuBtn.classList.remove("text-gray-800");
      menuBtn.classList.add("text-white");
    }
  }
});

// =======================
// Inicializar navbar según página y tamaño
// =======================
function initializeNavbar() {
  const navbar = document.getElementById("navbar");
  const menuBtn = document.getElementById("menu-btn");
  const currentPage = navbar.getAttribute("data-page");

  if (currentPage === "home") {
    if (window.innerWidth < 768) {
      // En móvil, navbar siempre blanca
      navbar.classList.add("bg-white", "shadow-md", "text-black");
      navbar.classList.remove("text-white");
      menuBtn.classList.add("text-gray-800");
      menuBtn.classList.remove("text-white");
    } else {
      // En desktop, depende del scroll actual
      if (window.scrollY > 50) {
        navbar.classList.add("bg-white", "shadow-md", "text-black");
        navbar.classList.remove("text-white");
        menuBtn.classList.add("text-gray-800");
        menuBtn.classList.remove("text-white");
      } else {
        navbar.classList.remove("bg-white", "shadow-md", "text-black");
        navbar.classList.add("text-white");
        menuBtn.classList.remove("text-gray-800");
        menuBtn.classList.add("text-white");
      }
    }
  } else {
    // En todas las demás páginas, navbar siempre blanca
    navbar.classList.add("bg-white", "shadow-md", "text-black");
    navbar.classList.remove("text-white");
    menuBtn.classList.add("text-gray-800");
    menuBtn.classList.remove("text-white");
  }
}

// Ejecutar al cargar la página
initializeNavbar();

// Ejecutar al cambiar tamaño de ventana
window.addEventListener("resize", initializeNavbar);

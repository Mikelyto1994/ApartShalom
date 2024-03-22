// Función para mostrar las opciones de alquiler al hacer clic en "Reservar"
function mostrarOpcionesAlquiler() {
  document.getElementById('opcionesAlquiler').style.display = 'block';
  // Llamar a la función para actualizar las tarjetas según la cantidad de personas
  actualizarCards();
}

// Función para sumar la cantidad de personas
function sumarCantidad(tipo) {
  const input = document.getElementById(tipo);
  // Validar que el valor sea numérico antes de sumar
  if (!isNaN(parseInt(input.value))) {
    input.value = parseInt(input.value) + 1;
    actualizarCards(); // Actualizar tarjetas al cambiar la cantidad de personas
  }
}

// Función para restar la cantidad de personas
function restarCantidad(tipo) {
  const input = document.getElementById(tipo);
  // Validar que el valor sea numérico y mayor que cero antes de restar
  if (!isNaN(parseInt(input.value)) && parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
    actualizarCards(); // Actualizar tarjetas al cambiar la cantidad de personas
  }
}
// Obtener referencia a los elementos relevantes del DOM
const adultosInput = document.getElementById('adultos');
const ninosInput = document.getElementById('ninos');
const bebesInput = document.getElementById('bebes');
const cards = document.querySelectorAll('.card');

// Función para actualizar la visibilidad de las tarjetas según la cantidad de personas
function actualizarCards() {
  const totalPersonas = parseInt(adultosInput.value) + parseInt(ninosInput.value);
  let tarjetasMostradas = 0; // Contador de tarjetas mostradas
  let mostrarMayorCard = false; // Variable para controlar la tarjeta especial "mayorCard"

  cards.forEach(card => {
    const personasCard = card.getAttribute('data-personas');
    const [min, max] = personasCard.split('-').map(Number);

    if (totalPersonas >= min && totalPersonas <= max) {
      card.style.display = 'block'; // Mostrar la tarjeta si cumple la condición del rango
      tarjetasMostradas++;
    } else {
      card.style.display = 'none'; // Ocultar la tarjeta si no cumple la condición del rango
    }

    // Mostrar la tarjeta especial "mayorCard" si totalPersonas es mayor o igual a 11
    if (totalPersonas >= 11 && card.id === 'mayorCard') {
      card.style.display = 'block';
      mostrarMayorCard = true;
    }
  });

  const mensaje = document.getElementById('mensaje');
  if (totalPersonas >= 11 && !mostrarMayorCard) {
    mensaje.textContent = "No hay departamentos disponibles para esa cantidad de personas, pero te puedo mostrar el departamento más grande que tenemos.";
  } else {
    mensaje.textContent = tarjetasMostradas === 0 ? "No hay departamentos disponibles para la cantidad seleccionada, pero te ofrezco el siguiente:" : "Tienes las siguientes opciones :";
  }
  
}

// Llamada a actualizarCards() cuando cambian los valores de personas
function actualizarConBebes() {
  actualizarCards();
}

adultosInput.addEventListener('change', actualizarCards);
ninosInput.addEventListener('change', actualizarCards);
bebesInput.addEventListener('input', actualizarConBebes); // Usar input en lugar de change para actualizar en tiempo real

// Llamar a la función inicialmente para establecer la visibilidad inicial de las tarjetas
actualizarCards();


// Función para desplazar las tarjetas horizontalmente
function scrollCards(direction) {
  const container = document.getElementById('cardsContainer');
  const scrollAmount = direction * container.clientWidth * 0.63; // Utilizar clientWidth
  container.scrollLeft += scrollAmount;
}


// alert("hello word");
// let nombreProyecto = document.getElementsByTagName('h7'); // obtenemos el elemento con la clase subtitulo
// let contenido = nombreProyecto.innerHTML; // obtenemos el contenido del elemento
// console.log(contenido); // mostramos el contenido en la consola
let menu_responsive = document.querySelector(".checkbtn");
menu_responsive.onclick = function () {
  navBar = document.querySelector(".menu");
  navBar.classList.toggle("active");
};

// validacion formulario

const form = document.getElementById("form");
const nombre = document.getElementById("nombre");
const parrafo = document.getElementById("alertas");

function validarFormulario() {
  let warnings = "";
  let valido = true;
  parrafo.innerHTML = "";

  if (nombre.value.length < 4) {
    warnings += `El nombre debe contener más de 4 carcateres`;
    valido = false;
  }

  if (!valido) {
    parrafo.innerHTML = warnings;
  } else {
    parrafo.innerHTML = "Enviado";
  }
  return valido;
}


window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY >= 100) { // Cambio a ">=" en lugar de ">"
    navbar.style.backgroundColor = '#333';
  } else {
    navbar.style.backgroundColor = 'transparent';
  }
});

// Navegacion//    let currentIndex = 0;
document.addEventListener('DOMContentLoaded', function() {
  const miVideo = document.getElementById('miVideo');
  
  // Función para reproducir el video automáticamente
  function reproducirVideo() {
    if (miVideo.paused) {
      miVideo.play().catch(error => {
        console.error('Error al reproducir el video automáticamente:', error);
      });

      // Deshabilitar la reproducción manual después de la primera reproducción
      miVideo.removeEventListener('click', reproducirVideo);
      miVideo.removeEventListener('dblclick', reproducirVideo);
    }
  }

  // Eventos de clic y doble clic para reproducir el video automáticamente
  miVideo.addEventListener('click', reproducirVideo);
  miVideo.addEventListener('dblclick', reproducirVideo);
});


// script.js
document.addEventListener("DOMContentLoaded", function() {
  const animatedText = document.getElementById('animatedText');

  // Función para manejar la intersección
  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animatedText.classList.add('animate-text');
      } else {
        animatedText.classList.remove('animate-text');
      }
    });
  }

  // Crear un observer para el texto animado
  const observer = new IntersectionObserver(handleIntersection);
  observer.observe(animatedText);
});

document.addEventListener('DOMContentLoaded', function() {
  const cardsContainer = document.querySelector('.cartas-container');
  const cards = cardsContainer.querySelectorAll('.carta');
  const numCards = cards.length;
  let currentIndex = 0;

  function mostrarSiguienteCarta() {
    currentIndex = (currentIndex + 1) % numCards;
    actualizarCarrusel();
    
    // Reiniciar al mostrar la primera carta después de la última carta
    if (currentIndex === numCards - 5) {
      setTimeout(() => {
        currentIndex = 0; // Volver a la primera carta
        actualizarCarrusel();
      }, 4000); // Tiempo de espera antes de reiniciar el carrusel (1000 ms = 1 segundo)
    }
  }
  

  function actualizarCarrusel() {
    const offset = currentIndex * -100; // Ajuste al multiplicar por -100
    cardsContainer.style.transition = 'transform 0.5s ease-in-out'; // Restaurar la transición
    cardsContainer.style.transform = `translateX(${offset}%)`;

    // Reiniciar al mostrar la primera carta después de la última carta
    if (currentIndex === numCards - 1) {
      setTimeout(() => {
        currentIndex = 0; // Volver a la primera carta
        cardsContainer.style.transition = 'none'; // Eliminar la transición para el ajuste
        actualizarCarrusel();
        setTimeout(() => {
          cardsContainer.style.transition = 'transform 0.5s ease-in-out'; // Restaurar la transición
        }, 50); // Pequeño tiempo de espera para que se aplique la transición correctamente
      }, 0); // Tiempo de espera antes de reiniciar el carrusel (0 ms = inmediato)
    }
  }

  // Mostrar la primera carta al cargar la página
  cardsContainer.style.transform = `translateX(0%)`;

  // Intervalo para mover automáticamente el carrusel hacia la derecha
  setInterval(mostrarSiguienteCarta, 4000); // Cambiar de carta cada 3 segundos (3000 ms)
});

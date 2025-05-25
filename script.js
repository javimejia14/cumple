// Función para crear confeti
function createConfetti() {
  const confettiContainer = document.getElementById("confetti-container")
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#ff9ff3", "#54a0ff"]

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.style.left = Math.random() * 100 + "%"
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.animationDelay = Math.random() * 3 + "s"
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s"

    confettiContainer.appendChild(confetti)

    // Remover confeti después de la animación
    setTimeout(() => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti)
      }
    }, 5000)
  }
}

// Función principal de celebración
function startCelebration() {
  // Agregar clase de celebración
  document.body.classList.add("celebration-active")

  // Crear confeti
  createConfetti()

  // Reproducir sonido (si está disponible)
  const audio = document.getElementById("birthday-song")
  if (audio) {
    audio.play().catch((e) => console.log("Audio no disponible"))
  }

  // Crear más efectos visuales
  createFireworks()

  // Animar carta central de manera especial
  const letter = document.querySelector(".letter")
  if (letter) {
    letter.style.transform += " scale(1.05)"
    letter.style.boxShadow = "0 25px 50px rgba(255, 107, 107, 0.3)"

    setTimeout(() => {
      letter.style.transform = letter.style.transform.replace(" scale(1.05)", "")
      letter.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)"
    }, 1000)
  }

  // Animar polaroids individualmente
  animatePolaroids()

  // Remover clase después de la animación
  setTimeout(() => {
    document.body.classList.remove("celebration-active")
  }, 3000)
}

// Función para animar polaroids individualmente
function animatePolaroids() {
  const polaroids = document.querySelectorAll(".polaroid")

  polaroids.forEach((polaroid, index) => {
    setTimeout(() => {
      polaroid.style.transform += " scale(1.1)"
      polaroid.style.zIndex = "200"

      setTimeout(() => {
        polaroid.style.transform = polaroid.style.transform.replace(" scale(1.1)", "")
        polaroid.style.zIndex = ""
      }, 500)
    }, index * 200)
  })
}

// Función para crear fuegos artificiales
function createFireworks() {
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9ca24", "#ff9ff3"]

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const firework = document.createElement("div")
      firework.style.position = "fixed"
      firework.style.left = Math.random() * window.innerWidth + "px"
      firework.style.top = Math.random() * window.innerHeight + "px"
      firework.style.width = "4px"
      firework.style.height = "4px"
      firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      firework.style.borderRadius = "50%"
      firework.style.pointerEvents = "none"
      firework.style.zIndex = "1000"

      document.body.appendChild(firework)

      // Animar explosión
      firework.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(20)", opacity: 0 },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        },
      )

      // Remover después de la animación
      setTimeout(() => {
        if (firework.parentNode) {
          firework.parentNode.removeChild(firework)
        }
      }, 1000)
    }, i * 200)
  }
}

// Crear confeti automático al cargar la página
window.addEventListener("load", () => {
  setTimeout(createConfetti, 1000)

  // Confeti periódico
  setInterval(() => {
    if (Math.random() > 0.8) {
      createConfetti()
    }
  }, 15000)
})

// Animación de entrada mejorada para la nueva disposición
window.addEventListener("load", () => {
  // Animar la carta central primero
  const letter = document.querySelector(".letter")
  if (letter) {
    letter.style.opacity = "0"
    letter.style.transform += " translateY(50px) scale(0.8)"

    setTimeout(() => {
      letter.style.transition = "all 1s ease"
      letter.style.opacity = "1"
      letter.style.transform = letter.style.transform.replace(" translateY(50px) scale(0.8)", "")
    }, 500)
  }

  // Luego animar los polaroids alrededor
  const polaroids = document.querySelectorAll(".polaroid")
  polaroids.forEach((polaroid, index) => {
    polaroid.style.opacity = "0"
    polaroid.style.transform += " translateY(50px)"

    setTimeout(
      () => {
        polaroid.style.transition = "all 0.8s ease"
        polaroid.style.opacity = "1"
        polaroid.style.transform = polaroid.style.transform.replace(" translateY(50px)", "")
      },
      800 + index * 200,
    )
  })
})

// Efecto de hover mejorado para los polaroids
document.querySelectorAll(".polaroid").forEach((polaroid) => {
  let originalTransform = ""

  polaroid.addEventListener("mouseenter", function () {
    originalTransform = this.style.transform || ""
    this.style.transition = "all 0.3s ease"
    this.style.transform = originalTransform + " scale(1.05)"
    this.style.zIndex = "100"
  })

  polaroid.addEventListener("mouseleave", function () {
    this.style.transform = originalTransform
    this.style.zIndex = ""
  })
})

// Función para personalizar el contenido fácilmente
function personalizarCarta(nombre, remitente, mensaje) {
  // Cambiar nombre del destinatario
  const nombreElement = document.querySelector(".letter-header h2")
  if (nombreElement) {
    nombreElement.textContent = `Querida ${nombre}`
  }

  // Cambiar nombre del remitente
  const remitenteElement = document.querySelector(".signature-name")
  if (remitenteElement) {
    remitenteElement.textContent = remitente
  }

  // Cambiar mensaje (opcional)
  if (mensaje) {
    const contenido = document.querySelector(".letter-content")
    if (contenido) {
      contenido.innerHTML = `
                <p>${mensaje}</p>
                <div class="signature">
                    <p>Con mucho cariño,</p>
                    <p class="signature-name">${remitente}</p>
                </div>
            `
    }
  }

  // Actualizar fecha
  const fechaElement = document.querySelector(".date")
  if (fechaElement) {
    const hoy = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    fechaElement.textContent = `Fecha: ${hoy}`
  }
}

// Función para personalizar los textos de los polaroids
function personalizarPolaroids(textos) {
  const captions = document.querySelectorAll(".polaroid-caption:not(.main-caption)")

  textos.forEach((texto, index) => {
    if (captions[index]) {
      captions[index].textContent = texto
    }
  })
}

// Función para cambiar el texto principal del polaroid central
function cambiarTextoMain(nuevoTexto) {
  const mainCaption = document.querySelector(".main-caption")
  if (mainCaption) {
    mainCaption.textContent = nuevoTexto
  }
}

// Ejemplo de uso de personalización (descomenta y modifica según necesites)
// personalizarCarta('María', 'Juan', 'Espero que tengas un día maravilloso lleno de sorpresas y alegría.');
// personalizarPolaroids(['Aventurera', 'Mi amor', '15/03/2024', 'Risas', 'Única', 'desde 1990', 'Viajes', 'Momentos']);
// cambiarTextoMain('Feliz Cumple Bestie');

// Efecto de paralaje optimizado para la nueva disposición
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const polaroids = document.querySelectorAll(".polaroid")
  const letter = document.querySelector(".letter")

  // Paralaje suave para la carta (menos movimiento)
  if (letter) {
    letter.style.transform =
      letter.style.transform.replace(/translateY$$[^)]*$$/g, "") + ` translateY(${scrolled * 0.1}px)`
  }

  // Paralaje para polaroids (más movimiento)
  polaroids.forEach((polaroid, index) => {
    const speed = 0.3 + index * 0.05
    const currentTransform = polaroid.style.transform.replace(/translateY$$[^)]*$$/g, "")
    polaroid.style.transform = currentTransform + ` translateY(${scrolled * speed}px)`
  })
})

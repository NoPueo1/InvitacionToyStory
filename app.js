// ========================================================
// 🎈 LÓGICA INTERACTIVA - INVITACIÓN TOY STORY 🚀🤠
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar la configuración con datos genéricos
  const config = typeof INVITATION_CONFIG !== 'undefined' ? INVITATION_CONFIG : {
    nombre: "Lautaro",
    edad: 3,
    apodo: "Lau",
    tituloSorpresa: "¡Tienes una sorpresa!",
    subtituloSorpresa: "¡Una aventura al infinito y más allá te espera!",
    fechaTexto: "Domingo 13 de Septiembre",
    horaInicio: "15:00 hs",
    horaFin: "18:30 hs",
    lugarNombre: "¡Lugar del Festejo!",
    direccion: "Toca el botón para ver la ubicación exacta",
    linkGoogleMaps: "https://maps.google.com",
    telefonoWhatsApp: "56912345678",
    mensajeWhatsApp: "¡Hola! 🤠 Confirmo con mucha alegría mi asistencia al cumpleaños de Lau (3 añitos). ¡Ahí estaremos! 🚀🎉",
    notaExtra: "⭐ Traer ropa cómoda para jugar. ¡No faltes a esta gran fiesta!",
    reproducirMusica: true
  };

  // 2. Elementos del DOM
  const txtSurpriseTitle = document.getElementById('txtSurpriseTitle');
  const txtSurpriseSub = document.getElementById('txtSurpriseSub');
  const txtDate = document.getElementById('txtDate');
  const txtTime = document.getElementById('txtTime');
  const txtLocationName = document.getElementById('txtLocationName');
  const txtLocationAddress = document.getElementById('txtLocationAddress');
  const linkMaps = document.getElementById('linkMaps');
  const linkWhatsApp = document.getElementById('linkWhatsApp');
  const txtExtraNote = document.getElementById('txtExtraNote');
  const txtMission = document.getElementById('txtMission');
  const countdownText = document.getElementById('countdownText');

  const slides = document.querySelectorAll('.slide-card');
  const pageDots = document.querySelectorAll('.page-dot');
  const musicToggleBtn = document.getElementById('musicToggle');
  const musicStatusText = document.getElementById('musicStatusText');
  const bgAudio = document.getElementById('bgAudio');

  // Botones e interactivos
  const btnOpenInvite = document.getElementById('btnOpenInvite');
  const btnPrevSlide2 = document.getElementById('btnPrevSlide2');
  const btnNextSlide2 = document.getElementById('btnNextSlide2');
  const btnPrevSlide3 = document.getElementById('btnPrevSlide3');
  const btnMoreConfetti = document.getElementById('btnMoreConfetti');

  // 3. Poblar datos en la interfaz
  if (txtSurpriseTitle) txtSurpriseTitle.textContent = config.tituloSorpresa || "¡Tienes una sorpresa!";
  if (txtSurpriseSub) txtSurpriseSub.textContent = config.subtituloSorpresa || "¡Toca abajo para descubrir la invitación!";
  if (txtDate) txtDate.textContent = config.fechaTexto;
  if (txtTime) txtTime.textContent = config.horaInicio || "15:00 hs";
  if (txtMission) txtMission.textContent = config.actividades || "Juegos, piñata, sorpresas y cosas ricas 🎂";
  if (txtLocationName) txtLocationName.textContent = config.lugarNombre;
  if (txtLocationAddress) txtLocationAddress.textContent = config.direccion;
  if (txtExtraNote) txtExtraNote.textContent = config.notaExtra;

  // Enlace a Google Maps
  if (linkMaps) {
    linkMaps.href = config.linkGoogleMaps || "https://maps.google.com";
  }

  // Enlace a WhatsApp 100% Genérico
  if (linkWhatsApp) {
    const cleanPhone = (config.telefonoWhatsApp || "56912345678").replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(config.mensajeWhatsApp || "¡Hola! Confirmo mi asistencia al cumpleaños 🎉");
    linkWhatsApp.href = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  }

  // 4. Navegación entre láminas
  function goToSlide(slideIndex) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === slideIndex);
    });
    pageDots.forEach((d, idx) => {
      d.classList.toggle('active', idx === slideIndex);
    });
  }

  if (btnOpenInvite) {
    btnOpenInvite.addEventListener('click', () => {
      goToSlide(1);
      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      if (config.reproducirMusica && bgAudio && bgAudio.paused) {
        bgAudio.play().catch(() => {});
      }
    });
  }

  if (btnNextSlide2) btnNextSlide2.addEventListener('click', () => goToSlide(2));
  if (btnPrevSlide2) btnPrevSlide2.addEventListener('click', () => goToSlide(0));
  if (btnPrevSlide3) btnPrevSlide3.addEventListener('click', () => goToSlide(1));

  if (btnMoreConfetti) {
    btnMoreConfetti.addEventListener('click', () => {
      if (typeof confetti === 'function') {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      }
    });
  }

  // 5. Control de música
  if (musicToggleBtn && bgAudio) {
    musicToggleBtn.addEventListener('click', () => {
      if (bgAudio.paused) {
        bgAudio.play();
        if (musicStatusText) musicStatusText.textContent = "Pausar Música 🎵";
      } else {
        bgAudio.pause();
        if (musicStatusText) musicStatusText.textContent = "Reproducir Música 🎶";
      }
    });
  }

  // 6. Cuenta Regresiva
  function updateCountdown() {
    if (!countdownText) return;
    const targetDate = new Date(config.fechaISO || "2026-09-13T15:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownText.textContent = "¡Es Hoy! 🎉";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdownText.textContent = `${days}d ${hours}h ${minutes}m 🚀`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);
});

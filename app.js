// ========================================================
// 🎈 LÓGICA INTERACTIVA - INVITACIÓN TOY STORY 🚀🤠
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar la configuración
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
    linkGoogleMaps: "https://maps.app.goo.gl/ErbZiJ8f6kULXpXXA",
    telefonoWhatsApp: "56993540867",
    mensajeWhatsApp: "¡Hola! 🤠 Confirmo con mucha alegría mi asistencia al cumpleaños de Lau (3 añitos) el Domingo 13 de Septiembre a las 15:00 hs. ¡Ahí estaremos! 🚀🎉",
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
    linkMaps.href = config.linkGoogleMaps || "https://maps.app.goo.gl/ErbZiJ8f6kULXpXXA";
  }

  // Enlace a WhatsApp
  if (linkWhatsApp) {
    const cleanPhone = (config.telefonoWhatsApp || "56993540867").replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(config.mensajeWhatsApp || "¡Hola! Confirmo mi asistencia al cumpleaños 🎉");
    linkWhatsApp.href = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  }

  // ========================================================
  // 4. CUENTA REGRESIVA EN TIEMPO REAL ⏳
  // ========================================================
  function updateCountdown() {
    if (!countdownText) return;

    const targetDate = new Date("2026-09-13T15:00:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownText.textContent = "¡HOY ES EL GRAN DÍA! 🎉🚀";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    countdownText.textContent = `${days}d ${hours}h ${minutes}m 🚀`;
  }

  updateCountdown();
  setInterval(updateCountdown, 60000);

  // ========================================================
  // 5. SISTEMA DE AUDIO SUAVE Y MÚSICA 🎶
  // ========================================================
  let isMusicPlaying = false;
  let audioCtx = null;
  let synthLoopTimeout = null;
  let customAudioObj = null;

  const audioCandidates = ["assets/music.mp3", "assets/music.mp3.mp3", "assets/Music.mp3"];
  let candidateIndex = 0;

  function loadCustomAudio() {
    if (candidateIndex >= audioCandidates.length) return;
    
    customAudioObj = new Audio(audioCandidates[candidateIndex]);
    customAudioObj.loop = true;
    customAudioObj.volume = 0.25;

    customAudioObj.addEventListener('error', () => {
      candidateIndex++;
      if (candidateIndex < audioCandidates.length) {
        loadCustomAudio();
      }
    });
  }

  loadCustomAudio();

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Melodía sintetizada de fallback
  const TOY_STORY_MELODY = [
    { note: 261.63, dur: 0.35 },
    { note: 329.63, dur: 0.35 },
    { note: 392.00, dur: 0.50 },
    { note: 440.00, dur: 0.70 },
    { note: 392.00, dur: 0.50 },
    { note: 329.63, dur: 0.90 },
    { note: 0,      dur: 0.25 }
  ];

  function playSynthTone(freq, duration, time) {
    if (!audioCtx || !isMusicPlaying) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.06, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0008, time + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + duration);

      const subOsc = audioCtx.createOscillator();
      const subGain = audioCtx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(freq * 2, time);

      subGain.gain.setValueAtTime(0, time);
      subGain.gain.linearRampToValueAtTime(0.02, time + 0.02);
      subGain.gain.exponentialRampToValueAtTime(0.0005, time + duration * 0.7);

      subOsc.connect(subGain);
      subGain.connect(audioCtx.destination);

      subOsc.start(time);
      subOsc.stop(time + duration * 0.7);
    } catch (e) {}
  }

  function startSynthesizedMelody() {
    if (!isMusicPlaying) return;
    initAudioContext();
    if (!audioCtx) return;

    let currentTime = audioCtx.currentTime + 0.1;
    let totalDuration = 0;

    TOY_STORY_MELODY.forEach(item => {
      if (item.note > 0) {
        playSynthTone(item.note, item.dur, currentTime);
      }
      currentTime += item.dur;
      totalDuration += item.dur;
    });

    synthLoopTimeout = setTimeout(() => {
      if (isMusicPlaying) {
        startSynthesizedMelody();
      }
    }, totalDuration * 1000);
  }

  function stopSynthesizedMelody() {
    if (synthLoopTimeout) {
      clearTimeout(synthLoopTimeout);
      synthLoopTimeout = null;
    }
  }

  function playMusic() {
    isMusicPlaying = true;
    updateMusicButtonUI();
    initAudioContext();

    if (customAudioObj) {
      customAudioObj.volume = 0.25;
      const p = customAudioObj.play();
      if (p !== undefined) {
        p.then(() => {
          return;
        }).catch(() => {
          tryWithBgAudioElement();
        });
        return;
      }
    }

    tryWithBgAudioElement();
  }

  function tryWithBgAudioElement() {
    if (bgAudio) {
      bgAudio.volume = 0.25;
      const p2 = bgAudio.play();
      if (p2 !== undefined) {
        p2.then(() => {
          return;
        }).catch(() => {
          startSynthesizedMelody();
        });
        return;
      }
    }
    startSynthesizedMelody();
  }

  function pauseMusic() {
    isMusicPlaying = false;
    updateMusicButtonUI();

    if (customAudioObj) {
      try { customAudioObj.pause(); } catch (e) {}
    }
    if (bgAudio) {
      try { bgAudio.pause(); } catch (e) {}
    }
    stopSynthesizedMelody();
  }

  function updateMusicButtonUI() {
    if (!musicToggleBtn) return;
    if (isMusicPlaying) {
      musicToggleBtn.classList.add('playing');
      if (musicStatusText) musicStatusText.textContent = "Música: ON";
    } else {
      musicToggleBtn.classList.remove('playing');
      if (musicStatusText) musicStatusText.textContent = "Música: OFF";
    }
  }

  function playPopSound() {
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      initAudioContext();
      if (isMusicPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fed100', '#ea2328', '#42b9ff', '#8bd346', '#9346d3']
      });
    }
  }

  // ========================================================
  // 6. NAVEGACIÓN ENTRE LÁMINAS
  // ========================================================
  let currentSlide = 0;

  function goToSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev');
      if (index === targetIndex) {
        slide.classList.add('active');
      } else if (index < targetIndex) {
        slide.classList.add('prev');
      }
    });

    pageDots.forEach((dot, index) => {
      if (index === targetIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    currentSlide = targetIndex;
  }

  function handleOpenInvitation() {
    initAudioContext();
    playPopSound();
    triggerConfetti();
    
    if (!isMusicPlaying && config.reproducirMusica !== false) {
      playMusic();
    }

    goToSlide(1);
  }

  if (btnOpenInvite) btnOpenInvite.addEventListener('click', handleOpenInvitation);

  if (btnPrevSlide2) {
    btnPrevSlide2.addEventListener('click', () => {
      playPopSound();
      goToSlide(0);
    });
  }

  if (btnNextSlide2) {
    btnNextSlide2.addEventListener('click', () => {
      playPopSound();
      goToSlide(2);
    });
  }

  if (btnPrevSlide3) {
    btnPrevSlide3.addEventListener('click', () => {
      playPopSound();
      goToSlide(1);
    });
  }

  if (btnMoreConfetti) {
    btnMoreConfetti.addEventListener('click', () => {
      playPopSound();
      triggerConfetti();
    });
  }

  pageDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      playPopSound();
      if (idx === 1 && currentSlide === 0) {
        handleOpenInvitation();
      } else {
        goToSlide(idx);
      }
    });
  });

  // Swipe táctil en móviles
  let touchStartX = 0;
  let touchEndX = 0;

  const cardDeck = document.getElementById('cardDeck');
  if (cardDeck) {
    cardDeck.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    cardDeck.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    }, { passive: true });
  }

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;

    if (diff < -swipeThreshold) {
      if (currentSlide < slides.length - 1) {
        if (currentSlide === 0) {
          handleOpenInvitation();
        } else {
          playPopSound();
          goToSlide(currentSlide + 1);
        }
      }
    } else if (diff > swipeThreshold) {
      if (currentSlide > 0) {
        playPopSound();
        goToSlide(currentSlide - 1);
      }
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      if (currentSlide < slides.length - 1) {
        if (currentSlide === 0) {
          handleOpenInvitation();
        } else {
          playPopSound();
          goToSlide(currentSlide + 1);
        }
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) {
        playPopSound();
        goToSlide(currentSlide - 1);
      }
    }
  });

});

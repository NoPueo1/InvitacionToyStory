// ========================================================
// 🎈 CONFIGURACIÓN DE LA INVITACIÓN - CUMPLEAÑOS DE LAU 🎈
// ========================================================

const INVITATION_CONFIG = {
  // Datos del Cumpleañero
  nombre: "Lautaro",
  apodo: "Lau",
  edad: 3,

  // Textos Temáticos
  tituloSorpresa: "¡Tienes una sorpresa!",
  subtituloSorpresa: "¡Una aventura al infinito y más allá te espera!",
  
  // Fecha y Horario (Solo hora de inicio)
  fechaTexto: "Domingo 13 de Septiembre",
  horaInicio: "15:00 hs",
  fechaISO: "2026-09-13T15:00:00",

  // Actividades
  actividades: "Juegos, piñata, sorpresas y cosas ricas 🎂",

  // Ubicación del Evento
  lugarNombre: "¡Lugar del Festejo!",
  direccion: "Toca el botón para ver la ubicación exacta",
  linkGoogleMaps: "https://maps.app.goo.gl/ErbZiJ8f6kULXpXXA",

  // Confirmación por WhatsApp (RSVP)
  telefonoWhatsApp: "56993540867",
  mensajeWhatsApp: "¡Hola! 🤠 Confirmo con mucha alegría mi asistencia al cumpleaños de Lau (3 añitos) el Domingo 13 de Septiembre a las 15:00 hs. ¡Ahí estaremos! 🚀🎉",

  // Nota adicional
  notaExtra: "⭐ Traer ropa cómoda para jugar. ¡No faltes a esta gran fiesta!",

  // Audio
  reproducirMusica: true
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = INVITATION_CONFIG;
}

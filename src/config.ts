// Configuración general del sitio. Cambia aquí URLs, contacto y horario.

/** URL pública del sitio, sin barra final. Cuando se conecte el dominio, cámbiala aquí. */
export const SITE_URL = "https://lucialugo-studio.vercel.app";

/** Menú general de reservas en Square (botones "Reservar cita", "Ir al calendario"...). */
export const SQUARE_MENU_URL = "https://beauty-blush-104930.square.site/";

/** Base para abrir un servicio concreto en Square: SQUARE_SERVICE_URL + squareItemId. */
export const SQUARE_SERVICE_URL =
  "https://book.squareup.com/appointments/rh7bc1iiq4lg5l/location/LH8EY6C040PFP/services/";

export const NEGOCIO = {
  nombre: "Lucia Lugo Studio",
  /** Solo dígitos, con código de país. */
  whatsapp: "19296550086",
  whatsappVisible: "+1 929-655-0086",
  email: "beauty.blush0511@gmail.com",
  instagramUsuario: "lucialugo.studio",
  instagramUrl: "https://instagram.com/lucialugo.studio",
  /** Lo único que se publica de la ubicación en la landing. */
  ciudad: "Mauldin",
  region: "SC",
  zona: "Mauldin, SC · a minutos de Greenville",
  horario: {
    dias: "Lunes a sábado",
    abre: "09:00",
    cierra: "17:00",
    textoCorto: "9am – 5pm",
    textoLargo: "9:00am – 5:00pm",
  },
} as const;

/** Mensaje con el que se abre WhatsApp desde la web. */
export const WHATSAPP_MENSAJE = "¡Hola Lucía! Vi tu página web y tengo una pregunta:";

export const waLink = (texto: string = WHATSAPP_MENSAJE) =>
  `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(texto)}`;

/** Enlace de reserva: con id abre ese servicio en Square; sin id, el menú general. */
export const bookUrl = (squareItemId?: string) =>
  squareItemId ? SQUARE_SERVICE_URL + squareItemId : SQUARE_MENU_URL;

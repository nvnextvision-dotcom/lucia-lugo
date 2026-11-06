// Catálogo de servicios: el ÚNICO sitio donde se editan servicios y precios.
// Generado desde el menú de Square (datos/servicios-square.json, consultado 2026-11-06).
// Si Lucía cambia un precio o una duración en Square, cámbialo también aquí.
import type { ImageMetadata } from "astro";

import consulta from "../assets/servicios/consulta.jpg";
import microSombreado from "../assets/servicios/micro-sombreado.jpg";
import microCombinada from "../assets/servicios/micro-combinada.jpg";
import perfeccionamiento from "../assets/servicios/perfeccionamiento.jpg";
import retoqueAnual from "../assets/servicios/retoque-anual.jpg";
import remocion from "../assets/servicios/remocion.jpg";
import diseno from "../assets/servicios/diseno.jpg";
import henna from "../assets/servicios/henna.jpg";
import laminado from "../assets/servicios/laminado.jpg";
import lifting from "../assets/servicios/lifting.jpg";
import labios from "../assets/servicios/labios.jpg";
import fullFacial from "../assets/servicios/full-facial.jpg";
import microneedlingFacial from "../assets/servicios/microneedling-facial.jpg";
import microneedlingCorporal from "../assets/servicios/microneedling-corporal.jpg";

export type Categoria = "micro" | "cejas" | "pestanas" | "piel" | "depilacion" | "consulta";

export const CATEGORIAS: Record<Categoria, string> = {
  micro: "Micropigmentación",
  cejas: "Cejas",
  pestanas: "Pestañas",
  piel: "Piel",
  depilacion: "Depilación",
  consulta: "Consulta",
};

/** Pestañas del filtro, en orden. "Consulta" solo aparece en "Todos". */
export const FILTROS: { clave: Categoria | "todos"; etiqueta: string }[] = [
  { clave: "todos", etiqueta: "Todos" },
  { clave: "micro", etiqueta: "Micropigmentación" },
  { clave: "cejas", etiqueta: "Cejas" },
  { clave: "pestanas", etiqueta: "Pestañas" },
  { clave: "piel", etiqueta: "Piel" },
  { clave: "depilacion", etiqueta: "Depilación" },
];

export interface Servicio {
  slug: string;
  categoria: Categoria;
  /** Nombre que se muestra, con tildes. */
  nombre: string;
  descripcion: string;
  /** Precio en USD tal como está en Square. 0 = "Gratis". */
  precioUsd: number;
  duracionMin: number;
  badge?: string;
  destacado?: boolean;
  squareItemId: string;
  /** Foto del servicio en Square. Si no hay, la tarjeta muestra el monograma. */
  foto?: ImageMetadata;
  /** Texto alternativo de la foto. */
  fotoAlt?: string;
}

export const SERVICIOS: Servicio[] = [
  {
    slug: "consulta", categoria: "consulta", nombre: "Consulta", precioUsd: 0, duracionMin: 30, destacado: true,
    squareItemId: "VQPJYPEJEZMGECHBTDXBU2WT", foto: consulta,
    fotoAlt: "Lucía Lugo sonriendo con un calibrador para medir cejas",
    descripcion: "Analizamos tu tipo de piel, la estructura de tu ceja, procedimientos anteriores y tus gustos para elegir lo mejor para ti.",
  },
  {
    slug: "micro-sombreado", categoria: "micro", nombre: "Micropigmentación de cejas sombreado", precioUsd: 340, duracionMin: 210, badge: "Hasta 2 años",
    squareItemId: "HDI4S3EH75KW3ESKOZN4E3DF", foto: microSombreado,
    fotoAlt: "Cejas micropigmentadas con efecto sombreado, vistas desde arriba",
    descripcion: "Procedimiento semipermanente con efecto polvo suave: cejas definidas sin maquillarlas cada mañana.",
  },
  {
    slug: "micro-combinada", categoria: "micro", nombre: "Micropigmentación técnica combinada", precioUsd: 340, duracionMin: 210,
    squareItemId: "WXTQ5XGIHFSRGS2EY63ICQ44", foto: microCombinada,
    fotoAlt: "Clienta con cejas hechas con técnica combinada de trazos y sombreado",
    descripcion: "Combina trazos tipo pelo y sombreado para un resultado natural con más definición.",
  },
  {
    slug: "perfeccionamiento", categoria: "micro", nombre: "Cita de perfeccionamiento", precioUsd: 60, duracionMin: 120, badge: "Solo clientas",
    squareItemId: "V2EC6XZSVY2P22OTVLQ2X3IV", foto: perfeccionamiento,
    fotoAlt: "Cejas micropigmentadas después de la cita de perfeccionamiento",
    descripcion: "Retoque para clientas que hicieron su primera sesión aquí, dentro de los 60 días siguientes.",
  },
  {
    slug: "retoque-anual", categoria: "micro", nombre: "Retoque anual", precioUsd: 220, duracionMin: 210,
    squareItemId: "BBEBDD2Z3Q7I5GZWW7XVVG7I", foto: retoqueAnual,
    fotoAlt: "Primer plano de una ceja micropigmentada y pestañas",
    descripcion: "Refrescamiento de color de tu micropigmentación para mantenerla como el primer día.",
  },
  {
    slug: "remocion", categoria: "micro", nombre: "Remoción química", precioUsd: 60, duracionMin: 40,
    squareItemId: "AUTPDUAD6KYCDVV2ORCBC37P", foto: remocion,
    fotoAlt: "Antes y después de una remoción química de pigmento en la ceja",
    descripcion: "Ayuda a aclarar o retirar pigmento de micropigmentaciones anteriores.",
  },
  {
    slug: "diseno", categoria: "cejas", nombre: "Diseño y depilación de cejas", precioUsd: 30, duracionMin: 30,
    squareItemId: "PKDA4UA7Y7DWAF6H6LDBUZ3H", foto: diseno,
    fotoAlt: "Clienta con cejas recién diseñadas y depiladas",
    descripcion: "Medimos y diseñamos la forma ideal para tu rostro, y depilamos con cera.",
  },
  {
    slug: "henna", categoria: "cejas", nombre: "Depilación y tinte henna o híbrido", precioUsd: 40, duracionMin: 40,
    squareItemId: "EJJ27DBMKVBIBDLOZOL2PO7I", foto: henna,
    fotoAlt: "Clienta con cejas diseñadas y teñidas",
    descripcion: "Diseño personalizado, depilación con cera y tinte temporal en henna o tinte híbrido.",
  },
  {
    slug: "laminado", categoria: "cejas", nombre: "Laminado de cejas", precioUsd: 80, duracionMin: 80,
    squareItemId: "L6SQFI2BYC75Q2TD2FW2NLBT", foto: laminado,
    fotoAlt: "Clienta con cejas laminadas y peinadas hacia arriba",
    descripcion: "Alisado que permite peinar tus cejas en la dirección deseada y cubrir espacios sin vello.",
  },
  {
    slug: "lifting", categoria: "pestanas", nombre: "Lifting de pestañas", precioUsd: 80, duracionMin: 60, badge: "Hasta 4 semanas",
    squareItemId: "BGG7MGEX27T63HSNLDCBYQTL", foto: lifting,
    fotoAlt: "Primer plano de pestañas naturales rizadas con lifting",
    descripcion: "Rizado de tus pestañas naturales con efecto rímel por hasta 4 semanas.",
  },
  {
    slug: "labios", categoria: "piel", nombre: "Hidratación de labios", precioUsd: 80, duracionMin: 90,
    squareItemId: "4COZNED64INNVPPPMK7663OJ", foto: labios,
    fotoAlt: "Labios hidratados con un tono rosado natural",
    descripcion: "Dermapen y microagujas con ácido hialurónico y aplicación de color. Dura unas 2 semanas; se puede hacer cada mes.",
  },
  {
    slug: "full-facial", categoria: "piel", nombre: "Full facial", precioUsd: 100, duracionMin: 120,
    squareItemId: "3HHFKD3CWZ4AJLFVHJPUAYGO", foto: fullFacial,
    fotoAlt: "Clienta recibiendo terapia de luz LED roja durante un facial",
    descripcion: "Limpieza profunda: exfoliación, vapor ozono, extracción, mascarilla, luz LED, alta frecuencia, hidratación y protección solar.",
  },
  {
    slug: "microneedling-facial", categoria: "piel", nombre: "Microneedling facial", precioUsd: 150, duracionMin: 120,
    squareItemId: "YQOTSZMSR7LQIB5IKA7PFTCC", foto: microneedlingFacial,
    fotoAlt: "Antes y después de un tratamiento de microneedling facial",
    descripcion: "Dermapen con activos personalizados para líneas finas, arrugas, cicatrices, manchas y más.",
  },
  {
    slug: "microneedling-corporal", categoria: "piel", nombre: "Microneedling corporal", precioUsd: 150, duracionMin: 120,
    squareItemId: "CC6UBRKH6M5F5EJD2PMY3ZM2", foto: microneedlingCorporal,
    fotoAlt: "Antes y después de microneedling corporal en el abdomen",
    descripcion: "Microneedling en el cuerpo para mejorar la textura de la piel, como estrías y cicatrices.",
  },
  {
    slug: "microneedling-paquete", categoria: "piel", nombre: "Paquete microneedling 3 sesiones", precioUsd: 300, duracionMin: 90, badge: "Paquete",
    squareItemId: "WEHO3OAQ5ZKFSYBLRYEL4CO3",
    descripcion: "Tres sesiones de microneedling para trabajar tu piel de forma progresiva, con un precio especial.",
  },
  {
    slug: "dep-axilas", categoria: "depilacion", nombre: "Depilación de axilas", precioUsd: 30, duracionMin: 30,
    squareItemId: "YGKCGMMTDIHMB7XL2M6TKBQW",
    descripcion: "Depilación con cera de las axilas.",
  },
  {
    slug: "dep-piernas", categoria: "depilacion", nombre: "Depilación de piernas", precioUsd: 35, duracionMin: 60,
    squareItemId: "RDRD4J2KI665W2RESY2DCGMB",
    descripcion: "Depilación con cera de piernas.",
  },
  {
    slug: "dep-bikini", categoria: "depilacion", nombre: "Depilación bikini", precioUsd: 45, duracionMin: 30,
    squareItemId: "ZC3QDH2CSRNNG3KHQ7N7UGX3",
    descripcion: "Depilación con cera del área del bikini.",
  },
];

export const CONSULTA = SERVICIOS.find((s) => s.slug === "consulta")!;

export const formatoPrecio = (usd: number) => (usd === 0 ? "Gratis" : `$${usd}`);

export const formatoDuracion = (min: number) => {
  const h = Math.floor(min / 60);
  const r = min % 60;
  return (h ? `${h} h` : "") + (h && r ? " " : "") + (r ? `${r} min` : "");
};

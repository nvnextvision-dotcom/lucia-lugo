import type { APIRoute } from "astro";
import { SITE_URL } from "../config";

// Solo páginas públicas: /respuestas queda fuera a propósito.
const PAGINAS = ["/"];

export const GET: APIRoute = () => {
  const urls = PAGINAS.map((p) => `  <url><loc>${new URL(p, SITE_URL + "/").href}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};

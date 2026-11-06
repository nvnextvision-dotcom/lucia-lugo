// Comprueba el HTML generado (ejecutar después de `npm run build`): npm test
// - Los 18 botones "Reservar" de las tarjetas abren su servicio en Square.
// - Precios iguales a los de Square.
// - Botones generales al menú de Square y "Agendar consulta gratis" a la Consulta.
// - La dirección exacta no aparece en la landing.
// - /respuestas: noindex, fuera del sitemap y enlaces construidos con SITE_URL.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { SITE_URL, SQUARE_MENU_URL, SQUARE_SERVICE_URL } from "../src/config.ts";

const leer = (f) => fs.readFileSync(new URL(`../dist/${f}`, import.meta.url), "utf8");
const index = leer("index.html");
const respuestas = leer("respuestas.html");
const square = JSON.parse(fs.readFileSync(new URL("./fixtures/servicios-square.json", import.meta.url), "utf8")).servicios;

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const tarjetas = [...index.matchAll(/<article\b[^>]*class="card[^"]*"[^>]*>([\s\S]*?)<\/article>/g)].map((m) => m[1]);
const enlaces = (html) => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
  attrs: m[1],
  href: decode(m[1].match(/href="([^"]*)"/)?.[1] ?? ""),
  texto: m[2].replace(/<[^>]+>/g, "").trim(),
}));

test("hay 18 tarjetas de servicio, como en Square", () => {
  assert.equal(square.length, 18);
  assert.equal(tarjetas.length, 18);
});

test("cada botón Reservar abre su servicio en Square, en pestaña nueva", () => {
  const esperados = new Set(square.map((s) => s.square_item_id));
  const vistos = new Set();
  for (const html of tarjetas) {
    const botones = enlaces(html).filter((a) => a.texto === "Reservar");
    assert.equal(botones.length, 1, "una tarjeta debe tener exactamente un botón Reservar");
    const [b] = botones;
    const id = b.href.slice(SQUARE_SERVICE_URL.length);
    assert.ok(b.href.startsWith(SQUARE_SERVICE_URL), `enlace inesperado: ${b.href}`);
    assert.ok(esperados.has(id), `squareItemId desconocido: ${id}`);
    assert.equal(b.attrs.match(/data-square-id="([^"]*)"/)?.[1], id);
    assert.match(b.attrs, /target="_blank"/);
    assert.match(b.attrs, /rel="noopener"/);
    const json = square.find((s) => s.square_item_id === id);
    assert.equal(b.href, json.url_reserva, `el enlace de ${json.nombre_square} no coincide con Square`);
    vistos.add(id);
  }
  assert.equal(vistos.size, 18, "cada servicio de Square debe aparecer una vez");
});

test("los precios coinciden con Square (Consulta = Gratis)", () => {
  for (const html of tarjetas) {
    const id = html.match(/data-square-id="([^"]*)"/)[1];
    const json = square.find((s) => s.square_item_id === id);
    const precio = html.match(/<div class="price"[^>]*>([^<]*)</)[1].trim();
    assert.equal(precio, json.precio_usd === 0 ? "Gratis" : `$${json.precio_usd}`, json.nombre_square);
  }
});

test("los botones generales van al menú de Square y la consulta gratis a su servicio", () => {
  const todos = enlaces(index);
  for (const texto of ["Reservar cita", "Reservar mi cita", "Ir al calendario de reservas"]) {
    const bs = todos.filter((a) => a.texto === texto);
    assert.ok(bs.length > 0, `falta el botón "${texto}"`);
    for (const b of bs) {
      assert.equal(b.href, SQUARE_MENU_URL, texto);
      assert.match(b.attrs, /target="_blank"/);
    }
  }
  const consulta = todos.find((a) => a.texto === "Agendar consulta gratis");
  assert.equal(consulta.href, SQUARE_SERVICE_URL + "VQPJYPEJEZMGECHBTDXBU2WT");
});

test("la landing no publica la dirección exacta", () => {
  assert.doesNotMatch(index, /Daniel Court|29662/);
  assert.match(index, /Mauldin, SC, a minutos de Greenville/);
  assert.doesNotMatch(index, /streetAddress/);
});

test("/respuestas lleva noindex y no está en el sitemap", () => {
  assert.match(respuestas, /<meta name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(index, /\/respuestas/);
  const sitemap = leer("sitemap.xml");
  assert.doesNotMatch(sitemap, /respuestas/);
  assert.match(sitemap, new RegExp(`<loc>${SITE_URL}/</loc>`));
});

test("los enlaces del kit usan SITE_URL y la dirección solo está en /confirmar", () => {
  const textos = [...respuestas.matchAll(/<div class="txt"[^>]*>([\s\S]*?)<\/div>/g)].map((m) => decode(m[1]));
  assert.equal(textos.length, 15);
  const urls = textos.flatMap((t) => t.match(/https?:\/\/\S+/g) ?? []);
  const propias = urls.filter((u) => !u.startsWith(SQUARE_MENU_URL) && !u.startsWith(SQUARE_SERVICE_URL));
  assert.ok(propias.length >= 4);
  for (const u of propias) assert.ok(u.startsWith(SITE_URL + "/#"), `URL a fuego en el kit: ${u}`);
  const conDireccion = textos.filter((t) => t.includes("Daniel Court"));
  assert.equal(conDireccion.length, 1);
  assert.match(respuestas, /data-atajo="\/confirmar"[\s\S]*?Daniel Court/);
});

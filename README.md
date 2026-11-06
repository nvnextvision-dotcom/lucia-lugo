# Lucia Lugo Studio — web

Landing de [Lucia Lugo Studio](https://instagram.com/lucialugo.studio) (cejas, micropigmentación, pestañas, piel y depilación en Mauldin, SC). Muestra servicios y precios y manda a reservar y pagar en Square. La mantiene Next Vision.

- Astro (salida estática) + CSS propio + TypeScript. Fuentes autoalojadas con @fontsource.
- Páginas: `/` (landing) y `/respuestas` (kit interno de respuestas rápidas para Lucía: noindex, nofollow y fuera del sitemap; no se enlaza desde la web).
- El diseño aprobado es la referencia `lucialugo-studio-handoff/referencia/index.html`. No se rediseña.

## Comandos

```bash
npm install
npm run icloud   # solo en este Mac: saca node_modules/dist/.astro de iCloud (repetir tras cada npm install)
npm run dev      # http://localhost:4321
npm run build    # astro check + build en dist/
npm test         # comprueba enlaces de Square, precios, noindex y SITE_URL (después del build)
```

## Editar servicios y precios

Todo está en **`src/data/servicios.ts`**, el único sitio donde se tocan servicios:

- `precioUsd` y `duracionMin` deben coincidir con Square. `0` se muestra como "Gratis".
- `squareItemId` es el ID del servicio en Square. El botón "Reservar" abre `SQUARE_SERVICE_URL + squareItemId`. Para sacarlo: en el menú de reservas de Square abre el servicio y copia la última parte de la URL (`.../services/ESTE_ID`).
- `badge` (opcional) es la etiqueta pequeña ("Hasta 2 años"). `destacado: true` solo lo lleva la Consulta (tarjeta verde).
- `foto` (opcional): imagen en `src/assets/servicios/` (jpg cuadrado, ~1000 px) importada arriba del archivo, con su `fotoAlt`. Sin foto, la tarjeta muestra el monograma.
- Servicio nuevo: añade un objeto al array `SERVICIOS` (la categoría decide en qué filtro aparece). Si cambia el número total, actualiza también `tests/fixtures/servicios-square.json` para que `npm test` pase.

Los precios que aparecen en el kit `/respuestas` (`/precios`, `/retoque`) salen de este mismo archivo.

## Configuración general

`src/config.ts`: `SITE_URL`, enlaces de Square, WhatsApp, email, Instagram y horario.

- **`SITE_URL`**: URL pública sin barra final. Se usa en canonical, Open Graph, sitemap, robots.txt, JSON-LD y en todos los enlaces del kit `/respuestas`. Ahora es `https://lucialugo-studio.vercel.app`.
- La landing nunca publica la dirección exacta (solo "Mauldin, SC · a minutos de Greenville"). La dirección completa vive únicamente en la plantilla `/confirmar` de `src/pages/respuestas.astro`.

## Desplegar

El proyecto de Vercel `lucialugo-studio` (equipo *nextvision's projects*) está conectado a este repo: **cada push a `main` despliega a producción** y cada rama o PR genera una vista previa.

Despliegue manual, si hiciera falta:

```bash
npx vercel deploy --prod
```

## Conectar el dominio (pendiente)

1. Vercel → proyecto `lucialugo-studio` → **Settings → Domains** → *Add* el dominio raíz (`dominio.com`) y también `www.dominio.com`.
2. Vercel muestra los registros DNS que hay que crear en el registrador. Normalmente:
   - dominio raíz: registro **A** `@` → la IP que indique Vercel (p. ej. `76.76.21.21`),
   - `www`: registro **CNAME** `www` → el destino que indique Vercel (p. ej. `cname.vercel-dns.com`).
   Usa siempre los valores que muestra Vercel en pantalla, no estos de ejemplo. Borra registros A/AAAA/CNAME antiguos que choquen.
3. Redirección entre www y raíz: en Settings → Domains elige cuál es el principal y marca el otro como *Redirect to* el principal (308). Recomendado: el dominio raíz como principal y `www` redirigiendo a él (o al revés, pero solo uno).
4. Espera a que ambos aparezcan como *Valid Configuration* y con certificado SSL.
5. Cambia `SITE_URL` en `src/config.ts` al dominio principal (`https://dominio.com`, sin barra final), haz commit y push. Comprueba `/sitemap.xml`, `/robots.txt` y que los enlaces copiados desde `/respuestas` usen el dominio nuevo.
6. Si Lucía ya tiene guardadas las respuestas rápidas en Instagram/WhatsApp, tendrá que volver a copiarlas desde `/respuestas` con el dominio nuevo.

## Imágenes

- `src/assets/`: hero (`lucia-cut.webp`), monograma (`symbol.jpg`), cejas (`brow.jpg`, `brow-sm.jpg`). Astro genera AVIF/WebP en varios tamaños.
- `src/assets/servicios/`: fotos de los servicios descargadas de Square (2026-11-06) y reducidas a 1000 px. Los 4 servicios sin foto en Square (paquete de microneedling y depilaciones) usan el monograma.
- `public/og.jpg` (1200×630): captura del hero. `public/favicon.ico`, `icon.svg` y los PNG se generan con `node scripts/generar-iconos.mjs`.

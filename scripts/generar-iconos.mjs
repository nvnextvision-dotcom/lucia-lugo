// Genera favicon, iconos y la imagen Open Graph desde los assets de marca.
// Uso: node scripts/generar-iconos.mjs   (la og.jpg se rehace con scripts/og.mjs)
import sharp from "sharp";
import fs from "node:fs";

const symbol = "src/assets/symbol.jpg"; // 233x240, monograma LL con anillo "STUDIO"
const pub = "public";

// Recorte cuadrado centrado del monograma completo
const base = sharp(symbol).extract({ left: 0, top: 4, width: 233, height: 233 });
const centro = sharp(symbol).extract({ left: 58, top: 62, width: 117, height: 117 }); // solo "LL" para tamaños pequeños

await base.clone().resize(180, 180).png().toFile(`${pub}/apple-touch-icon.png`);
await base.clone().resize(192, 192).png().toFile(`${pub}/icon-192.png`);
await base.clone().resize(512, 512, { kernel: "lanczos3" }).png().toFile(`${pub}/icon-512.png`);

// favicon.ico (PNG embebido de 32x32, formato ICO válido)
const png32 = await centro.clone().resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt8(0, 8); ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(png32.length, 14); ico.writeUInt32LE(22, 18);
fs.writeFileSync(`${pub}/favicon.ico`, Buffer.concat([ico, png32]));

// icon.svg: PNG del monograma dentro de un SVG (nítido en pestañas de alta densidad)
const png64 = (await centro.clone().resize(96, 96).png().toBuffer()).toString("base64");
fs.writeFileSync(
  `${pub}/icon.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><clipPath id="c"><circle cx="48" cy="48" r="48"/></clipPath><image clip-path="url(#c)" width="96" height="96" href="data:image/png;base64,${png64}"/></svg>\n`,
);
console.log("iconos generados en public/");

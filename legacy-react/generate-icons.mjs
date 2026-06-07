// Script para generar los íconos PNG de la PWA
// Ejecutar una sola vez: node generate-icons.mjs
import { createCanvas } from "canvas";
import { writeFileSync } from "fs";

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const r = size * 0.18; // radio de esquinas

  // Fondo degradado marrón
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "#9a4a20");
  grad.addColorStop(1, "#5a2810");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, r);
  ctx.fill();

  // Estrella ✦ centrada
  ctx.fillStyle = "#f4e6d4";
  ctx.font = `bold ${size * 0.52}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("✦", size / 2, size / 2);

  return canvas.toBuffer("image/png");
}

writeFileSync("public/icon-192.png", drawIcon(192));
writeFileSync("public/icon-512.png", drawIcon(512));
console.log("Íconos generados: public/icon-192.png y public/icon-512.png");

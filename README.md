# Garzón Bilingüe

**Academia de bolsillo para personal de servicio gastronómico.** Aprende los idiomas que necesitas para atender mesas: **inglés, portugués y chino**. Instalable en el celular y funciona **sin conexión** (PWA).

🔗 **App:** https://chef-english.vercel.app

## Qué incluye

Para cada idioma (en / pt / zh):

- **📖 Curso** — 30 días × 5 frases reales del servicio: recibir, tomar el pedido, describir platos, alergias, quejas, la cuenta, despedir, y más. Cada frase con texto, **pronunciación guiada**, traducción al español y botón para **escuchar** (normal o despacio).
- **📚 Diccionario** — ~94 palabras clave con buscador y audio.
- **🏠 En el local** — indicaciones, direcciones y emergencias.
- **🧠 Evaluación** — quiz de opción múltiple para practicar; al acertar suma a tu avance.
- **📊 Mi Avance** — panel con tu progreso total y por área.

Modos: **Aprender** (lee y escucha cada frase, márcala cuando la domines) y **Practicar** (flashcards español → idioma). El progreso se guarda solo en tu navegador.

## Tecnología

PWA de **un solo archivo** (`index.html`) en **HTML + CSS + JavaScript puro**, sin frameworks ni paso de compilación. Voz con la **Web Speech API** del navegador. Deploy estático en Vercel/Netlify.

> Para oír la pronunciación, el dispositivo necesita tener instalada la **voz del idioma** (en los teléfonos suele venir o se descarga desde Ajustes → Idioma/Voz). Si falta, la app avisa en vez de leerlo con otra voz.

## Cómo verlo en local

No requiere instalación ni compilación. Basta un servidor estático en la raíz:

```bash
npx serve .
```

Y abre la dirección que indique (p. ej. http://localhost:3000).

## Estructura

- `index.html` — toda la app (datos + estilos + lógica).
- `sw.js`, `manifest.json`, `icon-*.png` — PWA (offline e instalable).
- `legacy-react/` — versión anterior en React (archivada, no se usa).

---

Creado por **Jaime Ricardo Peñaloza** · Santiago, Chile.

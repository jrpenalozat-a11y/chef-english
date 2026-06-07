# CLAUDE.md — Garzón Bilingüe

Guía para trabajar en este repositorio. (El proyecto y sus contenidos están en español; responde en español salvo que se pida lo contrario.)

## Qué es

**Garzón Bilingüe** (carpeta/repo `chef-english`) es una **PWA educativa de un solo archivo** para que el personal de servicio gastronómico aprenda idiomas para atender mesas. Cada idioma tiene un **curso de 30 días × 5 frases**, un **diccionario**, una sección **"En el local"**, una **Evaluación** (quiz de opción múltiple) y un panel **Mi Avance** (dashboard de progreso). La voz se genera con la **Web Speech API** del navegador; el progreso se guarda en `localStorage`. **No hay backend ni paso de compilación.**

Idiomas disponibles: inglés (`en`), portugués (`pt`) y chino (`zh`).

> **Rebranding (jun-2026):** se reescribió de **React + Vite a HTML/CSS/JS puro en un solo `index.html`** (como el proyecto hermano *Protocolos de Servicio*), con diseño moderno propio (violeta + coral, fuentes Sora + Inter). El repo y la URL siguen llamándose `chef-english`. El proyecto React anterior quedó archivado en `legacy-react/` (no se usa).

## Stack y arquitectura

- **HTML + CSS + JavaScript puro** en un solo `index.html`. Sin frameworks, sin dependencias, **sin build**.
- PWA: `manifest.json` + `sw.js` (service worker, offline funcional).
- Deploy estático en **Vercel o Netlify** (no compilan: sirven la raíz tal cual).
- **No hay `npm install` ni `npm run build`.** Para verlo en local basta un servidor estático.

## Estructura (raíz)

- `index.html` — **toda la app**: datos (`DATA.en/pt/zh` con `curriculum`, `words`, `local`, `meta`), CSS (tokens en `:root` = claro, `body.dark` = noche), y la lógica (estado, render, audio, eventos por delegación).
- `sw.js` — service worker. Constante `CACHE = "gb-v1"`: **súbela** al cambiar assets del núcleo. HTML va **network-first** (siempre lo más nuevo con conexión); el resto (fuentes, íconos) cache-first.
- `manifest.json` — manifiesto PWA (nombre, íconos, colores).
- `icon-192.png`, `icon-512.png` — íconos PWA (emblema garzón + burbuja de habla).
- `vercel.json` / `netlify.toml` — config de deploy **estático sin build**; sirven `/sw.js` con `Cache-Control: no-cache`.
- `legacy-react/` — **proyecto React anterior archivado** (src, public, dist, package.json, vite.config.js, etc.). No se usa ni se despliega; se conserva como referencia/historial.

## Datos (en `index.html`, objeto `DATA`)

Indexados por código de idioma. Cada idioma tiene:
```js
DATA.en = {
  meta: { flag, name, subtitle, pickLabel, pickSub, pronLabel, voiceLang, voiceMatch, voiceFallback },
  curriculum: [ { day, theme, phrases:[ { <lang>, es, ipa|pron } ] } ],   // 30 días × 5
  words:      [ { <lang>, es, ipa|pron } ],                                // diccionario
  local:      [ { title, phrases:[ { <lang>, es, ipa|pron } ] } ]          // "En el local"
};
```
La **clave del texto destino cambia por idioma**: `ph[lang]` (`en` | `pt` | `zh`), siempre con `es` (traducción) y un campo de pronunciación (`ipa` en inglés, `pron` en pt/zh). Al **agregar o editar un idioma** mantén esta forma y completa `meta`.

## Funciones

- **📖 Curso** — 30 días × 5 frases. Pestañas **Aprender** (tarjeta con texto destino + pronunciación + traducción + escuchar/despacio + "marcar aprendida") y **Practicar** (flashcards destino → español, voltear para revelar).
- **📚 Diccionario** — buscador + ~94 palabras clave por idioma, con escuchar/despacio y check aprendida. El TTS lee sólo el **término principal** (antes de `/` o `(`).
- **🏠 En el local** — Indicaciones · Direcciones · Emergencias.
- **🧠 Evaluación** — quiz de **opción múltiple A/B/C/D** generado del diccionario (muestra el español, eliges la palabra en el idioma; distractores del mismo idioma). Al acertar marca como aprendida y suma al avance. Botón reiniciar.
- **📊 Mi Avance** — dashboard con **anillo** (conic-gradient) de % total + barras por área (Curso / Diccionario / Evaluación) coloreadas según avance (rojo/ámbar/verde).
- **🎉 Celebración** — al completar los 5 puntos de un día: overlay con confeti + fanfarria + frase según el % global + botón **Continuar** (no se cierra sola; red de seguridad a los 15 s).
- **Splash / selector de idioma** — pantalla de bienvenida con animación y selección de idioma (intro con Web Audio). Aparece la 1ª vez por sesión (`sessionStorage gbSplash`); el botón **🌐 Idioma** la reabre.
- **Modo claro/oscuro** (arranca en oscuro), **sonido on/off** (campanita + ticks; no afecta al TTS).
- **📲 Instalar app** — botón en la barra de navegación (usa `beforeinstallprompt`; en iOS muestra instrucciones; se oculta si ya está instalada, `state.installed`).
- **Banner motivacional** — frase entre el encabezado y la barra de botones; rota sola (~11 s), al tocarla y al completar un día (`MOTIVES`, `nextMotive`).
- **Check de día + frases por hito** — al completar un día: ✓ verde en la tarjeta + celebración con frases cómicas según el % global (25/50/75, súper frase al 90%, especial al 100%) — arrays `CEL`/`pickFun`.
- **Invitación cruzada (app hermana)** — tarjeta fija al pie + botón en la celebración del 100% que invitan a **Protocolos de Servicio** (`https://protocolos-servicio.vercel.app`), con el turquesa de esa app. Protocolos hace lo recíproco hacia Garzón Bilingüe.

## Pronunciación (Web Speech API) — IMPORTANTE

`speak(text, slow)` elige voz **por idioma** vía `meta.voiceMatch` (exacta, p.ej. `en-US`) o `voiceFallback` (prefijo, p.ej. `^en`). **Si el dispositivo no tiene voz de ese idioma, NO lo reproduce** (para no leer, p.ej., inglés con acento español): muestra un aviso pidiendo instalar la voz en los ajustes del dispositivo. Los teléfonos suelen traer/descargar esas voces; un PC sólo con voces en español mostrará el aviso. Velocidad: normal `0.85`, lento `0.35`.

## Persistencia (localStorage)

`gbLang` (idioma), `gbDark`, `gbSound`, `gbProgress` (curso, clave `<lang>-<día>-<idx>`), `gbDict` (diccionario por idioma), `gbQuiz` (aciertos del quiz por idioma). **sessionStorage:** `gbSplash`.

## Diseño (identidad propia)

- Acento **violeta** `#6d4fff`/`#8b6bff` + **coral** `#ff6a44`/`#ff7a59` (gradientes). Distinto del turquesa de Protocolos.
- Fuentes **Sora** (títulos) + **Inter** (texto), Google Fonts (cacheadas por el SW).
- Tokens CSS: `:root` = modo claro, `body.dark` = modo noche.

## Cómo trabajar

- **Local primero.** Servir la raíz con cualquier estático, p. ej. `npx serve` (config `chef-english-dev` en `.claude/launch.json`, puerto 5173). El proyecto hermano *protocolos-servicio* tiene además una config de preview `chef-english` en su `.claude/launch.json` (puerto 4322).
- ⚠️ El navegador/servidor puede cachear `index.html`; al verificar cambios usa recarga forzada o `?v=<timestamp>`.
- Push a GitHub → **Vercel auto-despliega** (estático, sin build). URL: https://chef-english.vercel.app · Repo: https://github.com/jrpenalozat-a11y/chef-english
- Al cambiar assets del núcleo, **subir `CACHE` en `sw.js`** (`gb-v1` → `gb-v2`…).

## Pendiente / ideas

1. Incluir frases del **curso** en el quiz (hoy usa sólo el diccionario; las frases son largas para 4 opciones en móvil).
2. Revisar/instalar voces de pt-BR y zh-CN en los dispositivos de prueba.
3. ¿URL propia (`garzon-bilingue.vercel.app`)? Hoy sigue `chef-english`.
4. Afinar contraste del tema claro en alguna pantalla si hace falta.

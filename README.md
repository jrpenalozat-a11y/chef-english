# Chef's English

Aplicación web para aprender inglés orientada al **servicio de mesas en gastronomía**.

## ¿Qué es?

Un curso de 30 días con 5 frases por día, todas enfocadas en situaciones reales del mundo gastronómico: recibir clientes, tomar pedidos, describir platos, manejar quejas, cerrar la cuenta y más.

Cada frase incluye:
- Texto en inglés
- Transcripción fonética (IPA) como guía de pronunciación
- Traducción al español
- Botón para **escuchar** la frase con síntesis de voz

### Modos de uso

- **Aprender** — lee cada frase, escúchala y márcala como dominada cuando la sepas de memoria.
- **Practicar** — flashcards español → inglés: ve la frase en español, intenta traducirla mentalmente y toca para revelar la respuesta en inglés.

El progreso se guarda automáticamente en el navegador (`localStorage`).

---

## Cómo ejecutar en local

### Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior
- npm (incluido con Node.js)

### Pasos

```bash
# 1. Entra a la carpeta del proyecto
cd chef-english

# 2. Instala las dependencias
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

Abre tu navegador en **http://localhost:5173**

### Compilar para producción

```bash
npm run build
npm run preview
```

Los archivos listos para subir a un servidor quedan en la carpeta `dist/`.

---

## Tecnologías

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- Web Speech API (síntesis de voz nativa del navegador)
- Google Fonts: Fraunces + Outfit

## Notas sobre el audio

El botón **◗ escuchar** usa la Web Speech API integrada en el navegador. Funciona en Chrome, Edge y Safari modernos. Firefox puede tener voces limitadas según el sistema operativo.

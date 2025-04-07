# 🎥 Grabador de Pantalla Web

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.2-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC)](https://tailwindcss.com/)

Una aplicación web moderna para grabar tu pantalla directamente desde el navegador. Sin registro, sin instalación, solo graba y descarga.

![Imagen de muestra del Grabador de Pantalla](https://via.placeholder.com/1200x630/3182ce/FFFFFF?text=Grabador+de+Pantalla+Web)

## ✨ Características

- 🖥️ **Grabación Instantánea**: Graba tu pantalla completa, ventana o pestaña específica
- 🔊 **Audio Incluido**: Opción para grabar audio del sistema o micrófono
- 🛠️ **Personalizable**: 
  - Formato de video (WebM/MP4)
  - Cuadros por segundo (15/30/60 FPS)
  - Calidad de video ajustable
- 💾 **Descarga Inmediata**: Sin almacenamiento en la nube, todo queda en tu dispositivo
- 🌗 **Modo Oscuro/Claro**: Se adapta a tus preferencias
- 📱 **Responsive**: Funciona en dispositivos móviles y de escritorio

## 🚀 Demo

Prueba la aplicación en vivo: [URL de la demo](https://screen-recorder-web-demo.vercel.app)

## 🛠️ Tecnologías

- [Next.js](https://nextjs.org/) - Framework de React para aplicaciones web
- [TypeScript](https://www.typescriptlang.org/) - JavaScript con tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario
- [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API) - API nativa para grabación

## 📋 Requisitos

- Node.js 16.0.0 o superior
- NPM o Yarn

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/screen-recorder.git

# Navegar al directorio del proyecto
cd screen-recorder

# Instalar dependencias
npm install
# o
yarn install

# Iniciar servidor de desarrollo
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## 🌐 Despliegue

### Despliegue en Vercel

La forma más sencilla de desplegar esta aplicación es usando [Vercel](https://vercel.com/):

[![Desplegar con Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftu-usuario%2Fscreen-recorder)

### Compilación para producción

```bash
# Compilar para producción
npm run build
# o
yarn build

# Iniciar servidor de producción
npm run start
# o
yarn start
```

## 🔒 Privacidad y Seguridad

- La aplicación funciona completamente en el navegador del cliente
- No se envían datos a ningún servidor
- No se almacenan grabaciones en la nube
- No se utilizan cookies ni rastreadores

## ⚠️ Limitaciones

- La funcionalidad depende del navegador (recomendado: Chrome, Edge o Firefox)
- La grabación de audio del sistema puede requerir configuración adicional
- No todos los formatos de video son compatibles con todos los navegadores

## 🤝 Contribuir

Las contribuciones son bienvenidas y apreciadas. Para contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Contacto

Si tienes preguntas o sugerencias, por favor abre un issue en el repositorio.

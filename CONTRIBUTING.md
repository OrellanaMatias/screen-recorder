# Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto Grabador de Pantalla Web! Valoramos mucho la ayuda de la comunidad.

## Cómo Contribuir

### Reportando Bugs

Si encuentras un bug, por favor abre un issue en GitHub con la siguiente información:

1. Título claro y descriptivo
2. Pasos detallados para reproducir el problema
3. Comportamiento esperado y comportamiento actual
4. Capturas de pantalla (si aplica)
5. Entorno (navegador, sistema operativo, versión)

### Sugerencias de Mejora

Las sugerencias de nuevas características son bienvenidas. Por favor incluye:

1. Una descripción clara de la funcionalidad propuesta
2. Explica por qué sería útil para los usuarios
3. Cualquier detalle o ejemplo de implementación que puedas proporcionar

### Pull Requests

1. Asegúrate de que tu código sigue las convenciones del proyecto
2. Haz los cambios en una rama nueva (no en `main`)
3. Incluye pruebas para los cambios si es posible
4. Actualiza la documentación relevante
5. Asegúrate de que todas las pruebas pasen
6. Referencia el issue que estás resolviendo en tu PR

## Configuración del Entorno de Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/screen-recorder.git

# Navegar al directorio
cd screen-recorder

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Convenciones de Código

### Formato

- Usamos Prettier para el formato del código
- Utilizamos 2 espacios para la indentación
- Punto y coma al final de cada declaración

### Nombrado

- `camelCase` para variables y funciones
- `PascalCase` para componentes de React
- `kebab-case` para archivos CSS y IDs en HTML

### Estructura de Archivos

- Los componentes deben ir en `/src/components`
- Las páginas deben ir en `/src/app`
- Los estilos globales van en `/src/app/globals.css`

## Proceso de Pull Request

1. Actualiza tu fork a la última versión de `main`
2. Crea una rama con un nombre descriptivo
3. Implementa tus cambios
4. Prueba tus cambios localmente
5. Envía el pull request
6. Espera la revisión

## Recursos Útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)

## Código de Conducta

Por favor, sé respetuoso con los demás colaboradores. No toleramos el acoso o comportamiento inapropiado.

## Preguntas

Si tienes alguna pregunta sobre cómo contribuir, no dudes en abrir un issue para discutirlo.

---

¡Gracias por tu contribución! 
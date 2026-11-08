# Registro de Vibe Coding

Este documento registra las etapas de desarrollo, las decisiones tomadas con apoyo de IA y los puntos pendientes. Se actualizará durante el desarrollo.

## Etapa 1: configuración y creación del proyecto

### Prompt principal

> Procedamos a desarrollar el proyecto por etapas. Completa una etapa y analicemos los futuros puntos de mejora para tomarlos en cuenta en el futuro si así es necesario. Empecemos con la configuración y creación del proyecto para poder ir subiendo manualmente los cambios a un repositorio remoto y no perder progreso.

### Iteraciones y decisiones

- Se revisaron los requisitos técnicos del proyecto y se creó el proyecto aislado en `explorador-cine`.
- Se utilizó `create-next-app` con Next.js 16, App Router, TypeScript, Tailwind CSS y ESLint.
- Se eligió pnpm porque está disponible en el entorno; npm no está instalado.
- Se conserva el repositorio Git local generado por el scaffolder. Se confirmó un remoto `origin` ya configurado; no se realizó ningún push.
- Se agregó `.env.example` con los nombres de variables previstos para TMDB. La integración real se realizará en una etapa posterior.
- Se dejó una portada provisional para identificar el proyecto sin adelantar la funcionalidad del MVP.

### Desafíos y resolución

- El entorno no dispone del comando `npm`; se usó pnpm para generar, instalar y ejecutar el proyecto.
- La URL de producción todavía no existe; queda pendiente para la etapa de despliegue. El usuario debe revisar y decidir cuándo publicar el remoto configurado.

### Verificación

- `pnpm lint`: correcto.
- `pnpm typecheck`: correcto.
- `pnpm build`: correcto; la ruta inicial se genera estáticamente.

### Mejoras futuras
- Integrar TMDB en el servidor y definir cómo validar la configuración de entorno.

## Etapa 2: estructura de navegación y rutas

### Prompt principal

> Bien, procedamos a la siguiente etapa.

### Iteraciones y decisiones

- Se reemplazó la portada provisional con una portada de exploración y enlaces a búsqueda de películas y series.
- Se añadieron las rutas `/buscar`, `/favoritos`, `/peliculas/[id]` y `/series/[id]`, además de navegación y pie de página compartidos.
- La búsqueda acepta `q` y `tipo` como parámetros de URL y usa un formulario GET sin JavaScript. Los resultados se mantienen explícitamente como pendiente de integración con TMDB; no se muestran datos ficticios.
- Se añadieron estados globales de carga, error con opción de reintento y página 404.
- Las páginas de rutas utilizan Server Components; el límite de error usa Client Component porque Next.js requiere interacción para `reset`.
- Se mantuvo README sin modificar; su documentación completa se deja para la etapa final.

### Verificación

- `pnpm lint`: correcto.
- `pnpm typecheck`: correcto.
- `pnpm build`: correcto; se generaron las rutas de portada, búsqueda, favoritos, película y serie.
- Pruebas HTTP contra el servidor de producción del proyecto: portada, búsqueda, búsqueda con parámetros, favoritos y ambos detalles devolvieron 200; la ruta inexistente devolvió 404.

### Mejoras futuras

- Integrar TMDB desde el servidor y alimentar portada, búsqueda y páginas de detalle.
- Añadir filtros de género y estados de carga/error específicos al consultar la API.
- Implementar favoritos persistentes en el navegador y conectar los controles con resultados reales.

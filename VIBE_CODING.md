# Registro de Vibe Coding

Este documento registra las etapas de desarrollo, las decisiones tomadas con apoyo de IA y los puntos pendientes. Se actualizará durante el desarrollo.

## Etapa 1: configuración y creación del proyecto

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

## Etapa 3: integración de TMDB

### Iteraciones y decisiones

- Se creó un cliente TMDB exclusivo del servidor (`server-only`), con tipos de dominio, mapeo defensivo de respuestas y errores explícitos para configuración faltante, fallas de red, credenciales rechazadas y respuestas inválidas.
- Se añadieron Route Handlers para tendencias, búsqueda, géneros y detalles. Validan tipo, longitud de consulta e identificador, y nunca exponen el token.
- La portada ahora carga tendencias de películas o series; la búsqueda permite buscar, cambiar tipo y filtrar por género; las páginas de detalle muestran póster, sinopsis, géneros y metadatos cuando la API está disponible.
- Los componentes interactivos usan `useState` y `useEffect`, cancelan peticiones obsoletas, y muestran skeletons, errores recuperables y resultados vacíos.
- Se configuró `next/image` para imágenes alojadas en `image.tmdb.org`.
- `.env.example` documenta el token de lectura necesario; `.env.local` no existe en el entorno y no se añadió ninguna credencial. README no se modificó.

### Desafíos y resolución

- ESLint prohíbe actualizaciones sincrónicas de estado al ejecutar un efecto. El estado de carga se deriva ahora de la correspondencia entre la clave de la petición y la respuesta, evitando renders en cascada y resultados obsoletos.
- No se pudo comprobar una respuesta real de TMDB porque falta `TMDB_API_READ_ACCESS_TOKEN`. Los endpoints responden con un mensaje claro y código 503 en ese caso.

### Verificación

- `pnpm lint`: correcto.
- `pnpm typecheck`: correcto.
- `pnpm build`: correcto; se generaron las cuatro rutas API.
- Pruebas HTTP: parámetros inválidos devuelven 400, configuración faltante devuelve 503 y las rutas de página devuelven 200.

### Mejoras futuras

- Configurar localmente el token de TMDB y probar respuestas reales, incluyendo límites y errores de credenciales.
- Añadir paginación y revisar la relevancia de los resultados de búsqueda.
- Implementar favoritos persistentes y acciones para agregarlos/quitarlos desde las tarjetas y el detalle.

# Explorador de Cine

Aplicación web para descubrir películas y series, consultar sus detalles y guardar favoritos. El proyecto se desarrolla por etapas con Next.js App Router, TypeScript y Tailwind CSS.

## Requisitos

- Node.js 20.9 o superior.
- pnpm 12.
- Una cuenta de [TMDB](https://www.themoviedb.org/) para obtener una API key cuando se implemente la integración de datos.

## Instalación

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

Las variables de TMDB se incorporarán en una etapa posterior. Hasta entonces, no hace falta completar `.env.local`. No compartas ni subas ese archivo; `.env.local` está excluido de Git.

## Comandos

```bash
pnpm dev        # servidor de desarrollo
pnpm lint       # ESLint
pnpm typecheck  # comprobación de TypeScript
pnpm build      # compilación de producción
pnpm start      # servidor de producción local
```

## Estructura inicial

- `src/app/`: rutas y layout de Next.js App Router.
- `public/`: recursos estáticos.
- `.env.example`: inventario de variables de entorno necesarias.

## Control de versiones

El proyecto tiene un repositorio Git local. Para vincularlo con un repositorio remoto creado manualmente:

```bash
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

Los cambios se pueden guardar en checkpoints descriptivos antes de subirlos:

```bash
git add .
git commit -m "descripción breve del cambio"
git push
```

## Despliegue

URL de producción: **pendiente**. En la etapa de despliegue se configurará el proyecto en Vercel u otra plataforma y se añadirá aquí la URL pública.

## Progreso

El alcance de cada etapa, las decisiones técnicas y los desafíos se registran en [VIBE_CODING.md](./VIBE_CODING.md).

# Nexora Solutions — Sitio de agencia digital

SPA para una agencia especializada en **diseño web, soluciones digitales y automatización con IA**.
Estética futurista sobre negro profundo, con acentos neón (cian, azul eléctrico, verde), glassmorphism y animaciones.

**Cada sección es una vista independiente** y se cambia entre ellas desde el menú: no hay scroll continuo entre secciones.

## Stack

| Pieza          | Tecnología                       |
| -------------- | -------------------------------- |
| UI             | React 19                         |
| Bundler        | Vite 7                           |
| Estilos        | Tailwind CSS 4 (configuración CSS-first en `src/index.css`) |
| Animaciones    | Framer Motion 12                 |
| Iconos         | lucide-react                     |

Sin imágenes externas: todas las ilustraciones (panel del hero, mockups del portafolio, diagrama de flujo) están hechas con CSS y SVG.

## Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run preview` sirve la carpeta `dist/` ya compilada.

## Estructura

```
src/
├── App.jsx                     Mapa de vistas y transición entre ellas
├── index.css                   Tokens de diseño, animaciones y utilidades
├── data/site.js                TODO el contenido del sitio (texto, marca, datos)
├── lib/icons.js                Registro de iconos + paleta por acento
├── hooks/useHashRoute.js       Enrutado por hash, sin dependencias
├── views/                      Una vista por entrada del menú
│   ├── Home.jsx                Portada + Servicios + Proceso
│   ├── AutomationView.jsx      Automatización con IA + Beneficios
│   └── Work.jsx                Demos + Equipo
└── components/
    ├── Navbar.jsx              Menú fijo, vista activa, barra de progreso
    ├── Hero.jsx                Titular, CTAs y métricas de confianza
    ├── HeroVisual.jsx          Panel de control futurista animado
    ├── Services.jsx            4 bloques de servicios
    ├── Process.jsx             5 pasos del proceso de trabajo
    ├── Demos.jsx               Demos propias, con filtros por categoría
    ├── Team.jsx                Los tres fundadores
    ├── ProjectMockup.jsx       6 mockups de interfaz en CSS puro
    ├── Automation.jsx          Sección de IA y automatización
    ├── AutomationFlow.jsx      Diagrama de flujo (entradas → motor → salidas)
    ├── Benefits.jsx            "¿Por qué elegirnos?"
    ├── Faq.jsx                 Acordeón accesible
    ├── Contact.jsx             CTA final, canales directos y formulario
    ├── ContactForm.jsx         Formulario con validación
    ├── Footer.jsx              Servicios, sectores, contacto, redes y legal
    ├── FloatingActions.jsx     Burbuja de WhatsApp + volver arriba
    └── ui/                     Aurora, Reveal, SectionHeading, Button,
                                SpotlightCard, NeuralCanvas
```

## Navegación

El enrutado es **por hash**, sin librería de routing ([`useHashRoute.js`](src/hooks/useHashRoute.js)). Se eligió así porque el sitio se publica como estático: los enlaces profundos (`/#portafolio`), el botón atrás del navegador y el refresco de página funcionan sin configurar redirecciones en el hosting.

Son **cinco vistas**, y cada una agrupa las secciones que cuentan una misma historia para que ninguna quede corta:

| Vista            | Hash               | Secciones que contiene              |
| ---------------- | ------------------ | ----------------------------------- |
| Inicio           | `#inicio`          | Portada · Servicios · Proceso       |
| Automatización   | `#automatizacion`  | Automatización con IA · Beneficios  |
| Demos            | `#demos`           | Demos · Equipo                      |
| FAQ              | `#faq`             | Preguntas frecuentes                |
| Contacto         | `#contacto`        | Contacto y formulario               |

- `App.jsx` mantiene el objeto `views`, que asocia cada hash con su componente.
- El menú es el único punto de navegación **entre vistas**. Los CTAs (`Solicitar cotización`, `Agendar diagnóstico`…) apuntan a `#contacto`: son rutas de conversión, no navegación de sección.
- Los hashes que no son vistas **no** cambian de página: el navegador simplemente se desplaza al elemento. Así siguen funcionando anclas internas como `#servicios` o `#proceso` dentro de Inicio, y `#contenido` (el enlace de salto de accesibilidad).
- Al cambiar de vista se sube al inicio de la página y se actualiza el `document.title`.

Para añadir una sección: crear el componente y colgarlo de una vista existente en `src/views/`. Para añadir una vista entera: crear el componente, añadir la entrada en `navLinks` ([`site.js`](src/data/site.js)) y registrarla en `views` ([`App.jsx`](src/App.jsx)).

## Rendimiento

La primera versión consumía alrededor de un 26 % de CPU de forma continua. Los cambios que lo corrigen, de mayor a menor impacto:

1. **Fondo estático.** Los cuatro halos de `Aurora` animaban `opacity` y `scale` sobre elementos de 600 px con `blur(140px)`. Escalar un desenfoque obliga a rasterizarlo entero en cada fotograma, sin parar. Ahora es un único degradado radial que se pinta una vez.
2. **`backdrop-filter` retirado de las tarjetas.** La clase `.glass` lo aplicaba a decenas de elementos, y esa propiedad recompone lo que hay detrás en cada scroll. Sobre fondo oscuro, una capa translúcida da el mismo resultado. Queda `.glass-blur` para lo que sí se superpone al contenido: barra de navegación, menú móvil y botones flotantes.
3. **Sin `filter: blur()` en las animaciones de entrada.** `Reveal` desenfocaba y enfocaba cada bloque al aparecer; ahora solo usa `opacity` y `transform`, que el navegador resuelve en el compositor sin repintar.
4. **Lienzo de la red neuronal más barato.** Fuera `shadowBlur` (un halo por nodo y fotograma era la operación más cara), 34 nodos en lugar de 70 —el cálculo de enlaces es cuadrático—, 30 fps en vez de 60, y parada completa fuera del viewport o con la pestaña en segundo plano.
5. **Menos animación en pantalla.** Al dividir el sitio en vistas, el navegador solo mantiene vivas las animaciones de la sección visible. La vista de inicio, la más cargada, tiene siete elementos animados, todos de `transform` u `opacity`.
6. **Barra de progreso sin muelle.** `useSpring` dejaba un bucle de animación abierto tras cada scroll; el valor directo de `useScroll` no.

Si aun así quieres bajar más el consumo, lo siguiente sería quitar el lienzo del hero ([`NeuralCanvas`](src/components/ui/NeuralCanvas.jsx)) — es la única animación que ejecuta JavaScript de forma continua.

## Antes de publicar

El sitio no contiene ningún dato inventado: no hay testimonios, ni clientes, ni métricas de resultados que no se puedan demostrar. Lo que queda pendiente son datos reales que solo vosotros tenéis.

- [ ] **Marca**: `brand.name` y `brand.suffix` en [`site.js`](src/data/site.js). Actualizar también `package.json` y los metadatos de [`index.html`](index.html).
- [ ] **Contacto**: `brand.email`, `brand.phone` y `brand.whatsapp`. Están marcados con `TODO`. Publicar con un WhatsApp que no existe significa perder todos los contactos que llegue a generar el sitio.
- [ ] **Equipo**: nombres, roles y LinkedIn de los tres, en `team`. Añadir fotos reales mejora la conversión más que cualquier otro cambio de esta lista.
- [ ] **Formulario**: conectar `FORM_ENDPOINT` en [`ContactForm.jsx`](src/components/ContactForm.jsx) a un webhook. Sin eso solo abre WhatsApp y no queda registro.
- [ ] **Precios de la FAQ**: revisar plazos y política de soporte; ahora mismo son valores propuestos, no acordados.
- [ ] **SEO**: URL canónica, Open Graph y el JSON-LD de `index.html` (lleva datos de ejemplo a propósito). Añadir una imagen `og:image` de 1200×630.
- [ ] **Legal**: los enlaces del pie apuntan a `#contacto` como marcador. Crear aviso legal, privacidad y cookies.

Cuando entreguéis los primeros proyectos, la sección de demos se sustituye por casos reales: `demos` pasa a llevar resultados medidos, y conviene recuperar una sección de testimonios con citas de clientes que hayan dado permiso.

## Personalización

### Marca, textos y contacto

Todo vive en [`src/data/site.js`](src/data/site.js): nombre, email, teléfono, WhatsApp, redes, menú, servicios, beneficios, proceso, proyectos, testimonios y FAQ. No hace falta tocar los componentes.

El número de WhatsApp va **solo con dígitos y prefijo de país** (formato de `wa.me`):

```js
whatsapp: '34600123456',
```

### Colores y tipografía

En el bloque `@theme` de [`src/index.css`](src/index.css). Cambiar `--color-neon-cyan`, `--color-neon-green`, etc. repinta el sitio completo, incluidos degradados y resplandores.

### Formulario de contacto

Por defecto **no hay backend**: al enviar se abre WhatsApp con la solicitud ya redactada, y en la pantalla de confirmación se ofrece también el envío por correo.

Para conectar un backend real (webhook de n8n, Formspree, API propia), basta con rellenar la constante al inicio de [`src/components/ContactForm.jsx`](src/components/ContactForm.jsx):

```js
const FORM_ENDPOINT = 'https://tu-webhook.example.com/leads'
```

A partir de ahí el formulario hace `POST` con el JSON de los campos y muestra el mensaje de confirmación estándar.

## SEO

`index.html` incluye idioma `es`, title y meta description, Open Graph, Twitter Card, canonical, `theme-color`, favicon SVG embebido y datos estructurados JSON-LD (`ProfessionalService`).

Antes de publicar conviene actualizar la URL canónica, las de Open Graph y añadir una imagen `og:image` (1200×630).

> **Limitación del enrutado por hash:** para los buscadores todo el sitio es **una sola URL**. El contenido repartido en vistas (servicios, portafolio, FAQ…) no se indexa como páginas separadas, porque el fragmento `#` no llega al servidor.
>
> Si el posicionamiento es un objetivo, hay que pasar a rutas reales (`/servicios`, `/portafolio`) con React Router más prerenderizado, o migrar a Next.js. Mientras el sitio se apoye en tráfico de pago, redes o referidos, el hash no supone ningún problema.

## Accesibilidad y rendimiento

- Enlace "saltar al contenido" y estados de foco visibles en toda la interfaz.
- Acordeón de FAQ con `aria-expanded` / `aria-controls`, menú móvil con `aria-expanded`.
- `prefers-reduced-motion` desactiva animaciones y reduce las transiciones.
- El lienzo de la red neuronal limita la densidad de nodos, se detiene al salir del viewport y no se ejecuta con movimiento reducido.
- Cero imágenes de mapa de bits; solo se descargan las fuentes de Google Fonts.

## Despliegue

El resultado de `npm run build` es estático. Sirve `dist/` en Vercel, Netlify, Cloudflare Pages, GitHub Pages o cualquier hosting.

Para Vercel o Netlify basta con el comando `npm run build` y el directorio de salida `dist`.

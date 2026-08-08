# Fluxo Cloud — Landing page de agencia digital

Sitio one-page para una agencia especializada en **diseño web, soluciones digitales y automatización con IA**.
Estética futurista sobre negro profundo, con acentos neón (cian, azul eléctrico, verde), glassmorphism y animaciones de scroll.

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
├── App.jsx                     Composición de la página
├── index.css                   Tokens de diseño, animaciones y utilidades
├── data/site.js                TODO el contenido del sitio (texto, marca, datos)
├── lib/icons.js                Registro de iconos + paleta por acento
├── hooks/useActiveSection.js   Resalta el enlace del menú según el scroll
└── components/
    ├── Navbar.jsx              Menú fijo, activo por sección, barra de progreso
    ├── Hero.jsx                Titular, CTAs y métricas de confianza
    ├── HeroVisual.jsx          Panel de control futurista animado
    ├── Services.jsx            4 bloques de servicios
    ├── Process.jsx             5 pasos del proceso de trabajo
    ├── Portfolio.jsx           Showcase con filtros por categoría
    ├── ProjectMockup.jsx       6 mockups de interfaz en CSS puro
    ├── Automation.jsx          Sección de IA y automatización
    ├── AutomationFlow.jsx      Diagrama de flujo (entradas → motor → salidas)
    ├── Benefits.jsx            "¿Por qué elegirnos?"
    ├── Testimonials.jsx        Testimonios + marquesina de clientes
    ├── Faq.jsx                 Acordeón accesible
    ├── Contact.jsx             CTA final, canales directos y formulario
    ├── ContactForm.jsx         Formulario con validación
    ├── Footer.jsx              Pie con navegación y redes
    ├── FloatingActions.jsx     Burbuja de WhatsApp + volver arriba
    └── ui/                     Aurora, Reveal, SectionHeading, Button,
                                SpotlightCard, NeuralCanvas
```

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

## Accesibilidad y rendimiento

- Enlace "saltar al contenido" y estados de foco visibles en toda la interfaz.
- Acordeón de FAQ con `aria-expanded` / `aria-controls`, menú móvil con `aria-expanded`.
- `prefers-reduced-motion` desactiva animaciones y reduce las transiciones.
- El lienzo de la red neuronal limita la densidad de nodos, se detiene al salir del viewport y no se ejecuta con movimiento reducido.
- Cero imágenes de mapa de bits; solo se descargan las fuentes de Google Fonts.

## Despliegue

El resultado de `npm run build` es estático. Sirve `dist/` en Vercel, Netlify, Cloudflare Pages, GitHub Pages o cualquier hosting.

Para Vercel o Netlify basta con el comando `npm run build` y el directorio de salida `dist`.

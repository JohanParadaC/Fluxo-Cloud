# Fluxo Cloud

Landing page one-page de una agencia de diseño web y automatización con IA, con el flujo de n8n que capta y puntúa los leads y el panel interno para trabajarlos. React 19 y Vite, tres dependencias, 81 KB de JavaScript inicial.

![Fluxo Cloud](docs/screenshot.png)

**[Ver la demo en vivo →](https://www.fluxocloudlabs.net/)**

![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=61DAFB&labelColor=04060c)
![Vite 7](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff&labelColor=04060c)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=fff&labelColor=04060c)
![JS inicial 81 KB gzip](https://img.shields.io/badge/JS_inicial-81_KB_gzip-22C55E?labelColor=04060c)

## El problema

Una agencia pequeña recibe pocos leads y no puede permitirse perder ninguno. Lo habitual es una web que tarda en cargar en un móvil con mala cobertura y un formulario que dispara un correo suelto, que alguien acaba leyendo dos días tarde.

Aquí la web carga con 81 KB de JavaScript y el formulario entra en un flujo de n8n que valida, puntúa y clasifica cada solicitud en menos de dos segundos, avisa al equipo y la deja en un panel interno con su prioridad y su plazo. Pensado para negocios que trabajan los leads a mano y necesitan saber a cuál llamar primero.

## Resultado

De la primera versión a la actual, tras partir el sitio por vistas y quitar la librería de animación:

| | Antes | Ahora |
| --- | --- | --- |
| JavaScript inicial | 133 KB gzip | **81 KB gzip** |
| Dependencias | 4 | 3 |
| Vistas | todo en un archivo | 4 chunks aparte |

## Stack

| Pieza          | Tecnología                       |
| -------------- | -------------------------------- |
| UI             | React 19                         |
| Bundler        | Vite 7                           |
| Estilos        | Tailwind CSS 4 (configuración CSS-first en `src/index.css`) |
| Animaciones    | CSS + IntersectionObserver (sin librería) |
| Iconos         | lucide-react                     |

Tres dependencias en total, y cada vista se descarga aparte cuando se pide.

Sin imágenes externas: todas las ilustraciones (panel del hero, mockups del portafolio, diagrama de flujo) están hechas con CSS y SVG.

## Decisiones técnicas

### Tres dependencias, y ninguna para animar

El sitio depende de React, ReactDOM y lucide-react. No hay librería de animación: las entradas al hacer scroll son CSS disparado por un `IntersectionObserver` de cuarenta líneas ([`useInView`](src/hooks/useInView.js)), y todo lo demás son transiciones y `@keyframes`. Antes estaba Framer Motion y se quitó.

El detonante no fue una auditoría de peso, sino que la página iba lenta y el consumo de memoria era alto. Quitarla arregló las dos cosas a la vez: el JavaScript inicial bajó de 133 a 81 KB comprimidos y las dependencias de cuatro a tres.

El precio es que solo se animan `opacity` y `transform`, las dos propiedades que el navegador resuelve en el compositor sin recalcular layout. Eso descarta secuencias encadenadas, animaciones de layout y gestos; cualquiera de esas cosas habría que escribirla a mano o volver a meter la librería. A cambio, apagar todo el movimiento para `prefers-reduced-motion` es una regla de CSS ([`index.css:429`](src/index.css#L429)) en lugar de condicionales repartidos por los componentes. El mismo criterio rige el lienzo de la red neuronal: sin `shadowBlur`, 34 nodos como techo porque el cálculo de enlaces es cuadrático, 30 fps en vez de 60, y parado fuera del viewport y con la pestaña de fondo. Esos límites salieron de medir en un dispositivo real, no de estimar.

### Enrutado por hash en lugar de rutas reales

Las vistas viven en `#inicio`, `#automatizacion`, `#demos`, `#faq` y `#contacto`, resueltas por [`useHashRoute`](src/hooks/useHashRoute.js) en treinta líneas y sin dependencias. La alternativa era React Router con rutas reales.

Con hash, los enlaces profundos, el botón atrás y el refresco de página funcionan sin configurar una sola redirección en el hosting. El `dist/` se sirve igual en Vercel, Netlify, Cloudflare Pages o GitHub Pages, y GitHub Pages ni siquiera admite las reescrituras que exigirían las rutas reales.

Se paga en dos sitios. Las URLs llevan `#`, que se ve peor y no reparte autoridad de buscador entre las vistas. Y el seguimiento automático de cualquier herramienta de analítica cuenta una sola página para todo el sitio, porque el hash no viaja al servidor. Eso obligó a la decisión siguiente.

### Analítica sin cookies, con las vistas contadas a mano

[`analytics.js`](src/lib/analytics.js) admite Umami o Plausible, elegidos por variable de entorno. Sin proveedor configurado no se descarga ningún script y las llamadas a `track` no hacen nada. La alternativa era Google Analytics 4.

Ninguno de los dos usa cookies, así que no hace falta banner de consentimiento: una pieza de interfaz que tapa el contenido justo en la primera impresión y que hay que mantener. Y pesan una fracción de lo que pesa GA4, que en un sitio cuyo argumento son 81 KB habría sido incoherente.

Se renuncia a los informes de audiencia, demografía y atribución multicanal que GA4 da hechos. Y por el enrutado por hash, el registro automático es inservible: el script arranca con `data-auto-track` en `false` y cada cambio de vista llama a `registrarVista` desde `App.jsx`. Es deuda asumida y tiene un filo: si alguien añade una vista y olvida esa llamada, esa vista deja de contarse y nada falla de forma visible.

### n8n como motor de los flujos, y reglas explícitas en vez de IA

El formulario entra en un flujo de n8n que valida, puntúa, clasifica en A/B/C/D, escribe en Google Sheets, avisa al equipo por Telegram y responde al cliente. Se descartó una función serverless en Vercel, que salía gratis y sin infraestructura nueva, y se descartó un modelo de lenguaje para calificar.

La razón de n8n no es técnica: la agencia vende automatización con n8n, así que el flujo que capta sus propios leads es la demo que se enseña en la llamada de venta. Una función serverless habría hecho el mismo trabajo sin nada que enseñar. El coste es que hay que mantener una instancia de n8n con URL pública, y si se cae, el formulario deja de registrar: por eso [`ContactForm`](src/components/ContactForm.jsx) recurre a WhatsApp cuando no hay endpoint configurado, aunque entonces la solicitud no quede guardada en ningún sitio.

La puntuación por reglas es gratis, instantánea y auditable: siempre se puede decir por qué un lead sacó su nota, y los pesos están declarados al principio del nodo para ajustarlos con datos reales. Un modelo cobraría por lead, añadiría latencia y devolvería un número que nadie puede justificar. A cambio, las reglas no leen matices — un mensaje mal escrito de un cliente excelente puntuará bajo — y hay que recalibrarlas a mano cuando haya cierres reales que mirar.

### El panel esquiva la comprobación previa de CORS

El panel lee con `GET` y la clave en la URL, y escribe con `POST` de `text/plain` llevando un JSON dentro que n8n parsea en el primer nodo ([`api.js`](panel/src/lib/api.js)). Lo evidente habría sido una cabecera `Authorization` y `Content-Type: application/json`.

Así construidas, las dos peticiones son “peticiones simples” y el navegador no lanza `OPTIONS`. Cualquier cabecera propia o `application/json` obligaría a que n8n respondiera bien al preflight, que es la causa más común de que este tipo de paneles funcione en local y falle al desplegarlo.

El precio se paga en seguridad y está asumido por escrito en [panel/README.md](panel/README.md): la clave viaja en la URL, así que aparece en los registros del servidor y en el historial del navegador; es la misma para todo el equipo, no distingue quién hizo cada cambio, y revocarle el acceso a una persona obliga a cambiarla para todas. Quien valida de verdad es n8n — la pantalla de entrada solo evita mostrar la interfaz — y el día que entre un cliente que deba ver solo lo suyo, hay que pasar a autenticación por usuario.

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

| Carpeta | Qué es |
| --- | --- |
| raíz | Web pública (este documento) |
| [`panel/`](panel/README.md) | Panel interno de leads — proyecto y despliegue aparte |
| [`automations/`](automations/captacion-leads/README.md) | Flujos de n8n: captación, calificación y API del panel |

```
src/
├── App.jsx                     Mapa de vistas, carga diferida y transiciones
├── index.css                   Tokens de diseño, animaciones y utilidades
├── data/site.js                TODO el contenido del sitio (texto, marca, datos)
├── lib/
│   ├── icons.js                Registro de iconos + paleta por acento
│   └── analytics.js            Umami o Plausible, y los eventos de conversión
├── hooks/
│   ├── useHashRoute.js         Enrutado por hash, sin dependencias
│   └── useInView.js            IntersectionObserver para las entradas al scroll
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
    ├── BookingModal.jsx        Agenda de Cal.com en un modal
    ├── Footer.jsx              Servicios, cómo trabajamos, contacto y legal
    ├── FloatingActions.jsx     Burbuja de WhatsApp + volver arriba
    └── ui/                     Aurora, Reveal, SectionHeading, Button,
                                SpotlightCard, NeuralCanvas
```

## Agenda y analítica

Las dos se activan solas al rellenar su variable en `.env`; vacías, el sitio funciona igual que antes.

**Agenda** (`VITE_CAL_LINK`): con un enlace de Cal.com, "Agendar diagnóstico" abre el calendario en un modal y la reunión queda reservada sin intercambiar mensajes. Se usa un `iframe` en lugar del script de incrustación oficial para no cargar JavaScript de terceros en todas las visitas: solo se descarga al pulsar. El modal lleva un enlace de salida por si el calendario no carga dentro del marco.

**Analítica** (`VITE_ANALYTICS_*`): admite Umami y Plausible, los dos sin cookies y sin banner de consentimiento. Como las rutas van por hash, las vistas se registran a mano en cada cambio; el seguimiento automático contaría una sola página para todo el sitio.

Los eventos de conversión están centralizados en [`src/lib/analytics.js`](src/lib/analytics.js): clic en WhatsApp, apertura de la agenda, envío del formulario, correo y teléfono. Sin proveedor configurado, las llamadas no hacen nada.

Lo más razonable es **Umami autoalojado en el VPS**: gratis y los datos de los visitantes no salen de nuestra máquina.

## Animaciones

El mecanismo, explicado en [Decisiones técnicas](#tres-dependencias-y-ninguna-para-animar): `[data-reveal]` en `index.css` define la animación y [`useInView`](src/hooks/useInView.js) decide cuándo dispararla.

Cada vista se carga cuando se pide, y se precarga al pasar el ratón por su enlace del menú, así que al pulsar ya suele estar descargada.

## Personalización

### Marca, textos y contacto

Todo vive en [`src/data/site.js`](src/data/site.js): nombre, email, teléfono, WhatsApp, redes, menú, servicios, beneficios, proceso, proyectos, testimonios y FAQ. No hace falta tocar los componentes.

El número de WhatsApp va **solo con dígitos y prefijo de país** (formato de `wa.me`):

```js
whatsapp: '573001234567',
```

### Colores y tipografía

Estética futurista sobre negro profundo, con acentos neón (cian, azul eléctrico, verde), glassmorphism y animaciones de scroll. Todo sale de tokens.

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

`vercel.json` fija dos cosas. Su esquema no admite comentarios, así que el porqué vive aquí:

- **Caché de `/assets/*`**: Vite pone un hash de contenido en cada nombre de archivo, así que un cambio genera un nombre nuevo. Se pueden cachear para siempre (`immutable`) sin riesgo de servir una versión vieja. Sin esto, cada visita revalida el bundle entero.
- **Cabeceras de seguridad** en todas las rutas: `nosniff`, `SAMEORIGIN`, `Referrer-Policy` y `Permissions-Policy`. No cuestan rendimiento y evitan que la web se incruste en un iframe ajeno o que el navegador adivine tipos MIME.

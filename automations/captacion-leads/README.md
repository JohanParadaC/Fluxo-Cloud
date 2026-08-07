# Captación y calificación de leads

Flujo de n8n que recibe el formulario de la web, filtra bots, puntúa cada solicitud, la clasifica en A/B/C/D, la guarda en una hoja de cálculo, avisa al equipo y responde al cliente. Todo en menos de dos segundos y con herramientas gratuitas.

```
Formulario web
      │
      ▼
  Webhook  ──►  Normalizar y validar  ──►  ¿Datos válidos?
                                              │        │
                                             sí        no ──►  HTTP 400
                                              ▼
                                    Calificar y clasificar
                                              │
        ┌──────────────┬──────────────┬───────┴──────┬──────────────┐
        ▼              ▼              ▼              ▼              ▼
  Responder al   Fila para la    Telegram      WhatsApp      Autorespuesta
   sitio web        hoja          (equipo)   (desactivado)    al cliente
                     │
                     ▼
              Google Sheets
```

`Responder al sitio web` va en su propia rama para que el formulario no espere a Google Sheets ni a Gmail. El visitante ve la confirmación al instante aunque un servicio externo vaya lento.

## Puesta en marcha

### 1. Levantar n8n

Gratis y en tu máquina:

```bash
npx n8n
```

Abre `http://localhost:5678`. Para producción necesitas n8n en un servidor con URL pública (n8n Cloud, un VPS de 5 €/mes, Railway o Render): un webhook en `localhost` no lo puede llamar tu web publicada.

### 2. Importar el flujo

En n8n: menú **⋯ → Import from File** y selecciona `workflow.json`.

### 3. Crear la hoja de cálculo

Hoja nueva en Google Sheets, pestaña llamada **Leads**, y esta fila 1 exacta (los nombres deben coincidir, el nodo mapea por nombre de columna):

```
ID	Fecha	Nombre	Email	Telefono	Empresa	Servicio	Presupuesto	Mensaje	Score	Clasificacion	Estado	Accion	ResponderAntesDe	Motivos	Origen	Pagina
```

Copia el ID de la hoja desde su URL:

```
https://docs.google.com/spreadsheets/d/  ESTO_ES_EL_ID  /edit
```

y pégalo en el nodo **Guardar en Google Sheets**, donde ahora pone `PEGA_AQUI_EL_ID_DE_TU_HOJA`.

### 4. Crear el bot de Telegram

Dos minutos y sin coste:

1. Escribe a **@BotFather** en Telegram → `/newbot` → te da un token.
2. En n8n, credencial nueva de tipo *Telegram API* con ese token.
3. Escríbele algo a tu bot desde el grupo o chat donde queráis los avisos.
4. Abre `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` y copia el `chat.id`.
5. Pégalo en el nodo **Avisar al equipo (Telegram)**.

### 5. Conectar Gmail

Credencial *Gmail OAuth2* en el nodo **Autorespuesta al cliente**. Con la cuenta de Google del negocio.

### 6. Enlazar la web

Activa el flujo (interruptor **Active** arriba a la derecha), copia la **Production URL** del nodo webhook y pégala en el `.env` del sitio:

```
VITE_FORM_ENDPOINT=https://tu-n8n.com/webhook/captacion-leads
```

Reconstruye la web (`npm run build`) y envía una solicitud de prueba.

## Cómo puntúa

Reglas explícitas, sin IA. Es gratis, instantáneo y siempre puedes explicar por qué un lead sacó la nota que sacó. Los pesos están al principio del nodo **Calificar y clasificar**.

| Señal | Puntos |
| --- | --- |
| Presupuesto > 7.000 € | +35 |
| Presupuesto 3.000-7.000 € | +28 |
| Presupuesto 1.000-3.000 € | +20 |
| Presupuesto sin definir | +12 |
| Presupuesto < 1.000 € | +6 |
| Pide automatización o chatbot | +12 |
| Pide tienda online | +10 |
| Pide web o landing | +7 |
| Dejó teléfono | +12 |
| Email de dominio propio | +10 |
| Mensaje de 250 caracteres o más | +12 |
| Indicó empresa | +8 |
| Señales de urgencia en el texto | +8 |
| Pide trabajo gratis o "a cambio de visibilidad" | **−25** |

| Nivel | Puntos | Qué hacer | Plazo |
| --- | --- | --- | --- |
| **A · Caliente** | 65-100 | Llamar hoy | 2 h |
| **B · Templado** | 40-64 | Propuesta con precio cerrado | 24 h |
| **C · Frío** | 22-39 | Responder pidiendo concretar | 48 h |
| **D · Revisar** | 0-21 | Mirar a mano antes de invertir tiempo | 72 h |

Los umbrales están calibrados para que un negocio local con correo de Gmail y 1.000-3.000 € de presupuesto siga siendo un **lead B**: la mayoría de los pequeños negocios no tienen dominio propio y son clientes perfectamente buenos.

**Recalibra con datos reales.** Cuando tengáis 20 o 30 leads y sepáis cuáles cerraron, mirad la columna `Score` de los que compraron. Si los clientes reales sacaban 45 y vosotros llamabais solo a los de 65, estáis dejando dinero en la mesa.

## Filtro de bots

Tres barreras antes de tocar ningún servicio externo:

1. **Campo trampa** — un `input` oculto que una persona no ve y un bot rellena.
2. **Tiempo de envío** — menos de 3 segundos desde que se abrió el formulario.
3. **Contenido** — tres o más enlaces, u ofertas típicas de SEO y cripto.

Lo que no pasa el filtro recibe un HTTP 400 y no llega ni a la hoja ni a Telegram.

## Activar WhatsApp

El nodo **Avisar al equipo (WhatsApp)** viene desactivado porque la API de WhatsApp Cloud exige verificar el negocio en Meta, y eso tarda días. Mientras tanto Telegram cumple la misma función.

Cuando Meta apruebe el número: credencial *WhatsApp Business Cloud* en n8n, rellenar `phoneNumberId` y el número de destino, y activar el nodo con clic derecho → *Activate*. Ya usa `notifyPlain`, que es el mismo mensaje sin etiquetas HTML.

Para vosotros esto es doblemente útil: es vuestra automatización funcionando sobre vuestro propio negocio. Es la demo que enseñáis en las llamadas de venta.

## Detalles de diseño

**La autorespuesta es la misma para todos.** No cambia según la puntuación. Un lead con nota baja no es un mal cliente, solo uno que dio menos datos; tratarlo peor por eso se nota y sale caro. Lo que cambia según la nota es la prioridad interna, no el trato.

**Sin IA en la calificación.** Un modelo costaría dinero por cada lead, añadiría latencia y daría resultados que no se pueden auditar. Con estas reglas sabéis exactamente por qué cada lead sacó su nota. Si más adelante queréis IA, el sitio natural es un nodo extra que resuma el mensaje y proponga un enfoque de venta — no que sustituya la puntuación.

**Columna `Estado`.** La hoja escribe `Nuevo` en cada fila. Cambiadlo a mano a `Contactado`, `Propuesta enviada`, `Ganado` o `Perdido`. Eso es un CRM suficiente para los primeros 100 clientes, y es gratis.

## Próximos pasos

- **Deduplicación**: buscar el email en la hoja antes de insertar; si ya existe, marcarlo como contacto recurrente (+10 puntos, es buena señal).
- **Seguimiento automático**: un flujo programado que revise la columna `ResponderAntesDe` y avise de los leads sin respuesta fuera de plazo.
- **Secuencia de nutrición** para los C y D: tres correos espaciados en dos semanas.
- **Origen de campaña**: leer `utm_source` de la URL y guardarlo, para saber qué canal trae los leads que cierran.

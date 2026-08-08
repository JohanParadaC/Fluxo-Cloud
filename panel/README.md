# Panel de leads

Herramienta interna para trabajar los leads que captura el flujo de n8n: verlos, priorizarlos y moverlos por el embudo sin abrir la hoja de cálculo.

Es una aplicación aparte de la web pública, con su propio `package.json` y su propio despliegue. Comparte los tokens de diseño para que se vea de la misma familia, pero **la web de marketing no carga ni un byte de este código**.

## Arrancar

```bash
npm --prefix panel install
```

```bash
npm --prefix panel run dev
```

Se abre en `http://localhost:5174`. Sin configurar nada arranca en **modo demo** con doce leads de ejemplo, así que se puede desarrollar y enseñar sin tener n8n levantado.

## Conectar con n8n

1. Importa `automations/captacion-leads/panel-api.json` en n8n.
2. Cambia `CAMBIA_ESTA_CLAVE` en los **dos** nodos de comprobación (deben coincidir) y pega el ID de tu hoja en los dos nodos de Google Sheets.
3. Activa el flujo.
4. Copia `panel/.env.example` a `panel/.env` y pon la URL base:

```
VITE_API_URL=https://n8n.tudominio.com/webhook
```

Al arrancar, el panel pedirá la clave. Se valida contra n8n y se guarda en el navegador.

## Qué hace

**Resumen**: leads del mes, cuántos de nivel A siguen sin contactar, cuántos se han pasado del plazo y la tasa de cierre. Los dos del medio son los accionables: si están en cero, no hay nada urgente.

**Tabla** con filtro por nivel (A/B/C/D) y por estado, búsqueda libre y tres ordenaciones. Los leads fuera de plazo se marcan en rojo.

**Detalle** al pulsar una fila: mensaje completo, desglose de por qué sacó esa puntuación, botones directos de WhatsApp y correo con el texto ya preparado, y el siguiente paso recomendado. Se cierra con `Escape`.

**Cambio de estado** desde la tabla o desde el detalle: Nuevo → Contactado → Propuesta enviada → Ganado / Perdido. Se escribe de vuelta en la hoja a través de n8n.

## Decisiones de diseño

**El cambio de estado es optimista.** La fila cambia en pantalla al instante y, si n8n falla, se revierte y aparece el error. Escribir en una hoja de cálculo tarda un par de segundos, y esperar sin respuesta se siente roto.

**Sin `application/json` en las peticiones.** La lectura va por `GET` con la clave en la URL y la escritura por `POST` con el cuerpo en `text/plain`. Las dos son "peticiones simples", así que el navegador no lanza la comprobación previa de CORS. Es la causa más común de que este tipo de paneles no funcione al desplegarlos, y así se evita de raíz.

**Sin librería de animación.** El panel se usa a diario y con muchas filas en pantalla; las transiciones son CSS puro. Pesa 73 KB comprimido frente a los 133 KB de la web pública.

**El estado válido se valida en n8n, no aquí.** El nodo comprueba que el estado esté en la lista antes de escribir en la hoja, así que manipular la petición desde el navegador no permite meter cualquier cosa.

## Seguridad: léelo antes de dar acceso a nadie

La clave compartida **sirve para vosotros tres y para nadie más**.

Quien valida de verdad es n8n; la pantalla de entrada solo evita mostrar la interfaz. Pero la clave es la misma para todos, viaja al navegador y no distingue quién la usa. Eso significa que:

- No se puede saber quién cambió qué
- Revocar el acceso a una persona obliga a cambiarla para todos
- **Todos ven todos los leads**

En cuanto entre el primer cliente que deba ver solo lo suyo, hay que pasar a autenticación real por usuario (Supabase Auth con seguridad por fila es el camino más corto). Dejarlo como está sería exponer los datos de un cliente a otro.

El campo `cliente` ya viaja en los datos desde el primer día precisamente para que esa migración no obligue a rehacer el flujo.

## Desplegar

`npm --prefix panel run build` genera `panel/dist/`, que son archivos estáticos. Sirven en cualquier sitio: Vercel, Netlify, Cloudflare Pages o vuestro VPS con Caddy.

Si lo servís en el mismo dominio que n8n a través de un proxy inverso, desaparece el problema de CORS por completo. Ejemplo con Caddy:

```
panel.tudominio.com {
    handle /webhook/* {
        reverse_proxy localhost:5678
    }
    handle {
        root * /var/www/panel
        try_files {path} /index.html
        file_server
    }
}
```

Con esa configuración, `VITE_API_URL` pasa a ser simplemente `/webhook`.

Un detalle: `index.html` lleva `noindex, nofollow`. Es una herramienta interna y no debe aparecer en buscadores.

# Player clock — a Kino plugin that uses the player slot

The time and the date in the top-right corner of Kino's TV player, with no network. It is a small example of the
**player slot** (plugin `apiVersion` 23): one `overlay` text element (shown with the player controls), `HH:mm` on the first
line and the date on the second, in Spanish or English by the person's language. Kino asks again every 60 seconds.

Version 1.1.0 adds a settings form (Ajustes ▸ Plugins ▸ the plugin ▸ Configurar), so the person can dress the clock:

- **Time zone:** the device's own by default, or a fixed UTC offset (UTC-5, UTC+5:30...). Offsets do not follow daylight saving
  time.
- **Look:** text size, letter weight (extra light to bold), letter colour and the pill behind the text (including none).
- **Position:** a horizontal and a vertical nudge.

The plugin passes them to Kino as `size`, `weight`, `color`, `background`, `left` and `top` on its text item; Kino validates
them and keeps the text readable (see "The player slot" in the plugin guide).

> **Status.** `apiVersion` 23 is not in a published Kino yet (it arrives with the next version, provisionally 0.9.83), so
> this plugin cannot be installed from a released build today. This repository is deliberately **not discoverable** in
> Kino's community search (it has no `kino-plugin` topic): it is a reference to read and copy, not a plugin to install.

## What is in it

```
kino-plugin.json   the manifest: capabilities ["playerSlot"], the slot block (one overlay text element "clock") and the settings form
plugin.js          what Kino loads: one ES module (generated from src/)
src/clock.js       clockText(date, lang, offset): "21:05\nmié 4 nov", and offsetMinutes(setting) — pure, so they are easy to test
src/index.js       the entry: playerSlot(context) and playerSlotAction()
scripts/build.mjs  bundles src/ into plugin.js (Kino loads exactly one file)
test/              node --test
```

The manifest, without the options of each setting (see `kino-plugin.json` for the whole form, with its English texts):

```json
{
  "id": "player-clock",
  "name": "Reloj del reproductor",
  "version": "1.1.0",
  "apiVersion": 23,
  "entry": "plugin.js",
  "discoverable": false,
  "hosts": ["kinotvapp.github.io"],
  "capabilities": ["playerSlot"],
  "slot": { "elements": [{ "id": "clock", "kind": "text", "mode": "overlay" }] },
  "settings": [
    { "key": "timezone", "type": "select", "default": "auto" },
    { "key": "size", "type": "select", "default": "normal" },
    { "key": "weight", "type": "select", "default": "auto" },
    { "key": "color", "type": "select", "default": "auto" },
    { "key": "background", "type": "select", "default": "default" },
    { "key": "left", "type": "select", "default": "0" },
    { "key": "top", "type": "select", "default": "0" }
  ]
}
```

- A `fixed` element is always on screen, so Kino asks the person to approve it at install (a red line). An `overlay` element,
  shown only with the player controls, does not: this clock is `overlay`.
- `playerSlot(context)` answers `{ items: [{ id: "clock", text }], refreshMs: 60000 }`. 60 000 ms is the longest refresh Kino
  allows; the shortest is 2 000.
- `playerSlotAction` is required by the capability. This slot has no button, so Kino never calls it.
- `hosts` is required by the manifest rules (it may be empty only with a `url` setting), so it names `kinotvapp.github.io`;
  the plugin never calls it.

## Try it

You need Node 20+ and the plugin kit from [`kinotvapp/kino-plugin-sdk`](https://github.com/kinotvapp/kino-plugin-sdk)
(copy its `sdk/` folder next to this one):

```bash
node --test                                    # the clock's text (test/)
node scripts/build.mjs --check                 # plugin.js is what src/ builds to
node sdk/validate.mjs .                        # validates the manifest; prints the consent line
node sdk/run.mjs . playerSlot                  # the frame Kino keeps
node sdk/run.mjs --config timezone=-5 --config size=large . playerSlot   # with settings
node sdk/run.mjs --context '{"lang":"en-US"}' . playerSlot
```

The full rules of the slot (up to three elements across plugins, text of at most two lines, icons, images and buttons,
`playerSlotAction`, what happens in live TV and in the background) are in the plugin guide:
<https://kinotvapp.github.io/kino-plugins/>.

## Licence

Apache-2.0 (see `LICENSE` and `NOTICE`).

---

# Reloj del reproductor — un plugin de Kino con el hueco del reproductor

La hora y la fecha en la esquina superior derecha del reproductor de Kino en la TV, sin red. Es el ejemplo más pequeño del
**hueco del reproductor** (`apiVersion` 23 de los plugins): un texto `overlay` (sale con los controles del reproductor), la hora
en la primera línea y la fecha en la segunda, en español o inglés según el idioma de la persona. Kino lo consulta cada 60
segundos.

La versión 1.1.0 trae un formulario de ajustes (Ajustes ▸ Plugins ▸ el plugin ▸ Configurar) para que la persona vista el reloj:
zona horaria (la del aparato por defecto, o un desfase fijo respecto de UTC, sin horario de verano), tamaño, grosor, color de
la letra, fondo de la pastilla (o ninguno) y un desplazamiento horizontal y vertical.

> **Estado.** El `apiVersion` 23 aún no está en una versión publicada de Kino (llega con la próxima, provisionalmente la
> 0.9.83), así que hoy no se puede instalar desde una versión publicada. Este repositorio **no es descubrible** a propósito
> en la búsqueda de la comunidad de Kino (no lleva el tema `kino-plugin`): es una referencia para leer y copiar.

Cómo se prueba y qué contiene: mira la sección en inglés de arriba (los comandos y los archivos son los mismos). La guía
completa de plugins está en <https://kinotvapp.github.io/kino-plugins/>.

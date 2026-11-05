# Player clock — a Kino plugin that uses the player slot

The time and the date in the top-right corner of Kino's TV player, with no network. It is the smallest example of the
**player slot** (plugin `apiVersion` 23): one `fixed` text element, `HH:mm` on the first line and the date on the second, in
Spanish or English by the person's language. Kino asks again every 60 seconds.

> **Status.** `apiVersion` 23 is not in a published Kino yet (it arrives with the next version, provisionally 0.9.83), so
> this plugin cannot be installed from a released build today. This repository is deliberately **not discoverable** in
> Kino's community search (it has no `kino-plugin` topic): it is a reference to read and copy, not a plugin to install.

## What is in it

```
kino-plugin.json   the manifest: capabilities ["playerSlot"] and the slot block (one fixed text element "clock")
plugin.js          what Kino loads: one ES module (generated from src/)
src/clock.js       clockText(date, lang): "21:05\nmié 4 nov" — pure, so it is easy to test
src/index.js       the entry: playerSlot(context) and playerSlotAction()
scripts/build.mjs  bundles src/ into plugin.js (Kino loads exactly one file)
test/              node --test
```

The manifest, in full:

```json
{
  "id": "player-clock",
  "name": "Reloj del reproductor",
  "version": "1.0.0",
  "apiVersion": 23,
  "entry": "plugin.js",
  "capabilities": ["playerSlot"],
  "slot": { "elements": [{ "id": "clock", "kind": "text", "mode": "fixed" }] }
}
```

- A `fixed` element is always on screen, so Kino asks the person to approve it at install (a red line). An `overlay` element,
  shown only with the player controls, does not.
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
**hueco del reproductor** (`apiVersion` 23 de los plugins): un texto `fixed`, la hora en la primera línea y la fecha en la
segunda, en español o inglés según el idioma de la persona. Kino lo consulta cada 60 segundos.

> **Estado.** El `apiVersion` 23 aún no está en una versión publicada de Kino (llega con la próxima, provisionalmente la
> 0.9.83), así que hoy no se puede instalar desde una versión publicada. Este repositorio **no es descubrible** a propósito
> en la búsqueda de la comunidad de Kino (no lleva el tema `kino-plugin`): es una referencia para leer y copiar.

Cómo se prueba y qué contiene: mira la sección en inglés de arriba (los comandos y los archivos son los mismos). La guía
completa de plugins está en <https://kinotvapp.github.io/kino-plugins/>.

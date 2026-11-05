import { test } from "node:test";
import assert from "node:assert/strict";
import { clockText, langOf, offsetMinutes } from "../src/clock.js";

// 2026-11-04 21:05 local time (a Wednesday).
const NOW = new Date(2026, 10, 4, 21, 5);

test("Spanish by default: time, then the date", () => {
  assert.equal(clockText(NOW, undefined), "21:05\nmié 4 nov");
  assert.equal(clockText(NOW, "es-CO"), "21:05\nmié 4 nov");
});

test("English when the language starts with en", () => {
  assert.equal(clockText(NOW, "en-US"), "21:05\nWed Nov 4");
  assert.equal(langOf("EN"), "en");
});

test("the time is zero-padded", () => {
  assert.equal(clockText(new Date(2026, 0, 2, 3, 4), "es").split("\n")[0], "03:04");
});

test("a time zone is a fixed offset in minutes east of UTC", () => {
  const utc = new Date(Date.UTC(2026, 10, 4, 23, 30));
  assert.equal(clockText(utc, "en-US", offsetMinutes("-5")), "18:30\nWed Nov 4");
  assert.equal(clockText(utc, "es-CO", offsetMinutes("5.5")), "05:00\njue 5 nov");
  assert.equal(clockText(utc, "es-CO", offsetMinutes("0")), "23:30\nmié 4 nov");
  assert.equal(offsetMinutes("5.5"), 330);
});

test("auto, empty or nonsense reads as the device's own time zone", () => {
  for (const v of ["auto", "", undefined, null, "x", "99", "-13"]) assert.equal(offsetMinutes(v), null, String(v));
  assert.equal(clockText(NOW, "es", offsetMinutes("auto")), clockText(NOW, "es"));
});

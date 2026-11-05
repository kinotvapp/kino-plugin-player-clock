import { test } from "node:test";
import assert from "node:assert/strict";
import { clockText, langOf } from "../src/clock.js";

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

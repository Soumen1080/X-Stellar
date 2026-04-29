import "@testing-library/react";

// Polyfill TextEncoder/TextDecoder for stellar-sdk in jsdom
if (typeof globalThis.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

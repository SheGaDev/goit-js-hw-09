var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequire7bc7;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequire7bc7=n);var o=n("9EgcF");function i(e,t){return new Promise(((r,n)=>{setTimeout((()=>{Math.random()>.3?r(`✅ Fulfilled promise ${e} in ${t}ms`):n(`❌ Rejected promise ${e} in ${t}ms`)}),t)}))}document.querySelector(".form").addEventListener("submit",(async function(e){e.preventDefault();const t={};for(const[r,n]of Object.entries(e.currentTarget.elements))t[r]=+n.value;for(let e=0;e<t.amount;e++)i(e,t.delay).then(o.Notify.success).catch(o.Notify.failure),t.delay+=t.step;e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.44017e51.js.map

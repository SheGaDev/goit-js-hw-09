const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let a;function d(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.addEventListener("click",(()=>{t.disabled=!0,a=setInterval(d,1e3)})),e.addEventListener("click",(()=>{t.disabled=!1,a&&clearInterval(a)}));
//# sourceMappingURL=01-color-switcher.6fc59e80.js.map
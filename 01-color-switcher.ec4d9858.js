const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");let o=null;t.addEventListener("click",(function(){t.disabled=!0,o=setInterval((()=>{n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.ec4d9858.js.map

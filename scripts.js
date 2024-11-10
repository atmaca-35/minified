document.addEventListener("DOMContentLoaded",async()=>{let e=document.getElementById("searchBox"),t=document.getElementById("result"),l=document.getElementById("ghostText"),n=document.querySelector(".search-box"),a={},s={},r={},o={},i={},c="",d=!1,u={},y=0,p,g=["entries","suffixes","languages"];function h(){if(!d)return;let t=decodeURIComponent(window.location.hash.substring(1));t=m(t);let l=t.replace(/[^abcçdefgğhıijklmnoöprsştuüvyz ]/g,"");""===l?(window.history.replaceState(null,null,"/"),T.style.display="none"):(window.history.replaceState(null,null,`#${encodeURIComponent(l)}`),e.value=l,f(l),$(l),q())}function m(e){return e.replace(/I/g,"ı").replace(/İ/g,"i").replace(/Ğ/g,"ğ").replace(/Ü/g,"\xfc").replace(/Ş/g,"ş").replace(/Ö/g,"\xf6").replace(/Ç/g,"\xe7").toLowerCase()}function f(e){let t=m(e).toLowerCase();a&&Object.keys(a).length>0?(L(t),e?window.history.replaceState(null,null,`#${encodeURIComponent(t)}`):window.history.replaceState(null,null,"#")):console.error("Dictionary data not loaded.")}window.addEventListener("hashchange",h),window.addEventListener("load",async()=>{window.location.hash&&"#"!==window.location.hash||(window.location.hash="#");let e=await B();e&&h()}),window.addEventListener("hashchange",()=>{if(!d)return;let a=decodeURIComponent(window.location.hash.substring(1));a?(e.value=a,f(a),$(a),q()):(t.classList.add("hidden"),l.textContent="",e.value="",n.classList.remove("error"),t.innerHTML="");let s=document.querySelectorAll(".tooltip");s.forEach(e=>e.remove())}),e.addEventListener("input",e=>{let t=e.target.value;t=(t=(t=m(t)).replace(/[^abcçdefgğhıijklmnoöprsştuüvyz ]/gi,"")).replace(/\s{2,}/g," "),e.target.value=t,$(t),f(t)});let v="";function L(t){let l=document.getElementById("result"),n=document.getElementById("copyButton"),s=document.querySelector(".search-box"),r=document.getElementById("ghostText");if(t===c)return;if(c=t,l.innerHTML="",0===t.trim().length){s.classList.remove("error"),e.classList.remove("error"),r.textContent="",v="",n.style.display="none";return}if(t.startsWith(" ")){s.classList.add("error"),e.classList.add("error"),r.textContent="",v="",n.style.display="none";return}s.classList.remove("error"),e.classList.remove("error");let o=w(t),i=Object.keys(a).map(e=>({word:w(e),original:e})).filter(({word:e})=>e.startsWith(o)).sort((e,t)=>e.word.localeCompare(t.word));if(i.length>0?(n.style.color="var(--main-silver)",n.style.display="block",n.disabled=!1):(n.style.color="#dc3545",n.disabled=!0),i.length>0){s.classList.remove("error"),e.classList.remove("error");let d=i[0],u=a[d.original],y=u.a.replace(/\n/g,"<br>"),p=document.createElement("p");p.classList.add("description"),p.innerHTML=x(k(y)),l.appendChild(p);let g=d.word.substring(t.length),h=t+g;h!==v&&(r.textContent=g,v=h,l.style.animation="none",l.offsetHeight,l.style.animation="fadeIn 1s ease-in-out",S()),n.style.display="block"}else r.textContent="",v="",s.classList.add("error"),e.classList.add("error");b()}function b(){let e=Object.keys(s).sort((e,t)=>t.length-e.length);e.forEach(e=>{let l=e.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),n=RegExp(`(?<=^|\\s|\\\\n|>)${l}(?=\\s|\\\\n|<|$)`,"g");t.innerHTML=t.innerHTML.replace(n,`<span class="clickable-word" data-word="${e}">${e}</span>`)});let l=document.querySelectorAll(".clickable-word");l.forEach(e=>{e.addEventListener("click",function(){let e=this.getAttribute("data-word");this.classList.add("n"),E(e,this)})})}function E(e,t){let l=s[e],n=document.querySelectorAll(".tooltip");if(n.forEach(e=>e.remove()),l&&l.length>0){i[e]||(i[e]=0);let a=document.createElement("div");a.className="tooltip";let r="";l[i[e]].forEach(e=>r+=e+"<br>"),a.innerHTML=r,document.body.appendChild(a);let o=t.getBoundingClientRect();a.style.position="absolute",a.style.display="block";let c=a.getBoundingClientRect(),d=o.top+window.scrollY-c.height-5,u=o.left+window.scrollX+o.width/2-c.width/2;u+c.width>window.innerWidth&&(u=window.innerWidth-c.width-5),u<0&&(u=5),a.style.top=`${d}px`,a.style.left=`${u}px`,a.style.opacity=0,a.style.transition="opacity 0.3s ease-in-out",setTimeout(()=>{a.style.opacity=1},50),t.addEventListener("mouseleave",function(){a.style.opacity=0,setTimeout(()=>{a.remove(),t.classList.remove("n")},300)}),i[e]=(i[e]+1)%l.length}}function w(e){return e.replace(/İ/g,"i").replace(/I/g,"ı").toLowerCase()}function k(e){return DOMPurify.sanitize(e,{ALLOWED_TAGS:["span","br"]})}function x(e){let t=e;for(let[l,n]of Object.entries(o)){let a=RegExp(`\\b${l}\\b`,"gi");t=t.replace(a,e=>`[SPECIAL:${l}]`)}let s=t;for(let[r,i]of Object.entries(o)){let c=RegExp(`\\[SPECIAL:${r}\\]([\\s,;.)()]*)(?!and)(\\S+)`,"gi");s=s.replace(c,(e,t,l)=>/[.,;()]/.test(t)?`<b>${i}</b>${t}${l}`:`<b>${i}</b>${t}<span class="p">${l}</span>`);let d=RegExp(`\\[SPECIAL:${r}\\](\\s+)(and)`,"gi");s=s.replace(d,(e,t,l)=>`<b>${i}</b>${t}<span class="and">${l}</span>`)}return s.replace(/\[SPECIAL:\S+\]/g,"")}function $(t){if(!t){l.textContent="";return}let n=w(t),s=Object.keys(a).map(e=>({word:w(e),original:e})).sort((e,t)=>e.word.localeCompare(t.word)).find(({word:e})=>e.startsWith(n));if(s){let r=s.word.substring(t.length);l.textContent=r,e.getBoundingClientRect();let o=window.getComputedStyle(e),i=parseFloat(o.paddingLeft),c=parseFloat(o.fontSize),d=W(t,c);l.style.left=`${i+d}px`}else l.textContent=""}function C(){Object.keys(s).forEach(e=>{s[e]=s[e].map(e=>e.map(e=>(Object.entries(o).forEach(([t,l])=>{let n=RegExp(`\\b${t}\\b`,"gi");e=e.replace(n,`[SPECIAL:${t}]`)}),e=(e=(e=e.replace(/“([^”]+)”/g,'<span class="g">“$1”</span>')).replace(/\b(\d+)\b/g,e=>{let t=u[e];return t?`<span class="y">${t}</span>`:e})).replace(/\[SPECIAL:\S+\]/g,""))))})}async function B(){let e=document.getElementById("searchBox"),t=!0;try{let l=await fetch("vocabulary/clickableWords.json");if(!l.ok)throw Error("clickableWords could not be loaded");let n=await l.json();s=n.clickableWords;let i=await fetch("vocabulary/specialWords.json");if(!i.ok)throw Error("specialWords could not be loaded");let c=await i.json();o=c.specialWords;let y=await fetch("vocabulary/entryWords.json");if(!y.ok)throw Error("entryWords could not be loaded");let p=await y.json();r=p.entryWords;let h=await fetch("vocabulary/typeWords.json");if(!h.ok)throw Error("typeWords could not be loaded");let m=await h.json();u=m.typeWords,a=r,C(),d=!0,e.disabled=!1,g=[`${Object.keys(r).length} entries`,`${Object.keys(s).length} suffixes`,`${Object.keys(o).length} languages`]}catch(f){console.error("Error:",f),t=!1,setTimeout(()=>{e.disabled=!0},1e3)}return t}document.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("keydown",e=>{let t=["c","x","v","p","u"];(e.ctrlKey||e.metaKey)&&t.includes(e.key)&&e.preventDefault()}),window.addEventListener("keyup",e=>{"PrintScreen"===e.key&&navigator.clipboard.writeText("")}),document.addEventListener("selectstart",e=>e.preventDefault());let I=null;function S(){I&&window.clearTimeout(I);let e=document.querySelector(".Loader");e.classList.remove("animate"),e.classList.add("animate"),I=window.setTimeout(()=>{e.classList.remove("animate")},1e3)}function W(e,t){let l=document.createElement("canvas"),n=l.getContext("2d");return n.font=`${t}px 'Poppins', sans-serif`,n.measureText(e).width}let T=document.getElementById("copyButton");e.addEventListener("input",()=>{let t=e.value.trim();$(t),L(t),T.style.display=t.length>0?"block":"none"}),document.querySelector("#result").addEventListener("click",t=>{t.target.classList.contains("searchable")&&(document.querySelector("#searchBox"),e.value=t.target.textContent,e.dispatchEvent(new Event("input")))}),document.getElementById("copyButton").addEventListener("click",()=>{let e=document.getElementById("searchBox"),t=document.getElementById("ghostText"),l=document.getElementById("result"),n=(e.value+t.textContent).toUpperCase(),a=l.textContent.trim(),s=window.location.href,r=document.getElementById("copyButton");if(r.copyLabel="",r.successLabel="",n&&a){let o=`${n}


${a}



Source: ${s}`;navigator.clipboard.writeText(o).catch(e=>{console.error("Kopyalama hatası:",e)})}}),T.style.display="none";let _=document.getElementById("animatedText");function A(){if(e.value||document.activeElement===e){_.style.display="none";return}_.style.display="block",_.textContent=g[y],_.style.animation="none",_.offsetWidth,_.style.animation="slideInOut 2s ease-in-out",y=(y+1)%g.length,p=setTimeout(A,2e3)}let j=await B();function q(){let e=document.getElementById("searchBox"),t=document.getElementById("copyButton"),l=e.value.trim();if(l){let n=w(l),s=Object.keys(a).map(e=>w(e)).filter(e=>e.startsWith(n));s.length>0?(t.style.color="var(--main-silver)",t.disabled=!1):(t.style.color="#dc3545",t.disabled=!0)}else t.style.color="var(--main-aluminium)",t.disabled=!0;t.style.display="block"}j&&!e.value&&setTimeout(A,500),e.addEventListener("input",()=>{e.value?_.style.display="none":!document.activeElement===e&&A()}),e.addEventListener("focus",()=>{_.style.display="none",clearTimeout(p)}),e.addEventListener("blur",()=>{e.value||A()}),e.addEventListener("focus",()=>{e.value.trim()||(T.style.color="var(--main-aluminium)",T.disabled=!0,T.style.display="block")}),e.addEventListener("blur",()=>{e.value.trim()||(T.style.display="none")}),e.addEventListener("input",q),T.addEventListener("click",()=>{T.style.color="#32cd32",setTimeout(()=>{T.style.color=""},775)})});
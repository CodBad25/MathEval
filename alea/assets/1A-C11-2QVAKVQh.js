var v=Object.defineProperty;var y=(d,a,u)=>a in d?v(d,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):d[a]=u;var w=(d,a,u)=>y(d,typeof a!="symbol"?a+"":a,u);import{y as c,p as A,r as l,B as $,k as o,F as s,ay as f,N as x,az as S}from"./index-Bk_D2JkM.js";import{E}from"./ExerciceQcmA-AGcQffCw.js";import{t as q}from"./deprecatedFractions-BTR31pbW.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-DZz04TtL.js";import"./lists-C9cc3WE2.js";import"./colors-vbveSA7f.js";const Ii="2e7a5",Ji={"fr-fr":["1A-C11"],"fr-ch":["11QCM-12","1mQCM-12"]},Ki=!0,Ui="qcm",Vi="true",Wi="qcmMono",Xi="Résoudre une équation du premier degré",Yi="05/08/2025";class Zi extends E{constructor(){super();w(this,"versionOriginale",()=>{this.enonce="La solution de l'équation $4(x-5)=7x+3$ est : ",this.correction=`On développe, puis on isole l'inconnue dans le membre de gauche :<br>
 $\\begin{aligned}
 4(x-5)&=7x+3\\\\
 4x-20&=7x+3\\\\
 4x-7x&=3+20\\\\
 -3x&=23\\\\
 x&=-\\dfrac{23}{3}
\\end{aligned}$<br>
 `,this.correction+=` La solution est $${c("-\\dfrac{23}{3}")}$.`,this.reponses=["$-\\dfrac{23}{3}$","$\\dfrac{23}{3}$","$26$","$-\\dfrac{17}{3}$"]});w(this,"versionAleatoire",()=>{const u=A(["k(ax+b)=cx+d","k-(ax+b)=cx+d"]);let b,i,g,h,F;const r=l(-9,9,0),n=l(-9,9,0);i=l(-9,9,0);const t=l(-9,9,0),e=l(2,9,n);if(u==="k(ax+b)=cx+d")i===e*r&&(i=l(1,9,[r])),this.enonce=`La solution de l'équation $${e}(${$(r)}x${o(n)})=${$(i)}x${o(t)}$ est : `,this.correction=`On développe, puis on isole l'inconnue dans le membre de gauche :<br>
 $\\begin{aligned}
 ${e}(${$(r)}x${o(n)})&=${$(i)}x${o(t)}\\\\
 ${e*r}x${o(e*n)}&=${$(i)}x${o(t)}\\\\
 ${e*r}x${o(e*n)}${c(f(-1*i)+$(x(i))+"x")}&=${i}x${o(t)}${c(f(-1*i)+$(x(i))+"x")}\\\\
 ${$(e*r-i)}x${o(e*n)}&=${t}\\\\
 ${$(e*r-i)}x${o(e*n)}${c(o(-e*n))}&=${t}${c(o(-e*n))}\\\\
 ${$(e*r-i)}x&=${t-e*n}\\\\
 x&=${q(t-e*n,e*r-i)}
 ${S(x(t-e*n),x(e*r-i))>1||e*r-i<0?`\\\\x&=${new s(t-e*n,e*r-i).texFractionSimplifiee}`:""}
\\end{aligned}$
 `,this.correction+=`<br> La solution est $${c(new s(t-e*n,e*r-i).texFractionSimplifiee)}$.`,b=new s(t-e*n,e*r-i).texFractionSimplifiee,g=new s(t-n,r-i).texFractionSimplifiee,h=new s(t+e*n,e*r-i).texFractionSimplifiee,F=new s(t-e*n,e*r+i).texFractionSimplifiee;else{i===-r&&(i=l(-9,9,[0,r,-r]));const m=-r,p=e-n;this.enonce=`La solution de l'équation $${e}-(${$(r)}x${o(n)})=${$(i)}x${o(t)}$ est : `,this.correction=`On développe, puis on isole l'inconnue dans le membre de gauche :<br>
 $\\begin{aligned}
 ${e}-(${$(r)}x${o(n)})&=${$(i)}x${o(t)}\\\\
 ${e}${o(-r)}x${o(-n)}&=${$(i)}x${o(t)}\\\\
 ${$(m)}x${o(p)}&=${$(i)}x${o(t)}\\\\
 ${$(m)}x${o(p)}${c(f(-1*i)+$(x(i))+"x")}&=${i}x${o(t)}${c(f(-1*i)+$(x(i))+"x")}\\\\
 ${$(m-i)}x${o(p)}&=${t}\\\\
 ${$(m-i)}x${o(p)}${c(o(-1*p))}&=${t}${c(o(-1*p))}\\\\
 ${$(m-i)}x&=${t-p}\\\\
 x&=${q(t-p,m-i)}
 ${S(x(t-p),x(m-i))>1||m-i<0?`\\\\x&=${new s(t-p,m-i).texFractionSimplifiee}
`:""}\\end{aligned}$
 `,this.correction+=`<br> La solution est $${c(new s(t-p,m-i).texFractionSimplifiee)}$.`,b=new s(t-p,m-i).texFractionSimplifiee,g=new s(t+p,m-i).texFractionSimplifiee,h=new s(t-n,r-i).texFractionSimplifiee,F=new s(-t+p,m-i).texFractionSimplifiee}this.reponses=[`$${b}$`,`$${g}$`,`$${h}$`,`$${F}$`]});this.versionAleatoire(),this.spacing=1.5}}export{Vi as amcReady,Wi as amcType,Yi as dateDePublication,Zi as default,Ki as interactifReady,Ui as interactifType,Ji as refs,Xi as titre,Ii as uuid};
//# sourceMappingURL=1A-C11-2QVAKVQh.js.map

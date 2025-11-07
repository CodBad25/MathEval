var v=Object.defineProperty;var y=(m,o,e)=>o in m?v(m,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):m[o]=e;var c=(m,o,e)=>y(m,typeof o!="symbol"?o+"":o,e);import{y as u,r as f,p as g,v as d,B as b,k as l}from"./index-Bk_D2JkM.js";import{E as O}from"./ExerciceQcmA-AGcQffCw.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-DZz04TtL.js";import"./lists-C9cc3WE2.js";const Ne="28/08/2025",Qe="7092d",je={"fr-fr":["1A-F3-1"],"fr-ch":[]},we=!0,ze="qcm",Ce="true",Ge="qcmMono",He="Déterminer une image par une fonction affine sans son expression";class Je extends O{constructor(){super();c(this,"versionOriginale",()=>{this.enonce=`On considère une fonction affine $f$ telle que $f(2)=7$ et $f(5)=13$.<br>
    L'image de $7$ par cette fonction affine est : `,this.correction=`$f$ est une fonction affine, elle est donc de la forme $f(x)=mx+p$.<br>
     
    $\\begin{aligned}
    m&=\\dfrac{f(5)-f(2)}{5-2}\\\\
    &=\\dfrac{13-7}{3}\\\\
    &=2
    \\end{aligned}$<br>
    On a donc $f(x)=2x+p$.<br> Pour déterminer $p$, on utilise la valeur de $f(2)$ :<br>
    $\\begin{aligned}
    f(2)&=2\\times 2+p\\\\
    7&=4+p\\\\
    p&=3
    \\end{aligned}$<br>
    On a donc $f(x)=2x+3$.<br>
    
    L'image de $7$ par cette fonction est :<br>
    $\\begin{aligned}
    f(7)&=2\\times 7+3\\\\
    &=14+3\\\\
    &=${u(17)}
    \\end{aligned}$
    `,this.reponses=["$17$","$20$","$2$","$5$"]});c(this,"versionAleatoire",()=>{const e=f(-5,5,0),$=f(e+2,e+5),t=g([1,2,3,-1,-2]);let i=f(-5,10),n=t*e+i,p=t*$+i;const r=e+$;let a=t*r+i,s=n+p;a===s&&(i=i+g([-2,-1,1,2]),n=t*e+i,p=t*$+i,a=t*r+i,s=n+p);const x=a+(p-n),h=t*r;this.enonce=`On considère une fonction affine $f$ telle que $f(${e})=${n}$ et $f(${$})=${p}$.<br>
  L'image de $${r}$ par cette fonction affine est :`,this.correction=`$f$ est une fonction affine, elle est donc de la forme $f(x)=mx+p$.<br>
   
  $\\begin{aligned}
  m&=\\dfrac{f(${$})-f(${e})}{${$}-${d(e)}}\\\\
  &=\\dfrac{${p}${n>=0?"-":"+"}${Math.abs(n)}}{${$-e}}\\\\
  &=${t}
  \\end{aligned}$<br>
  On a donc $f(x)=${b(t)}x+p$.<br> Pour déterminer $p$, on utilise la valeur de $f(${e})$ :<br>
  $\\begin{aligned}
  f(${e})&=${t===1?`${e}`:`${t}\\times ${d(e)}`}+p\\\\
  ${n}&=${t*e}+p\\\\
  p&=${i}
  \\end{aligned}$<br>
  On a donc $f(x)=${b(t)}x${l(i)}$.<br>
  
  L'image de $${r}$ par cette fonction est :<br>
  $\\begin{aligned}
  f(${r})&=${t===1?`${r}`:`${t}\\times ${d(r)}`}  ${l(i)}
  ${t===1?"\\\\":` \\\\&=${t*r}${l(i)}\\\\`} 
  &=${u(a)}
  \\end{aligned}$
  `,this.reponses=[`$${a}$`,`$${s}$`,`$${x}$`,`$${h}$`]});this.versionAleatoire()}}export{Ce as amcReady,Ge as amcType,Ne as dateDePublication,Je as default,we as interactifReady,ze as interactifType,je as refs,He as titre,Qe as uuid};
//# sourceMappingURL=1A-F3-1-CqQk6Ssc.js.map

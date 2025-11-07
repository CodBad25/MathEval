var S=Object.defineProperty;var j=(c,s,e)=>s in c?S(c,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[s]=e;var y=(c,s,e)=>j(c,typeof s!="symbol"?s+"":s,e);import{cp as C,P as B,s as V,cu as F,G as f,aA as G,r as h,p as q}from"./index-Bk_D2JkM.js";import{E as N}from"./ExerciceBrevetA-SMkyb2rK.js";import{S as O,r as U}from"./vendors/svgdotjs_svg.js-23QrOhwr.js";import{c as $}from"./lists-C9cc3WE2.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const st="d11ae",nt={"fr-fr":["3S20DNB","3Z1DNB-15","BP2FLUC9"],"fr-ch":[]},ct="Probabilités. Exercice de brevet",lt="27/11/2024",P=[26,3,35,12,28,7,29,18,22,9,31,14,20,1,33,16,24,5,10,23,8,30,11,36,13,27,6,34,17,25,2,21,4,19,15,32,0];function Z(c){return`
  \\tikzset{%
    number/.code={%
        \\tikzset{every number/.try=#1}%
        \\ifodd#1\\relax
          \\tikzset{every odd number/.try=#1}%
        \\else
          \\tikzset{every even number/.try=#1}%
        \\fi%
        \\tikzset{execute for this number/.try=#1, number #1/.try=#1}%
      },
    execute for this number/.code={}
  }
  \\begin{tikzpicture}[rotate=90]
    \\pgfmathsetmacro{\\Ra}{2.3}
    \\pgfmathsetmacro{\\Rb}{\\Ra+0.6}
    \\pgfmathsetmacro{\\Rc}{\\Rb+0.6}
    \\pgfmathsetmacro{\\Rd}{\\Rc+0.3}
    \\draw[black!70,line width=3mm] (0,0) circle (\\Rd);
    \\draw[thick] (0,0) circle (\\Rc);
    \\draw[thick] (0,0) circle (\\Rb);
    \\draw[thick] (0,0) circle (\\Ra);
    \\pgfmathsetmacro{\\angle}{360/37}
    
    \\begin{scope}[%
      every odd number/.style={opacity=1},
      every even number/.style={opacity=0}]
      \\foreach \\i in {0,...,36} {
          \\fill[black!70,number=\\i] (\\i*\\angle:\\Ra) -- (\\i*\\angle:\\Rc) arc[start angle={\\i*\\angle},delta angle=\\angle,radius=\\Rc]-- ({(\\i+1)*\\angle}:\\Ra) arc[start angle={(\\i+1)*\\angle},delta angle=-\\angle,radius=\\Ra];
          \\draw[thick] (\\i*\\angle:\\Ra) -- (\\i*\\angle:\\Rc);
        }
    \\end{scope}
    
    \\begin{scope}[%
      every odd number/.style={text=white},
      every even number/.style={text=black!70}]
      \\foreach \\number [count=\\i] in {${c.join(",")}} {
        \\node[number=\\i,rotate={\\i*\\angle+\\angle/2}] at ({\\i*\\angle+\\angle/2}:{(\\Rb+\\Rc)/2}) {\\sffamily\\bfseries\\number};
      }
    \\end{scope}
    \\node[rotate={\\angle/2},text=black!70] at ({\\angle/2}:{(\\Rb+\\Rc)/2}) {\\sffamily\\bfseries0};
    \\fill[black!70] ({\\angle/2}:{(\\Rb+\\Ra)/2}) circle (1.5mm);
  \\end{tikzpicture}`}function H(c){const s=window.document;U(window,s);const e=O().addTo(s.documentElement).size(480,480),r=240,o=r/2,t=17/24*r,i=22/24*r,b=23/24*r;e.circle(r*2).center(240,240).stroke({width:2}).fill("black").stroke({width:1,color:"black"}),e.circle(b*2).center(240,240).fill("white").stroke({width:1,color:"black"}),e.circle(i*2).center(240,240).fill("white").stroke({width:1,color:"black"}),e.circle(o*2).center(240,240).fill("white").stroke({width:1,color:"black"});const u=37,a=360/u;for(let l=0;l<u;l++){const n=l*a,p=n+a,m=p-n<=180?"0":"1",d=240+o*Math.cos((n-90)*(Math.PI/180)),R=240+o*Math.sin((n-90)*(Math.PI/180)),A=240+o*Math.cos((p-90)*(Math.PI/180)),L=240+o*Math.sin((p-90)*(Math.PI/180)),x=240+i*Math.cos((n-90)*(Math.PI/180)),w=240+i*Math.sin((n-90)*(Math.PI/180)),z=240+i*Math.cos((p-90)*(Math.PI/180)),I=240+i*Math.sin((p-90)*(Math.PI/180)),E=["M 240 240",`L ${d} ${R}`,`A ${o} ${o} 0 ${m} 1 ${A} ${L}`,`L ${z} ${I}`,`A ${i} ${i} 0 ${m} 0 ${x} ${w}`,"Z"].join(" ");e.path(E).fill(l%2===1?"black":"white"),e.line(d,R,x,w).stroke({width:1,color:"black"});const k=l*a+a/2,D=k,M=240+(t+(i-t)/2)*Math.cos((k-90)*(Math.PI/180)),v=240+(t+(i-t)/2)*Math.sin((k-90)*(Math.PI/180));e.text(`${c[l]}`).font({size:20}).center(M,v).fill(l%2===1?"white":"black").rotate(D,M,v)}e.circle(t*2).center(240,240).fill("none").stroke({width:1,color:"black"});const g=e.svg();return e.remove(),g}class mt extends N{constructor(){super();y(this,"versionOriginale",()=>{this.appliquerLesValeurs(7,!0,"noire",6,P)});y(this,"versionAleatoire",()=>{const e=P.slice();let r=0;for(;r<34;){if(r%2===0){const u=e[r],a=h(r/2,18)*2;e[r]=e[a],e[a]=u}else{const u=e[r],a=h((r+1)/2,18)*2-1;e[r]=e[a],e[a]=u}r+=h(1,4)}const o=h(0,36),t=h(5,30),i=q([!0,!1]),b=q(["noire","blanche"]);this.appliquerLesValeurs(o,i,b,t,e)});this.besoinFormulaireCaseACocher=["Sujet original",!1],this.sup=!1,this.versionAleatoire(0),this.introduction=C("D'après l'exercice 1 du brevet Métropole 2024.<br>")}appliquerLesValeurs(e,r,o,t,i){const b=B.isHtml?H(i):Z(i),u=(l,n)=>{let p=0;for(let m=0;m<37;m++){const d=i[m];d%2===0&&l?(m%2===0&&n==="blanche"||m%2===1&&n==="noire")&&p++:d%2===1&&!l&&(m%2===0&&n==="blanche"||m%2===1&&n==="noire")&&p++}return p},a=`Au casino, la roulette est un jeu de hasard pour lequel chaque joueur mise au choix sur un ou plusieurs numéros.<br> On lance une bille sur une roue qui tourne, numérotée de 0 à 36.<br>
La bille a la même probabilité de s'arrêter sur chaque numéro.<br><br>
${b}
${$({items:[`Expliquer pourquoi la probabilité s'arrête sur le numéro ${e} est $\\dfrac{1}{37}$.`,`Déterminer la probabilité que la bille s'arrête sur une case à la fois ${o} et ${r?"paire":"impaire"}.`,`${V(1)}${$({items:[`Déterminer la probabilité que la bille s'arrête sur un numéro inférieur ou égal à ${t}.`,`En déduire la probabilité que la bille s'arrête sur un numéro supérieur ou égal à ${t+1}.`,`Un joueur affirme qu'on a plus de 3 chances sur 4 d'obtenir un numéro supérieur ou égal à ${t+1}. A-t-il raison?`],style:"alpha"})}`],style:"nombres"})}`,g=$({items:[`La probabilité que la bille s'arrête sur le numéro ${e} est $\\dfrac{1}{37}$ car il y a 37 numéros.`,`La probabilité que la bille s'arrête sur une case à la fois ${o} et ${r?"paire":"impaire"} est $\\dfrac{${u(r,o)}}{37}$.`,$({items:[`La probabilité que la bille s'arrête sur un numéro inférieur ou égal à ${t} est $\\dfrac{${t+1}}{37}$.`,`La probabilité que la bille s'arrête sur un numéro supérieur ou égal à ${t+1} est $\\dfrac{37 - ${t+1}}{37} = \\dfrac{${37-(t+1)}}{37}$.`,`Comparons cette probabilité avec $\\dfrac{3}{4}$ :<br>
        $\\dfrac{${37-(t+1)}}{37} ${F((37-(t+1))/37,3)} ${f((37-(t+1))/37,3)}$ et $\\dfrac{3}{4} = ${f(.75,2)}$<br>
        Comme $${f((37-(t+1))/37,3)} ${(37-(t+1))/37>.75?">":"<"} ${f(.75,2)}$, ${G(`le joueur ${(37-(t+1))/37>.75?"a":"n'a pas"} raison`)}.`],style:"alpha"})],style:"nombres"});this.enonce=`${a}`,this.correction=`${g}`}}export{lt as dateDePublication,mt as default,nt as refs,ct as titre,st as uuid};
//# sourceMappingURL=3S20DNB-DQ3dh14m.js.map

var O=Object.defineProperty;var S=(c,l,r)=>l in c?O(c,l,{enumerable:!0,configurable:!0,writable:!0,value:r}):c[l]=r;var L=(c,l,r)=>S(c,typeof l!="symbol"?l+"":l,r);import{t as T}from"./tableau-B_RK96i6.js";import{r as b,p as V,G as h,y as Q}from"./index-DjA7ROjC.js";import{n as _}from"./ExerciceQcm-CiFmkxlJ.js";import{E as z}from"./ExerciceQcmA-C3izriW3.js";import"./vendors/mathlive-DtHmjDB4.js";import"./colors-vbveSA7f.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./lists-CMnbjK1R.js";const it="91cbe",nt={"fr-fr":["1A-S4-4"],"fr-ch":[]},st=!0,mt="qcm",at="true",lt="qcmMono",pt="Déterminer la valeur manquante d'une série de valeurs pondérées dont on connaît la moyenne.",ct="01/08/2025";class ut extends z{constructor(){super();L(this,"versionAleatoire",()=>{do this.appliquerLesValeurs();while(_(this.reponses)<4)});this.options={vertical:!1,ordered:!1},this.versionAleatoire()}appliquerLesValeurs(){let r,a,o,i,s,n,g=!0,d;do{d=b(3,4),a=Array.from({length:d},()=>b(8,15)),o=V([2,3]),i=b(10,16);const e=a.reduce((m,$)=>m+$,0);n=d+o,s=e,r=(i*n-s)/o,Number.isInteger(r)&&(g=r>=0&&r<=20)}while(!Number.isInteger(r)||!g&&Math.random()<.8);function f(e){for(let t=e.length-1;t>0;t--){const m=Math.floor(Math.random()*(t+1));[e[t],e[m]]=[e[m],e[t]]}}function E(e,t){const m=[-3,-2,-1,1,2,3].map(p=>e+p).filter(p=>Number.isInteger(p)&&p>=0&&p<=20&&p!==e);f(m);const $=m.slice(0,t?2:3).map(p=>`$x=${h(p)}$`);return t&&$.push("Impossible, il faudrait une note supérieure à 20."),f($),$}const A=a.length+1,I=["\\text{Devoir}"].concat(Array.from({length:A},(e,t)=>`${t+1}`)),N=["\\text{Note}","\\text{Coefficient}"],P=[...a.map(e=>`${e}`),"x"],M=[...a.map(()=>"1"),`${o}`],D=[...P,...M],w=T(I,N,D),v=a.map(e=>`${e} \\times 1`).join(" + "),q=`${s} + ${o}x`,y=a.map(()=>"1").join(" + ")+` + ${o}`,C=Array.from({length:a.length},(e,t)=>t+1),R=C.reduce((e,t)=>e+t,0)+(a.length+1),j=a.reduce((e,t,m)=>e+t*C[m],0),x=(i*R-j)/(a.length+1);let u=null;if(Number.isInteger(x)&&(x>20?u="Impossible, il faudrait une note supérieure à 20.":u=`$x=${h(x)}$`),this.enonce=`
Voici les $${d+1}$ notes sur vingt obtenues par un élève en mathématiques :<br><br>
${w}
<br><br>
On cherche ce que doit valoir $x$ pour que la moyenne de l'élève soit égale $${i}$.`,g){const e=r>=18,t=E(r,e);u&&!t.includes(u)&&(t.pop(),t.push(u),f(t)),this.reponses=[`$x=${h(r)}$`,...t],this.correction=`
Pour déterminer la moyenne de l'élève, on calcule :<br>
$\\bullet$ La somme des produits de chaque note par son coefficient :

$${v} + x \\times ${o} = ${q}$.<br>

$\\bullet$ La somme des coefficients : $${y}= ${n}$.
<br>Remarque : On fera bien attention à ne pas utiliser la ligne des numéros de devoirs du tableau, donnée qui n'intervient pas dans le calcul de la moyenne.
<br>La moyenne est donc égale à $\\dfrac{${s} + ${o}x}{${n}}$. <br> Comme elle doit être égale à $${i}$, on doit résoudre l'équation suivante :
<br>
$
\\begin{aligned}
\\dfrac{${s} + ${o}x}{${n}} &= ${i}\\\\
${s} + ${o}x &= ${i} \\times ${n}\\\\
    ${s} + ${o}x&= ${i*n}\\\\
${o}x &= ${i*n} - ${s}\\\\
 ${o}x &= ${i*n-s}\\\\
x &= \\dfrac{${i*n-s}}{${o}}\\\\
x&= ${Q(r)}.
\\end{aligned}
$
`}else{const e=new Set;for(e.add(20);e.size<3;){const m=b(17,20,0);e.add(m)}const t=Array.from(e).map(m=>`$x=${h(m)}$`);f(t),this.reponses=["Impossible, il faudrait une note supérieure à 20.",...t],this.correction=`
Pour déterminer la moyenne de l'élève, on calcule :<br>
$\\bullet$ La somme des produits de chaque note par son coefficient :

$${v} + x \\times ${o} = ${q}$.

<br>$\\bullet$ La somme des coefficients : $${y}= ${n}$.
<br>Remarque : On fera bien attention à ne pas utiliser la ligne des numéros de devoirs du tableau, donnée qui n'intervient pas dans le calcul de la moyenne.
<br>La moyenne est donc égale à $\\dfrac{${s} + ${o}x}{${n}}$. <br> Comme elle doit être égale à $${i}$, on doit résoudre l'équation suivante :
<br>
$\\dfrac{${s} + ${o}x}{${n}} = ${i}$<br>
$${s} + ${o}x = ${i*n}$<br>
$x = \\dfrac{${i*n-s}}{${o}} = ${r}$<br>
Mais cette valeur dépasse 20. Il est donc <strong>impossible</strong> d'obtenir une telle moyenne avec une note sur 20.
`}}}export{at as amcReady,lt as amcType,ct as dateDePublication,ut as default,st as interactifReady,mt as interactifType,nt as refs,pt as titre,it as uuid};
//# sourceMappingURL=1A-S4-4-V_NizC5g.js.map

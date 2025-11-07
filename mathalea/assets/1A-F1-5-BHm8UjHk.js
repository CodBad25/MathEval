var f=Object.defineProperty;var d=($,o,n)=>o in $?f($,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):$[o]=n;var p=($,o,n)=>d($,typeof o!="symbol"?o+"":o,n);import{y as c,p as a,F as s,r as l}from"./index-DjA7ROjC.js";import"./vendors/decimal.js-16C9rIKp.js";import{E as x}from"./ExerciceQcmA-C3izriW3.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-CiFmkxlJ.js";import"./lists-CMnbjK1R.js";const wt="20/09/2025",Tt="d294c",jt={"fr-fr":["1A-F1-5"],"fr-ch":[]},Ct=!0,Dt="qcm",Pt="true",Qt="qcmMono",kt="Calculer une image avec le second degré (2)";class zt extends x{constructor(){super();p(this,"versionOriginale",()=>{this.enonce=`On considère la fonction  $f$ définie sur $\\mathbb{R}$ par $f(x)=7-\\dfrac{1}{2}(x-3)^2$<br>
    L'image de $3$ par cette fonction est : `,this.correction=`On remplace $x$ par $3$ dans l'expression de $f$ :<br>
     
    $\\begin{aligned}
    f\\left(3\\right)&=7-\\dfrac{1}{2}(3-3)^2\\\\
    &=7-\\dfrac{1}{2}\\times 0\\\\
    &=7
    \\end{aligned}$<br>
    
    
    L'image de $3$  par la  fonction  $f$ est : $${c("7")}$.`,this.reponses=["$7$","$7-\\dfrac{1}{2}$","$7-\\dfrac{1}{2}(9+9)$","$0$"]});p(this,"versionAleatoire",()=>{const m=a([[1,2],[1,3],[2,3],[3,4],[3,5],[4,5],[5,3],[4,3],[5,4],[6,5],[5,3],[2,5]]),i=new s(m[0],m[1]),t=m[0]+1,e=l(2,5),r=a([e,e-1,e+1]);this.enonce=`On considère la fonction  $f$ définie sur $\\mathbb{R}$ par $f(x)=${t}-${i.texFraction}(x-${e})^2$<br>
    L'image de $${r}$ par cette fonction est : `,this.correction=`On remplace $x$ par $${r}$ dans l'expression de $f$ :<br>`,r===e?(this.correction=`
    $\\begin{aligned}
    f\\left(${r}\\right)&=${t}-${i.texFraction}(${r}-${e})^2\\\\
    &=${t}-${i.texFraction}\\times 0\\\\
    &=${t}
    \\end{aligned}$<br>
    
    
    L'image de $${r}$  par la  fonction  $f$ est : $${c(t)}$.`,this.reponses=[`$${t}$`,"$0$",`$${t}-${i.texFraction}$`,`$${t}-${i.texFraction}(${r**2}+${e**2})$`]):(this.correction=`
    $\\begin{aligned}
    f\\left(${r}\\right)&=${t}-${i.texFraction}(${r}-${e})^2\\\\
    &=${t}-${i.texFraction}\\times 1\\\\
    &=${i.entierMoinsFraction(t).texFraction}
    \\end{aligned}$<br>
    
    
    L'image de $${r}$  par la  fonction  $f$ est : $${c(i.entierMoinsFraction(t).texFraction)}$.`,this.reponses=[`$${i.entierMoinsFraction(t).texFraction}$`,`$${t}$`,`$${i.ajouteEntier(t).texFraction}$`,`$${new s(1,m[1]).texFraction}$`])});this.versionAleatoire()}}export{Pt as amcReady,Qt as amcType,wt as dateDePublication,zt as default,Ct as interactifReady,Dt as interactifType,jt as refs,kt as titre,Tt as uuid};
//# sourceMappingURL=1A-F1-5-BHm8UjHk.js.map

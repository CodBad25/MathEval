var n=Object.defineProperty;var m=(r,$,i)=>$ in r?n(r,$,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[$]=i;var e=(r,$,i)=>m(r,typeof $!="symbol"?$+"":$,i);import{y as t,r as o}from"./index-Bk_D2JkM.js";import{E as s}from"./ExerciceQcmA-AGcQffCw.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-DZz04TtL.js";import"./lists-C9cc3WE2.js";const ki="10/08/2025",Ai="41fa7",Ci={"fr-fr":["canTEC1-04"],"fr-ch":[]},Oi=!0,Pi="qcm",Ti="true",Ri="qcmMono",wi="Calculer les puissances de $i$";class Di extends s{constructor(){super();e(this,"versionOriginale",()=>{this.enonce="$i^{4}$ est égal à ",this.correction=`On sait que $i^{2}=-1$ donc $i^{4}=\\left(-1\\right)^{2}=${t("1")}.$`,this.reponses=["$1 $","$-1$ ","$i $","$-i$ "]});e(this,"versionAleatoire",()=>{const i=o(3,15);switch(o(1,2)){case 1:this.enonce=`$i^{${i}}$ est égal à `,this.correction="Par définition, on sait que $i^{2}=-1$. ",i%4===0&&(i===4?this.correction+=` donc $i^{4}=${t("1")}$ .`:this.correction+=` donc $i^{4}=1$ .<br>$\\begin{aligned}i^{${i}}&=\\left(i^{4}\\right)^{${i/4}}\\\\
        &=${t("1")}.
        \\end{aligned}$`,this.reponses=["$1 $","$-1$ ","$i $","$-i$ "]),i===7&&(this.correction+=` donc $i^{4}=1$, <br> 
         $\\begin{aligned}
         i^{7}&=i^{4}\\times i^{3}\\\\
          &=i^{3}\\\\
         &=i^{2}\\timesi\\\\
          &=${t("-i.")}
         \\end{aligned}$`,this.reponses=["$-i $","$1 $","$-1$ ","$i$ "]),i===3&&(this.correction+=`  <br> 
         $\\begin{aligned}
         i^{3}&=i^{2}\\times i\\\\
         &=${t("-i.")}
         \\end{aligned}$`,this.reponses=["$-i $","$1 $","$-1$ ","$i$ "]),i%4===2&&(this.correction+=` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         i^{${i}}&=i^{${i-2}}\\times i^{2}\\\\
         &=\\left(i^{4}\\right)^{${(i-2)/4}}\\times i^{2}\\\\
         &=${t("-1.")}
         \\end{aligned}$`,this.reponses=["$-1$ ","$-i$ ","$1 $","$i $"]),i%4===1&&(this.correction+=` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         i^{${i}}&=i^{${i-1}}\\timesi\\\\
         &=\\left(i^{4}\\right)^{${(i-1)/4}}\\timesi\\\\
         &=${t("i.")}
         \\end{aligned}$`,this.reponses=["$i$ ","$1 $","$-1$ ","-$i $"]);break;case 2:if(this.enonce=`$\\left(\\mathrm{-i}\\right)^{${i}}$ est égal à `,this.correction=`On sait que $\\left(\\mathrm{-i}\\right)^{${i}}=\\left(\\mathrm{-1}\\right)^{${i}}\\times i^{${i}}$. <br>`,this.correction+="Par définition, on a $i^{2}=-1$ ",i%4===0&&(i===4?this.correction+=` donc $i^{4}=1$ et finalement $\\left(\\mathrm{-i}\\right)^{4}=${t("1")}$ .`:this.correction+=` donc $i^{4}=1$ .<br>
        $\\begin{aligned}\\left(\\mathrm{-i}\\right)^{${i}}
        &=\\mathrm{-i}^{${i}}\\\\
        &=\\left(i^{4}\\right)^{${i/4}}\\\\
        &=${t("1")}.
        \\end{aligned}$`,this.reponses=["$1 $","$-1$ ","$i $","$-i$ "]),i===7&&(this.correction+=` donc $i^{4}=1$, <br> 
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{7}&=\\left(-1\\right)^{7}\\times i^{7}\\\\
         &=-i^{4}\\times i^{3}\\\\
         &=-i^{3}\\\\
         &=-i^{2}\\timesi\\\\
          &=${t("i.")}
         \\end{aligned}$`,this.reponses=["$i $","$1 $","$-1$ ","$-i$ "]),i===3&&(this.correction+=`  <br> 
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{3}&= -i^{3}\\\\
         &=-i^{2}\\times i\\\\
         &=${t("i.")}
         \\end{aligned}$`,this.reponses=["$i $","$1 $","$-1$ ","$-i$ "]),i%4===2&&(this.correction+=` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{${i}}&=\\left(-1\\right)^{${i}}\\times i^{${i-2}}\\times i^{2}\\\\
         &=i^{${i-2}}\\times i^{2}\\\\
         &=\\left(i^{4}\\right)^{${(i-2)/4}}\\times i^{2}\\\\
         &=${t("-1.")}
         \\end{aligned}$`,this.reponses=["$-1$ ","$-i$ ","$1 $","$i $"]),i%4===1){this.correction+=` donc $i^{4}=1$, <br>  
         $\\begin{aligned}
         \\left(\\mathrm{-i}\\right)^{${i}}&=(-1)^{${i}}\\timesi^{${i-1}}\\timesi\\\\
         &=-i^{${i-1}}\\timesi\\\\
         &=${t("-i.")}
         \\end{aligned}$`,this.reponses=["$-i$ ","$1 $","$-1$ ","$i $"];break}}});this.versionAleatoire()}}export{Ti as amcReady,Ri as amcType,ki as dateDePublication,Di as default,Oi as interactifReady,Pi as interactifType,Ci as refs,wi as titre,Ai as uuid};
//# sourceMappingURL=canTEC1-04-O6oACpxm.js.map

import{D as g,K as h,r as o,p as a,B as r,G as $,v as c,y as m,w as b,j as u,ay as d,k as n,I as f}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Be="Réduire une expression littérale",Ce=!0,we="mathLive",Ke="23/02/2022",Le="97664",Ne={"fr-fr":["can4L07"],"fr-ch":[]};class Oe extends g{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=h.clavierDeBaseAvecX,this.optionsChampTexte={texteAvant:"<br>"}}nouvelleVersion(){let i,e,t,x,s,p,l;switch(o(1,3)){case 1:x=a([1,2,3]),x===1?(i=o(1,10),e=o(1,10),t=o(1,10),this.question=`Écrire le plus simplement possible : <br>  
          $${r(i)}x+${r(e)}x+${$(t)}$.`,this.correction=`En regroupant les termes en $x$, on obtient : <br>
        $\\begin{aligned}
        ${r(i)}x+${r(e)}x+${$(t)}&=(${i}+${e})x+${t}\\\\
        &=${m(`${$(i+e)}x+${$(t)}`)}
        \\end{aligned}$`):x===2?(i=o(1,5),e=o(1,5),t=o(1,5),this.question=`Écrire le plus simplement possible : <br>
          $${r(e)}x+${$(t)}+${r(i)}x$.`,this.correction=`En regroupant les termes en $x$, on obtient : <br>
        $\\begin{aligned}
        ${r(e)}x+${$(t)}+${r(i)}x&=(${i}+${e})x+${t}\\\\
        &=${m(`${$(i+e)}x+${$(t)}`)}
        \\end{aligned}$`):(i=o(-4,-1),e=o(-4,-1),t=o(1,10),this.question=`Écrire le plus simplement possible : <br>
          $${r(e)}x+${$(t)}${r(i)}x$.`,this.correction=`En regroupant les termes en $x$, on obtient : <br>
          $\\begin{aligned}
          ${r(e)}x+${$(t)}${r(i)}x&=(${i}${e})x+${t}\\\\
          &=${m(`${$(i+e)}x+${$(t)}`)}
          \\end{aligned}$`),l=`${u(i+e,t,"x")}`;break;case 2:x=a([1,2]),x===1?(e=o(1,3),t=o(1,3),s=o(1,5),p=a([-1,1]),i=o(1,4,s),this.question=`Écrire le plus simplement possible : <br>
          $${r(i)}x^2+${r(e)}x+${$(t)}+${r(s)}x^2${d(p)}x$.`,e+p===0?(this.correction=`En regroupant les termes en $x$ et les termes en $x^2$, on obtient : <br>
            $\\begin{aligned}
            ${r(i)}x^2+${r(e)}x+${$(t)}+${r(s)}x^2+x&=(${i} + ${s})x^2+(${e}${n(p)})x+${$(t)}\\\\
            &=${m(`${r(i+s)}x^2+${$(t)}`)}
            \\end{aligned}$`,l=`${$(i+s)}x^2+${$(t)}`):this.correction=`En regroupant les termes en $x$ et les termes en $x^2$, on obtient : <br>
            $\\begin{aligned}
            ${r(i)}x^2+${r(e)}x+${$(t)}+${r(s)}x^2+x&=(${i} + ${s})x^2+(${e}${n(p)})x+${$(t)}\\\\
            &=${m(`${r(i+s)}x^2+${r(e+p)}x+${$(t)}`)}
            \\end{aligned}$`):(e=o(-5,-2),t=o(1,5),s=o(-5,-2),p=a([-1,1]),i=o(-5,5,0),this.question=`Écrire le plus simplement possible : <br>
          $${r(i)}x^2${n(e)}x${n(t)}${n(s)}x^2${d(p)}x$.`,i+s===0?(this.correction=`En regroupant les termes en $x$ et les termes en $x^2$, on obtient : <br>
            $\\begin{aligned}
            ${r(i)}x^2${n(e)}x${n(t)}${n(s)}x^2+x&=
            (${i}${n(s)})x^2+(${e}${n(p)})x${n(t)}\\\\
            &=${m(`${n(e+p)}x+${$(t)}`)}\\end{aligned}$`,l=`${r(e+p)}x+${$(t)}`):this.correction=`En regroupant les termes en $x$ et les termes en $x^2$, on obtient : <br>
            $\\begin{aligned}
            ${r(i)}x^2${n(e)}x${n(t)}${n(s)}x^2+x&=(${i}${n(s)})x^2+(${e}${n(p)})x${n(t)}\\\\
            &=${m(`${r(i+s)}x^2${f(e+p)}x+${$(t)}`)}
            \\end{aligned}$`),l=`${b(0,i+s,e+p,t,"x")}`;break;case 3:default:x=a([1,2]),x===1&&(i=o(-9,9,0),e=o(-9,9,[0,-1,1]),e>0?this.question=`Écrire le plus simplement possible : <br> 
            $${r(i)}x\\times${e}x$.`:this.question=`Écrire le plus simplement possible : <br>$${r(i)}x\\times(${e}x)$.`,e>0?this.correction=`On a : <br>
            $\\begin{aligned}
            ${r(i)}x\\times${e}x&=(${$(i)}\\times  ${c(e)})x^2\\\\
            &=${m(`${$(i*e)}x^2`)}
            \\end{aligned}$`:this.correction=`On a : <br>
              $\\begin{aligned}
              ${r(i)}x\\times (${e}x)&=(${$(i)}\\times  ${c(e)})x^2\\\\
              &=${m(`${$(i*e)}x^2`)}\\end{aligned}$`,l=`${b(0,i*e,0,0,"x")}`),x===2&&(i=o(-9,9,0),e=o(-9,9,[0,-1,1]),this.question=`Écrire le plus simplement possible : <br>
          $${r(i)}x\\times${c(e)}$.`,this.correction=`$${r(i)}x\\times${c(e)}=${m(`${$(i*e)}x`)}$`,l=`${u(i*e,0,"x")}`);break}this.reponse=l,this.canEnonce=this.question,this.canReponseACompleter=""}}export{Ke as dateDePublication,Oe as default,Ce as interactifReady,we as interactifType,Ne as refs,Be as titre,Le as uuid};
//# sourceMappingURL=can4L07-BO8i5H6i.js.map

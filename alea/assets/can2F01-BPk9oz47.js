import{D as u,p as b,r as a,k as o,v as s,y as c,G as n,av as m,B as p}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const j$="Calculer une image avec le second degré",C$=!0,E$="mathLive",k$="b2c31",L$={"fr-fr":["can2F01"],"fr-ch":[]};class y$ extends u{constructor(){super(),this.typeExercice="simple",this.versionQcmDisponible=!0,this.nbQuestions=1}nouvelleVersion(){let $,i,e,r,t,l;switch(b(["a","b","c","d"])){case"a":$=this.versionQcm?a(-5,-1):a(1,4),i=a(1,2),e=a(1,2),r=a(2,5),l=`${p(i)}x^2+${p(e)}x+${r}`,this.question=`On considère la fonction $f$ définie par $f(x)= ${l}$. <br>`,this.question+=this.versionQcm?`L'image de $${$}$ par la fonction $f$ est égale à :`:`Calculer $f(${$})$.`,i===1&&e!==1&&(this.correction=`On a : <br>
          $\\begin{aligned}
          f(${$})&= ${$}^2+${e}\\times ${s($)}+${r}\\\\
          &=${$*$}${o(e*$)}+${r}\\\\
          &= ${i*$*$}${o(e*$)}+${r}\\\\
          &=${c(i*$*$+e*$+r)}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
          On commence par calculer le carré de $${$}$, soit $${$}^2=${n($**2)}$. <br>
   On calcule $${e}\\times ${$}$ que l'on ajoute à $${n(i*$**2)}$, soit $${i*$**2}+${e*$}=${i*$**2+e*$}$.<br>
  Pour finir, on ajoute   $${r}$, ce qui donne $${n(i*$**2+e*$)}+${r}$, soit $${n(i*$**2+e*$+r)}$.<br>
    `,"blue")),i!==1&&e!==1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=${i}\\times${$}^2+${e}\\times ${$}+${r}\\\\
          &=${i}\\times ${$*$}${o(e*$)}+${r}\\\\
          &=${i*$*$}${o(e*$)}+${r}\\\\
          &=${c(i*$*$+e*$+r)}
          \\end{aligned}$.<br>`,this.correction+=m(` Mentalement : <br>
              On commence par calculer le carré de $${$}$, soit $${$}^2=${n($**2)}$. <br>
     On multiplie ensuite cette valeur par le coefficient devant $x^2$, soit $${i}\\times ${n($**2)}=${n(i*$**2)}$.<br>
      On calcule $${e}\\times ${$}$ que l'on ajoute à $${n(i*$**2)}$, soit $${i*$**2}+${e*$}=${i*$**2+e*$}$.<br>
      Pour finir, on ajoute   $${r}$, ce qui donne $${n(i*$**2+e*$)}+${r}$, soit $${n(i*$**2+e*$+r)}$.<br>
        `,"blue")),i===1&&e===1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=${$}^2+ ${$}+${r}\\\\
          &=${$*$}+${$}+${r}\\\\
          &=${c($*$+e*$+r)}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
          On commence par calculer le carré de $${$}$, soit $${$}^2=${n($**2)}$. <br>
   On ajoute  $${$}$ soit $${i*$**2}+${$}=${$**2+e*$}$.<br>
  Pour finir, on ajoute   $${r}$, ce qui donne $${n(i*$**2+e*$)}+${r}$, soit $${n(i*$**2+e*$+r)}$.<br>
    `,"blue")),i!==1&&e===1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=${i}\\times${$}^2+${e}\\times ${s($)}+${r}\\\\
          &=${i}\\times ${$*$}${o(e*$)}+${r}\\\\
          &=${i*$*$}${o(e*$)}+${r}\\\\
          &=${c(i*$*$+e*$+r)}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
          On commence par calculer le carré de $${$}$, soit $${$}^2=${n($**2)}$. <br>
 On multiplie ensuite cette valeur par le coefficient devant $x^2$, soit $${i}\\times ${n($**2)}=${n(i*$**2)}$.<br>
 On ajoute  $${$}$ soit $${i*$**2}+${$}=${i*$**2+e*$}$.<br>
  Pour finir, on ajoute   $${r}$, ce qui donne $${n(i*$**2+e*$)}+${r}$, soit $${n(i*$**2+e*$+r)}$.<br>
    `,"blue")),this.reponse=this.versionQcm?`$${n(i*$*$+e*$+r)}$`:i*$*$+e*$+r,this.distracteurs=[i*$*$+e*$+r===-i*$*$+e*$+r?`$${n(i*$-e*$-r)}$`:`$${n(-i*$*$+e*$+r)}$`,i*$*$+e*$+r===2*$+e*$+r?`$${n(-2*i*$+e*$+r)}$`:`$${n(-2*$+e*$+r)}$`,i*$*$+e*$+r===$+e*$+r?`$${n(-$+e*$+r)}$`:`$${n($+e*$+r)}$`];break;case"b":i=a(1,3),e=a(-2,2,[0]),r=a(1,3),t=a(-3,3,[0,e]),$=this.versionQcm?a(-5,-1):a(-3,3,[0]),l=`(${p(i)}x${o(e)})(${p(r)}x${o(t)})`,this.question=`On considère la fonction $f$ définie par $f(x)= ${l}$. <br>`,this.question+=this.versionQcm?`L'image de $${$}$ par la fonction $f$ est égale à :`:`Calculer $f(${$})$.`,i===1&&r===1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=\\left(${s($)}${o(e)}\\right)\\left(${s($)}${o(t)}\\right)\\\\
          &=(${i*$}${o(e)})(${r*$}${o(t)})\\\\
          &=${i*$+e}\\times${s(r*$+t)}\\\\
          &=${c((i*$+e)*(r*$+t))}
          \\end{aligned}$<br>`,this.reponse=this.versionQcm?`$${(i*$+e)*(r*$+t)}$`:`${(i*$+e)*(r*$+t)}`,this.correction+=m(` Mentalement : <br>
          On commence par "calculer" la première parenthèse :  $${s($)}${o(e)}=${i*$+e}$.<br>
           Puis la deuxième : $${s($)}${o(t)}=${r*$+t}$.<br>
        On fait le produit des nombres obtenus : $${i*$+e}\\times ${r*$+t}=${(i*$+e)*(r*$+t)}$.
    `,"blue")),i!==1&&r!==1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=\\left(${p(i)}\\times${s($)}${o(e)}\\right)\\left(${r}\\times${s($)}${o(t)}\\right)\\\\
          &=(${i*$}${o(e)})(${r*$}${o(t)})\\\\
          &= ${i*$+e}\\times${s(r*$+t)}=${c((i*$+e)*(r*$+t))}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
        On commence par "calculer" la première parenthèse :  $${p(i)}\\times${s($)}${o(e)}=${i*$+e}$.
        <br>Puis la deuxième : $${r}\\times${s($)}${o(t)}=${r*$+t}$.<br>
        On fait le produit des nombres obtenus : $${i*$+e}\\times ${s(r*$+t)}=${(i*$+e)*(r*$+t)}$.
    `,"blue")),i===1&&r!==1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=\\left(${s($)}${o(e)}\\right)\\left(${r}\\times${s($)}${o(t)}\\right)\\\\
          &=(${i*$}${o(e)})(${r*$}${o(t)})\\\\
          &=${i*$+e}\\times${s(r*$+t)}=${c((i*$+e)*(r*$+t))}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
        On commence par "calculer" la première parenthèse :  $${s($)}${o(e)}=${i*$+e}$.
        <br>Puis la deuxième : $${r}\\times${s($)}${o(t)}=${r*$+t}$.<br>
        On fait le produit des nombres obtenus : $${i*$+e}\\times ${r*$+t}=${(i*$+e)*(r*$+t)}$.
    `,"blue")),i!==1&&r===1&&(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=\\left(${i}\\times${s($)}${o(e)}\\right)\\left(${s($)}${o(t)}\\right)\\\\
          &=(${i*$}${o(e)})(${r*$}${o(t)})\\\\
          &=${i*$+e}\\times${s(r*$+t)}=${c((i*$+e)*(r*$+t))}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
        On commence par "calculer" la première parenthèse :  $${i}\\times${s($)}${o(e)}=${i*$+e}$.
        <br>Puis la deuxième : $${s($)}${o(t)}=${r*$+t}$.<br>
        On fait le produit des nombres obtenus : $${i*$+e}\\times ${s(r*$+t)}=${(i*$+e)*(r*$+t)}$.
    `,"blue")),this.reponse=this.versionQcm?`$${n((i*$+e)*(r*$+t))}$`:(i*$+e)*(r*$+t),this.distracteurs=[`$${n((i*$-e)*(r*$+t))}$`,`$${n((i*$+e)*(r*$-t))}$`,`$${n(i*$+e+(r*$+t))}$`,`$${n(-i*$+e+(r*$+t))}$`,`$${n(-i*$+e+(-r*$+t))}$`];break;case"c":i=a(-3,3,0),e=a(1,3),$=this.versionQcm?a(-5,-1):a(-3,3,[0]),l=`${i}-${p(e)}x^2`,this.question=`On considère la fonction $f$ définie par $f(x)= ${l}$. <br>`,this.question+=this.versionQcm?`L'image de $${$}$ par la fonction $f$ est égale à :`:`Calculer $f(${$})$.`,this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=${i}- ${s($)}^2\\\\
          &=${c(i-e*$*$)}
          \\end{aligned}$<br>`,this.reponse=this.versionQcm?`$${n(i-e*$*$)}$`:i-e*$*$,e===1?this.correction+=m(` Mentalement : <br>
          On commence par "calculer" le carré de $${$}$ :  $${s($)}^2=${$*$}$.<br>
          On calcule alors $${i}-${$*$}=${i-$*$}$.<br>
    `,"blue"):(this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=${i}- ${e}\\times ${s($)}^2\\\\
          &=${c(i-e*$*$)}
          \\end{aligned}$<br>`,this.correction+=m(` Mentalement : <br>
    On commence par "calculer" le carré de $${$}$ :  $${s($)}^2=${$*$}$.<br>
    Puis on multiplie le résultat par $${e}$ : $${e}\\times ${$**2}=${e*$*$}$.<br>
    On calcule alors : $${i}-${e*$*$}=${i-e*$*$}$.`,"blue")),this.distracteurs=[`$${n(i+e*$*$)}$`,`$${n((i-e*$)**2)}$`,`$${n(-i+e*$*$)}$`,`$${n(i-2*e*$)}$`,`$${n(i+2*e*$)}$`];break;case"d":i=a(-4,4,[0,-1,1]),e=a(-4,4,[0]),r=a(-4,4,[0,-1,1]),t=a(-4,4,[0]),$=this.versionQcm?a(-4,-1,[0]):a(-2,2,[0]),l=`(${i}x${o(e)})^2`,this.question=`On considère la fonction $f$ définie par $f(x)= ${l}$. <br>`,this.question+=this.versionQcm?`L'image de $${$}$ par la fonction $f$ est égale à :`:`Calculer $f(${$})$.`,this.correction=`On a :<br>
          $\\begin{aligned}
          f(${$})&=\\left(${i}\\times${s($)}${o(e)}\\right)^2\\\\
          &= (${i*$}${o(e)})^2\\\\
          &=${s(i*$+e)}^2\\\\
        &=${c((i*$+e)*(i*$+e))}
        \\end{aligned}$<br>`,this.reponse=this.versionQcm?`$${n((i*$+e)*(i*$+e))}$`:(i*$+e)*(i*$+e),this.correction+=m(` Mentalement : <br>
          On commence par "calculer" l'intérieur de la parenthèse, puis on élève le résultat au carré.
    `,"blue"),this.distracteurs=[`$${n(-1*(i*$+e)*(i*$+e))}$`,`$${n((i*$-e)*(i*$+e))}$`,`$${n(i*$+e)}$`,`$${n((i+$+e)*(i+$+e))}$`];break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{y$ as default,C$ as interactifReady,E$ as interactifType,L$ as refs,j$ as titre,k$ as uuid};
//# sourceMappingURL=can2F01-BPk9oz47.js.map

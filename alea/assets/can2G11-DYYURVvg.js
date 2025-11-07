import{E as w,aO as l,p as n,s,u as h,y as e,o as c}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ar="Utiliser la relation de Chasles/réductions vectorielles*",Or=!0,zr="qcm",Qr="30/10/2021",yr="03/01/2022",Dr="7bc4a",kr={"fr-fr":["can2G11"],"fr-ch":[]};class Pr extends w{constructor(){super(),this.nbQuestions=1,this.spacing=3}nouvelleVersion(){let o,$,i,a;for(let t=0,g=0;t<this.nbQuestions&&g<50;){const r=l(7,["QD"]),v=n([1,2,3,3]);switch(v){case 1:o=`$\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}+\\overrightarrow{${r[1]}${r[2]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:`$\\overrightarrow{${r[0]}${r[3]}}$ `,statut:!0},{texte:`$\\overrightarrow{${r[0]}${r[2]}}$ `,statut:!1},{texte:`$\\overrightarrow{${r[1]}${r[2]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
      $\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}+\\overrightarrow{${r[1]}${r[2]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=` $\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}+\\overrightarrow{${r[1]}${r[2]}}=\\ldots$`,$=`On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}+\\overrightarrow{${r[1]}${r[2]}}
        &=\\underbrace{\\overrightarrow{${r[0]}${e(r[1])}}+
        \\overrightarrow{${e(r[1])}${r[2]}}}_{\\overrightarrow{${r[0]}${r[2]}}}+
        \\overrightarrow{${r[2]}${r[3]}}\\\\
        &=\\underbrace{\\overrightarrow{${r[0]}${e(r[2])}}+
        \\overrightarrow{${e(r[2])}${r[3]}}}_{\\overrightarrow{${e(r[0])}${r[3]}}}\\\\
        &=\\overrightarrow{${r[0]}${r[3]}}
        \\end{aligned}$
        `;break;case 2:a=n(["a","b"]),a==="a"&&(o=`$\\overrightarrow{${r[5]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}-\\overrightarrow{${r[2]}${r[1]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:`$\\overrightarrow{${r[5]}${r[3]}}$ `,statut:!0},{texte:`$\\overrightarrow{${r[5]}${r[2]}}$ `,statut:!1},{texte:`$\\overrightarrow{${r[1]}${r[2]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${r[5]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}-\\overrightarrow{${r[2]}${r[1]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=` $\\overrightarrow{${r[5]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}-\\overrightarrow{${r[2]}${r[1]}}=\\ldots$`,$=`On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[5]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}\\underbrace{-\\overrightarrow{${r[2]}${r[1]}}}_{+\\overrightarrow{${r[1]}${r[2]}}}
        &=  \\overrightarrow{${r[5]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}+\\overrightarrow{${r[1]}${r[2]}}\\\\
        &=\\underbrace{\\overrightarrow{${r[5]}${e(r[1])}}+
        \\overrightarrow{${e(r[1])}${r[2]}}}_{\\overrightarrow{${r[5]}${r[2]}}}+
        \\overrightarrow{${r[2]}${r[3]}}\\\\
        &=\\underbrace{\\overrightarrow{${r[5]}${e(r[2])}}+
        \\overrightarrow{${e(r[2])}${r[3]}}}_{\\overrightarrow{${e(r[5])}${r[3]}}}\\\\
        &=\\overrightarrow{${r[5]}${r[3]}}
        \\end{aligned}$
        `),a==="b"&&(o=`$\\overrightarrow{${r[0]}${r[1]}}-\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[1]}${r[2]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:`$\\overrightarrow{${r[0]}${r[3]}}$ `,statut:!0},{texte:`$\\overrightarrow{${r[0]}${r[2]}}$ `,statut:!1},{texte:`$\\overrightarrow{${r[1]}${r[2]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${r[0]}${r[1]}}-\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[1]}${r[2]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=`  $\\overrightarrow{${r[0]}${r[1]}}-\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[1]}${r[2]}}=\\ldots$`,$=`On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[0]}${r[1]}}\\underbrace{-\\overrightarrow{${r[3]}${r[2]}}}_{+\\overrightarrow{${r[2]}${r[3]}}}+\\overrightarrow{${r[1]}${r[2]}}
        &=  \\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[2]}${r[3]}}+\\overrightarrow{${r[1]}${r[2]}}\\\\
        &=\\underbrace{\\overrightarrow{${r[0]}${e(r[1])}}+
        \\overrightarrow{${e(r[1])}${r[2]}}}_{\\overrightarrow{${r[0]}${r[2]}}}+
        \\overrightarrow{${r[2]}${r[3]}}\\\\
        &=\\underbrace{\\overrightarrow{${r[0]}${e(r[2])}}+
        \\overrightarrow{${e(r[2])}${r[3]}}}_{\\overrightarrow{${r[0]}${r[3]}}}\\\\
        &=\\overrightarrow{${r[0]}${r[3]}}
        \\end{aligned}$
        `);break;case 3:a=n(["a","b","c","d"]),a==="a"&&(o=`$\\overrightarrow{${r[3]}${r[4]}}+\\overrightarrow{${r[5]}${r[0]}}+\\overrightarrow{${r[4]}${r[3]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:`$\\overrightarrow{${r[5]}${r[0]}}$ `,statut:!0},{texte:"$\\overrightarrow{0}$ ",statut:!1},{texte:`$2${s(1)}\\overrightarrow{${r[4]}${r[3]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${r[3]}${r[4]}}+\\overrightarrow{${r[5]}${r[0]}}+\\overrightarrow{${r[4]}${r[3]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=`   $\\overrightarrow{${r[3]}${r[4]}}+\\overrightarrow{${r[5]}${r[0]}}+\\overrightarrow{${r[4]}${r[3]}}=\\ldots$`,$=`On utilise la relation de Chasles :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[3]}${r[4]}}+\\overrightarrow{${r[5]}${r[0]}}+\\overrightarrow{${r[4]}${r[3]}}
        &=\\underbrace{\\overrightarrow{${r[3]}${e(r[4])}}+\\overrightarrow{${e(r[4])}${r[3]}}}_{\\overrightarrow{${r[3]}${r[3]}}}+\\overrightarrow{${r[5]}${r[0]}}\\\\
&= \\overrightarrow{0}+\\overrightarrow{${r[5]}${r[0]}}\\\\
&= \\overrightarrow{${r[5]}${r[0]}}
        \\end{aligned}$
        `),a==="b"&&(o=`$\\overrightarrow{${r[2]}${r[0]}}+\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[0]}${r[3]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:"$\\overrightarrow{0}$ ",statut:!0},{texte:`$2${s(1)}\\overrightarrow{${r[0]}${r[2]}}$ `,statut:!1},{texte:`$\\overrightarrow{${r[2]}${r[3]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${r[2]}${r[0]}}+\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[0]}${r[3]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=`    $\\overrightarrow{${r[2]}${r[0]}}+\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[0]}${r[3]}}=\\ldots$`,$=`On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[2]}${r[0]}}+\\overrightarrow{${r[3]}${r[2]}}+\\overrightarrow{${r[0]}${r[3]}}
        &=  \\underbrace{\\overrightarrow{${r[2]}${e(r[0])}}+\\overrightarrow{${e(r[0])}${r[3]}}}_{\\overrightarrow{${r[2]}${r[3]}}}+\\overrightarrow{${r[3]}${r[2]}}\\\\
        &=  \\underbrace{\\overrightarrow{${r[2]}${e(r[3])}}+\\overrightarrow{${e(r[3])}${r[2]}}}_{\\overrightarrow{${r[2]}${r[2]}}}\\\\
        &=\\overrightarrow{${r[2]}${r[2]}}\\\\
        &=\\overrightarrow{0}
        \\end{aligned}$
        `),a==="c"&&(o=`$\\overrightarrow{${r[4]}${r[1]}}+\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[0]}${r[4]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:`$2${s(1)}\\overrightarrow{${r[0]}${r[1]}}$ `,statut:!0},{texte:"$\\overrightarrow{0}$ ",statut:!1},{texte:`$\\overrightarrow{${r[0]}${r[1]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${r[4]}${r[1]}}+\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[0]}${r[4]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=`    $\\overrightarrow{${r[4]}${r[1]}}+\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[0]}${r[4]}}=\\ldots$`,$=`On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[4]}${r[1]}}+\\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[0]}${r[4]}}
        &= \\underbrace{\\overrightarrow{${r[0]}${e(r[4])}}+\\overrightarrow{${e(r[4])}${r[1]}}}_{\\overrightarrow{${r[0]}${r[1]}}}+\\overrightarrow{${r[0]}${r[1]}}\\\\
        &=  \\overrightarrow{${r[0]}${r[1]}}+\\overrightarrow{${r[0]}${r[1]}}\\\\
        &=  2\\overrightarrow{${r[0]}${r[1]}}
        \\end{aligned}$
        `),a==="d"&&(o=`$\\overrightarrow{${r[6]}${r[1]}}-\\overrightarrow{${r[6]}${r[0]}}+\\overrightarrow{${r[1]}${r[0]}}=$`,this.autoCorrection[t]={enonce:o,options:{horizontal:!0},propositions:[{texte:"$\\overrightarrow{0}$ ",statut:!0},{texte:`$2${s(1)}\\overrightarrow{${r[0]}${r[1]}}$ `,statut:!1},{texte:`$\\overrightarrow{${r[1]}${r[0]}}$ `,statut:!1}]},i=h(this,t),this.interactif?o+=i.texte:o=`Écrire à l'aide d'un seul vecteur : <br>
          $\\overrightarrow{${r[6]}${r[1]}}-\\overrightarrow{${r[6]}${r[0]}}+\\overrightarrow{${r[1]}${r[0]}}=$`,this.canEnonce="Écrire à l'aide d'un seul vecteur.",this.canReponseACompleter=`   $\\overrightarrow{${r[6]}${r[1]}}-\\overrightarrow{${r[6]}${r[0]}}+\\overrightarrow{${r[1]}${r[0]}}=\\ldots$`,$=`On utilise la relation de Chasles       :<br>
        $\\begin{aligned}
        \\overrightarrow{${r[6]}${r[1]}}\\underbrace{-\\overrightarrow{${r[6]}${r[0]}}}_{+\\overrightarrow{${r[0]}${r[6]}}}+\\overrightarrow{${r[1]}${r[0]}}
        &=\\overrightarrow{${r[6]}${r[1]}}+\\overrightarrow{${r[0]}${r[6]}}+\\overrightarrow{${r[1]}${r[0]}}\\\\
        &= \\underbrace{\\overrightarrow{${r[1]}${e(r[0])}}+\\overrightarrow{${e(r[0])}${r[6]}}}_{\\overrightarrow{${r[1]}${r[6]}}}+\\overrightarrow{${r[6]}${r[1]}}\\\\
        &=\\underbrace{\\overrightarrow{${r[1]}${e(r[6])}}+\\overrightarrow{${e(r[6])}${r[1]}}}_{\\overrightarrow{${r[1]}${r[1]}}}\\\\
        &=\\overrightarrow{${r[1]}${r[1]}}\\\\
        &=\\overrightarrow{0}
        \\end{aligned}$
        `);break}this.questionJamaisPosee(t,r,v)&&(this.listeQuestions[t]=o,this.listeCorrections[t]=$,this.canEnonce=o,this.canReponseACompleter=i.texte,this.listeCanEnonces.push(this.canEnonce),this.listeCanReponsesACompleter.push(this.canReponseACompleter),t++),g++}c(this)}}export{yr as dateDeModifImportante,Qr as dateDePublication,Pr as default,Or as interactifReady,zr as interactifType,kr as refs,Ar as titre,Dr as uuid};
//# sourceMappingURL=can2G11-DYYURVvg.js.map

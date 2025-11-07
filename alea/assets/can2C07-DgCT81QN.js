import{D as m,K as a,p as e,ad as p,y as $}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const xt="Calculer avec une racine carrée",Ct=!0,yt="mathLive",At="2af85",Ot={"fr-fr":["can2C07"],"fr-ch":["11NO1-11"]};class Et extends m{constructor(){super(),this.optionsChampTexte={texteAvant:"<br>"},this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=a.clavierFullOperations,this.optionsDeComparaison={texteSansCasse:!0}}nouvelleVersion(){const o=[[2,8],[2,32],[2,50],[3,27],[5,20],[2,18],[2,72],[3,48],[5,45],[2,200],[3,300],[5,500],[6,600],[7,700]];let s,i,r,t;switch(e([1,2])){case 1:s=e(o),i=s[0],r=s[1],t=p(r),e([!0,!1])?(this.question=`Écrire $\\sqrt{${i}}+\\sqrt{${r}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible. `,this.correction=`On a  $${r}=${t[0]}^2\\times ${t[1]}$.<br>
          Ainsi, $\\sqrt{${r}}=\\sqrt{${t[0]}^2\\times${t[1]}}=\\sqrt{${t[0]}^2}\\times \\sqrt{${t[1]}}
    =${t[0]}\\sqrt{${t[1]}}$.<br>
    $\\begin{aligned}
    \\sqrt{${i}}+\\sqrt{${r}}&=\\sqrt{${i}}+${t[0]}\\sqrt{${t[1]}}\\\\
    &= ${$(`${t[0]+1}\\sqrt{${t[1]}}`)}
    \\end{aligned}$
  `):(this.question=`Écrire $\\sqrt{${r}}+\\sqrt{${i}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible. `,this.correction=`On a  $${r}=${t[0]}^2\\times ${t[1]}$.<br>
          Ainsi, $\\sqrt{${r}}=\\sqrt{${t[0]}^2\\times${t[1]}}=\\sqrt{${t[0]}^2}\\times \\sqrt{${t[1]}}
    =${t[0]}\\sqrt{${t[1]}}$.<br>
  $\\begin{aligned}
  \\sqrt{${r}}+\\sqrt{${i}}&=${t[0]}\\sqrt{${t[1]}}+\\sqrt{${i}}\\\\
  &= ${$(`${t[0]+1}\\sqrt{${t[1]}}`)}
  \\end{aligned}$
`),this.reponse=[`${t[0]+1}\\sqrt${t[1]}`];break;case 2:s=e(o),i=s[0],r=s[1],t=p(r),e([!0,!1])?(this.question=`Écrire $\\sqrt{${i}}-\\sqrt{${r}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible. `,this.correction=`On a  $${r}=${t[0]}^2\\times ${t[1]}$.<br>
          Ainsi, $\\sqrt{${r}}=\\sqrt{${t[0]}^2\\times${t[1]}}=\\sqrt{${t[0]}^2}\\times \\sqrt{${t[1]}}
    =${t[0]}\\sqrt{${t[1]}}$.<br>
    $\\begin{aligned}
    \\sqrt{${i}}-\\sqrt{${r}}&=\\sqrt{${i}}-${t[0]}\\sqrt{${t[1]}}\\\\
    &= ${$(`${1-t[0]}\\sqrt{${t[1]}}`)}
    \\end{aligned}$
  `,1-t[0]===-1?this.reponse=[`${1-t[0]}\\sqrt${t[1]}`]:this.reponse=[`${1-t[0]}\\sqrt${t[1]}`,`-\\sqrt${t[1]}`]):(this.question=`Écrire $\\sqrt{${r}}-\\sqrt{${i}}$ sous la forme $a\\sqrt{b}$ avec $a$ et $b$ entiers et $b$ le plus petit possible. `,this.correction=`On a  $${r}=${t[0]}^2\\times ${t[1]}$.<br>
          Ainsi, $\\sqrt{${r}}=\\sqrt{${t[0]}^2\\times${t[1]}}=\\sqrt{${t[0]}^2}\\times \\sqrt{${t[1]}}
    =${t[0]}\\sqrt{${t[1]}}$.<br>
  $\\begin{aligned}
  \\sqrt{${r}}-\\sqrt{${i}}&=${t[0]}\\sqrt{${t[1]}}-\\sqrt{${i}}\\\\
  &= ${$(`${t[0]-1}\\sqrt{${t[1]}}`)}
  \\end{aligned}$
`,1-t[0]===1?this.reponse=[`${t[0]-1}\\sqrt${t[1]}`,`\\sqrt${t[1]}`]:this.reponse=[`${t[0]-1}\\sqrt${t[1]}`]);break}}}export{Et as default,Ct as interactifReady,yt as interactifType,Ot as refs,xt as titre,At as uuid};
//# sourceMappingURL=can2C07-DgCT81QN.js.map

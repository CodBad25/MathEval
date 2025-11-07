import{D as a,p as c,r as o,y as i,aX as e,av as n}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const qt="Calculer la diagonale d’un carré",xt=!0,Et="mathLive",Ct="09/09/2021",vt="66672",yt={"fr-fr":["can4G05"],"fr-ch":["NR"]};class Rt extends a{constructor(){super(),this.canOfficielle=!1,this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){switch(c([1,2])){case 1:{const t=o(1,10),r=2*t**2;this.question=`Calculer la valeur exacte de la longueur de la diagonale $d$ d'un carré de côté $${t}$.`,this.interactif&&(this.question+="<br>$d=$"),this.correction=` En utilisant le théorème de Pythagore dans un carré de côté $${t}$ et de diagonale $d$, on a :<br><br>
    $\\begin{aligned}
    d^2&=${t}^2+${t}^2\\\\
    d^2&= ${t**2}+${t**2}\\\\
    d&=${i(`\\sqrt{ ${2*t**2}}`)}
       \\end{aligned}$
   `,this.correction+=n(`<br> Mentalement : <br>
   On calcule le double du carré du côté du carré,
   soit $2\\times ${t}^2=2\\times ${t**2}=${r}$, puis on en prend la racine carrée.    `,"blue"),this.reponse=e(r)}break;case 2:{const t=o(2,48,[4,9,16,25,36]),r=2*t;this.question=`Calculer la valeur exacte de la longueur de la diagonale $d$ d'un carré de côté $\\sqrt{${t}}$.`,this.interactif&&(this.question+="<br>$d=$"),this.correction=` En utilisant le théorème de Pythagore dans un carré de côté $c=\\sqrt{${t}}$
       et de diagonale $d$, on a :<br>`,r===4||r===16||r===36||r===64||r===100?this.correction+=`
       $\\begin{aligned}
       c^2+c^2&=d^2\\\\
       \\sqrt{${t}}^2+\\sqrt{${t}}^2&=d^2\\\\
       d^2&=${t}+${t}\\\\
       d^2&=${r}\\\\
       d&=${i(e(r))}
       \\end{aligned}$`:this.correction+=`
       $\\begin{aligned}
       c^2+c^2&=d^2\\\\
       \\sqrt{${t}}^2+\\sqrt{${t}}^2&=d^2\\\\
       d^2&=${t}+${t}\\\\
       d^2&=${r}\\\\
       d&=${i(`\\sqrt{${r}}`)}
       \\end{aligned}$`,this.correction+=n(`<br> Mentalement : <br>
       On calcule le double du carré du côté du carré, soit
       $2\\times (\\sqrt{${t}})^2=2\\times ${t}=${r}$, puis on en prend la racine carrée.    `,"blue"),this.reponse=e(r)}break}this.canEnonce=this.question,this.canReponseACompleter="$d=\\ldots$"}}export{Ct as dateDePublication,Rt as default,xt as interactifReady,Et as interactifType,yt as refs,qt as titre,vt as uuid};
//# sourceMappingURL=can4G05-D185idpU.js.map

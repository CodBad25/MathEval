import{D as m,K as s,y as p,r as e,k as r}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const gi="Résoudre une équation",qi=!0,vi="mathLive",yi="0e09a";class Ei extends m{constructor(){super(),this.canOfficielle=!1,this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=s.clavierDeBaseAvecFraction}nouvelleVersion(){if(this.canOfficielle)this.reponse=4,this.question="Solution de  l'équation $2x-3=5$<br>",this.correction=`On procède par étapes successives :<br>
    On commence par isoler $2x$ dans le membre de gauche en ajoutant
    $3$ dans chacun des membres, puis on divise
    par $2$ pour obtenir la solution : <br>
     $\\begin{aligned}
     2x-3&=5\\\\
    2x&=5+3\\\\
    2x&=8\\\\
    x&=\\dfrac{8}{2}\\\\
    x&=4
    \\end{aligned}$<br>
    La solution de l'équation est : $${p("4")}$.
    `;else{const i=e(-5,5,[0,-1,1]);this.reponse=e(-9,9,[-1,0,1]);const t=e(-9,9,[0]),o=t-i*this.reponse;this.question=`Solution de l'équation $${i}x${r(o)}=${t}$`,this.correction=`On procède par étapes successives :<br>
      On commence par isoler $${i}x$ dans le membre de gauche en ajoutant
      $${r(-o)}$ dans chacun des membres, puis on divise
      par $${i}$ pour obtenir la solution : <br>
       $\\begin{aligned}
       ${i}x${r(o)}&=${t}\\\\
      ${i}x&=${t}${r(-o)}\\\\
      ${i}x&=${t-o}\\\\
      x&=\\dfrac{${t-o}}{${i}}\\\\
      x&=${this.reponse}
      \\end{aligned}$<br>
      La solution de l'équation est : $${p(this.reponse)}$.
      `}this.canEnonce=this.question,this.canReponseACompleter=""}}export{Ei as default,qi as interactifReady,vi as interactifType,gi as titre,yi as uuid};
//# sourceMappingURL=can2a-2024-Q16-CzFGwKWF.js.map

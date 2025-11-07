import{D as m,K as n,F as p,y as s,p as a,k as e}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ei="Résoudre une équation",yi=!0,Oi="mathLive",Ai="a9e45";class Fi extends m{constructor(){super(),this.canOfficielle=!1,this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=n.clavierDeBaseAvecFraction}nouvelleVersion(){if(this.canOfficielle)this.reponse=new p(2,7),this.question="Solution de  l'équation $7x+3=5$<br>",this.correction=`On procède par étapes successives :<br>
    On commence par isoler $7x$ dans le membre de gauche en retranchant
    $3$ dans chacun des membres, puis on divise
    par $7$ pour obtenir la solution : <br>
     $\\begin{aligned}
     7x+3&=5\\\\
    7x&=5-3\\\\
    7x&=2\\\\
    x&=\\dfrac{2}{7}   
    \\end{aligned}$<br>
    La solution de l'équation est : $${s("\\dfrac{2}{7}")}$.
    `;else{const r=a([[3,1,5],[3,1,8],[3,2,9],[3,2,-9],[7,4,-2],[7,4,8],[7,3,2],[7,3,-5],[6,3,-2],[6,3,10],[6,4,3],[6,4,-3],[3,4,14],[7,4,14]]),i=r[0],t=r[1],o=r[2];this.reponse=new p(o-t,i),this.question=`Solution de l'équation $${i}x${e(t)}=${o}$<br>`,this.correction=`On procède par étapes successives :<br>
      On commence par isoler $${i}x$ dans le membre de gauche en retranchant
      $${t}$ dans chacun des membres, puis on divise
      par $${i}$ pour obtenir la solution : <br>
       $\\begin{aligned}
       ${i}x${e(t)}&=${o}\\\\
      ${i}x&=${o}${e(-t)}\\\\
      ${i}x&=${o-t}\\\\
      x&=\\dfrac{${o-t}}{${i}}    
      \\end{aligned}$<br>
      La solution de l'équation est : $${s(this.reponse)}$.
      `}this.canEnonce=this.question,this.canReponseACompleter=""}}export{Fi as default,yi as interactifReady,Oi as interactifType,Ei as titre,Ai as uuid};
//# sourceMappingURL=can1a-2024-Q10-2HxciSEa.js.map

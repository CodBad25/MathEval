import{D as g,r as s,y as e}from"./index-DjA7ROjC.js";import{G as o,I as n}from"./vendors/mathjs-oaIJR0Fd.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";const Di="Déterminer le conjugué d'un nombre complexe",ji=!0,yi="mathLive",ki=!0,Ei="AMCHybride",Oi="07/092025",Ci="ac62a",Ri={"fr-fr":["canTEC1-05"],"fr-ch":[]};class Ti extends g{constructor(){super(),this.nbQuestions=1,this.typeExercice="simple"}nouvelleVersion(){const i=s(-5,5),t=s(-5,5),r=o(i,t),p=o(-i,-t),m=o(-t,i),$=o(i,-t),c=o(t,i),a=o(t,-i),l=s(0,4);switch(this.question=`On donne le nombre complexe $z = ${r.toString()}$.<br>`,this.correction="Par définition, le conjugué d'un nombre complexe qui s'écrit sous la forme $z=a+ib$, avec $a$ et $b$ deux réels, est $\\overline{z} =a-ib$.<br>",l){case 0:this.question+="Déterminer le conjugué de $z$.",this.correction+=`On a donc ici : $\\overline{z} = ${e(`${n(r).toString()}`)}$.`,this.reponse=`${i}+${-t}i`;break;case 1:this.question+="Déterminer $\\overline{z}$.",this.correction+=`On a donc ici : $\\overline{z} = ${e(`${n(r).toString()}`)}$.`,this.reponse=`${i}+${-t}i`;break;case 2:this.question+="Déterminer la forme algébrique de $Z=\\overline{-z}$.",this.correction+=`
    $\\begin{aligned}
    Z&=\\overline{-z}\\\\
     &= \\overline{${p.toString()}}\\\\
    &=${e(`${n(p).toString()}`)}.
    \\end{aligned}$`,this.reponse=`${-i}+${t}i`;break;case 3:this.question+="Déterminer la forme algébrique de $Z=\\overline{iz}$.",this.correction+=`
    $\\begin{aligned}
    Z&=\\overline{iz}\\\\
      &= \\overline{i\\left(${r.toString()}\\right)}\\\\
      &= \\overline{${m.toString()}}\\\\
    &=${e(`${n(m).toString()}`)}.
    \\end{aligned}$<br>
    On aurait pu aussi utiliser la propriété  des produits des conjugués :<br>
     $\\begin{aligned}
    Z&=\\overline{iz}\\\\
      &= \\overline{i} \\times \\overline{${r.toString()}}\\\\
       &= -i \\left({${$.toString()}}\\right)\\\\
       &=${e(`${n(m).toString()}`)}.
    \\end{aligned}$<br>`,this.reponse=`${-i}+${-t}i`;break;case 4:this.question+="Déterminer la forme algébrique de $Z=\\overline{-iz}$.",this.correction+=`
    $\\begin{aligned}
    Z&=\\overline{-iz}\\\\
      &= \\overline{-i\\left(${r.toString()}\\right)}\\\\
      &= \\overline{${a.toString()}}\\\\
    &=${e(`${c.toString()}`)}.
    \\end{aligned}$<br>
    On aurait pu aussi utiliser la propriété  des produits des conjugués :<br>
     $\\begin{aligned}
    Z&=\\overline{-iz}\\\\
      &= \\overline{-i} \\times \\left(\\overline{${r.toString()}}\\right)\\\\
       &= i \\left({${n(r).toString()}}\\right)\\\\
      &=${e(`${c.toString()}`)}.
    \\end{aligned}$<br>`,this.reponse=`${-t}+${-i}i`;break}}}export{ki as amcReady,Ei as amcType,Oi as dateDePublication,Ti as default,ji as interactifReady,yi as interactifType,Ri as refs,Di as titre,Ci as uuid};
//# sourceMappingURL=canTEC1-05-B2XID81i.js.map

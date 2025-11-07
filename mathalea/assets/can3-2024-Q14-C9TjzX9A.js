import{D as $,K as a,P as o,s as t,y as s,p,r as e,v as n}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const yt="Calculer avec un programme de calcul",Et=!0,Nt="mathLive",Pt="f9727";class Rt extends ${constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=a.clavierDeBase,this.canOfficielle=!1}nouvelleVersion(){if(this.canOfficielle)this.reponse=9,o.isHtml?(this.question="Nombre de départ <br>",this.question+=`${t(15)}$\\downarrow$<br>`,this.question+=`$\\begin{array}{|l|}
`,this.question+=`\\hline
`,this.question+=`\\
 \\text{Soustraire } 5 \\
`,this.question+=`\\\\
 \\text{Prendre son carré } \\\\
 `,this.question+=`\\hline
`,this.question+=`\\end{array}
$<br>`,this.question+=`${t(15)}$\\downarrow$<br>
       `,this.question+=`${t(7)}Résultat<br>`):(this.question=`${t(2)}\\texttt{Nombre de départ}`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(8)} \\fbox{ \\texttt{Soustraire } 5}`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(8)} \\fbox{ \\texttt{Prendre son carré } }`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(4)}\\texttt{Résultat}`,this.question+="<br>"),this.question+="Quel est le résultat  si le nombre de départ est $2$ ?",this.correction=`On soustrait $5$, on obtient : $2-5=-3$.<br>
      En prenant le carré, on obtient  : $(-3)^2=${s(this.reponse)}$.`;else if(p([!0,!1])){const i=e(6,10),r=e(1,i-1);this.reponse=(r-i)**2,o.isHtml?(this.question="Nombre de départ <br>",this.question+=`${t(15)}$\\downarrow$<br>`,this.question+=`$\\begin{array}{|l|}
`,this.question+=`\\hline
`,this.question+=`\\
 \\text{Soustraire } ${i} \\
`,this.question+=`\\\\
 \\text{Prendre son carré } \\\\
 `,this.question+=`\\hline
`,this.question+=`\\end{array}
$<br>`,this.question+=`${t(15)}$\\downarrow$<br>
         `,this.question+=`${t(7)}Résultat<br>`):(this.question=`${t(2)}\\texttt{Nombre de départ}`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(8)} \\fbox{ \\texttt{Soustraire } ${i}}`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(8)} \\fbox{ \\texttt{Prendre son carré } }`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(4)}\\texttt{Résultat}`,this.question+="<br>"),this.question+=`Quel est le résultat  si le nombre de départ est $${r}$ ?`,this.correction=`On soustrait $${i}$, on obtient : $${r}-${i}=${r-i}$.<br>
         En prenant le carré, on obtient  : $${n(r-i)}^2=${s(this.reponse)}$.
        `}else{const i=e(1,10),r=e(-10,-1);this.reponse=(r+i)**2,o.isHtml?(this.question="Nombre de départ <br>",this.question+=`${t(15)}$\\downarrow$<br>`,this.question+=`$\\begin{array}{|l|}
`,this.question+=`\\hline
`,this.question+=`\\
 \\text{Ajouter } ${i} \\
`,this.question+=`\\\\
 \\text{Prendre son carré } \\\\
 `,this.question+=`\\hline
`,this.question+=`\\end{array}
$<br>`,this.question+=`${t(15)}$\\downarrow$<br>
         `,this.question+=`${t(8)}Résultat`,this.question+="<br>"):(this.question=`${t(2)}\\texttt{Nombre de départ}`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(8)} \\fbox{ \\texttt{Ajouter } ${i}}`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(8)} \\fbox{ \\texttt{Prendre son carré } }`,this.question+=`<br>${t(8)}$\\downarrow$<br>`,this.question+=`${t(4)}\\texttt{Résultat}`,this.question+="<br>"),this.question+=`Quel est le résultat  si le nombre de départ est $${r}$ ?`,this.correction=`On ajoute  $${i}$, on obtient : $${r}+${i}=${r+i}$.<br>
       En prenant le carré, on obtient  : $${n(r+i)}^2=${s(this.reponse)}$.
      `}this.canEnonce=this.question,this.canReponseACompleter=""}}export{Rt as default,Et as interactifReady,Nt as interactifType,yt as titre,Pt as uuid};
//# sourceMappingURL=can3-2024-Q14-C9TjzX9A.js.map

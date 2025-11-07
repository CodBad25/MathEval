import{l as U}from"./message-CjyDvxbN.js";import{E as A,P as m,bV as E,r as x,ae as c,a$ as I,c0 as P,bf as i,p as j,o as w,an as M}from"./index-DjA7ROjC.js";import{s as v}from"./scratchblock-BX91tLjs.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const _e="Compléter un script Scratch - 2",eo=!0,oo="AMCOpen",ro="22/09/2022",to="08/05/2023",io="52c97",no={"fr-fr":["3I12-3"],"fr-ch":[]};class so extends A{constructor(){super(),this.besoinFormulaireTexte=["Brique(s) à trouver",`Nombres séparés par des tirets :
1 : Ligne 2 (variable)
2 : Ligne 2 (nombre)
3 : Ligne 4
4 : Ligne 5 (réponse)
5 : Ligne 5 (variable)
6 : Ligne 5 (nombre)
7 : Ligne 6 (variable et réponse)
8 : Ligne 6 (mot(s))
9 : Ligne 7 (nombre)
10 : Ligne 7 (variable)
11 : Tous ces choix`],this.besoinFormulaire2Numerique=["Nombre de briques à trouver",10],this.besoinFormulaire3Texte=["Choix sur la brique intiale",`Nombres séparés par des tirets :
1 : La brique initiale est un clic sur drapeau vert.
2 : La brique initiale est un clic sur lutin.
3 : La brique initiale est un appui sur touche imposée
4 : La brique initiale est un appui sur touche non imposée
5 : Une des possiblités précédentes choisie au hasard`],this.besoinFormulaire4Texte=["Choix sur une des phrases finales",`Nombres séparés par des tirets :
1 : Une phrase finale contient : ... est un multiple de ...
2 : Une phrase finale contient : ... divise ...
3 : Une phrase finale contient : ... est un diviseur de ...
4 : Une des possiblités précédentes choisie au hasard`],this.sup=11,this.sup2=3,this.sup3=5,this.sup4=4,this.spacing=2,this.nbQuestions=1,this.typeExercice="Scratch"}nouvelleVersion(){this.introduction=U({titre:m.isHtml?`${v(`\\begin{scratch}[print,fill,blocks,scale=0.5]
\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}\\end{scratch}`)}`:"Information",texte:(m.isHtml?"":"$\\setscratch{print}\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}$<br>")+"Cette brique donne le reste de la division euclidienne du nombre de gauche par le nombre de droite.",couleur:"nombres"});const h=E(1,10,this.sup2,x(1,10));this.consigne="Compléter ",this.consigne+=h>1?"les briques manquantes.":"la brique manquante.";let o=c({max:10,defaut:11,melange:11,nbQuestions:0,saisie:this.sup});o.push(...I(10)),o=P(o).slice(0,h);const k=i(o,1)>0,L=i(o,2)>0,$=i(o,3)>0,q=i(o,4)>0,C=i(o,5)>0,S=i(o,6)>0,l=i(o,7)>0,u=i(o,8)>0,T=i(o,9)>0,Q=i(o,10)>0,D=c({max:4,defaut:5,melange:5,nbQuestions:this.nbQuestions,saisie:this.sup2}),N=c({max:3,defaut:4,melange:4,nbQuestions:this.nbQuestions,saisie:this.sup3});for(let s=0,p,b,d=0;s<this.nbQuestions&&d<50;){const n=[];for(let a=1;a<27;a++)n.push(String.fromCharCode(64+a).toLowerCase());for(let a=0;a<10;a++)n.push(a);n.push("espace"),n.push("flèche haut"),n.push("flèche bas"),n.push("flèche droite"),n.push("flèche gauche");const y=j(n),F=x(1,26,[23,9,15,17]),t=M(F);let e=`\\begin{scratch}[print,fill,blocks,scale=1]
`;switch(D[s]){case 1:e+=`\\blockinit{quand \\greenflag est cliqué}
`;break;case 2:e+=`\\blockinit{quand ce sprite est cliqué}
`;break;case 3:e+=`\\blockinit{quand la touche \\selectmenu{${y}} est pressée}
`;break;case 4:e+=`\\blockinit{quand la touche \\selectmenu{n'importe laquelle} est pressée}
`;break}const r=[e];switch(r.push(`\\blockvariable{mettre \\selectmenu{${t}} à \\ovalnum{1}}
`),e+=`\\blockvariable{mettre \\selectmenu{${k?" ................ ":t}} à ${L?"\\ovalnum{ ................ }":"\\ovalnum{1}"}}
`,r.push(`\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}
`),e+=r[2],r.push(`\\blockrepeat{répéter \\ovalsensing{réponse} fois}
{
`),e+=$?`\\blockrepeat{répéter \\ovalnum{ ................ } fois}
{
`:r[3],r.push(`\\blockif{si \\booloperator{\\ovaloperator{\\ovalsensing{réponse} modulo \\ovalmove{${t}}} = \\ovalnum{0}} alors}
`),e+="\\blockif{si \\booloperator{\\ovaloperator{",e+=q?"\\ovalnum{ ................ }":"\\ovalsensing{réponse}",e+=" modulo ",e+=C?"\\ovalnum{ ................ }":`\\ovalmove{${t}}`,e+="} =  ",e+=S?"\\ovalnum{ ................ }}":"\\ovalnum{0}}",e+=`  alors}
`,N[s]){case 1:r.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalsensing{réponse} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${t}}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}
}
`),e+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper ${l?"\\ovalnum{ ................ }":"\\ovalsensing{réponse}"} et \\ovaloperator{regrouper \\ovalnum{${u?" ................ ":" est un multiple de "}} et ${l?"\\ovalnum{ ................ }":"\\ovalmove{"+t+"}"}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}
}
`;break;case 2:r.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalsensing{réponse}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}
}
`),e+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper ${l?"\\ovalnum{ ................ }":"\\ovalmove{"+t+"}"} et \\ovaloperator{regrouper \\ovalnum{${u?" ................ ":" divise "}} et ${l?"\\ovalnum{ ................ }":"\\ovalsensing{réponse}"}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}
}
`;break;case 3:r.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalsensing{réponse}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}
}
`),e+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper ${l?"\\ovalnum{ ................ }":"\\ovalmove{"+t+"}"} et \\ovaloperator{regrouper \\ovalnum{${u?" ................ ":" est un diviseur de "}} et ${l?"\\ovalnum{ ................ }":"\\ovalsensing{réponse}"}}} et \\ovalnum{.}} pendant \\ovalnum{0.5} secondes}
}
`;break}r.push(`\\blockvariable{ajouter \\ovalnum{1} à \\selectmenu{${t}}}
`),e+=`\\blockvariable{ajouter ${T?"\\ovalnum{ ................ }":"\\ovalnum{1}"} à \\selectmenu{${Q?" ................ ":t}}}
`,r.push(`}
\\end{scratch}`),e+=r[7];const g=v(e);p=typeof g=="string"?g:"problème avec texteScratch";const f=v(r.join(""));b=typeof f=="string"?f:"problème avec texteCorr",m.isAmc&&(this.autoCorrection=[{enonce:this.consigne+"<br>"+p+"<br>",propositions:[{statut:3,sanscadre:!0}]}]),this.questionJamaisPosee(s,p)&&(this.listeQuestions[s]=p,this.listeCorrections[s]=b,s++),d++}w(this)}}export{eo as amcReady,oo as amcType,to as dateDeModifImportante,ro as dateDePublication,so as default,no as refs,_e as titre,io as uuid};
//# sourceMappingURL=3I12-3-BvZATRTB.js.map

import{l as H}from"./message-CjyDvxbN.js";import{E as V,ae as D,p as g,r as k,an as C,W as w,aA as Q,bV as I,ah as M,P as q,bd as U,o as B}from"./index-DjA7ROjC.js";import{s as E}from"./scratchblock-BX91tLjs.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const oo="Comprendre un script Scratch - 1",io=!0,to="AMCHybride",ro="20/09/2022",so="08/05/2023",no="defeb",ao={"fr-fr":["3I12-2"],"fr-ch":[]};class lo extends V{constructor(){super(),this.besoinFormulaireTexte=["Question(s) à sélectionner",`Nombres séparés par des tirets :
1 : Nombre de variables
2 : Nom de variables
3 : Description du script
4 : Test du script avec deux nombres multiples
5 : Test du script avec deux nombres non multiples
6 : Action initiale
   ------------   
7 : Une seule question parmi celles choisies
8 : Deux questions parmi celles choisies
9 : Trois questions parmi celles choisies
10 : Quatre questions parmi celles choisies
11 : Cinq questions parmi celles choisies
12 : L'ensemble des six questions`],this.besoinFormulaire2Texte=["Choix sur la brique intiale",`Nombres séparés par des tirets :
1 : La brique initiale est un clic sur drapeau vert.
2 : La brique initiale est un clic sur lutin.
3 : La brique initiale est un appui sur touche imposée
4 : La brique initiale est un appui sur touche non imposée
5 : Une des possiblités précédentes choisie au hasard`],this.besoinFormulaire3Texte=["Choix sur une des phrases finales",`Nombres séparés par des tirets :
1 : Une phrase finale contient : ... est un multiple de ...
2 : Une phrase finale contient : ... divise ...
3 : Une phrase finale contient : ... est un diviseur de ...
4 : Une des possiblités précédentes choisie au hasard`],this.besoinFormulaire4Numerique=["Choix de l'ordre sur la brique modulo",3,`1 : Premier entier demandé modulo le second
2 : Second entier demandé modulo le premier 
3 : Une des possiblités précédentes choisie au hasard`],this.sup=9,this.sup2=5,this.sup3=4,this.sup4=3,this.spacing=2,this.spacingCorr=2,this.nbQuestions=1,this.typeExercice="Scratch"}nouvelleVersion(){const N=D({max:4,defaut:5,melange:5,nbQuestions:this.nbQuestions,saisie:this.sup2}),l=D({max:3,defaut:4,melange:4,nbQuestions:this.nbQuestions,saisie:this.sup3}),n=this.sup4===3?g([!0,!1]):this.sup4===2;for(let t=0,$,b,S=0;t<this.nbQuestions&&S<50;){const p=[];for(let e=1;e<27;e++)p.push(String.fromCharCode(64+e).toLowerCase());for(let e=0;e<10;e++)p.push(e);p.push("espace"),p.push("flèche haut"),p.push("flèche bas"),p.push("flèche droite"),p.push("flèche gauche");const T=g(p),x=k(1,26,[23,9,15,17]),P=k(1,26,[23,9,15,17,x]);let a=C(x),r=C(P),o=`\\begin{scratch}[print,fill,blocks,scale=1]
`;const y=[[`\\blockinit{quand \\greenflag est cliqué}
`,"Quand le drapeau vert est cliqué"],[`\\blockinit{quand ce sprite est cliqué}
`,"Quand ce sprite est cliqué"],[`\\blockinit{quand la touche \\selectmenu{${T}} est pressée}
`,`Quand la touche ${T} est pressée`],[`\\blockinit{quand la touche \\selectmenu{n'importe laquelle} est pressée}
`,"Quand n'importe quelle touche est pressée"]],v=N[t];o+=typeof v=="number"?y[v-1][0]:"",o+=`\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}
`,o+=`\\blockvariable{mettre \\selectmenu{${a}} à \\ovalsensing{réponse}}
`,o+=`\\blockmove{demander \\ovalnum{Donne-moi un second nombre entier.} et attendre}
`,o+=`\\blockvariable{mettre \\selectmenu{${r}} à \\ovalsensing{réponse}}
`;const F=C(x);switch(a=n?r:a,r=n?F:r,o+=`\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalmove{${a}} modulo \\ovalmove{${r}}} = \\ovalnum{0}} alors}
`,l[t]){case 1:o+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${a}} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${r}}}} et \\ovalnum{.}}}
}
`,o+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${a}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un multiple de } et \\ovalmove{${r}}}} et \\ovalnum{.}}}
}
`;break;case 2:o+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${r}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`,o+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${r}} et \\ovaloperator{regrouper \\ovalnum{ ne divise pas } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`;break;case 3:o+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${r}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`,o+=`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${r}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un diviseur de } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`;break}o+="\\end{scratch}";const A=E(o);o=typeof A=="string"?A:"problème avec scratchblock";const s=g([2,3,5,9,10]),m=g(w(5,15))*s,c=m+k(1,s-1),d=[["Combien ce script comporte-t-il de variables ?",`Ce script comporte ${Q(2)} variables.`,1],["Comment se nomment les variables dans ce script ?",`Les variables de ce script se nomment ${Q(a)} et ${Q(r)}.`,1],["Que fait ce script ?",`Ce script demande deux nombres entiers à l'utilisateur, calcule le reste de la division euclidienne du
      ${n?" second nombre fourni par le premier ":" premier nombre fourni par le second "}
      puis indique si
      ${l[t]===1?n?" le second nombre ":" le premier nombre ":n?" le premier nombre ":" le second nombre "} ${l[t]===1?" est un multiple ou pas du ":l[t]===2?" divise ou pas le ":" est un diviseur ou pas du "} ${l[t]===1?n?"premier":"second":n?"second":"premier"} nombre.`,3],[`Si les nombres saisis sont d'abord ${n?s:m} puis ensuite ${n?m:s}, que dit précisément le lutin au final ?`,`${l[t]===1?m+" est un multiple de "+s:l[t]===2?s+" divise "+m:s+" est un diviseur de "+m}.`,1],[`Si les nombres saisis sont d'abord ${n?s:c} puis ensuite ${n?c:s}, que dit précisément le lutin au final ?`,`${l[t]===1?c+" n'est pas un multiple de "+s:l[t]===2?s+" ne divise pas "+c:s+" n'est pas un diviseur de "+c}.`,1],["Quelle action initiale permet de déclencher ce script ?",typeof v=="number"?y[v-1][1]:".",1]];let i=[],h=[6];if(!this.sup)i=d;else if(typeof this.sup=="number")this.sup=I(1,12,this.sup,12),this.sup<7?i=[d[this.sup]]:i=M(d,6).slice(0,this.sup-6);else{const e=this.sup.split("-");for(let u=0;u<e.length;u++)e[u]=I(1,12,parseInt(e[u]),12),e[u]<7?i.push(d[e[u]-1]):h=[e[u]-6];i.length===0&&(i=M(d,6).slice(0,h[0]))}i=M(i,i.length),this.introduction=H({titre:q.isHtml?`${E(`\\begin{scratch}[print,fill,blocks,scale=0.5]
\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}\\end{scratch}`)}`:"Information",texte:(q.isHtml?"":"$\\setscratch{print}\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}$<br>")+"Cette brique donne le reste de la division euclidienne du nombre de gauche par le nombre de droite.",couleur:"nombres"}),q.isAmc&&(this.autoCorrection[0]={enonce:"",enonceAvant:!1,propositions:[]}),this.consigne="Lire ce script Scratch associé à un lutin et répondre ensuite",this.consigne+=Math.min(i.length,h[0])>1?" aux questions.":" à la question.";let L="";b="";let f="";for(let e=0;e<Math.min(i.length,h[0]);e++)Math.min(i.length,h[0])===1?(f=i[0][0]+"<br>",b=i[0][1]+"<br>"):(f=U(e)+i[e][0]+"<br>",b+=U(e)+i[e][1]+"<br>"),q.isAmc&&(this.autoCorrection[0].propositions[e]={type:"AMCOpen",propositions:[{enonce:(e===0?o+"<br><br>":"")+f,texte:"",statut:i[e][2],pointilles:!1}]}),L+="<br>"+f;$=o+L,this.questionJamaisPosee(t,$)&&(this.listeQuestions[t]=$,this.listeCorrections[t]=b,t++),S++}B(this)}}export{io as amcReady,to as amcType,so as dateDeModifImportante,ro as dateDePublication,lo as default,ao as refs,oo as titre,no as uuid};
//# sourceMappingURL=3I12-2-ClXGhq39.js.map

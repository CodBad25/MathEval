import{l as P}from"./message-B6Zal6dn.js";import{E as D,P as d,ae as h,bf as p,p as C,r as S,o as E,an as b}from"./index-Bk_D2JkM.js";import{s as g}from"./scratchblock-CshoMrZ3.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ge="Compléter un script Scratch - 1",Ke=!0,We="AMCOpen",Xe="20/09/2022",Ye="08/05/2023",Ze="39a32",_e={"fr-fr":["3I12-1"],"fr-ch":[]};class eo extends D{constructor(){super(),this.besoinFormulaireTexte=["Brique(s) à trouver",`Nombres séparés par des tirets :
1 : Lignes 3 et 5
2 : Ligne 6
3 : Lignes 7 et 8 (aux extrèmes)
4 : Lignes 7 et 8 (au centre)
5 : Une des possiblités précédentes choisie au hasard`],this.besoinFormulaire2Texte=["Choix sur la brique intiale",`Nombres séparés par des tirets :
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
3 : Une des possiblités précédentes choisie au hasard`],this.sup=5,this.sup2=5,this.sup3=4,this.sup4=3,this.spacing=2,this.nbQuestions=1,this.typeExercice="Scratch"}nouvelleVersion(){this.introduction=P({titre:d.isHtml?`${g(`\\begin{scratch}[print,fill,blocks,scale=0.5]
\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}\\end{scratch}`)}`:"Information",texte:(d.isHtml?"":"$\\setscratch{print}\\ovaloperator{\\ovalnum{ } modulo \\ovalnum{ }}$<br>")+"Cette brique donne le reste de la division euclidienne du nombre de gauche par le nombre de droite.",couleur:"nombres"}),this.consigne="Compléter les briques manquantes.";const u=h({max:4,defaut:5,melange:5,nbQuestions:this.nbQuestions,shuffle:!1,saisie:this.sup}),k=p(u,1)>0,L=p(u,2)>0,n=p(u,3)>0,r=p(u,4)>0,T=h({max:4,defaut:5,melange:5,nbQuestions:this.nbQuestions,saisie:this.sup2}),Q=h({max:3,defaut:4,melange:4,nbQuestions:this.nbQuestions,saisie:this.sup3});for(let s=0,m,v,$=0;s<this.nbQuestions&&$<50;){const f=this.sup4===3?C([!0,!1]):this.sup4===2,i=[];for(let l=1;l<27;l++)i.push(String.fromCharCode(64+l).toLowerCase());for(let l=0;l<10;l++)i.push(l);i.push("espace"),i.push("flèche haut"),i.push("flèche bas"),i.push("flèche droite"),i.push("flèche gauche");const y=C(i),c=S(1,26,[23,9,15,17]),U=S(1,26,[23,9,15,17,c]);let a=b(c),t=b(U),o=`\\begin{scratch}[print,fill,blocks,scale=1]
`;switch(T[s]){case 1:o+=`\\blockinit{quand \\greenflag est cliqué}
`;break;case 2:o+=`\\blockinit{quand ce sprite est cliqué}
`;break;case 3:o+=`\\blockinit{quand la touche \\selectmenu{${y}} est pressée}
`;break;case 4:o+=`\\blockinit{quand la touche \\selectmenu{n'importe laquelle} est pressée}
`;break}o+=`\\blockmove{demander \\ovalnum{Donne-moi un nombre entier.} et attendre}
`;const e=[o];e.push(`\\blockvariable{mettre \\selectmenu{${a}} à \\ovalsensing{réponse}}
`),o+=k?`\\blockvariable{mettre \\selectmenu{${a}} à \\ovalnum{ ................ }}
`:e[1],e.push(`\\blockmove{demander \\ovalnum{Donne-moi un second nombre entier.} et attendre}
`),o+=e[2],e.push(`\\blockvariable{mettre \\selectmenu{${t}} à \\ovalsensing{réponse}}
`),o+=k?`\\blockvariable{mettre \\selectmenu{${t}} à \\ovalnum{ ................ }}
`:e[3];const I=b(c);switch(a=f?t:a,t=f?I:t,e.push(`\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalmove{${a}} modulo \\ovalmove{${t}}} = \\ovalnum{0}} alors}
`),o+=L?`\\blockifelse{si \\booloperator{\\ovaloperator{\\ovalnum{ ................ } modulo \\ovalnum{ ................ }} = \\ovalnum{0}} alors}
`:e[4],Q[s]){case 1:e.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${a}} et \\ovaloperator{regrouper \\ovalnum{ est un multiple de } et \\ovalmove{${t}}}} et \\ovalnum{.}}}
}
`),o+=n?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" est un multiple de "}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}
}
`:r?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${a}} et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" est un multiple de "}} et \\ovalmove{${t}}}} et \\ovalnum{.}}}
}
`:e[5],e.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${a}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un multiple de } et \\ovalmove{${t}}}} et \\ovalnum{.}}}
}
`),o+=n?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" n'est pas un multiple de "}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}
}
`:r?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${a}} et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" n'est pas un multiple de "}} et \\ovalmove{${t}}}} et \\ovalnum{.}}}
}
`:e[6];break;case 2:e.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{ divise } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`),o+=n?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" divise "}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}
}
`:r?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" divise "}} et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`:e[5],e.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{ ne divise pas } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`),o+=n?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" ne divise pas "}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}
}
`:r?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" ne divise pas "}} et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`:e[6];break;case 3:e.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{ est un diviseur de } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`),o+=n?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" est un diviseur de "}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}
}
`:r?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" est un diviseur de "}} et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`:e[5],e.push(`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{ n'est pas un diviseur de } et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`),o+=n?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalnum{ ................ } et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" n'est pas un diviseur de "}} et \\ovalnum{ ................ }}} et \\ovalnum{.}}}
}
`:r?`{\\blocklook{dire \\ovaloperator{regrouper \\ovaloperator{regrouper \\ovalmove{${t}} et \\ovaloperator{regrouper \\ovalnum{${r?" ................ ":" n'est pas un diviseur de "}} et \\ovalmove{${a}}}} et \\ovalnum{.}}}
}
`:e[6];break}e.push("\\end{scratch}"),o+=e[7];const x=g(o);typeof x=="string"?o=x:o="Il y a un problème avec texteScratch",m=o;const q=g(e.join(""));typeof q=="string"?v=q:v="Il y a un problème avec texteSansTrou",d.isAmc&&(this.autoCorrection=[{enonce:this.consigne+"<br>"+o+"<br>",propositions:[{statut:3,sanscadre:!0}]}]),this.questionJamaisPosee(s,m)&&(this.listeQuestions[s]=m,this.listeCorrections[s]=v,s++),$++}E(this)}}export{Ke as amcReady,We as amcType,Ye as dateDeModifImportante,Xe as dateDePublication,eo as default,_e as refs,Ge as titre,Ze as uuid};
//# sourceMappingURL=3I12-1-m10OFXLt.js.map

import{a as v}from"./etudeFonction-BKtJzdrF.js";import{E as L,ah as D,r as a,p as c,G as $,bd as m,k as f,o as O}from"./index-Bk_D2JkM.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./Matrice-CnCTeW3b.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/tiny-emitter-DDQe9_b_.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ve="01/10/2022",we="Dresser et utiliser le tableau de signes d'une fonction affine en lien avec son sens de variation",Ae="46bec",Je={"fr-fr":["2F10-7"],"fr-ch":[]};class Ne extends L{constructor(){super(),this.besoinFormulaireNumerique=["Types de question ",3,`1 : Donner le tableau de signes.
2 : Utiliser le tableau de signes.
3 : Mélange.`],this.nbQuestions=2,this.spacing=1.75,this.spacingCorr=1.75,this.sup=1}nouvelleVersion(){let b;this.sup===1?b=["Signes1"]:this.sup===2?b=["Signes2"]:b=["Signes1","Signes2"];const g=[["f"],["g"],["h"],["u"],["v"],["w"]],x=D(b,this.nbQuestions);for(let l=0,q=0;l<this.nbQuestions&&q<50;){let u="",o="";const d=[];switch(x[l]){case"Signes1":if(c([0,1])===0){const t=c(g),i=c([1,2,5,10])*c([-1,1]),n=a(1,15)*c([-1,1]),e=-n/i;u=`Une fonction affine $${t}$  définie sur $\\mathbb R$ est strictement ${i>0?"croissante":"décroissante"}. De plus $${t}(${$(e,1)})=0$.<br>
        ${m(0)} Dresser son tableau de signes sur $\\mathbb R$.<br>
        ${m(1)} Donner une fonction $${t}$ vérifiant les conditions précédentes.`,o=`${m(0)} $${t}$ est une fonction affine. Elle s'écrit donc sous la forme $${t}(x)=ax+b$. <br>
        Puisque $${t}$ est strictement ${i>0?"croissante":"décroissante"} sur $\\mathbb R$, les images sont ${i>0?"d'abord négatives, puis positives":"d'abord positives, puis négatives"}.<br>
        Sachant que $${t}$ s'annule en $${$(e,1)}$, le changement de signe intervient donc en $x=${$(e,1)}$. <br>
        On obtient ainsi le tableau de signes suivant : <br>
         `;let s;i>0?s=["Line",10,"",0,"-",20,"z",20,"+"]:s=["Line",10,"",0,"+",20,"z",20,"-"],o+=v({tabInit:[[["$x$",1.5,10],[`$${t}(x)$`,2,50]],["$-\\infty$",20,`$${$(e,1)}$`,20,"$+\\infty$",30]],tabLines:[s],espcl:3.5,deltacl:.8,lgt:5}),o+=`<br> ${m(1)} La fonction doit vérifier les trois conditions : <br>
        $\\bullet$ être une fonction affine ; <br>
        $\\bullet$ être strictement ${i>0?"croissante":"décroissante"} ;<br>
        $\\bullet$ s'annuler en $${$(e,1)}$.<br>
       Comme $${t}$ est une fonction ${i>0?"croissante":"décroissante"}, on doit choisir un coefficient directeur
       $a$ ${i>0?"positif":"négatif"}.<br>
       Prenons ${i>0?"$a=1$":"$a=-1$"}.<br>
       $${t}$ est alors de la forme : $${t}(x)=${i>0?"":"-"}x + b$.<br>
       On cherche maintenant $b$ : <br>
       Comme on sait que : $${t}(${$(e,1)})=0$, on en déduit :
        $${t}(${$(e,1)})=${i>0?`${$(e,1)}`:`${$(-e,1)}`}   + b=0$.<br>
       d'où $b=${i>0?`${$(-e,1)}`:`${$(e,1)}`}$.<br>
       On obtient la fonction $${t}$ définie par $${t}(x)=${i>0?"":"-"}x${i>0?`${f(-e)}`:`${f(e)}`}$.<br>
       En partant d'une autre valeur pour $a$, on aurait obtenu une autre expression pour $${t}$.<br>
       Il existe une infinité de fonctions qui possèdent ces trois propriétés. <br>
       Toutes les fonctions de la forme $${t}(x)= k\\times\\left( ${i>0?"":"-"}x${i>0?`${f(-e)}`:`${f(e)}`}\\right)$ avec $k$ un réel non nul est solution de l'exercice.
       
       `,d.push(i,n,e)}else{const t=c(g),i=a(-5,5,0),n=i*a(-9,9,0),e=-n/i,s=a(-10,10,e),p=i*s+n;u=`Une fonction affine $${t}$  définie sur $\\mathbb R$ vérifie $${t}(${$(e,1)})=0$ et $${t}(${s})=${p}$.<br>
           Dresser son tableau de signes sur $\\mathbb R$. Justifier.
         `,s>e?o=` $${t}$ est une fonction affine (non constante, puisque $${t}(${s})\\neq ${t}(${$(e,1)})$), elle
          est donc soit strictement croissante, soit strictement décroissante.<br>
         On observe que $${e}<${s}$ implique ${i>0?`$${t}(${e}) < ${t}(${s})$`:`$${t}(${e}) > ${t}(${s})$`}.<br>
          Les images et les antécédents sont donc rangés ${i>0?"dans le même ordre":"dans l'ordre inverse"}.<br>
          On en déduit que la fonction $${t}$ est${i>0?"croissante":"décroissante"} sur $\\mathbb R$.<br>
          Les images sont donc ${i>0?"d'abord négatives, puis positives":"d'abord positives, puis négatives"}.<br>
          Sachant que $${t}$ s'annule en $${$(e,1)}$, le changement de signe intervient donc en $x=${$(e,1)}$. <br>
          On obtient ainsi le tableau de signes suivant : <br>
           `:o=` $${t}$ est une fonction affine (non constante, puisque $${t}(${s})\\neq ${t}(${$(e,1)})$), elle
           est donc soit strictement croissante, soit strictement décroissante.<br>
           On observe que $${s}<${e}$ implique ${i>0?`$${t}(${s}) < ${t}(${e})$`:`$${t}(${s}) > ${t}(${e})$`}.<br>
          Les images et les antécédents sont donc rangés ${i>0?"dans le même ordre":"dans l'ordre inverse"}.<br>
          On en déduit que la fonction $${t}$ est${i>0?"croissante":"décroissante"} sur $\\mathbb R$.<br>
           
           Les images sont ${i>0?"d'abord négatives, puis positives":"d'abord positives, puis négatives"}.<br>
           Sachant que $${t}$ s'annule en $${$(e,1)}$, le changement de signe intervient donc en $x=${$(e,1)}$. <br>
           On obtient ainsi le tableau de signes suivant : <br>
            `;let h;i>0?h=["Line",10,"",0,"-",20,"z",20,"+"]:h=["Line",10,"",0,"+",20,"z",20,"-"],o+=v({tabInit:[[["$x$",1.5,10],[`$${t}(x)$`,2,50]],["$-\\infty$",20,`$${$(e,1)}$`,20,"$+\\infty$",30]],tabLines:[h],espcl:3.5,deltacl:.8,lgt:5}),d.push(i,n,e)}break;case"Signes2":default:{const r=a(-5,5,0),t=r*a(-6,6,0),i=-t/r,n=c(g);let e,s;c([!0,!1])?(e=a(i+1,10),s=a(i+1,10,e)):(e=a(-10,i-1),s=a(-10,i-1,e)),u=`On donne le tableau de signes d'une fonction affine  $${n}$  définie sur $\\mathbb R$ :<br>`;let p;r>0?p=["Line",10,"",0,"-",20,"z",20,"+"]:p=["Line",10,"",0,"+",20,"z",20,"-"],u+=v({tabInit:[[["$x$",1.5,10],[`$${n}(x)$`,2,50]],["$-\\infty$",20,`$${$(i,1)}$`,20,"$+\\infty$",30]],tabLines:[p],espcl:3.5,deltacl:.8,lgt:5}),u+=`<br> ${m(0)} Donner le sens de varitions de $${n}$ sur $\\mathbb R$.<br>
        ${m(1)} Comparer $${n}(${e})$ et $${n}(${s})$.`,o=`${m(0)} D'après le tableau de signes, les images sont  ${r>0?"d'abord négatives, puis positives":"d'abord positives, puis négatives"}.<br>
        On en déduit que la fonction $${n}$ est ${r>0?"strictement croissante":"strictement décroissante"} sur $\\mathbb R$.<br>`,o+=`${m(1)} Comme $${n}$ est une fonction affine ${r>0?"strictement croissante":"strictement décroissante"},
          les antécédents et les images sont rangées ${r>0?"dans le même ordre":"dans l'ordre inverse"}. <br>
         `,s>e?o+=` Comme $${e} < ${s}$, alors  ${r>0?`$${n}(${e}) < ${n}(${s})$`:`$${n}(${e}) > ${n}(${s})$`}
         `:o+=` Comme $${s} < ${e}$, alors  ${r>0?`$${n}(${s}) < ${n}(${e})$`:`$${n}(${s}) > ${n}(${e})$`}
          `,d.push(r,t,i,e,s)}break}this.questionJamaisPosee(l,d.map(String).join(";")+x[l])&&(this.listeQuestions[l]=u,this.listeCorrections[l]=o,l++),q++}O(this)}}export{Ve as dateDePublication,Ne as default,Je as refs,we as titre,Ae as uuid};
//# sourceMappingURL=2F10-7-0wScG0CS.js.map

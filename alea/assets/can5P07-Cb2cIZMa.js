import{D as d,K as l,p as s,r as n,F as a}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ee="Résoudre un problème de proportionnalité*",Ce=!0,Qe="mathLive",Te=!0,Oe="AMCNum",ye="19/07/2022",we="afbda",Se={"fr-fr":["can5P07"],"fr-ch":[]};class Re extends d{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=l.clavierDeBaseAvecFraction}nouvelleVersion(){let e,t,i,$,r,o,p;const c=[["abricot"],["melon"],["tomate"],["pomme"],["fraise"],["citron"],["banane"]],m=[["pastèques","pastèque"],["melons","melon"],["potimarrons","potimarron"],["citrouilles","citrouille"]];switch(s([1,2])){case 1:p=s(["a","b","c"]),p==="a"?(e=n(4,7),t=e-1,i=s(c),o=new a(9*t,e),s([!0,!1])?this.question=`On paie  $9$ € pour $${e}$ kg de ${i[0]}s.<br>
       Quel est le prix de $${t}$ kg de ${i[0]}s ?<br>
        Donner la valeur exacte de ce prix.`:this.question=` $${e}$ kg de ${i[0]}s coûtent 9 €.<br>
        Quel est le prix de $${t}$ kg de ${i[0]}s ?<br>
         Donner la valeur exacte de ce prix.`,this.interactif&&(this.optionsChampTexte={texteApres:" €"}),this.correction=`Un kg de ${i[0]} coûte $\\dfrac{9}{${e}}$ €.<br>
          On en déduit que $${t}$ kg de ${i[0]}s coûtent $\\dfrac{9\\times${t}}{${e}}=\\dfrac{${9*t}}{${e}}${o.texSimplificationAvecEtapes()}$ €.
       
        `):p==="b"?(e=n(3,5),t=e-1,i=s(c),o=new a(7*t,e),s([!0,!1])?this.question=`On paie  $7$ € pour $${e}$ kg de ${i[0]}s.<br>

          Quel est le prix de $${t}$ kg de ${i[0]}s ?<br>

           Donner la valeur exacte de ce prix.`:this.question=` $${e}$ kg de ${i[0]}s coûtent $7$ €.<br>

           Quel est le prix de $${t}$ kg de ${i[0]}s ?<br>

            Donner la valeur exacte de ce prix.`,this.interactif&&(this.optionsChampTexte={texteApres:" €"}),this.correction=`Un kg de ${i[0]} coûte $\\dfrac{7}{${e}}$ €.<br>
             On en déduit que $${t}$ kg de ${i[0]}s coûtent $\\dfrac{7\\times${t}}{${e}}=\\dfrac{${7*t}}{${e}}${o.texSimplificationAvecEtapes()}$ €.
          
           `):(e=n(5,8),t=e-n(1,2),i=s(c),o=new a(11*t,e),s([!0,!1])?this.question=`On paie  $11$ € pour $${e}$ kg de ${i[0]}s.<br>

          Quel est le prix de $${t}$ kg de ${i[0]}s ?<br>

           Donner la valeur exacte de ce prix.`:this.question=` $${e}$ kg de ${i[0]}s coûtent $11$ €.<br>

           Quel est le prix de $${t}$ kg de ${i[0]}s ?<br>

            Donner la valeur exacte de ce prix.`,this.interactif&&(this.optionsChampTexte={texteApres:" €"}),this.correction=`Un kg de ${i[0]} coûte $\\dfrac{11}{${e}}$ €.<br>
             On en déduit que $${t}$ kg de ${i[0]}s coûtent $\\dfrac{11\\times${t}}{${e}}=\\dfrac{${11*t}}{${e}}${o.texSimplificationAvecEtapes()}$ €.
          
           `),this.canEnonce=this.question,this.canReponseACompleter="$\\ldots$ €";break;case 2:p=s(["a","b"]),p==="a"&&(r=n(5,10,[6,9]),e=n(4,10),$=s(m),o=new a(e*r,3),this.question=`$3$ ${$[0]} (identiques) ont une masse $${r}$ kg.<br>

      Quelle est la masse de  $${e}$  de ces mêmes ${$[0]} ? <br>

      Donner la valeur exacte de ce nombre.`,this.interactif&&(this.optionsChampTexte={texteApres:"  kg"}),this.correction=`La masse de $1$ ${$[1]} est : $\\dfrac{${r}}{3}$ kg.<br>
          On en déduit que $${e}$ ${$[0]} ont une masse de $\\dfrac{${e}\\times${r}}{3}=\\dfrac{${e*r}}{3}${o.texSimplificationAvecEtapes()}$ kg.
      `),p==="b"&&(r=n(5,11,[6,8,10]),e=n(5,11,8),$=s(m),o=new a(e*r,4),this.question=`$4$ ${$[0]} (identiques) ont une masse $${r}$ kg.<br>

    Quelle est la masse de  $${e}$  de ces mêmes ${$[0]} ? <br>
    
    Donner la valeur exacte de ce nombre.`,this.interactif&&(this.optionsChampTexte={texteApres:"  kg"}),this.correction=`La masse de $1$ ${$[1]} est : $\\dfrac{${r}}{4}$ kg.<br>
        On en déduit que $${e}$ ${$[0]} ont une masse de $\\dfrac{${e}\\times${r}}{4}=\\dfrac{${e*r}}{4}${o.texSimplificationAvecEtapes()}$ kg.
    `),this.canEnonce=this.question,this.canReponseACompleter="$\\ldots$ kg";break}this.reponse=o}}export{Te as amcReady,Oe as amcType,ye as dateDePublication,Re as default,Ce as interactifReady,Qe as interactifType,Se as refs,Ee as titre,we as uuid};
//# sourceMappingURL=can5P07-Cb2cIZMa.js.map

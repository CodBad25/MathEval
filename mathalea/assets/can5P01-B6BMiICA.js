import{D as a,p as i,r as n,G as $,y as o,av as r}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const ge="Calculer un prix après une évolution en pourcentage",Le=!0,fe="mathLive",Pe=!0,Qe="AMCNum",Me="7487c",Oe={"fr-fr":["can5P01"],"fr-ch":[]};class Ae extends a{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.versionQcmDisponible=!0,this.spacing=1.5,this.optionsChampTexte={texteApres:" €",texteAvant:"<br>"}}nouvelleVersion(){let e,t,s;switch(i(["a","b","c","d","e"])){case"a":e=n(4,13)*5,s=i(["pull","pantalon","tee-shirt","vêtement","blouson","sweat"]),t=i([10,20]),this.question=`Le prix d'un ${s} est $${e}$ €.<br>
       Il baisse de $${t}\\,\\%$. `,this.versionQcm?this.question+="Son nouveau prix est : ":this.question+="  Quel est son nouveau prix ? ",this.distracteurs=[`$${$(e+t*e/100,2)} $ €`,`$${$(e-t*e/1e3,2)} $ €`,`$${$(e-t/100,2)} $ €`],this.correction=`Le nouveau prix est de $${o($(e-t*e/100,2))} $ €.`,t===10?this.correction+=r(`
    <br> Mentalement : <br>
    On calcule d'abord le montant de la réduction. <br>
    Prendre $10\\,\\,\\%$  d'une quantité revient à la diviser par $10$. <br>
    Ainsi, $${t}\\,\\,\\%$  de $${e}$ est égal à $${e}\\div 10=${$(e/10,2)}$.<br>
                 La réduction est donc de : $${$(t*e/100,2)}$ €.<br>
         Le nouveau prix est :   $${e}-${$(t*e/100,2)}= ${$(e-t*e/100,2)}$  €.
    
  `):this.correction+=r(`
    <br> Mentalement : <br>
    On calcule d'abord le montant de la réduction. <br>
    Pour calculer $20\\,\\%$  d'une quantité, on commence par calculer $10\\,\\%$  en divisant
    par $10$ :<br> $10\\,\\%$ de $${e}$ est égal à $${e}\\div 10=${e/10}$.<br>
    Puisque $20\\,\\%$  est deux fois plus grand que $10\\,\\%$ ,  $20\\,\\%$  de $${e}$ est égal à $2\\times ${e/10}=${2*e/10}$.<br>
                    La réduction est donc de : $${$(t*e/100)}$ €.<br>
         Le nouveau prix est :   $${e}-${$(t*e/100)}= ${$(e-t*e/100)}$  €.`),this.reponse=this.versionQcm?`$${$(e-t*e/100)}$ €`:e-t*e/100;break;case"b":e=n(2,6)*10,s=i(["pull","pantalon","tee-shirt","vêtement","blouson","sweat"]),t=i([5,15]),this.question=`Le prix d'un ${s} est $${e}$ €.<br>
        Il baisse de $${t}\\,\\%$. `,this.versionQcm?this.question+="Son nouveau prix est : ":this.question+="  Quel est son nouveau prix ? ",this.distracteurs=[`$${$(e+t*e/100,2)} $ €`,`$${$(e-t*e/1e3,2)} $ €`,`$${$(e-t/100,2)} $ €`],this.correction=`
         Le nouveau prix est :  $ ${o($(e-t*e/100,2))} $ €.`,t===5?this.correction+=r(`
    <br> Mentalement : <br>
    On calcule d'abord le montant de la réduction. <br>
    Pour calculer $5\\,\\%$  d'une quantité, on commence par calculer $10\\,\\%$  en divisant
    par $10$ :<br> $10\\,\\%$  de $${e}$ est égal à $${e}\\div 10=${$(e/10,2)}$.<br>
    Puisque $5\\,\\%$  est deux fois plus petit  que $10\\,\\%$ ,  $5\\,\\%$  de $${e}$ est égal à $ ${$(e/10,2)}\\div 2=${$(e/20,2)}$.<br>
                 La réduction est donc de : $${$(t*e/100,2)}$ €.<br>
         Le nouveau prix est :   $${e}-${$(t*e/100,2)}= ${$(e-t*e/100,2)}$  €.
    
  `):this.correction+=r(`
    <br> Mentalement : <br>
    On calcule d'abord le montant de la réduction. <br>
    Pour calculer $15\\,\\%$  d'une quantité, on commence par calculer $10\\,\\%$  en divisant
    par $10$ :<br> $10\\,\\%$ de $${e}$ est égal à $${e}\\div 10=${e/10}$.<br>
    Puis on calcule $5\\,\\%$  de $${e}$ qui est égal à la moitié de $10\\,\\%$  de $${e}$, soit
    $${e/10}\\div 2=${e/20}$.<br>
    Puisque $15\\,\\%$  est égal à $10\\,\\%$  $+5\\,\\%$ ,  $15\\,\\%$  de $${e}$ est égal à $${e/10}+${e/20}=${3*e/20}$.<br>
                    La réduction est donc de : $${$(3*e/20)}$ €.<br>
         Le nouveau prix est :   $${e}-${$(t*e/100)}= ${$(e-t*e/100)}$  €.
    
`),this.reponse=this.versionQcm?`$${$(e-t*e/100,2)}$ €`:e-t*e/100;break;case"c":e=n(4,13)*5,s=i(["pull","pantalon","tee-shirt","vêtement","blouson"]),t=i([10,20]),this.question=`Le prix d'un ${s} est $${e}$ €.<br>
        Il augmente de $${t}\\,\\%$. `,this.versionQcm?this.question+="Son nouveau prix est : ":this.question+="  Quel est son nouveau prix ? ",this.distracteurs=[`$${$(e-t*e/100,2)} $ €`,`$${$(e+t*e/1e3,2)} $ €`,`$${$(e+t/100,2)} $ €`],this.correction=`
         Le nouveau prix est :  $ ${o($(e+t*e/100,2))} $ €.`,this.reponse=this.versionQcm?`$${$(e+t*e/100,2)}$ €`:e+t*e/100,t===10?this.correction+=r(`
    <br> Mentalement : <br>
    On calcule d'abord le montant de l'augmentation. <br>
    Prendre $10\\,\\%$  d'une quantité revient à la diviser par $10$. <br>
    Ainsi, $${t}\\,\\%$ de $${e}$ est égal à $${e}\\div 10=${$(e/10,2)}$.<br>
                 L'augmentation est donc de : $${$(t*e/100,2)}$ €.<br>
         Le nouveau prix est :   $${e}+${$(t*e/100,2)}= ${o($(e+t*e/100,2))}$  €.
    
  `):this.correction+=r(`
    <br> Mentalement : <br>
    On calcule d'abord le montant de l'augmentation. <br>
    Pour calculer $20\\,\\%$ d'une quantité, on commence par calculer $10\\,\\%$  en divisant
    par $10$ :<br> $10\\,\\%$  de $${e}$ est égal à $${e}\\div 10=${$(e/10)}$.<br>
    Puisque $20\\,\\%$  est deux fois plus grand que $10\\,\\%$ ,  $20\\,\\%$  de $${e}$ est égal à $2\\times ${e/10}=${2*e/10}$.<br>
                    L'augmentation est donc de : $${$(t*e/100)}$ €.<br>
         Le nouveau prix est :   $${e}+${$(t*e/100)}= ${o($(e+t*e/100))}$  €.
    
`);break;case"d":e=n(10,20)*1e3,t=n(1,5),this.question=`Le prix d'une voiture est $${$(e)}$ €.<br>
        Il augmente de $${t}\\,\\%$. `,this.versionQcm?this.question+="Son nouveau prix est : ":this.question+="Quel est son nouveau prix ? ",this.correction=`
         Le nouveau prix est : $ ${o($(e+t*e/100,2))} $ €.`,this.reponse=this.versionQcm?`$${$(e+t*e/100,2)}$ €`:e+t*e/100,this.distracteurs=[`$${$(e-t*e/100,2)} $ €`,`$${$(e+t*e/1e3,2)} $ €`,`$${$(e+t/100,2)} $ €`],t===1&&(this.correction+=r(`
        <br> Mentalement : <br>
        On calcule d'abord le montant de l'augmentation. <br>
        Prendre $1\\,\\%$  d'une quantité revient à la diviser par $100$. <br>
        Ainsi, $${$(t,2)}\\,\\%$  de $${$(e,2)}$ est égal à $${$(e,2)}\\div 100=${$(e/100,2)}$.<br>
                     L'augmentation est donc de : $${$(t*e/100,2)}$ €.<br>
             Le nouveau prix est :   $${$(e,2)}+${$(t*e/100,2)}= ${$(e+t*e/100,2)}$  €.
        
      `)),t===5&&(this.correction+=r(`
        <br> Mentalement : <br>
        On calcule d'abord le montant de l'augmentation. <br>
        Pour calculer $5\\,\\%$  d'une quantité, on commence par calculer $10\\,\\%$  en divisant
        par $10$ :<br> $10\\,\\%$  de $${$(e)}$ est égal à $${$(e)}\\div 10=${$(e/10)}$.<br>
        Puisque $5\\,\\%$  est deux fois plus petit  que $10\\,\\%$ ,  $5\\,\\%$  de $${$(e)}$ est égal à $ ${$(e/10)}\\div 2=${$(e/20)}$.<br>
                     L'augmentation est donc de : $${$(t*e/100)}$ €.<br>
             Le nouveau prix est :   $${$(e)}+${$(t*e/100)}= ${$(e+t*e/100)}$  €.
        
      `)),(t===2||t===3||t===4)&&(this.correction+=r(`
        <br> Mentalement : <br>
        On calcule d'abord le montant de l'augmenattion. <br>
        Pour calculer $${$(t)}\\,\\%$  d'une quantité, on commence par calculer $1\\,\\%$  en divisant
        par $100$ :<br> $1\\,\\%$  de $${$(e)}$ est égal à $${$(e)}\\div 100=${$(e/100)}$.<br>
        Puisque $${$(t)}\\,\\%$  est $${t}$ fois plus grand que $1\\,\\%$ ,  $${$(t)}\\,\\%$  de $${$(e)}$ est égal à $${$(t)}\\times ${$(e/100)}=${$(t*e/100)}$.<br>
                        L'augmentation est donc de : $${$(t*e/100)}$ €.<br>
             Le nouveau prix est :   $${$(e)}+${$(t*e/100)}= ${$(e+t*e/100)}$  €.
        
    `));break;case"e":e=n(10,20)*1e3,t=n(1,5),this.question=`Le prix d'une voiture est $${$(e)}$ €.<br>
        Il baisse de $${t}\\,\\%$. `,this.versionQcm?this.question+="Son nouveau prix est : ":this.question+="  Quel est son nouveau prix ? ",this.optionsChampTexte={texteApres:"€"},this.correction=`
         Le nouveau prix est :   $ ${o($(e-t*e/100,2))} €.$`,this.distracteurs=[`$${$(e+t*e/100,2)} $ €`,`$${$(e-t*e/1e3,2)} $ €`,`$${$(e-t/100,2)} $ €`],this.reponse=this.versionQcm?`$${$(e-t*e/100,2)}$ €`:e-t*e/100,t===1&&(this.correction+=r(`
        <br> Mentalement : <br>
        On calcule d'abord le montant de la réduction. <br>
        Prendre $1\\,\\%$  d'une quantité revient à la diviser par $100$. <br>
        Ainsi, $${t}\\,\\%$  de $${$(e,2)}$ est égal à $${$(e,2)}\\div 100=${$(e/100,2)}$.<br>
        La réduction est donc de : $${$(t*e/100,2)}$ €.<br>
             Le nouveau prix est :   $${$(e,2)}-${$(t*e/100,2)}= ${$(e-t*e/100,2)}$  €.
        
      `)),t===5&&(this.correction+=r(`
        <br> Mentalement : <br>
        On calcule d'abord le montant de la réduction. <br>
        Pour calculer $5\\,\\%$  d'une quantité, on commence par calculer $10\\,\\%$  en divisant
        par $10$ :<br> $10\\,\\%$  de $${$(e,2)}$ est égal à $${$(e,2)}\\div 10=${$(e/10,2)}$.<br>
        Puisque $5\\,\\%$  est deux fois plus petit  que $10\\,\\%$ ,  $5\\,\\%$  de $${$(e)}$ est égal à $ ${$(e/10,2)}\\div 2=${$(e/20,2)}$.<br>
        La réduction est donc de : $${$(t*e/100,2)}$ €.<br>
             Le nouveau prix est :   $${$(e,2)}-${$(t*e/100,2)}= ${$(e-t*e/100,2)}$  €.
        
      `)),(t===2||t===3||t===4)&&(this.correction+=r(`
        <br> Mentalement : <br>
        On calcule d'abord le montant de la réduction. <br>
        Pour calculer $${t}\\,\\%$  d'une quantité, on commence par calculer $1\\,\\%$  en divisant
        par $100$ :<br> $1\\,\\%$  de $${$(e)}$ est égal à $${$(e)}\\div 100=${$(e/100)}$.<br>
        Puisque $${t}\\,\\%$  est $${t}$ fois plus grand que $1\\,\\%$,  $${t}\\,\\%$  de $${$(e)}$ est égal à $${t}\\times ${e/100}=${t*e/100}$.<br>
        La réduction est donc de : $${$(t*e/100)}$ €.<br>
             Le nouveau prix est :   $${$(e)}-${$(t*e/100)}= ${$(e-t*e/100)}$  €.
        
    `));break}this.canEnonce=this.question,this.canReponseACompleter="$\\ldots$ €"}}export{Pe as amcReady,Qe as amcType,Ae as default,Le as interactifReady,fe as interactifType,Oe as refs,ge as titre,Me as uuid};
//# sourceMappingURL=can5P01-B6BMiICA.js.map

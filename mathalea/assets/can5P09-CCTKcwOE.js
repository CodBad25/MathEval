import{D as c,p as a,r as m,G as t,av as n}from"./index-DjA7ROjC.js";import{t as o}from"./style-bimy13bZ.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ae="Calculer un prix à partir d'un prix au kg",Le=!0,ye="mathLive",Te=!0,qe="AMCNum",Ee="13/11/2022",Pe="7b350",Qe={"fr-fr":["can5P09"],"fr-ch":[]};class Re extends c{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.optionsChampTexte={texteApres:" €"}}nouvelleVersion(){let e,i,$,r,s,p;switch(a([1,2,3])){case 1:e=m(2,6),$=a([" de pommes de terre"," de carottes"," de courgettes","de navets","de tomates","de poireaux","d'aubergines"]),i=m(1,9)*100,r=i/1e3,s=r*e,p=s,this.question=`Le prix d'un kg ${$} est $${o(e)}$ €. <br>

        Quel est le prix de $${i}$ g ? `,this.optionsChampTexte={texteApres:"€"},this.correction=`Comme $${i}$ g $=${t(r,1)}$ kg, le  prix  de $${i}$ g ${$} est donné par : <br>
        $${t(r,1)}\\times ${o(e)}=${t(s,2)}$.<br>
        Le prix de $${i}$ g ${$} est $${o(s)}$ €.`,i!==100?i===500?this.correction+=n(`
  <br> Mentalement : <br>
  Multiplier par $0,5$ revient à diviser par $2$. <br>
  Ainsi, $${t(r,1)}\\times ${o(e)}=${o(e)}\\div 2=${o(p)}$.
  
`):this.correction+=n(`
  <br> Mentalement : <br>
  $${t(r,1)}\\times ${o(e)}=${t(r*10,1)}\\times 0,1\\times ${t(e,1)}=${t(r*10,1)}\\times ${t(e/10,1)}=${o(p)}$.
  
`):this.correction+="",this.reponse=p;break;case 2:e=m(7,15),$=a(["de cerises","de fraises","de framboises"]),i=m(1,9)*100,r=i/1e3,s=r*e,p=s,this.question=`Le prix d'un kg ${$} est $${o(e)}$ €. <br>

        Quel est le prix de $${i}$ g ? `,this.optionsChampTexte={texteApres:"€"},this.correction=`Comme $${i}$ g $=${t(r,1)}$ kg, le  prix  de $${i}$ g ${$} est donné par : <br>
        $${t(r,1)}\\times ${o(e)}=${t(s,2)}$.<br>
        Le prix de $${i}$ g ${$} est $${o(s)}$ €.`,i!==100?i===500?this.correction+=n(`
  <br> Mentalement : <br>
  Multiplier par $0,5$ revient à diviser par $2$. <br>
  Ainsi, $${t(r,1)}\\times ${o(e)}=${o(e)}\\div 2=${o(p)}$.
  
`):this.correction+=n(`
  <br> Mentalement : <br>
  $${t(r,1)}\\times ${o(e)}=${t(r*10,1)}\\times 0,1\\times ${t(e,1)}=${t(r*10,1)}\\times ${t(e/10,1)}=${o(p)}$.
  
`):this.correction+="",this.reponse=p;break;case 3:default:e=m(16,25),$=a(["du Costa Rica","du Kenya","de Colombie","d'Ethiopie","du Salvador","du Nicaragua","du Mexique","du Honduras","du Guatemala"]),i=m(1,9)*100,r=i/1e3,s=r*e,p=s,this.question=`Le prix d'un kg de café ${$} est $${o(e)}$ €. <br>
        
          Quel est le prix de $${i}$ g ? `,this.optionsChampTexte={texteApres:"€"},this.correction=`Comme $${i}$ g $=${t(r,1)}$ kg, le  prix  de $${i}$ g de café ${$} est donné par : <br>
          $${t(r,1)}\\times ${o(e)}=${t(s,2)}$.<br>
          Le prix de $${i}$ g de café ${$} est $${o(s)}$ €.`,i!==100?i===500?this.correction+=n(`
    <br> Mentalement : <br>
    Multiplier par $0,5$ revient à diviser par $2$. <br>
    Ainsi, $${t(r,1)}\\times ${o(e)}=${o(e)}\\div 2=${o(p)}$.
    
  `):this.correction+=n(`
    <br> Mentalement : <br>
    $${t(r,1)}\\times ${o(e)}=${t(r*10,1)}\\times 0,1\\times ${t(e,1)}=${t(r*10,1)}\\times ${t(e/10,1)}=${o(p)}$.
    
  `):this.correction+="",this.reponse=p;break}this.reponse=this.reponse.toFixed(2),this.canEnonce=this.question,this.canReponseACompleter="$\\ldots$ €"}}export{Te as amcReady,qe as amcType,Ee as dateDePublication,Re as default,Le as interactifReady,ye as interactifType,Qe as refs,Ae as titre,Pe as uuid};
//# sourceMappingURL=can5P09-CCTKcwOE.js.map

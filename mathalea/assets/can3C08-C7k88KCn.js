import{D as a,T as m,r as s,p as u,G as e,v as p,av as l}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ar="Calculer avec un programme de calcul",Cr=!0,Qr="mathLive",Er="9094b",Mr={"fr-fr":["can3C08"],"fr-ch":[]};class yr extends a{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){const i=m(s(2,9)*5),$=m(s(2,9)*4),o=m(s(2,9)*3),n=m(s(2,9)*6),r=s(2,9,[i/5,$/4,o/3,n/6]),t=u(["quart","tiers","cinquième","sixième"]);t==="cinquième"&&(this.question=`Prendre le ${t} de $${i}$, puis soustraire $${r}$ et élever le résultat au carré. <br>
      
     Quel nombre obtient-on ?`,this.correction=`$\\bullet$ On prend le ${t} de $${i}$ : $\\dfrac{1}{5}\\times ${i}=${e(i/5)}$.
    <br>
    $\\bullet$ On soustrait $${r}$, on obtient : $${e(i/5)}-${e(r)}=${e(i/5-r)}$.
    <br>
    $\\bullet$ On élève au carré :  $${p(i/5-r)}^2= ${e((i/5-r)*(i/5-r))}$.
      `,this.correction+=l(`<br> Mentalement : <br>
      Prendre le cinquième d'un nombre revient à le diviser par 5.<br>
       Ainsi, le ${t} de $${i}$ est égal à $${i}\\div 5=${i/5}$.
        `),this.reponse=(i/5-r)*(i/5-r)),t==="quart"&&(this.question=`Prendre le ${t} de $${$}$, puis soustraire $${r}$ et élever le résultat au carré. <br>

      Quel nombre obtient-on ?`,this.correction=`$\\bullet$ On prend le ${t} de $${$}$ : $\\dfrac{1}{4}\\times ${$}=${e($/4)}$.
      <br>
      $\\bullet$ On soustrait $${r}$, on obtient : $${e($/4)}-${e(r)}=${e($/4-r)}$.
      <br>
      $\\bullet$ On élève au carré : $${p($/4-r)}^2= ${e(($/4-r)*($/4-r))}$. `,this.correction+=l(`<br> Mentalement : <br>
    Prendre le quart d'un nombre revient à le diviser par 4.<br>
     Ainsi, le ${t} de $${$}$ est égal à $${$}\\div 4=${$/4}$.
      `),this.reponse=($/4-r)*($/4-r)),t==="tiers"&&(this.question=`Prendre le ${t} de $${o}$, puis soustraire $${r}$ et élever le résultat au carré. <br>

     Quel nombre obtient-on ?`,this.correction=`$\\bullet$ On prend le ${t} de $${o}$ : $\\dfrac{1}{3}\\times ${o}=${e(o/3)}$.
      <br>
      $\\bullet$ On soustrait $${r}$, on obtient : $${e(o/3)}-${e(r)}=${e(o/3-r)}$.
      <br>
      $\\bullet$ On élève au carré : $${p(o/3-r)}^2= ${e((o/3-r)*(o/3-r))}$. `,this.correction+=l(`<br> Mentalement : <br>
      Prendre le tiers d'un nombre revient à le diviser par 3.<br>
       Ainsi, le ${t} de $${o}$ est égal à $${o}\\div 3=${o/3}$.
        `),this.reponse=(o/3-r)*(o/3-r)),t==="sixième"&&(this.question=`Prendre le ${t} de $${n}$, puis soustraire $${r}$ et élever le résultat au carré. <br>
      Quel nombre obtient-on ?`,this.correction=`$\\bullet$ On prend le ${t} de $${n}$ : $\\dfrac{1}{6}\\times ${n}=${e(n/6)}$.
      <br>
      $\\bullet$ On soustrait $${r}$, on obtient : $${e(n/6)}-${e(r)}=${e(n/6-r)}$.
      <br>
      $\\bullet$ On élève au carré : $${p(n/6-r)}^2= ${e((n/6-r)*(n/6-r))}$. `,this.correction+=l(`<br> Mentalement : <br>
    Prendre le sixième d'un nombre revient à le diviser par 6.<br>
     Ainsi, le ${t} de $${n}$ est égal à $${n}\\div 6=${n/6}$.
      `),this.reponse=(n/6-r)*(n/6-r)),this.canEnonce=this.question,this.canReponseACompleter=""}}export{yr as default,Cr as interactifReady,Qr as interactifType,Mr as refs,Ar as titre,Er as uuid};
//# sourceMappingURL=can3C08-C7k88KCn.js.map

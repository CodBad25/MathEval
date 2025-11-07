import{D as C,p as h,z as E,r as f,aj as g,F as D,R as u,ak as x,al as M,am as k,m as P,G as n}from"./index-DjA7ROjC.js";import{c as L}from"./aleatoires-DoEZ-8p_.js";import{D as R}from"./vendors/decimal.js-16C9rIKp.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./dateEtHoraires-DRPbpiPj.js";const Ut="Calculer un produit scalaire à l’aide de normes et d’un angle ",Wt=!0,Xt="mathLive",Yt="26/06/2022",Zt="df08a",_t={"fr-fr":["can1G04"],"fr-ch":[]};class ti extends C{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){const a=h([!0,!1]),t=L(3,"O",!0),o=E(0,0,t[0],"below"),i=f(4,8),$=g(o,i,0,t[1],"below"),r=f(4,8),s=new R(i*r).div(2),c=new D(i*r,2),e=h([[60,"\\dfrac{\\pi}{3}","\\dfrac{\\pi}{3}",2.5],[30,"\\dfrac{\\pi}{6}","\\dfrac{\\pi}{6}",5],[45,"\\dfrac{\\pi}{4}","\\dfrac{\\pi}{4}",3],[120,"\\dfrac{2\\pi}{3}","\\dfrac{2\\pi}{3}",2],[135,"\\dfrac{3\\pi}{4}","\\dfrac{3\\pi}{4}",2],[150,"\\dfrac{5\\pi}{6}","\\dfrac{5\\pi}{6}",1.5]]),m=g(o,r,e[0],t[2],"above"),p=u(o,$,"blue","->");p.epaisseur=2;const w=x($,o,"black",.5,""),v=x(o,m,"black",.5,""),d=u(o,m,"red","->");d.epaisseur=2,d.tailleExtremites=7,p.tailleExtremites=7;const b=M($,o,m,"black",2,a?`${e[0]}°`:`${e[1]}`,{ecart:1}),l=[],q=Math.min(o.x,$.x,m.x)-1,y=Math.min(o.y,$.y,m.y)-1.5,A=Math.max(o.x,$.x,m.x)+1,F=Math.max(o.y,$.y,m.y)+1.5;l.push(b,p,d,k(o,$,m),w,v),this.question=`Calculer $\\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}$.<br>
    
    `,this.question+=P({xmin:q,ymin:y,xmax:A,ymax:F,pixelsParCm:15,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},l),e[0]===30&&(this.correction=`
    $\\begin{aligned}
    \\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}&=${t[0]}${t[1]}\\times ${t[0]}${t[2]}\\times \\cos(\\widehat{${t[2]}${t[0]}${t[1]}})\\\\
    &=${a?`${i}\\times ${r}\\times \\cos(${e[0]}°)`:`${i}\\times ${r}\\times \\cos\\left(${e[2]}\\right)`}\\\\
             &=\\dfrac{${i*r}\\sqrt{3}}{2}\\\\
             &=${n(s,1)}\\sqrt{3}
             \\end{aligned}$



   `,this.reponse=[`${s}\\sqrt{3}`,`${c.texFraction}\\times\\sqrt{3}`]),e[0]===45&&(this.correction=`
      $\\begin{aligned}
      \\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}&=${t[0]}${t[1]}\\times ${t[0]}${t[2]}\\times \\cos(\\widehat{${t[2]}${t[0]}${t[1]}})\\\\
      &=${a?`${i}\\times ${r}\\times \\cos(${e[0]}°)`:`${i}\\times ${r}\\times \\cos\\left(${e[2]}\\right)`}\\\\
               &=\\dfrac{${i*r}\\times\\sqrt{2}}{2}\\\\
               &=${n(s,1)}\\sqrt{2}
               \\end{aligned}$



     `,this.reponse=[`${s}\\sqrt{2}`,`${c.texFraction}\\times\\sqrt{2}`]),e[0]===60&&(this.correction=`
      $\\begin{aligned}
      \\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}&=${t[0]}${t[1]}\\times ${t[0]}${t[2]}\\times \\cos(\\widehat{${t[2]}${t[0]}${t[1]}})\\\\
               &=${a?`${i}\\times ${r}\\times \\cos(${e[0]}°)`:`${i}\\times ${r}\\times \\cos\\left(${e[2]}\\right)`}\\\\
               &=${i*r}\\times\\dfrac{1}{2}\\\\
               &=${n(s,1)}
               \\end{aligned}$



     `,this.reponse=[`${s}`,`${c.texFraction}`]),e[0]===120&&(this.correction=`
    $\\begin{aligned}
    \\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}&=${t[0]}${t[1]}\\times ${t[0]}${t[2]}\\times \\cos(\\widehat{${t[2]}${t[0]}${t[1]}})\\\\
    &=${a?`${i}\\times ${r}\\times \\cos(${e[0]}°)`:`${i}\\times ${r}\\times \\cos\\left(${e[2]}\\right)`}\\\\
             &=${i*r}\\times\\dfrac{-1}{2}\\\\
             &=${n(-s,1)}
             \\end{aligned}$



   `,this.reponse=[`${-s}`,`${c.oppose().texFraction}`]),e[0]===135&&(this.correction=`
  $\\begin{aligned}
  \\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}&=${t[0]}${t[1]}\\times ${t[0]}${t[2]}\\times \\cos(\\widehat{${t[2]}${t[0]}${t[1]}})\\\\
  &=${a?`${i}\\times ${r}\\times \\cos(${e[0]}°)`:`${i}\\times ${r}\\times \\cos\\left(${e[2]}\\right)`}\\\\
           &=${i*r}\\times\\dfrac{-\\sqrt{2}}{2}\\\\
           &=${n(-s,1)}\\sqrt{2}
           \\end{aligned}$



 `,this.reponse=[`${-s}\\sqrt{2}`,`${c.oppose().texFraction}\\times\\sqrt{2}`]),e[0]===150&&(this.correction=`
    $\\begin{aligned}
    \\overrightarrow{${t[0]}${t[1]}}\\cdot\\overrightarrow{${t[0]}${t[2]}}&=${t[0]}${t[1]}\\times ${t[0]}${t[2]}\\times \\cos(\\widehat{${t[2]}${t[0]}${t[1]}})\\\\
    &=${a?`${i}\\times ${r}\\times \\cos(${e[0]}°)`:`${i}\\times ${r}\\times \\cos\\left(${e[2]}\\right)`}\\\\
             &=${i*r}\\times\\dfrac{-\\sqrt{3}}{2}\\\\
             &=${n(-s,1)}\\sqrt{3}
             \\end{aligned}$



   `,this.reponse=[`${-s}\\sqrt{3}`,`${c.oppose().texFraction}\\times\\sqrt{3}`]),this.canEnonce=this.question,this.canReponseACompleter=""}}export{Yt as dateDePublication,ti as default,Wt as interactifReady,Xt as interactifType,_t as refs,Ut as titre,Zt as uuid};
//# sourceMappingURL=can1G04-B6Ii1GHG.js.map

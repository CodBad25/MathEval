var C=Object.defineProperty;var y=(p,e,m)=>e in p?C(p,e,{enumerable:!0,configurable:!0,writable:!0,value:m}):p[e]=m;var h=(p,e,m)=>y(p,typeof e!="symbol"?e+"":e,m);import{G as r,y as f,r as v,p as l}from"./index-Bk_D2JkM.js";import{E as x}from"./ExerciceQcmA-AGcQffCw.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-DZz04TtL.js";import"./lists-C9cc3WE2.js";const zr="1f233",Br={"fr-fr":["1A-C4-1"],"fr-ch":["10QCM-5","9QCM-7"]},Hr=!0,Ir="qcm",Jr="true",Kr="qcmMono",Lr="Calculer une somme de fractions décimales",Ur="02/09/2025";class Vr extends x{constructor(){super();h(this,"versionOriginale",()=>{this.enonce=`On considère $A=\\dfrac{1}{100}+\\dfrac{1}{${r(1e3)}}$. On a : `,this.correction=` On a  : <br>
   $\\begin{aligned}
   A&=\\dfrac{1}{100}+\\dfrac{1}{${r(1e3)}}\\\\
   &=0,01+${r(.001)}\\\\
   &=${f(.011)}
   \\end{aligned}$ <br>
  `,this.reponses=["$A=0,011$","$A=100,001$",`$\\dfrac{2}{${r(1e4)}}$`,"$A=0,11$"]});h(this,"versionAleatoire",()=>{const m=[10,100,1e3,1e4],i=v(1,9),o=l(m);let t=l(m);for(;t===o;)t=l(m);const n=i/o+i/t,A=(a,$)=>$===0?a:A($,a%$),c=((a,$)=>a*$/A(a,$))(o,t),u=i*(c/o)+i*(c/t),g=A(u,c),s=u/g,d=c/g,O=g>1,b=l([!0,!1,!1]);this.enonce=`On considère $A=\\dfrac{${i}}{${r(o)}}+\\dfrac{${i}}{${r(t)}}$. On a : `,b?O?this.correction=` On a  : <br>
       $\\begin{aligned}
       A&=\\dfrac{${i}}{${r(o)}}+\\dfrac{${i}}{${r(t)}}\\\\
       &=${r(i/o,4)}+${r(i/t,4)}\\\\
       &=${r(n,4)}\\\\
       &=\\dfrac{${u}}{${r(c)}}\\\\
       &=${f(`\\dfrac{${s}}{${r(d)}}`)}
       \\end{aligned}$ <br>
      `:this.correction=` On a  : <br>
       $\\begin{aligned}
       A&=\\dfrac{${i}}{${r(o)}}+\\dfrac{${i}}{${r(t)}}\\\\
       &=${r(i/o,4)}+${r(i/t,4)}\\\\
       &=${r(n,4)}\\\\
       &=${f(`\\dfrac{${s}}{${r(d)}}`)}
       \\end{aligned}$ 
      `:this.correction=` On a  : <br>
     $\\begin{aligned}
     A&=\\dfrac{${i}}{${r(o)}}+\\dfrac{${i}}{${r(t)}}\\\\
     &=${r(i/o,4)}+${r(i/t,4)}\\\\
     &=${f(r(n,4))}
     \\end{aligned}$ 
    `,b?this.reponses=[`$A=\\dfrac{${s}}{${r(d)}}$`,`$A=${r(n/10,4)}$`,`$A=${r(n*10,4)}$`,`$A=\\dfrac{${2*i}}{${r(o*t)}}$`]:this.reponses=[`$A=${r(n,4)}$`,`$A=\\dfrac{${2*i}}{${r(o*t)}}$`,`$A=${r(n*10,4)}$`,`$A=\\dfrac{${s+1}}{${r(d)}}$`]});this.versionAleatoire(),this.spacing=1.5,this.spacingCorr=1}}export{Jr as amcReady,Kr as amcType,Ur as dateDePublication,Vr as default,Hr as interactifReady,Ir as interactifType,Br as refs,Lr as titre,zr as uuid};
//# sourceMappingURL=1A-C4-1-D5PFNI55.js.map

var B=Object.defineProperty;var f=(a,p,i)=>p in a?B(a,p,{enumerable:!0,configurable:!0,writable:!0,value:i}):a[p]=i;var s=(a,p,i)=>f(a,typeof p!="symbol"?p+"":p,i);import{co as $,P as b,m as c,G as e,y as A,r as l}from"./index-Bk_D2JkM.js";import{A as t}from"./arbres-CvrpHKmJ.js";import{E as u}from"./ExerciceQcmA-AGcQffCw.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-DZz04TtL.js";import"./lists-C9cc3WE2.js";const je="15/09/2025",He="3a5ab",Ce={"fr-fr":["1A-P3"],"fr-ch":[]},De=!0,Ge="qcm",Me="true",Qe="qcmMono",Ue="Utiliser un arbre pour calculer une probabilité (totale)";class ke extends u{constructor(){super();s(this,"versionOriginale",()=>{let i=[];const m=new t({racine:!0,nom:"",proba:1,visible:!1,alter:"",enfants:[new t({rationnel:!1,nom:"A",proba:.4,enfants:[new t({rationnel:!1,nom:"B",proba:.3}),new t({rationnel:!1,nom:"\\bar B",proba:1,visible:!1})]}),new t({rationnel:!1,nom:"\\bar A",proba:.6,visible:!1,enfants:[new t({rationnel:!1,nom:"B",proba:1,visible:!1}),new t({rationnel:!1,nom:"\\bar B",proba:.9,visible:!0,alter:""})]})]});m.setTailles(),i=m.represente(0,6,0,3,!0,1,8),this.enonce=`${$(`On considère l'arbre de probabilités ci-contre.<br><br>
      On cherche la probabilité de l'événement $B$.<br><br>
      On a :`,b.isHtml?c({xmin:-.1,xmax:12,ymin:-5,ymax:5,style:"inline",scale:.7},i):`
 \\pstree[treemode=R,labelsep=1mm,treesep=12mm]{\\TR{}}
            {
              \\pstree[labelsep=1mm]{\\TR{$A$}\\taput{$0,4$}}
              {
                \\TR{$B$}\\taput{$0,3$}
                \\TR{$\\overline{B}$}\\tbput{$$}
              }
              \\pstree[labelsep=1mm]{\\TR{$\\overline{A}$}\\tbput{$$}}
              {
                \\TR{$B$}\\taput{$$}
                \\TR{$\\overline{B}$}\\tbput{$0,9$}
              }

            }	

`)}<br>`,this.correction=`
    On applique la formule de probabilité totale :<br> $\\begin{aligned}
    p(B)&=p(A)\\times p_A(B)+p(\\overline A)\\times p_{\\overline A}(B)\\\\
    &=${e(.4,2)}\\times ${e(.3)}+${e(1-.4)}\\times ${e(1-.9)}\\\\
    &=${A(e(.4*.3+(1-.4)*(1-.9),2))}.
    \\end{aligned}$`,this.reponses=[`$p(B)=${e(.4*.3+(1-.4)*(1-.9))} $`,`$p(B)=${e(.12)}$ `,`$p(B)=${e(.66)}$ `,`$p(B)=${e(.3)}$ `]});s(this,"versionAleatoire",()=>{let i=[];const r=l(1,9)/10,o=l(1,9)/10,n=l(1,9)/10,m=new t({racine:!0,nom:"",proba:1,visible:!1,alter:"",enfants:[new t({rationnel:!1,nom:"A",proba:r,enfants:[new t({rationnel:!1,nom:"B",proba:o}),new t({rationnel:!1,nom:"\\bar B",proba:1,visible:!1})]}),new t({rationnel:!1,nom:"\\bar A",proba:Number(1-r),visible:!1,enfants:[new t({rationnel:!1,nom:"B",proba:1,visible:!1}),new t({rationnel:!1,nom:"\\bar B",proba:n,visible:!0,alter:""})]})]});m.setTailles(),i=m.represente(0,6,0,3,!0,1,8),this.enonce=`${$(`On considère l'arbre de probabilités ci-contre.<br><br>
      On cherche la probabilité de l'événement $B$.<br><br>
      On a :`,b.isHtml?c({xmin:-.1,xmax:10,ymin:-5,ymax:5,style:"inline",scale:.7},i):`
 \\pstree[treemode=R,labelsep=1mm,treesep=12mm]{\\TR{}}
            {
              \\pstree[labelsep=1mm]{\\TR{$A$}\\taput{$${e(r)}$}}
              {
                \\TR{$B$}\\taput{$${e(o)}$}
                \\TR{$\\overline{B}$}\\tbput{$$}
              }
              \\pstree[labelsep=1mm]{\\TR{$\\overline{A}$}\\tbput{$$}}
              {
                \\TR{$B$}\\taput{$$}
                \\TR{$\\overline{B}$}\\tbput{$${e(n)}$}
              }

            }	

`)}<br>`,this.correction=`
    On applique la formule de probabilité totale :<br> $\\begin{aligned}
    p(B)&=p(A)\\times p_A(B)+p(\\overline A)\\times p_{\\overline A}(B)\\\\
    &=${e(r,2)}\\times ${e(o)}+${e(1-r)}\\times ${e(1-n)}\\\\
    &=${A(e(r*o+(1-r)*(1-n),2))}.
    \\end{aligned}$`,this.reponses=[`$p(B)=${e(r*o+(1-r)*(1-n))} $`,`$p(B)=${e(r*o)}$ `,`$p(B)=${e(r*o+(1-r)*n)}$ `,`$p(B)=${e(o)}$ `]});this.versionAleatoire()}}export{Me as amcReady,Qe as amcType,je as dateDePublication,ke as default,De as interactifReady,Ge as interactifType,Ce as refs,Ue as titre,He as uuid};
//# sourceMappingURL=1A-P3-Cvgq2byS.js.map

import{E as J,ah as E,r as l,p as u,b5 as N,F as m,t as F,k as o,y as d,n as f,q as T,v as q,s as U,az as G,w as Q,b4 as H,j as x,B,b as W,K as X,o as Y}from"./index-Bk_D2JkM.js";import{s as z}from"./deprecatedFractions-BTR31pbW.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const l$="Calculer des coordonnées de points appartenant à une courbe connaissant l'abscisse ou l'ordonnée",p$=!0,u$="mathLive",b$="24/09/2022",m$="07/11/2023",f$="ec059",x$={"fr-fr":["2F20-2"],"fr-ch":["11FA9-2"]};class h$ extends J{constructor(){super(),this.besoinFormulaireNumerique=["Choix des questions",4,`1 : Fonction affine
2 : Polynôme de degré 2 
3 : Fonction a/x+b 
4 : Mélange`],this.besoinFormulaire2Numerique=["Choix des questions",3,`1 : Valeurs entières
2 : Valeurs fractionnaire
3 : Mélange`],this.sup=1,this.sup2=1,this.nbQuestions=2}nouvelleVersion(){let A;switch(this.sup){case 1:A=["affine"];break;case 2:A=["polynôme"];break;case 3:A=["a/x+b"];break;case 4:default:A=["affine","polynôme","a/x+b"];break}const I=E(A,this.nbQuestions);let v;this.sup2===1?v=E([0],this.nbQuestions):this.sup2===2?v=E([1],this.nbQuestions):v=E([0,1],this.nbQuestions);const C=[["f"],["g"],["h"],["u"],["v"],["w"]],g=[["M"],["N"],["P"],["R"],["S"],["T"]];for(let b=0,L,V,n,a,k,j,e,$,p,i,t,r,c,S,R,y,M,w,O,D,P,h,s,K=0;b<this.nbQuestions&&K<50;){switch(k=l(-9,9,[0,1,-1]),j=l(-9,9,[k,0]),I[b]){case"affine":switch(v[b]){case 0:e=l(-12,12,[0,1]),$=l(-12,12,0),i=l(-12,12,0),r=e*i+$,n=u(C),a=u(g),u([!0,!1])?(h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
              ${F(`$${n}(x)=${x(e,$)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
             $${a}$ est le point de $\\mathscr{C}$ d'abscisse $${i}$. <br>Quelle est son ordonnée ?`,s=`Puisque le point $${a}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
              $${n}(${i})=${e}\\times ${q(i)}${o($)}=${r}$.<br>
              L'ordonnée du point $${a}$ est $${d(r)}$.`,f(this,b,{reponse:{value:r}})):(h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
              ${F(`$${n}(x)=${x(e,$)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
             $${a}$ est le point de $\\mathscr{C}$ d'ordonnée $${r}$.<br>
              Quelle est son abscisse ?`,s=`$${n}$ est une fonction affine (non constante), donc il existe un unique point dont l'ordonnée est $${r}$.<br>
                Puisque le point $${a}$ appartient à $\\mathscr{C}$, son abscisse est l'antécédent de son ordonnée.<br>
              On cherche donc $x$ tel que $${n}(x)=${r}$, c'est-à-dire $${x(e,$)}=${r}$.<br>`,$<0?s+=`
              $\\begin{aligned}
              ${x(e,$)}&=${r}\\\\
              ${x(e,$)}+${d(-$)}&=${r}+${d(-$)}\\\\
              ${e}x&=${r-$}   \\\\
              x&=\\dfrac{${r-$}}{${e}}   \\\\
              x&=${i}
                                          \\end{aligned}$<br>`:s+=`
                                          $\\begin{aligned}
                                          ${x(e,$)}&=${r}\\\\
                                          ${x(e,$)}-${d($)}&=${r}-${d($)}\\\\
                                          ${e}x&=${r-$}   \\\\
                                          x&=\\dfrac{${r-$}}{${e}}   \\\\
                                          x&=${i}
                                                                      \\end{aligned}$<br>`,s+=`L'abscisse du point $${a}$ est $${d(i)}$.`,f(this,b,{reponse:{value:i}}));break;case 1:default:e=l(-10,10,[0,1]),$=l(-10,10,0),t=u(H()),c=new m(e*t.n+$*t.d,t.d),O=new m($*c.d,c.d),y=new m(t.n-$*t.d,t.d),M=new m($*t.d,t.d),w=new m(t.n-$*t.d,e*t.d),n=u(C),a=u(g),u([!0,!1])?(h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
              ${F(`$${n}(x)=${x(e,$)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
              $${a}$ est le point de $\\mathscr{C}$ d'abscisse $${t.texFraction}$.<br>
               Quelle est son ordonnée ?
              `,s=`Puisque le point $${a}$ appartient à $\\mathscr{C}$, son ordonnée est l'image de son abscisse.<br>
                $${n}\\left(${t.texFraction}\\right)=$`,e===-1||e===1?s+=`$${B(e)}${t.texFraction}${o($)}=
                  ${B(e)}${t.texFraction}${O.ecritureAlgebrique} =
                  \\dfrac{${B(e)}${t.n}${o($*t.d)}}{${t.d}}=
               ${c.texFraction}${z(e*t.n+$*t.d,t.d)}$.<br>`:s+=`$${e}\\times ${t.texFraction}${o($)}=
                  ${e}\\times${t.texFraction}${O.ecritureAlgebrique} =
                  \\dfrac{${e}\\times${t.n}${o($*t.d)}}{${t.d}}=
               ${c.texFraction}${z(e*t.n+$*t.d,t.d)}$.<br>`,s+=`L'ordonnée du point $${a}$ est $${d(c.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:c}})):(h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
               ${F(`$${n}(x)=${x(e,$)}$`)}
               On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
               $${a}$ est le point de $\\mathscr{C}$ d'ordonnée $${t.texFraction}$. <br>
               Quelle est son abscisse ?
               `,s=`$${n}$ est une fonction affine (non constante), donc il existe un unique point dont l'ordonnée est $${t.texFraction}$.<br>
                 Puisque le point $${a}$ appartient à $\\mathscr{C}$, son abscisse est l'antécédent de son ordonnée.<br>
               On cherche donc $x$ tel que $${n}(x)=${t.texFraction}$, c'est-à-dire $${x(e,$)}=${t.texFraction}$.<br>
                `,$<0?s+=`
                    $\\begin{aligned}
                    ${x(e,$)}&=${t.texFraction}\\\\
                    ${x(e,$)}+${d(-$)}&=${t.texFraction}+${d(-$)}\\\\
                    ${e}x&=${t.texFraction}+${M.oppose().texFraction}   \\\\
                    ${e}x&=${y.texFraction}\\\\
                    ${e}x\\div${d(q(e))} &=${y.texFraction}\\div${d(q(e))} \\\\
                    x&=${w.texFraction}${w.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>`:s+=`
                    $\\begin{aligned}
                    ${x(e,$)}&=${t.texFraction}\\\\
                    ${x(e,$)}-${d($)}&=${t.texFraction}-${d($)}\\\\
                    ${e}x&=${t.texFraction}-${M.texFraction}   \\\\
                    ${e}x&=${y.texFraction}\\\\
                    ${e}x\\div${d(q(e))} &=${y.texFraction}\\div${d(q(e))} \\\\
                    x&=${w.texFraction}${w.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>`,s+=`L'abscisse du point $${a}$ est $${d(w.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:w}}));break}break;case"polynôme":switch(v[b]){case 0:u([!0,!1])?(e=l(-10,10,0),$=l(-10,10,0),p=l(-10,10),i=l(-9,9),r=e*i**2+$*i+p,n=u(C),a=u(g),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
              ${F(`$${n}(x)=${Q(0,e,$,p)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
              $${a}$ est le point de $\\mathscr{C}$ d'abscisse $${i}$. <br>
              Quelle est son ordonnée ?`,s=`Puisque le point $${a}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br> `,e!==1?s+=`$${n}(${i})=${e}\\times ${q(i)}^2${o($)}\\times${q(i)}${p===0?"":`${o(p)}`}
                =${e*i**2}${o($*i)}${p===0?"":`${o(p)}`}=${r}$.<br>`:s+=`$${n}(${i})= ${q(i)}^2${o($)}\\times${q(i)}${p===0?"":`${o(p)}`}
                =${e*i**2}${o($*i)}${p===0?"":`${o(p)}`}=${r}$.<br>`,s+=`L'ordonnée du point $${a}$ est $${d(r)}$.`,f(this,b,{reponse:{value:r}})):(e=l(-10,10,0),$=l(-10,10,0),p=l(-10,10,0),i=l(-9,16),r=e*i+p,n=u(C),a=u(g),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
                ${F(`$${n}(x)=${Q(0,e,0,p)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
                Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${r}$ ? <br>
                Si oui, quelles sont les abscisses possibles de ces points ?`,this.interactif&&(h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
${F(`$${n}(x)=${Q(0,e,0,p)}$`)}
On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${r}$ ? <br>
Si oui, quelles sont les abscisses possibles de ces points ?<br>
Écrire les valeurs séparées par un point-virgule ou $\\emptyset$ s'il n'y en a pas.`),s=` Si un point de $\\mathscr{C}$ a pour ordonnée $${r}$, son abscisse est un antécédent de $${r}$.<br> `,s+=` On cherche donc $x$ tel que $${n}(x)=${r}$, c'est-à-dire $${Q(0,e,0,p)}=${r}$.<br>
                  On résout cette équation en isolant le carré, c'est-à-dire en l'écrivant $x^2=${i}$. <br>`,i===0?(s+=` Cette équation n'a qu'une seule solution : $0$.<br>
 On en déduit qu'il existe un unique point de $\\mathscr{C}$ ayant pour ordonnée $${r}$ : son abscisse est $${d(0)}$. `,f(this,b,{reponse:{value:0}})):i<0?(s+=` Cette équation n'a pas de solution.<br>
 On en déduit qu'il n'existe pas de point de $\\mathscr{C}$ ayant pour ordonnée $${r}$. `,f(this,b,{reponse:{value:"\\emptyset",options:{ensembleDeNombres:!0}}})):i===1||i===4||i===9||i===16?(s+=` Cette équation a deux solutions : $-\\sqrt{${i}}=-${Math.sqrt(i)}$ et $\\sqrt{${i}}=${Math.sqrt(i)}$.<br>
                On en déduit qu'il existe deux points de $\\mathscr{C}$ ayant pour ordonnée $${r}$.<br>
                Les  abscisses de ces points sont : $${d(`-${Math.sqrt(i)}`)}$ et $${d(Math.sqrt(i))}$. `,f(this,b,{reponse:{value:`-${Math.sqrt(i)};${Math.sqrt(i)}`,options:{suiteDeNombres:!0}}})):(s+=` Cette équation a deux solutions : $-\\sqrt{${i}}$ et $\\sqrt{${i}}$.<br>
On en déduit qu'il existe deux points de $\\mathscr{C}$ ayant pour ordonnée $${r}$.<br>
Les  abscisses de ces points sont : $${d(`-\\sqrt{${i}}`)}$ et $${d(`\\sqrt{${i}}`)}$. `,f(this,b,{reponse:{value:`-\\sqrt{${i}};\\sqrt{${i}}`,options:{suiteDeNombres:!0}}})));break;case 1:default:e=l(-2,2,0),$=l(-3,3),p=l(-2,2,0),t=u(N()),c=T(e*t.n**2+$*t.n*t.d+p*t.d**2,t.d**2),n=u(C),a=u(g),O=new m($*t.n,t.d),D=new m($*t.n*t.d,t.d**2),P=new m(p*t.d**2,t.d**2),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}$ par :
              ${F(`$${n}(x)=${Q(0,e,$,p)}$`)}
              On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
              $${a}$ est le point de $\\mathscr{C}$ d'abscisse $${t.texFraction}$. <br>
              Quelle est son ordonnée ?`,s=`Puisque le point $${a}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>`,e!==1?$===0?s+=`
                    $${n}\\left(${t.texFraction}\\right)=${e}\\times \\left(${t.texFraction}\\right)^2${o(p)}
                =\\dfrac{${e}\\times ${t.n**2}}{${t.d**2}}${o(p)}
                =\\dfrac{${e*t.n**2}}{${t.d**2}}${P.ecritureAlgebrique}
               = ${c.texFractionSimplifiee}$`:s+=`
                    $${n}\\left(${t.texFraction}\\right)=${e}\\times \\left(${t.texFraction}\\right)^2${o($)}\\times${t.texFraction}${o(p)}
                  =\\dfrac{${e}\\times ${t.n**2}}{${t.d**2}}${O.ecritureAlgebrique}${o(p)}
                  =\\dfrac{${e*t.n**2}}{${t.d**2}}${D.ecritureAlgebrique}${P.ecritureAlgebrique}
                  =${c.texFractionSimplifiee}$`:$===0?s+=`$${n}\\left(${t.texFraction}\\right)=\\left(${t.texFraction}\\right)^2${o(p)}
                =\\dfrac{${t.n**2}}{${t.d**2}}${o(p)}
                =\\dfrac{${t.n**2}}{${t.d**2}}${P.ecritureAlgebrique}
                =${c.texFractionSimplifiee}$`:s+=`$${n}\\left(${t.texFraction}\\right)=\\left(${t.texFraction}\\right)^2${o($)}\\times${t.texFraction}${o(p)}
                =\\dfrac{ ${t.n**2}}{${t.d**2}}${O.ecritureAlgebrique}${o(p)}
                =\\dfrac{${e*t.n**2}}{${t.d**2}}${D.ecritureAlgebrique}${P.ecritureAlgebrique}
                =${c.texFractionSimplifiee}$
                `,s+=`<br> L'ordonnée du point $${a}$ est $${d(c.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:c}});break}break;case"a/x+b":default:switch(v[b]){case 0:if(u([!0,!1])){for(e=l(-9,9,0),$=l(-9,9,0),i=l(-9,9,[0,1,-1]),n=u(C),a=u(g);G(e,i)!==1;)e=l(-9,9,0);c=new m(e+$*i,i),S=new m(e,i),R=new m($*i,i),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}^*$ par :
                ${F(`$${n}(x)=\\dfrac{${e}}{x}${o($)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
                $${a}$ est le point de $\\mathscr{C}$ d'abscisse $${i}$. <br>
                Quelle est son ordonnée ?`,s=`Puisque le point $${a}$ appartient à $\\mathscr{C}$, son ordonnée est l'image de son abscisse.<br>
                                $${n}(${i})=\\dfrac{${e}}{${i}}${o($)}
                =${S.texFractionSimplifiee}${o($)}
                =${S.texFractionSimplifiee}${R.ecritureAlgebrique}=${c.texFractionSimplifiee}$<br>`,s+=`L'ordonnée du point $${a}$ est $${d(c.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:c}})}else e=l(-10,10,0),$=l(-9,9,0),r=l(-9,9,[0,1,-1,$]),n=u(C),a=u(g),c=new m(e,r-$),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}^*$ par :
                    ${F(`$${n}(x)=\\dfrac{${e}}{x}${o($)}$`)}
                    On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
                    Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${r}$ ? <br>
                    Si oui, quelles sont les abscisses possibles de ces points ?`,s=` Si un point de $\\mathscr{C}$ a pour ordonnée $${r}$, son abscisse est un antécédent de $${r}$.<br> `,s+=` On cherche donc $x$ tel que $${n}(x)=${r}$, c'est-à-dire $\\dfrac{${e}}{x}${o($)}=${r}$.<br> `,s+=`Pour $x\\neq 0$, <br>
                      $\\begin{aligned}
                      \\dfrac{${e}}{x}${o($)}&=${r}\\\\
                      \\dfrac{${e}}{x}${o($)}${d(o(-$))}&=${r}${d(o(-$))}\\\\
                      \\dfrac{${e}}{x}&=${r-$}\\\\
                      x\\times${q(r-$)} &=${e} ${U(4)}{\\text{(Produit en croix)}}\\\\
                      x&=${c.texFraction}${c.texSimplificationAvecEtapes()}\\\\
                                                \\end{aligned}$<br>
                                                Un seul point de $\\mathscr{C}$ a pour ordonnée $${r}$. `,s+=`Son abcsisse est $${d(c.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:c}});break;case 1:default:u([!0,!1])?(e=l(-9,9,0),$=l(-9,9,0),i=u(N()),c=new m(e*i.d+$*i.n,i.n),S=new m(e*i.d,i.n),R=new m($*i.n,i.n),n=u(C),a=u(g),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${F(`$${n}(x)=\\dfrac{${e}}{x}${o($)}$`)}
             On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
                $${a}$ est le point de $\\mathscr{C}$ d'abscisse $${i.texFraction}$.<br>
                Quelle est son ordonnée ?`,s=`Puisque le point $${a}$ appartient à $\\mathscr{C}$, son ordonnée est  l'image de son abscisse.<br>
              $${n}\\left(${i.texFraction}\\right)
              =\\dfrac{${e}}{${i.texFraction}}${o($)}
              =${e}\\times \\dfrac{${i.d}}{${i.n}}${o($)}=
              ${S.texFractionSimplifiee}${o($)}
              =${c.texFractionSimplifiee}
              $<br>`,s+=`L'ordonnée du point $${a}$ est $${d(c.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:c}})):(e=l(-9,9,0),$=l(-9,9,0),r=u(N()),S=T(r.n-$*r.d,r.d),c=T(e*r.d,r.n-$*r.d),n=u(C),a=u(g),h=`Soit $${n}$ la fonction définie sur $\\mathbb{R}^*$ par :
                ${F(`$${n}(x)=\\dfrac{${e}}{x}${o($)}$`)}
                On note $\\mathscr{C}$ la courbe représentative de la fonction $${n}$ dans un repère.<br>
                Existe-t-il des points de $\\mathscr{C}$ d'ordonnée $${r.texFraction}$ ? <br>
                Si oui, quelles sont les abscisses possibles de ces points ?`,s=` Si un point de $\\mathscr{C}$ a pour ordonnée $${r.texFraction}$, son abscisse est un antécédent de $${r.texFraction}$.<br> `,s+=` On cherche donc $x$ tel que $${n}(x)=${r.texFraction}$, c'est-à-dire $\\dfrac{${e}}{x}${o($)}=${r.texFraction}$.<br> `,s+=`Pour $x\\neq 0$, <br>
                      $\\begin{aligned}
                      \\dfrac{${e}}{x}${o($)}&=${r.texFraction}\\\\
                      \\dfrac{${e}}{x}${o($)}${d(o(-$))}&=${r.texFraction}${d(o(-$))}\\\\
                      \\dfrac{${e}}{x}&=${S.texFraction}\\\\
                      x\\times${q(r.n-$*r.d)} &=${e}\\times ${r.d} ${U(4)}{\\text{(Produit en croix)}}\\\\
                      x&=${c.texFraction}${c.texSimplificationAvecEtapes()}
                                                \\end{aligned}$<br>
                                                Un seul point de $\\mathscr{C}$ a pour ordonnée $${r.texFraction}$. `,s+=`Son abcsisse est $${d(c.texFractionSimplifiee)}$.`,f(this,b,{reponse:{value:c}}));break}break}L=h,L+=" "+W(this,b,X.clavierEnsemble),V=s,this.questionJamaisPosee(b,I[b],k,j,v[b])&&(this.listeQuestions[b]=L,this.listeCorrections[b]=V,b++),K++}Y(this)}}export{m$ as dateDeModifImportante,b$ as dateDePublication,h$ as default,p$ as interactifReady,u$ as interactifType,x$ as refs,l$ as titre,f$ as uuid};
//# sourceMappingURL=2F20-2-Cd0FdH8I.js.map

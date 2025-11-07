import{E as U,ah as S,r as a,p as x,b5 as O,q as c,t as _,k as r,az as I,w as P,v as b,b4 as E,j as R,B as C,o as M}from"./index-DjA7ROjC.js";import{s as A}from"./deprecatedFractions-DsorrrvY.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const e$="Montrer qu'un point appartient ou non à une courbe",$$="36795",t$={"fr-fr":["2F20-1"],"fr-ch":["11FA9-1"]};class i$ extends U{constructor(){super(),this.besoinFormulaireNumerique=["Choix des questions",4,`1 : Fonction affine
2 : Polynôme de degré 2 
3 : Fonction a/x+b 
4 : Mélange`],this.besoinFormulaire2Numerique=["Choix des questions",3,`1 : Abscisse du point A entière
2 : Abscisse du point A fractionnaire
3 : Mélange`],this.sup=1,this.sup2=1,this.correctionDetailleeDisponible=!0,this.correctionDetaillee=!1,this.nbQuestions=2}nouvelleVersion(){let y;switch(this.sup){case 1:y=["affine"];break;case 2:y=["polynôme"];break;case 3:y=["a/x+b"];break;case 4:default:y=["affine","polynôme","a/x+b"];break}const k=S(y,this.nbQuestions);let F;parseInt(this.sup2)===1?F=S([0],this.nbQuestions):parseInt(this.sup2)===2?F=S([1],this.nbQuestions):F=S([0,1],this.nbQuestions);for(let p=0,D,Q,L,w,t,i,o,$,e,l,d,s,m,q,v,h,u,f,g,n,J=0;p<this.nbQuestions&&J<50;){switch(L=a(-9,9,[0,1,-1]),w=a(-9,9,[L,0]),k[p]){case"affine":switch(F[p]){case 0:t=a(-9,9,[0,1]),i=a(-9,9,0),$=a(-9,9),l=x([t*$+i,t*($+1)+i]),g=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${_(`$f(x)=${R(t,i)}$`)}
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A(${$}; ${l})$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`,n="",this.correctionDetaillee&&(n+=`Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
               `),l===t*$+i?n+=`$${$}$ est bien dans l'ensemble de définition de $f$ et :<br>
                   $f(x_A)=f(${$})=${t}\\times ${b($)}${r(i)}=${l}=y_A$.<br>
                L'image de $${$}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$${$}$ est bien dans l'ensemble de définition de $f$ et :<br>
                  $f(x_A)=f(${$})=${t}\\times ${b($)}${r(i)}=${t*$+i}\\neq${l}$.<br>
                L'image de $${$}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$.`;break;case 1:default:t=a(-9,9,[0,1]),i=a(-9,9,0),e=x(E()),s=c(t*e.n+i*e.d,e.d),m=c(t*e.n+i*e.d+1,e.d),d=x([s,m]),h=c(i*s.d,s.d),g=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${_(`$f(x)=${R(t,i)}$`)}
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${e.texFraction}; ${d.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`,n="",this.correctionDetaillee&&(n+=`Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
               `),d===s?(n+=`$${e.texFraction}$ est bien dans l'ensemble de définition de $f$ et  : <br>
                $f(x_A)=f\\left(${e.texFraction}\\right)=$`,t===-1?n+=`$${C(t)}${e.texFraction}${r(i)}=
                  ${C(t)}${e.texFraction}${h.ecritureAlgebrique} =
                  \\dfrac{${C(t)}${e.n}${r(i*e.d)}}{${e.d}}=
               ${s.texFraction}${A(t*e.n+i*e.d,e.d)}=y_A$.<br>
               L'image de $${e.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$${t}\\times ${e.texFraction}${r(i)}=
                  ${t}\\times${e.texFraction}${h.ecritureAlgebrique} =
                  \\dfrac{${t}\\times${e.n}${r(i*e.d)}}{${e.d}}=
               ${s.texFraction}${A(t*e.n+i*e.d,e.d)}=y_A$.<br>
               L'image de $${e.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`):(n+=`$${e.texFraction}$ est bien dans l'ensemble de définition de $f$ et  : <br>
              $f(x_A)=f\\left(${e.texFraction}\\right)=$`,t===-1?n+=`$${C(t)}${e.texFraction}${r(i)}=
                ${C(t)}${e.texFraction}${h.ecritureAlgebrique} =
                \\dfrac{${C(t)}${e.n}${r(i*e.d)}}{${e.d}}=
             ${e.texFraction}${A(t*e.n+i*e.d,e.d)}\\neq${m.texFractionSimplifiee}$.<br>
             L'image de $${e.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$.`:n+=`$${t}\\times ${e.texFraction}${r(i)}=
                ${t}\\times${e.texFraction}${h.ecritureAlgebrique} =
                \\dfrac{${t}\\times${e.n}${r(i*s.d)}}{${s.d}}=
             ${s.texFraction}${A(t*e.n+i*e.d,e.d)}\\neq${m.texFractionSimplifiee}$.<br>
             L'image de $${e.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$.`);break}break;case"polynôme":switch(F[p]){case 0:t=a(-9,9,0),i=a(-9,9,0),o=a(-9,9),$=a(-9,9),l=x([t*$**2+i*$+o,t*$**2+i*$+o-1]),g=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${_(`$f(x)=${P(0,t,i,o)}$`)}
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A(${$}; ${l})$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`,n="",this.correctionDetaillee&&(n+=`Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>
               `),l===t*$**2+i*$+o?(n+=`$${$}$ est bien dans l'ensemble de définition de $f$ et :<br> `,t!==1?n+=`$f(x_A)=f(${$})=${t}\\times ${b($)}^2${r(i)}\\times${b($)}${r(o)}
                =${t*$**2}${r(i*$)}${r(o)}=${l}=y_A$.<br>
                L'image de $${$}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$f(x_A)=f(${$})= ${b($)}^2${r(i)}\\times${b($)}${r(o)}
                =${t*$**2}${r(i*$)}${r(o)}=${l}=y_A$.<br>
                L'image de $${$}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`):(n+=`$${$}$ est bien dans l'ensemble de définition de $f$ et :<br> `,t!==1?n+=`
                $f(x_A)=f(${$})=${t}\\times ${b($)}^2${r(i)}\\times${b($)}${r(o)}
                =${t*$**2}${r(i*$)}${r(o)}=${t*$**2+i*$+o}\\neq${l}$.<br>
                L'image de $${$}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`:n+=` $f(x_A)=f(${$})= ${b($)}^2${r(i)}\\times${b($)}${r(o)}
                =${t*$**2}${r(i*$)}${r(o)}=${t*$**2+i*$+o}\\neq${l}$.<br>
                L'image de $${$}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`);break;case 1:default:t=a(-2,2,0),i=a(-4,4),o=a(-4,4,0),e=x(O()),s=c(t*e.n**2+i*e.n*e.d+o*e.d**2,e.d**2),m=c(t*e.n**2+i*e.n*e.d+o*e.d**2-1,e.d**2),d=x([s,m]),h=c(i*e.n,e.d),u=c(i*e.n*e.d,e.d**2),f=c(o*e.d**2,e.d**2),g=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
              ${_(`$f(x)=${P(0,t,i,o)}$`)}
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${e.texFraction}; ${d.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`,n="",this.correctionDetaillee&&(n+=`Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>`),t!==1?(n+=`$${e.texFraction}$ est bien dans l'ensemble de définition de $f$ et :<br>
                $f(x_A)=f\\left(${e.texFraction}\\right)=${t}\\times \\left(${e.texFraction}\\right)^2$`,i===0?n+=`$${r(o)}
                =\\dfrac{${t}\\times ${e.n**2}}{${e.d**2}}${r(o)}
                =\\dfrac{${t*e.n**2}}{${e.d**2}}${f.ecritureAlgebrique}=\\dfrac{${t*e.n**2+f.n}}{${e.d**2}}
                ${A(t*e.n**2+u.n+f.n,e.d**2)}$`:n+=`$${r(i)}\\times${e.texFraction}${r(o)}
                  =\\dfrac{${t}\\times ${e.n**2}}{${e.d**2}}${h.ecritureAlgebrique}${r(o)}
                  =\\dfrac{${t*e.n**2}}{${e.d**2}}${u.ecritureAlgebrique}${f.ecritureAlgebrique}=\\dfrac{${t*e.n**2+u.n+f.n}}{${e.d**2}}
                ${A(t*e.n**2+u.n+f.n,e.d**2)}$`,d===s?n+=`$=y_A$.<br>
                  L'image de $${e.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$\\neq${d.texFractionSimplifiee}$.<br>
                                 L'image de $${e.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`):(n+=`$${e.texFraction}$ est bien dans l'ensemble de définition de $f$ et :<br>
                $f(x_A)=f\\left(${e.texFraction}\\right)=\\left(${e.texFraction}\\right)^2$`,i===0?n+=`$${r(o)}
                =\\dfrac{${e.n**2}}{${e.d**2}}${r(o)}
                =\\dfrac{${e.n**2}}{${e.d**2}}${f.ecritureAlgebrique}=\\dfrac{${t*e.n**2+f.n}}{${e.d**2}}
                ${A(t*e.n**2+u.n+f.n,e.d**2)}$`:n+=`
               $${r(i)}\\times${e.texFraction}${r(o)}
                =\\dfrac{ ${e.n**2}}{${e.d**2}}${h.ecritureAlgebrique}${r(o)}
                =\\dfrac{${t*e.n**2}}{${e.d**2}}${u.ecritureAlgebrique}${f.ecritureAlgebrique}
                =\\dfrac{${t*e.n**2+u.n+f.n}}{${e.d**2}}
                ${A(t*e.n**2+u.n+f.n,e.d**2)}$
                  `,d===s?n+=`$=y_A$.<br>
                  L'image de $${e.texFraction}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$\\neq${d.texFractionSimplifiee}$.<br>
                                 L'image de $${e.texFraction}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`);break}break;case"a/x+b":default:switch(F[p]){case 0:for(t=a(-9,9,0),i=a(-9,9,0),$=a(-9,9,[0,1,-1]);I(t,$)!==1;)t=a(-9,9,0);s=c(t+i*$,$),m=c(t+i*$+1,$),q=c(t,$),v=c(i*$,$),d=x([s,m]),g=`Soit $f$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${_(`$f(x)=\\dfrac{${t}}{x}${r(i)}$`)}
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${$}; ${d.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`,n="",this.correctionDetaillee&&(n+=`Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>`),n+=`$${$}$ est bien dans l'ensemble de définition de $f$ et : <br>
                              $f(x_A)=f(${$})=\\dfrac{${t}}{${$}}${r(i)}
              =${q.texFractionSimplifiee}${r(i)}
              =${q.texFractionSimplifiee}${v.ecritureAlgebrique}=${s.texFractionSimplifiee}
              $`,d===s?n+=`$=y_A$.<br>
                L'image de $${$}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$\\neq${d.texFractionSimplifiee}$.<br>
                               L'image de $${$}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`;break;case 1:default:t=a(-9,9,0),i=a(-9,9,0),$=x(O()),s=c(t*$.d+i*$.n,$.n),m=c(t*$.d+i*$.n-1,$.n),q=c(t*$.d,$.n),v=c(i*$.n,$.n),d=x([s,m]),g=`Soit $f$ la fonction définie sur $\\mathbb{R}^*$ par :
              ${_(`$f(x)=\\dfrac{${t}}{x}${r(i)}$`)}
              On note $\\mathscr{C}_f$ la courbe représentative de la fonction $f$ dans un repère.<br>
              Le point $A\\left(${$.texFractionSimplifiee}; ${d.texFractionSimplifiee}\\right)$ appartient-il à $\\mathscr{C}_f$ ? Justifier.`,n="",this.correctionDetaillee&&(n+=`Un point de coordonnées $(x;y)$ est sur la courbe représentative d'une fonction $f$ si et seulement si :<br>
              $\\bullet$  $x$ appartient à l'ensemble de définition de $f$ <br>
              et <br>
              $\\bullet$ l'ordonnée $y$ du point est l'image de son abscisse, c'est à dire $y=f(x)$.<br>`),n+=`$${$.texFractionSimplifiee}$ est bien dans l'ensemble de définition de $f$ et :<br>
              $f(x_A)=f\\left(${$.texFractionSimplifiee}\\right)
              =\\dfrac{${t}}{${$.texFractionSimplifiee}}${r(i)}
              =${t}\\times \\dfrac{${$.d}}{${$.n}}${r(i)}=
              ${q.texFractionSimplifiee}${r(i)}
              =${s.texFractionSimplifiee}
              $`,d===s?n+=`$=y_A$.<br>
                L'image de $${$.texFractionSimplifiee}$ est bien l'ordonnée du point $A$, donc le point $A$ est sur $\\mathscr{C}_f$.`:n+=`$\\neq${d.texFractionSimplifiee}$.<br>
                               L'image de $${$.texFractionSimplifiee}$ n'est pas l'ordonnée du point $A$, donc le point $A$ n'est pas sur $\\mathscr{C}_f$`;break}break}D=g,Q=n,this.questionJamaisPosee(p,k[p],L,w,F[p])&&(this.listeQuestions[p]=D,this.listeCorrections[p]=Q,p++),J++}M(this)}}export{i$ as default,t$ as refs,e$ as titre,$$ as uuid};
//# sourceMappingURL=2F20-1-Bd9gmR11.js.map

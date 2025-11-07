import{b as P}from"./style-BoyDn0TU.js";import{a as g}from"./etudeFonction-BKtJzdrF.js";import{E as O,ae as v,cl as Q,p as S,r as b,w as n,j as a,bd as o,ad as s,B as h,k as p,y as q,I as _,az as A,o as G}from"./index-Bk_D2JkM.js";import{a as u}from"./deprecatedFractions-BTR31pbW.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DoI0QyUo.js";import"./Matrice-CnCTeW3b.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/tiny-emitter-DDQe9_b_.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const W$="25/05/2023",X$="Étudier la position relative de deux courbes",Y$="53e8f",Z$={"fr-fr":["2N60-6"],"fr-ch":[]};class $e extends O{constructor(){super(),this.sup=1,this.sup2=1,this.nbQuestions=1,this.besoinFormulaireTexte=["Choix des fonctions",`1 : Fonctions affines
2 : Polynôme de degré 2 et fonction affine
3 : Mélange`],this.besoinFormulaire2Texte=["Choix des questions",`1 : Avec questions intermédiaires
2 : Sans question intermédiaire`]}nouvelleVersion(){const z=v({saisie:this.sup,min:1,max:2,melange:3,defaut:3,listeOfCase:["affines","polynômeEtAffine"],shuffle:!1,nbQuestions:this.nbQuestions}),C=v({saisie:this.sup2,min:1,max:2,defaut:1,listeOfCase:["true","false"],nbQuestions:this.nbQuestions,shuffle:!1,melange:0}).map(Boolean);Q(z,C);for(let c=0,L=0;c<this.nbQuestions&&L<50;){let m="",i="",r=0,t,e,$,f,x,d;const y=z[c],l=`${P("Remarque :")} vous pouvez vérifier ce résultat en représentant les courbes sur votre calculatrice graphique.`;switch(y){case"affines":C[c]?(r=b(-9,9,0),t=b(-9,9,0),e=b(-9,9,[0,r]),$=b(-9,9,0),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${a(r,t)}$ et $g(x)=${a(e,$)}$. <br>
              On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,m+=`${o(0)} Résoudre dans $\\mathbb R$ l'inéquation $f(x) < g(x)$.<br>
          ${o(1)} Quelle interprétation graphique peut-on en donner ?`,i=`${o(0)} Résolution de l'inéquation :<br>
              $\\begin{aligned}
              ${a(r,t)}&<${a(e,$)}\\\\
              ${a(r,t)}\\,${q(_(-e)+"x")}&<${a(e,$)}\\,${q(_(-e)+"x")}\\\\
              ${a(r-e,t)}&<${a(0,$)}\\\\
              ${a(r-e,t)}\\,${q(_(-t))}&<${a(0,$)}\\,${q(_(-t))}\\\\
              ${a(r-e,0)}&<${a(0,$-t)}\\\\
            ${r-e>0?`x&<\\dfrac{${$-t}}{${r-e}}`:`x&>\\dfrac{${$-t}}{${r-e}}`}
              \\end{aligned}$
              <br>
              ${A($-t,r-e)===1&&r-e>0?"L'":`Comme $\\dfrac{${$-t}}{${r-e}}=${u($-t,r-e)}$, l'`}  ensemble $S$ des solutions de l'inéquation est
              $S= ${r-e>0?`\\left]-\\infty\\,;\\,${u($-t,r-e)}\\right[`:`\\left]${u($-t,r-e)}\\,;\\,+\\infty\\right[`}$.<br>`,i+=`${o(1)} Position relative : <br>
              La courbe $\\mathscr{C}_f$ est en dessous de la courbe $\\mathscr{C}_g$ sur l'intervalle $${r-e>0?`\\left]-\\infty\\,;\\,${u($-t,r-e)}\\right[`:`\\left]${u($-t,r-e)}\\,;\\,+\\infty\\right[`}$.`,i+=`<br>${l}`):(r=b(-9,9,0),t=b(-9,9,0),e=b(-9,9,[0,r]),$=b(-9,9,0),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${a(r,t)}$ et $g(x)=${a(e,$)}$. <br>
              On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,m+="Étudier la position relative des deux courbes  $\\mathscr{C}_f$ et $\\mathscr{C}_g$.",i=`La position relative des deux courbes est donnée par l'étude du signe de la différence : $f(x)-g(x)$.<br>
              Plus précisément, si $f(x)-g(x)>0$, $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$, sinon, $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$.<br>
              Pour tout réel $x$,<br> $\\begin{aligned}
              f(x)-g(x)&=(${a(r,t)})-(${a(e,$)})\\\\
               &=${a(r,t)}${e>0?"":"+"}${a(-e,-$)}\\\\
               &=${a(r-e,t-$)}
               \\end{aligned}$<br>`,i+=`Il s'agit d'étudier le signe de l'expression affine $${a(r-e,t-$)}$.<br>
               Comme elle s'annule en $${u($-t,r-e)}$ et que $${r-e>0?`${r-e}>0`:`${r-e}<0`}$, on en déduit le tableau de signes : <br>`,r-e>0?f=["Line",10,"",0,"-",20,"z",20,"+"]:f=["Line",10,"",0,"+",20,"z",20,"-"],i+=g({tabInit:[[["$x$",2.5,10],["$f(x)-g(x)$",2,50]],["$-\\infty$",20,`$${u($-t,r-e)}$`,20,"$+\\infty$",30]],tabLines:[f],espcl:3.5,deltacl:.8,lgt:5}),i+=`Comme $f(x)-g(x)>0$ sur l'intervalle $${r-e>0?`\\left]${u($-t,r-e)}\\,;\\,+\\infty\\right[`:`\\left]-\\infty\\,;\\,${u($-t,r-e)}\\right[`}$,
                  la courbe $\\mathscr{C}_f$ est au dessus de la courbe $\\mathscr{C}_g$ sur cet intervalle et elle est en dessous sur $${r-e>0?`\\left]-\\infty\\,;\\,${u($-t,r-e)}\\right[`:`\\left]${u($-t,r-e)}\\,;\\,+\\infty\\right[`}$.
                  `,i+=`<br>${l}`);break;case"polynômeEtAffine":default:{const R=S([1,2,3]);R===1?C[c]?(r=1,t=b(-9,9,0),e=b(-10,10),$=b(-10,10,0),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${n(0,1,t,e)}$ et $g(x)=${a(t,$)}$. <br>
            On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,e-$>0&&(m+=`
                ${o(0)} Montrer que pour tout $x$ de $\\mathbb R$, $f(x) - g(x)=${n(0,1,0,e-$)}$.<br>`),e-$===0&&(m+=`
                ${o(0)} Montrer que pour tout $x$ de $\\mathbb R$, $f(x) - g(x)=${n(0,1,0,e-$)}$.<br>`),e-$<0&&(m+=`${o(0)} Montrer que pour tout $x$ de $\\mathbb R$,
                $f(x)-g(x)=(x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})(x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})$.<br>
                `),m+=`${o(1)} Étudier pour tout $x$ de $\\mathbb R$, le signe de $f(x)-g(x)$.<br>
        ${o(2)} Quelle interprétation graphique peut-on en donner ?`,i=`${o(0)}  Pour tout $x$ de $\\mathbb R$, <br>
            $\\begin{aligned}
            f(x) - g(x)&=(${n(0,1,t,e)})-(${a(t,$)})\\\\
            &=${n(0,1,t,e)}${t>0?"":"+"}${a(-t,-$)}\\\\
            &=${n(0,1,0,e-$)}
            \\end{aligned}$
            <br>
           `,f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],d=["Line",30,"",0,"+",20,"z",20,"-",20,"z",20,"+",20],e-$>0?(i+=`${o(1)}  Pour tout $x$ de $\\mathbb R$, $${n(0,1,0,e-$)}>0$.<br>
                ${o(2)} On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)>0$, soit $f(x)>g(x)$. <br>
                Graphiquement,  $\\mathscr{C}_f$ est toujours au dessus de $\\mathscr{C}_g$.`,i+=`<br>${l}`):e-$===0?(i+=`${o(1)}  Pour tout $x$ de $\\mathbb R$, $${n(0,1,0,e-$)}\\geqslant 0$.<br>
                ${o(2)} On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)\\geqslant0$, soit $f(x)\\geqslant g(x)$. <br>
                Graphiquement, $\\mathscr{C}_f$ et $\\mathscr{C}_g$ ont un point d'intersection (de coordonnées $(0\\,;\\${$})) et $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$.  .`,i+=`<br>${l}`):(i+=`  $${n(0,1,0,e-$)}$ est de la forme $a^2-b^2$ avec $a=x$ et $b=${s($-e)[0]}$.<br>
                  Comme $a^2-b^2=(a-b)(a+b)$, on en déduit $${n(0,1,0,e-$)}=(x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})(x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})$.<br>
                  Ainsi, pour tout $x$ de $\\mathbb R$,
                  $f(x)-g(x)=(x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})(x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})$.<br>
                 
                ${o(1)} Comme $x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ s'annule en
                $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ et
                 $x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ s'annule en $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$, on obtient le tableau de signes : <br>`,i+=g({tabInit:[[["$x$",2.5,30],[`$x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,2,75],[`$x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,2,75],["$f(x)-g(x)$",2,200]],["$-\\infty$",30,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$`,20,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,20,"$+\\infty$",30]],tabLines:[f,x,d],espcl:3.5,deltacl:.8,lgt:10}),i+=`<br>${o(2)} Comme $f(x)-g(x)<0$ pour $x\\in]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}[$, $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                  $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$ sur $]-\\infty\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}[$ et sur $]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}\\,;\\,+\\infty [$.`,i+=`<br>${l}`)):(r=1,t=b(-9,9,0),e=b(-10,10),$=b(-10,10,0),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par :$f(x)=${n(0,1,t,e)}$ et $g(x)=${a(t,$)}$. <br>
              On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,m+="Étudier la position relative des deux courbes $\\mathscr{C}_f$ et $\\mathscr{C}_g$.",i=`La position relative des deux courbes est donnée par l'étude du signe de la différence : $f(x)-g(x)$.<br>
            Plus précisément, si $f(x)-g(x)>0$, $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$, sinon, $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$.<br>`,i+=`  Pour tout $x$ de $\\mathbb R$, <br>
            $\\begin{aligned}
            f(x) - g(x)&=(${n(0,1,t,e)})-(${a(t,$)})\\\\
            &=${n(0,1,t,e)}${t>0?"":"+"}${a(-t,-$)}\\\\
            &=${n(0,1,0,e-$)}
            \\end{aligned}$
            <br>
           `,f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],d=["Line",30,"",0,"+",20,"z",20,"-",20,"z",20,"+",20],e-$>0?(i+=`  Pour tout $x$ de $\\mathbb R$, $${n(0,1,0,e-$)}>0$.<br>
                 On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)>0$, soit $f(x)>g(x)$. <br>
                Graphiquement,  $\\mathscr{C}_f$ est toujours au dessus de $\\mathscr{C}_g$.`,i+=`<br>${l}`):e-$===0?(i+=`  Pour tout $x$ de $\\mathbb R$, $${n(0,1,0,e-$)}\\geqslant 0$.<br>
                On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)\\geqslant0$, soit $f(x)\\geqslant g(x)$. <br>
                Graphiquement, $\\mathscr{C}_f$ et $\\mathscr{C}_g$ ont un point d'intersection (de coordonnées $(0\\,;\\${$})) et $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$.  .`,i+=`<br>${l}`):(i+=`  $${n(0,1,0,e-$)}$ est de la forme $a^2-b^2$ avec $a=x$ et $b=${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$.<br>
                  Comme $a^2-b^2=(a-b)(a+b)$, on en déduit $${n(0,1,0,e-$)}=(x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})(x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})$.<br>
                  Ainsi, pour tout $x$ de $\\mathbb R$,
                  $f(x)-g(x)=(x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})(x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`})$.<br>
                 
                 Comme $x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ s'annule en
                $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ et
                 $x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ s'annule en $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$, on obtient le tableau de signes : <br>`,i+=g({tabInit:[[["$x$",2.5,30],[`$x+${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,2,75],[`$x-${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,2,75],["$f(x)-g(x)$",2,200]],["$-\\infty$",30,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$`,20,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,20,"$+\\infty$",30]],tabLines:[f,x,d],espcl:3.5,deltacl:.8,lgt:10}),i+=`<br> Comme $f(x)-g(x)<0$ pour $x\\in]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}[$, $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                  $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$ sur $]-\\infty\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}[$ et sur $]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}\\,;\\,+\\infty [$.`,i+=`<br>${l}`)):R===2?C[c]?(r=1,t=b(-9,9,0),e=b(-10,10),$=b(-10,10,0),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${n(0,-1,t,-e)}$ et $g(x)=${a(t,-$)}$. <br>
              On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,e-$>0&&(m+=`
                  ${o(0)} Montrer que pour tout $x$ de $\\mathbb R$, $f(x) - g(x)=${n(0,-1,0,$-e)}$.<br>`),e-$===0&&(m+=`
                  ${o(0)} Montrer que pour tout $x$ de $\\mathbb R$, $f(x) - g(x)=${n(0,-1,0,$-e)}$.<br>`),e-$<0&&(m+=`${o(0)} Montrer que pour tout $x$ de $\\mathbb R$,
                  $f(x)-g(x)=(${$-e===1||$-e===4||$-e===9||$-e===16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x)(${$-e===1||$-e===4||e-$===9||e-$===16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x)$.<br>
                  `),m+=`${o(1)} Étudier pour tout $x$ de $\\mathbb R$, le signe de $f(x)-g(x)$.<br>
          ${o(2)} Quelle interprétation graphique peut-on en donner ?`,i=`${o(0)}  Pour tout $x$ de $\\mathbb R$, <br>
              $\\begin{aligned}
              f(x) - g(x)&=(${n(0,-1,t,-e)})-(${a(t,-$)})\\\\
              &=${n(0,-1,t,-e)}${t>0?"":"+"}${a(-t,$)}\\\\
              &=${n(0,-1,0,$-e)}
              \\end{aligned}$
              <br>
             `,f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"+",20,"t",20,"+",20,"z",20,"-",20],d=["Line",30,"",0,"-",20,"z",20,"+",20,"z",20,"-",20],e-$>0&&(i+=`${o(1)}  Pour tout $x$ de $\\mathbb R$, $${n(0,-1,0,$-e)}<0$.<br>
                  ${o(2)} On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)<0$, soit $f(x) < g(x)$. <br>
                  Graphiquement,  $\\mathscr{C}_f$ est toujours en dessous de $\\mathscr{C}_g$.`,i+=`<br>${l}`),e-$===0&&(i+=`${o(1)}  Pour tout $x$ de $\\mathbb R$, $${n(0,-1,0,$-e)}\\leqslant 0$.<br>
                  ${o(2)} On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)\\leqslant0$, soit $f(x)\\leqslant g(x)$. <br>
                  Graphiquement, $\\mathscr{C}_f$ et $\\mathscr{C}_g$ ont un point d'intersection (de coordonnées $(0\\,;\\${-$})) et $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$.  .`,i+=`<br>${l}`),e-$<0&&(i+=`  $${$-e}-x^2$ est de la forme $a^2-b^2$ avec $a=${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ et $b=x$.<br>
                    Comme $a^2-b^2=(a-b)(a+b)$, on en déduit $${$-e}-x^2=(${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x)(${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x)$.<br>
                    Ainsi, pour tout $x$ de $\\mathbb R$,
                    $f(x)-g(x)=
                    (${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x)(${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x)$.<br>
                   
                  ${o(1)} Comme $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x$ s'annule en
                  $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ et
                   $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x$ s'annule en $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$, on obtient le tableau de signes : <br>`,i+=g({tabInit:[[["$x$",2.5,30],[`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x$`,2,75],[`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x$`,2,75],["$f(x)-g(x)$",2,200]],["$-\\infty$",30,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$`,20,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,20,"$+\\infty$",30]],tabLines:[f,x,d],espcl:3.5,deltacl:.8,lgt:10}),i+=`<br>${o(2)} Comme $f(x)-g(x)>0$ pour $x\\in]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}[$, $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                    $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$ sur $]-\\infty\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}[$ et sur $]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}\\,;\\,+\\infty [$.`,i+=`<br>${l}`)):(t=b(-9,9,0),e=b(-10,10),$=b(-10,10,0),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${n(0,-1,t,-e)}$ et $g(x)=${a(t,-$)}$. <br>
            On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,m+="Étudier la position relative des deux courbes $\\mathscr{C}_f$ et $\\mathscr{C}_g$.",i=`La position relative des deux courbes est donnée par l'étude du signe de la différence : $f(x)-g(x)$.<br>
            Plus précisément, si $f(x)-g(x)>0$, $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$, sinon, $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$.<br>`,i+=`  Pour tout $x$ de $\\mathbb R$, <br>
            $\\begin{aligned}
            f(x) - g(x)&=(${n(0,-1,t,-e)})-(${a(t,-$)})\\\\
            &=${n(0,-1,t,-e)}${t>0?"":"+"}${a(-t,$)}\\\\
            &=${n(0,-1,0,$-e)}
            \\end{aligned}$
            <br>
           `,f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"+",20,"t",20,"+",20,"z",20,"-",20],d=["Line",30,"",0,"-",20,"z",20,"+",20,"z",20,"-",20],e-$>0&&(i+=`  Pour tout $x$ de $\\mathbb R$, $${n(0,-1,0,$-e)}<0$.<br>
                ${o(2)} On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)<0$, soit $f(x) < g(x)$. <br>
                Graphiquement,  $\\mathscr{C}_f$ est toujours en dessous de $\\mathscr{C}_g$.`),e-$===0&&(i+=`  Pour tout $x$ de $\\mathbb R$, $${n(0,-1,0,$-e)}\\leqslant 0$.<br>
                 On en déduit que pour tout $x$ de $\\mathbb R$, $f(x)-g(x)\\leqslant0$, soit $f(x)\\leqslant g(x)$. <br>
                Graphiquement, $\\mathscr{C}_f$ et $\\mathscr{C}_g$ ont un point d'intersection (de coordonnées $(0\\,;\\${-$})) et $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$.  .`,i+=`<br>${l}`),e-$<0&&(i+=`  $${$-e}-x^2$ est de la forme $a^2-b^2$ avec $a=${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ et $b=x$.<br>
                  Comme $a^2-b^2=(a-b)(a+b)$, on en déduit $${$-e}-x^2=(${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x)(${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x)$.<br>
                  Ainsi, pour tout $x$ de $\\mathbb R$,
                  $f(x)-g(x)=
                  (${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x)(${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x)$.<br>
                 
                ${o(1)} Comme $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x$ s'annule en
                $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$ et
                 $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x$ s'annule en $${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$, on obtient le tableau de signes : <br>`,i+=g({tabInit:[[["$x$",2.5,30],[`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}+x$`,2,75],[`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}-x$`,2,75],["$f(x)-g(x)$",2,200]],["$-\\infty$",30,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}$`,20,`$${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}$`,20,"$+\\infty$",30]],tabLines:[f,x,d],espcl:3.5,deltacl:.8,lgt:10}),i+=`<br> Comme $f(x)-g(x)>0$ pour $x\\in]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}[$, $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                  $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$ sur $]-\\infty\\,;\\,${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`-${s($-e)[0]}`:`-\\sqrt{${$-e}}`}[$ et sur $]${e-$===-1||e-$===-4||e-$===-9||e-$===-16?`${s($-e)[0]}`:`\\sqrt{${$-e}}`}\\,;\\,+\\infty [$.`,i+=`<br>${l}`)):C[c]?(r=b(-3,3,0),t=b(-9,9,0),e=b(-10,10),$=b(-10,10,[0,t]),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${n(0,r,t,e)}$ et $g(x)=${a($,e)}$. <br>
          On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,m+=`${o(0)} Montrer que pour tout $x$ de $\\mathbb R$, $f(x) - g(x)=x(${h(r)}x${p(t-$)})$.<br>`,m+=`${o(1)} Étudier pour tout $x$ de $\\mathbb R$, le signe de $f(x)-g(x)$.<br>
      ${o(2)} Quelle interprétation graphique peut-on en donner ?`,i=`${o(0)}  Pour tout $x$ de $\\mathbb R$, <br>
          $\\begin{aligned}
          f(x) - g(x)&=(${n(0,r,t,e)}) -(${a($,e)})\\\\
          &=${n(0,r,t,e)}${$>0?"":"+"}${a(-$,-e)}\\\\
          &=${n(0,r,t-$,0)}\\\\
          &=x(${h(r)}x${p(t-$)})
          \\end{aligned}$
          <br>
         `,r>0&&($-t)/r>0?(f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],d=["Line",30,"",0,"+",20,"z",20,"-",20,"z",20,"+",20]):r>0&&($-t)/r<0?(f=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],x=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],d=["Line",30,"",0,"+",20,"z",20,"-",20,"z",20,"+",20]):r<0&&($-t)/r>0?(f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"+",20,"t",20,"+",20,"z",20,"-",20],d=["Line",30,"",0,"-",20,"z",20,"+",20,"z",20,"-",20]):(f=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],x=["Line",30,"",0,"+",20,"z",20,"-",20,"t",20,"-",20],d=["Line",30,"",0,"-",20,"z",20,"+",20,"z",20,"-",20]),i+=` ${o(1)} $x$ s'annule en $0$ et $${h(r)}x${p(t-$)}$ s'annule en $${u($-t,r)}$.<br>
          On obtient le tableau de signes : <br>
          
          `,i+=g({tabInit:[[["$x$",2.5,30],["$x$",2,75],[`$${h(r)}x${p(t-$)}$`,2,75],["$f(x)-g(x)$",2,200]],["$-\\infty$",30,`$${($-t)/r<0?`${u($-t,r)}`:"0"}$`,20,`$${($-t)/r>0?`${u($-t,r)}`:"0"}$`,20,"$+\\infty$",30]],tabLines:[f,x,d],espcl:3.5,deltacl:.8,lgt:10}),r<0?(i+=`<br>${o(2)} Comme $f(x)-g(x)>0$ pour
          $x\\in\\left]${($-t)/r<0?`${u($-t,r)}`:"0"} \\,;\\,
          ${($-t)/r<0?"0":`${u($-t,r)}`}\\right[$, $\\mathscr{C}_f$ est au dessus de
            $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$ sur $\\left]-\\infty\\,;\\,
                ${($-t)/r<0?`${u($-t,r)}`:"0"}\\right[$
                  et sur $\\left]${($-t)/r<0?"0":`${u($-t,r)}`}\\,;\\,+\\infty \\right[$.`,i+=`<br>${l}`):(i+=`<br>${o(2)} Comme $f(x)-g(x)<0$ pour
          $x\\in\\left]${($-t)/r<0?`${u($-t,r)}`:"0"} \\,;\\,
          ${($-t)/r<0?"0":`${u($-t,r)}`}\\right[$, $\\mathscr{C}_f$ est en dessous de
            $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$ sur $\\left]-\\infty\\,;\\,
                ${($-t)/r<0?`${u($-t,r)}`:"0"}\\right[$
                  et sur $\\left]${($-t)/r<0?"0":`${u($-t,r)}`}\\,;\\,+\\infty \\right[$.`,i+=`<br>${l}`)):(r=b(-3,3,0),t=b(-9,9,0),e=b(-10,10),$=b(-10,10,[0,t]),m=`Soient $f$ et $g$ deux fonctions définies sur $\\mathbb R$ respectivement par : $f(x)=${n(0,r,t,e)}$ et $g(x)=${a($,e)}$. <br>
              On note $\\mathscr{C}_f$ et $\\mathscr{C}_g$ leur courbe représentative.<br>`,m+="Étudier la position relative des deux courbes $\\mathscr{C}_f$ et $\\mathscr{C}_g$.",i=`La position relative des deux courbes est donnée par l'étude du signe de la différence : $f(x)-g(x)$.<br>
            Plus précisément, si $f(x)-g(x)>0$, $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$, sinon, $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$.<br>`,i+=`  Pour tout $x$ de $\\mathbb R$, <br>
              $\\begin{aligned}
              f(x) - g(x)&=(${n(0,r,t,e)}) -(${a($,e)})\\\\
              &=${n(0,r,t,e)}${$>0?"":"+"}${a(-$,-e)}\\\\
              &=${n(0,r,t-$,0)}\\\\
              &=x(${h(r)}x${p(t-$)})
              \\end{aligned}$
              <br>
             `,r>0&&($-t)/r>0?(f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],d=["Line",30,"",0,"+",20,"z",20,"-",20,"z",20,"+",20]):r>0&&($-t)/r<0?(f=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],x=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],d=["Line",30,"",0,"+",20,"z",20,"-",20,"z",20,"+",20]):r<0&&($-t)/r>0?(f=["Line",30,"",0,"-",20,"z",20,"+",20,"t",20,"+",20],x=["Line",30,"",0,"+",20,"t",20,"+",20,"z",20,"-",20],d=["Line",30,"",0,"-",20,"z",20,"+",20,"z",20,"-",20]):(f=["Line",30,"",0,"-",20,"t",20,"-",20,"z",20,"+",20],x=["Line",30,"",0,"+",20,"z",20,"-",20,"t",20,"-",20],d=["Line",30,"",0,"-",20,"z",20,"+",20,"z",20,"-",20]),i+=`  $x$ s'annule en $0$ et $${h(r)}x${p(t-$)}$ s'annule en $${u($-t,r)}$.<br>
              On obtient le tableau de signes : <br>
              
              `,i+=g({tabInit:[[["$x$",2.5,30],["$x$",2,75],[`$${h(r)}x${p(t-$)}$`,2,75],["$f(x)-g(x)$",2,200]],["$-\\infty$",30,`$${($-t)/r<0?`${u($-t,r)}`:"0"}$`,20,`$${($-t)/r>0?`${u($-t,r)}`:"0"}$`,20,"$+\\infty$",30]],tabLines:[f,x,d],espcl:3.5,deltacl:.8,lgt:10}),r<0?(i+=`<br> Comme $f(x)-g(x)>0$ pour
              $x\\in\\left]${($-t)/r<0?`${u($-t,r)}`:"0"} \\,;\\,
              ${($-t)/r<0?"0":`${u($-t,r)}`}\\right[$, $\\mathscr{C}_f$ est au dessus de
                $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                    $\\mathscr{C}_f$ est en dessous de $\\mathscr{C}_g$ sur $\\left]-\\infty\\,;\\,
                    ${($-t)/r<0?`${u($-t,r)}`:"0"}\\right[$
                      et sur $\\left]${($-t)/r<0?"0":`${u($-t,r)}`}\\,;\\,+\\infty \\right[$.`,i+=`<br>${l}`):(i+=`<br> Comme $f(x)-g(x)<0$ pour
              $x\\in\\left]${($-t)/r<0?`${u($-t,r)}`:"0"} \\,;\\,
              ${($-t)/r<0?"0":`${u($-t,r)}`}\\right[$, $\\mathscr{C}_f$ est en dessous de
                $\\mathscr{C}_g$ sur cet inetrvalle. <br>
                    $\\mathscr{C}_f$ est au dessus de $\\mathscr{C}_g$ sur $\\left]-\\infty\\,;\\,
                    ${($-t)/r<0?`${u($-t,r)}`:"0"}\\right[$
                      et sur $\\left]${($-t)/r<0?"0":`${u($-t,r)}`}\\,;\\,+\\infty \\right[$.`,i+=`<br>${l}`))}}this.questionJamaisPosee(c,r,t,e,$)&&(this.listeQuestions[c]=m,this.listeCorrections[c]=i,c++),L++}G(this)}}export{W$ as dateDePublication,$e as default,Z$ as refs,X$ as titre,Y$ as uuid};
//# sourceMappingURL=2N60-6-f-8OPTRV.js.map

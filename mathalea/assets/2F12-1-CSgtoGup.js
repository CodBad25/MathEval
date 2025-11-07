import{E as R,ae as F,ah as k,r as b,p as q,s as o,k as n,y as s,G as d,v as g,F as D,ad as a,n as O,b as M,o as Q}from"./index-DjA7ROjC.js";import{a as l}from"./deprecatedFractions-DsorrrvY.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const K$="Résoudre algébriquement une équation $f(x)=k$ avec une fonction de référence",U$="07/01/2022",W$="16/05/2024",X$=!0,Y$="mathLive",Z$="de0d1",_$={"fr-fr":["2F12-1"],"fr-ch":[]};class $e extends R{constructor(){super(),this.besoinFormulaire2Numerique=["Choix des questions",3,`1 : Équation directe
2 : Équation indirecte
3 : Mélange`],this.sup=1,this.sup2=1,this.correctionDetailleeDisponible=!0,this.correctionDetaillee=!1,this.nbQuestions=2,this.besoinFormulaireTexte=["Type de questions",["Nombres séparés par des tirets  :","1 : x^2=k","2 : sqrt(x)=k","3 : 1/x=k","4 : x^3=k","5 : Mélange"].join(`
`)]}nouvelleVersion(){const C=F({saisie:this.sup,min:1,max:4,melange:5,defaut:1,nbQuestions:this.nbQuestions}),v=k(C,this.nbQuestions);let f;this.sup2===1?f=k([0],this.nbQuestions):this.sup2===2?f=k([1,2,3],this.nbQuestions):f=k([0,1,2,3],this.nbQuestions);for(let p=0,h,y,i,$,t,e,m,x,L,S,c,r,u,A=0;p<this.nbQuestions&&A<50;){switch(v[p]){case 1:switch(f[p]){case 0:i=b(0,15)**2,$=0,e=q([q([2,3,5,7,10,11,13,15,17,19,21,23,26])*q([-1,1]),i]),c=`Résoudre dans $\\mathbb{R}$ :<br>
              ${o(50)} $x^2=${e}$`,r="",this.correctionDetaillee&&(r+=`L'équation $x^2=k$ admet :<br>
                $\\bullet~$ deux solutions lorsque $k>0$ : $-\\sqrt{k}$ et $\\sqrt{k}$  ;<br>
                $\\bullet~$ une unique solution égale à $0$ lorsque $k=0$ ; <br>
                $\\bullet~$ aucune solution lorsque $k<0$.<br><br>
        `),e>0?(r+=`L'équation est de la forme $x^2=k$ avec $k=${e}$. Comme  $${e}>0$ alors l'équation admet deux solutions : $-\\sqrt{${e}}$ et $\\sqrt{${e}}$.<br>
                `,e===i?(u=`\\{-${Math.sqrt(e)};${Math.sqrt(e)}\\}`,r+=`Comme $-\\sqrt{${e}}=-${Math.sqrt(e)}$ et $\\sqrt{${e}}=${Math.sqrt(e)}$ alors
                les solutions de l'équation peuvent s'écrire plus simplement : $-${Math.sqrt(e)}$ et $${Math.sqrt(e)}$.<br>
                Ainsi,  $S=${s(`\\{-${Math.sqrt(e)}${o(1)};${o(1)}${Math.sqrt(e)}\\}`)}$.`):(u=`\\{-\\sqrt{${e}};\\sqrt{${e}}\\}`,r+=`Ainsi,  $S=${s(`\\{-\\sqrt{${e}};\\sqrt{${e}}\\}`)}$.`)):e===0?(u="\\{0\\}",r+=`L'équation est de la forme $x^2=k$ avec $k=${e}$. Comme $k=${e}$ alors L'équation admet une unique solution : $0$.<br>
                Ainsi, $S=${s("\\{0\\}")}$.`):(r+=`L'équation est de la forme $x^2=k$ avec $k=${e}$. Comme $${e}<0$, alors l'équation n'admet aucune solution.<br>
                  Ainsi, $S=${s("\\emptyset")}$.`,u="\\emptyset");break;case 1:$=b(-15,15,0),i=b(0,15)**2,e=q([q([2,3,5,7,10,11,13,15,17,19,21,23,26])*q([-1,1]),i]),t=e+$,c=`Résoudre dans $\\mathbb{R}$ :<br>
              ${o(50)} $x^2${n($)}=${t}$`,r="On isole $x^2$ dans le membre de gauche pour obtenir une équation du type $x^2=k$.<br> ",$>0?r+=`$\\begin{aligned}
             x^2${n($)}&=${t}\\\\
             x^2${n($)}-${s($)}&=${t}-${s($)}\\\\
             x^2&=${t-$}
             \\end{aligned}$`:r+=`$\\begin{aligned}
             x^2${n($)}&=${t}\\\\
             x^2${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
             x^2&=${t-$}
             \\end{aligned}$`,e>0?e===i?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$. Comme $${d(e,0)}>0$,  l'équation a deux solutions : $-\\sqrt{${d(e,0)}}$ et $\\sqrt{${d(e,0)}}$.
                <br> Comme $-\\sqrt{${d(e,0)}}=-${a(e)[0]}$ et $\\sqrt{${e}}=${a(e)[0]}$ alors
                les solutions de l'équation peuvent s'écrire plus simplement : $-${a(e)[0]}$ et $${a(e)[0]}$.<br>
                Ainsi,  $S=${s(`\\{-${a(e)[0]}${o(1)};${o(1)}${a(e)[0]}\\}`)}$.`,u=`\\{-${a(e)[0]};${a(e)[0]}\\}`):a(e)[1]!==e?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$. Comme $${d(e,0)}>0$, l'équation a deux solutions : $-\\sqrt{${d(e,0)}}$ et $\\sqrt{${d(e,0)}}$. <br>
                    Comme $-\\sqrt{${e}}=-${a(e)[0]}\\sqrt{${a(e)[1]}}$ et $\\sqrt{${e}}=${a(e)[0]}\\sqrt{${a(e)[1]}}$ alors
                    les solutions de l'équation peuvent s'écrire plus simplement : $-${a(e)[0]}\\sqrt{${a(e)[1]}}$ et $${a(e)[0]}\\sqrt{${a(e)[1]}}$.<br>
                    Ainsi,  $S=${s(`\\{-${a(e)[0]}\\sqrt{${a(e)[1]}}${o(1)};${o(1)}${a(e)[0]}\\sqrt{${a(e)[1]}}\\}`)}$.`,u=`\\{-${a(e)[0]}\\sqrt{${a(e)[1]}};${a(e)[0]}\\sqrt{${a(e)[1]}}\\}`):(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${t-$}$. Comme $${t-$}>0$, l'équation a deux solutions : $-\\sqrt{${t-$}}$ et $\\sqrt{${t-$}}$.<br>
                    Ainsi,  $S=${s(`\\{-\\sqrt{${t-$}}${o(1)};${o(1)}\\sqrt{${t-$}}\\}`)}$.`,u=`\\{-\\sqrt{${t-$}};\\sqrt{${t-$}}\\}`):e===0?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$, alors l'équation a une solution : $0$.<br>
              Ainsi, $S=${s("\\{0\\}")}$. `,u="\\{0\\}"):(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(t-$,0)}$. Comme $${d(t-$,0)}<0$, l'équation n'a pas de solution.
                <br>Ainsi, $S=${s("\\emptyset")}$. `,u="\\emptyset");break;case 2:$=b(-15,15,0),i=b(0,15)**2,e=q([q([2,3,5,7,10,11,13,15,17,19,21,23,26])*q([-1,1]),i]),t=$-e,c=`Résoudre dans $\\mathbb{R}$ :<br>
              ${o(50)} $-x^2${n($)}=${t}$`,r="On isole $x^2$ dans le membre de gauche pour obtenir une équation du type $x^2=k$.<br> ",$>0?r+=`$\\begin{aligned}
             -x^2+${$}&=${t}\\\\
             -x^2${n($)}-${s($)}&=${t}-${s($)}\\\\
             -x^2&=${t-$}\\\\
             x^2&=${$-t}
             \\end{aligned}$`:r+=`$\\begin{aligned}
             -x^2${n($)}&=${t}\\\\
             -x^2${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
             -x^2&=${t-$}\\\\
             x^2&=${$-t}
             \\end{aligned}$`,e>0?e===i?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$. Comme $${d(e,0)}>0$, l'équation a deux solutions : $-\\sqrt{${d(e,0)}}$ et $\\sqrt{${d(e,0)}}$.
                <br>  Comme $-\\sqrt{${d(e,0)}}=-${a(e)[0]}$ et $\\sqrt{${e}}=${a(e)[0]}$ alors
                les solutions de l'équation peuvent s'écrire plus simplement : $-${a(e)[0]}$ et $${a(e)[0]}$.<br>
                Ainsi,  $S=${s(`\\{-${a(e)[0]}${o(1)};${o(1)}${a(e)[0]}\\}`)}$.`,u=`\\{-${a(e)[0]};${a(e)[0]}\\}`):a(e)[1]!==e?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$. Comme $${d(e,0)}>0$, l'équation a deux solutions : $-\\sqrt{${d(e,0)}}$ et $\\sqrt{${d(e,0)}}$.<br>Comme $-\\sqrt{${e}}=-${a(e)[0]}\\sqrt{${a(e)[1]}}$ et $\\sqrt{${e}}=${a(e)[0]}\\sqrt{${a(e)[1]}}$ alors
                    les solutions de l'équation peuvent s'écrire plus simplement : $-${a(e)[0]}\\sqrt{${a(e)[1]}}$ et $${a(e)[0]}\\sqrt{${a(e)[1]}}$.<br>
                    Ainsi,  $S=${s(`\\{-${a(e)[0]}\\sqrt{${a(e)[1]}}${o(1)};${o(1)}${a(e)[0]}\\sqrt{${a(e)[1]}}\\}`)}$.`,u=`\\{-${a(e)[0]}\\sqrt{${a(e)[1]}};${a(e)[0]}\\sqrt{${a(e)[1]}}\\}`):(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$. Comme $${d(e,0)}>0$, alors l'équation a deux solutions : $-\\sqrt{${d(e,0)}}$ et $\\sqrt{${d(e,0)}}$.<br>
                    Ainsi,  $S=${s(`\\{-\\sqrt{${e}}${o(1)};${o(1)}\\sqrt{${e}}\\}`)}$.`,u=`\\{-\\sqrt{${e}};\\sqrt{${e}}\\}`):e===0?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$, donc l'équation a une solution : $0$.<br>
              Ainsi, $S=${s("\\{0\\}")}$. `,u="\\{0\\}"):(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d($-t)}$. Comme $${d($-t)}<0$, l'équation n'a pas de solution.
                <br> Ainsi, $S=${s("\\emptyset")}$. `,u="\\emptyset");break;case 3:default:i=b(-10,10,[-1,0,1]),$=b(-10,10,0),t=b(-10,10,0),e=(t-$)/i,x=new D(t-$,i),c=`Résoudre dans $\\mathbb{R}$ :<br>
              ${o(50)} $${i}x^2${n($)}=${t}$`,r="On isole $x^2$ dans le membre de gauche pour obtenir une équation du type $x^2=k$.<br> ",$>0?r+=`$\\begin{aligned}
              ${i}x^2${n($)}&=${t}\\\\
              ${i}x^2${n($)}-${s($)}&=${t}-${s($)}\\\\
              ${i}x^2&=${t-$}\\\\
                         x^2&=${x.texFractionSimplifiee}
             \\end{aligned}$`:r+=`$\\begin{aligned}
             ${i}x^2${n($)}&=${t}\\\\
             ${i}x^2${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
             ${i}x^2&=${t-$}\\\\
                        x^2&=${x.texFractionSimplifiee}
            \\end{aligned}$`,e>0?t-$===i||t-$===4*i||t-$===9*i||t-$===16*i||t-$===25*i?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${d(e,0)}$. Comme $${d(e,0)}>0$, alors l'équation a deux solutions : $-\\sqrt{${d(e,0)}}$ et $\\sqrt{${d(e,0)}}$.
                <br>  Comme $-\\sqrt{${d(e,0)}}=-${a(e)[0]}$ et $\\sqrt{${e}}=${a(e)[0]}$ alors
                les solutions de l'équation peuvent s'écrire plus simplement : $-${a(e)[0]}$ et $${a(e)[0]}$.
                <br> Ainsi, $S=${s(`\\left\\{-${a(e)[0]}${o(1)};${o(1)}${a(e)[0]}\\right\\}`)}$.`,u=`\\{-${a(e)[0]};${a(e)[0]}\\}`):t-$===4&&i===9||t-$===9&&i===4||t-$===16&&i===9||t-$===9&&i===16?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${x.texFractionSimplifiee}$. Comme $${l(t-$,i)}>0$, alors l'équation a deux solutions : $-\\sqrt{${l(t-$,i)}}$ et $\\sqrt{${l(t-$,i)}}$.
                  <br>  Comme $-\\sqrt{${x.texFractionSimplifiee}}=-\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}$ et $\\sqrt{${x.texFractionSimplifiee}}=\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}$ alors
                  les solutions de l'équation peuvent s'écrire plus simplement : $-\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}$ et $\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}$.<br>
                  Ainsi, $S=${s(`\\left\\{-\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}${o(1)};${o(1)}\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}\\right\\}`)}$`,u=`\\{-\\dfrac{${a(t-$)[0]}}{${a(i)[0]}};\\dfrac{${a(t-$)[0]}}{${a(i)[0]}}\\}`):(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${x.texFractionSimplifiee}$. Comme $${x.texFractionSimplifiee}>0$, alors l'équation a deux solutions :
                  $-\\sqrt{${x.texFractionSimplifiee}}$ et $\\sqrt{${x.texFractionSimplifiee}}$. <br>
                  Ainsi, $S=${s(`\\left\\{-\\sqrt{${x.texFractionSimplifiee}}${o(1)};${o(1)}\\sqrt{${x.texFractionSimplifiee}}\\right\\}`)}$`,u=`\\{-\\sqrt{${x.texFractionSimplifiee}};\\sqrt{${x.texFractionSimplifiee}}\\}`):t-$===0?(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=0$. Alorsl'équation a une solution : $0$.<br>
                Ainsi, $S=${s("\\{0\\}")}$. `,u="\\{0\\}"):(r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${x.texFractionSimplifiee}$. Comme $${x.texFractionSimplifiee}<0$, alors l'équation n'a pas de solution. <br>
                Ainsi, $S=${s("\\emptyset")}$. `,u="\\emptyset");break}break;case 2:switch(f[p]){case 0:i=0,$=0,e=b(-25,25,0),c=`Résoudre dans $[0${o(1)};${o(1)}+\\infty[$ :<br>
                            ${o(50)} $\\sqrt{x}=${e}$`,r="",this.correctionDetaillee&&(r+=`Pour tout réel $x$ positif ou nul, l'équation $\\sqrt{x}=k$ admet :<br>
                $\\bullet~$ une solution  si $k\\geqslant 0$ : $k^2$ ;<br>
                $\\bullet~$  aucune solution si $k<0$.<br>
               `),e<0?(r+=`L'équation est de la forme $\\sqrt{x}=k$. Comme $k=${e}$ et $${e}<0$ alors l'équation n'admet pas de solution.<br>
              Ainsi,   $S=${s("\\emptyset")}$.
              `,u="\\emptyset"):(r+=`$k=${e}$ et $${e}>0$ donc l'équation admet une solution : $${e}^2=${e**2}$.<br>
               Ainsi $S=${s(`\\{${e**2}\\}`)}$.
              `,u=`\\{${e**2}\\}`);break;case 1:i=0,$=b(-10,10,0),t=b(-10,10),e=t-$,c=`Résoudre dans $[0${o(1)};${o(1)}+\\infty[$ :<br>
                ${o(50)} $\\sqrt{x}${n($)}=${t}$`,$>0?r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                \\sqrt{x}${n($)}&=${t}\\\\
                \\sqrt{x}${n($)}-${s($)}&=${t}-${s($)}\\\\
                \\sqrt{x}&=${t-$}
                               \\end{aligned}$<br>`:r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               \\sqrt{x}${n($)}&=${t}\\\\
                               \\sqrt{x}${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                               \\sqrt{x}&=${t-$}
                                              \\end{aligned}$<br>`,t-$<0?(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${e}$. Comme $${e}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=${s("\\emptyset")}$.<br>
`,u="\\emptyset"):(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${t-$}$. Comme $${t-$}\\geqslant 0$ alors l'équation admet une solution : $${e}^2=${e**2}$.<br>
   Ainsi $S=${s(`\\{${e**2}\\}`)}$.
  `,u=`\\{${e**2}\\}`);break;case 2:i=0,$=b(-10,10,0),t=b(-10,10),e=$-t,c=`Résoudre dans $[0${o(1)};${o(1)}+\\infty[$ :<br>
                ${o(50)} $-\\sqrt{x}${n($)}=${t}$`,$>0?r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                -\\sqrt{x}${n($)}&=${t}\\\\
                -\\sqrt{x}${n($)}-${s($)}&=${t}-${s($)}\\\\
                -\\sqrt{x}&=${t-$}\\\\
                \\sqrt{x}&=${$-t}
                               \\end{aligned}$<br>`:r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               -\\sqrt{x}${n($)}&=${t}\\\\
                               -\\sqrt{x}${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                               -\\sqrt{x}&=${t-$}\\\\
                               \\sqrt{x}&=${$-t}
                                              \\end{aligned}$<br>`,e<0?(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${e}$. Comme $${e}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,   $S=${s("\\emptyset")}$.<br>
`,u="\\emptyset"):(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${$-t}$. Comme $${$-t}\\geqslant0$ alors l'équation admet une solution : $${e}^2=${e**2}$.<br>
   Ainsi $S=${s(`\\{${e**2}\\}`)}$.
  `,u=`\\{${e**2}\\}`);break;case 3:default:i=b(-10,10,[0,-1,1]),$=b(-10,10,0),t=b(-10,10),e=(t-$)/i,c=`Résoudre dans $[0${o(1)};${o(1)}+\\infty[$ :<br>
                ${o(50)} $${i}\\sqrt{x}${n($)}=${t}$`,$>0?r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                $\\begin{aligned}
                ${i}\\sqrt{x}${n($)}&=${t}\\\\
                ${i}\\sqrt{x}${n($)}-${s($)}&=${t}-${s($)}\\\\
                ${i}\\sqrt{x}&=${t-$}\\\\
                \\sqrt{x}&=${l(t-$,i)}
                               \\end{aligned}$<br>`:r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                               $\\begin{aligned}
                               ${i}\\sqrt{x}${n($)}&=${t}\\\\
                               ${i}\\sqrt{x}${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                               ${i}\\sqrt{x}&=${t-$}\\\\
                               \\sqrt{x}&=${l(t-$,i)}
                                              \\end{aligned}$<br>`,e<0?(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${l(t-$,i)}$. Comme $${l(t-$,i)}<0$ alors l'équation n'admet pas de solution. <br>
Ainsi,    $S=${s("\\emptyset")}$.<br>
`,u="\\emptyset"):(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${l(t-$,i)}$. Comme $${l(t-$,i)}\\geqslant0$ alors l'équation admet une solution : $\\left(${l(t-$,i)}\\right)^2=${l((t-$)**2,i**2)}$.<br>
   Ainsi $S=${s(`\\left\\{${l((t-$)**2,i**2)}\\right\\}`)}$.
  `,u=`\\{${l((t-$)**2,i**2)}\\}`);break}break;case 3:switch(f[p]){case 0:$=0,i=0,e=q([-3,-7,-6,3,6,7,9,-9,0,-11,11,-12,12,-8,8,-13,13]),c=`Résoudre dans $\\mathbb{R}^*$ :<br>
                ${o(50)} $\\dfrac{1}{x}=${e}$`,r="",this.correctionDetaillee&&(r+=`L'équation $\\dfrac{1}{x}=k$ admet :<br>
                $\\bullet~$ si $k\\neq 0$, l'équation a une unique solution  : $\\dfrac{1}{k}$.<br>
                $\\bullet~$ si $k= 0$, l'équation n'admet pas de solution.<br>`),r+="",e===0?(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${e}$. Comme $k=${e}$, alors l'équation n'admet pas de solution.<br>
              Ainsi,   $S=${s("\\emptyset")}$.
              `,u="\\emptyset"):(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${e}$. Comme $${e}\\neq 0$ alors l'équation admet une solution :
                $${l(1,e)}$.<br>
               Ainsi $S=${s(`\\left\\{${l(1,e)}\\right\\}`)}$.
              `,u=`\\{${l(1,e)}\\}`);break;case 1:i=0,e=q([-3,-7,-6,3,6,7,9,-9,0,-11,11,-12,12,-8,8,-13,13]),$=b(-10,10,0),t=e+$,c=`Résoudre dans $\\mathbb{R}^*$ :<br>
                   ${o(50)} $\\dfrac{1}{x}${n($)}=${t}$`,r="",$>0?r+=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                    $\\begin{aligned}
                    \\dfrac{1}{x}${n($)}&=${t}\\\\
                    \\dfrac{1}{x}${n($)}-${s($)}&=${t}-${s($)}\\\\
                    \\dfrac{1}{x}&=${t-$}
                                                \\end{aligned}$<br>`:r+=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                                                $\\begin{aligned}
                                                \\dfrac{1}{x}${n($)}&=${t}\\\\
                                                \\dfrac{1}{x}${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                                                \\dfrac{1}{x}&=${t-$}
                                                                            \\end{aligned}$<br>`,e===0?(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${e}$. Donc l'équation n'admet pas de solution.<br>
                 Ainsi,   $S=${s("\\emptyset")}$.
                 `,u="\\emptyset"):(r+=`$k=${e}$ et $${e}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${e}$. Donc l'équation admet une solution :
                   $${l(1,e)}$.<br>
                  Ainsi $S=${s(`\\left\\{${l(1,e)}\\right\\}`)}$.
                 `,u=`\\{${l(1,e)}\\}`);break;case 2:L=[[5,0],[3,0],[10,5],[6,3],[2,14],[1,7],[2,9],[3,9],[9,3],[2,7],[4,3],[10,6],[5,3],[4,7],[10,3],[6,9],[4,2]],S=q(L),i=S[0]*q([-1,1]),$=S[1]*q([-1,1]),e=$/i,c=`Résoudre dans $\\mathbb{R}^*$ :<br>
                   ${o(50)} $\\dfrac{${i}}{x}=${$}$`,r="",r+=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                    $\\begin{aligned}
                    \\dfrac{${i}}{x}&=${$}\\\\
                    \\dfrac{1}{x}&=${l($,i)}${o(20)}\\text{En divisant par } ${i} \\text{ dans chaque membre}\\\\
                                                \\end{aligned}$<br>`,e===0?(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${e}$. Donc l'équation n'admet pas de solution.<br>
                 Ainsi,   $S=${s("\\emptyset")}$.
                 `,u="\\emptyset"):e%1===0?(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${l($,i)}$. Donc l'équation admet une solution :
                   $\\dfrac{1}{${l($,i)}}$.<br>
                  Ainsi $S=${s(`\\left\\{${l(i,$)}\\right\\}`)}$.
                 `,u=`\\{${l(i,$)}\\}`):(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${l($,i)}$. Donc l'équation admet une solution :
                 $\\dfrac{1}{${l($,i)}}=${l(i,$)}$.<br>
                Ainsi $S=${s(`\\left\\{${l(i,$)}\\right\\}`)}$.
               `,u=`\\{${l(i,$)}\\}`);break;case 3:default:i=b(-10,10,0),$=b(-10,10,0),e=q([-3,-7,-6,3,6,7,9,-9,0,-11,11,-12,12,-8,8,-13,13]),t=i*e+$,c=`Résoudre dans $\\mathbb{R}^*$ :<br>
                   ${o(50)} $\\dfrac{${i}}{x}${n($)}=${t}$`,r="",$>0?r+=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                    $\\begin{aligned}
                    \\dfrac{${i}}{x}${n($)}&=${t}\\\\
                    \\dfrac{${i}}{x}${n($)}-${s($)}&=${t}-${s($)}\\\\
                    \\dfrac{${i}}{x}&=${t-$}\\\\
                    \\dfrac{1}{x}&=${l(t-$,i)}${o(20)}\\text{En divisant par } ${i} \\text{ dans chaque membre}
                                                \\end{aligned}$<br>`:r+=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                                                $\\begin{aligned}
                                                \\dfrac{${i}}{x}${n($)}&=${t}\\\\
                                                \\dfrac{${i}}{x}${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                                                \\dfrac{${i}}{x}&=${t-$}\\\\
                    \\dfrac{1}{x}&=${l(t-$,i)}${o(20)}\\text{En divisant par } ${i} \\text{ dans chaque membre}\\\\
                                                                            \\end{aligned}$<br>`,e===0?(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${l(t-$,i)}$. Donc l'équation n'admet pas de solution.<br>
                 Ainsi,   $S=${s("\\emptyset")}$.
                 `,u="\\emptyset"):e%1===0?(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${l(t-$,i)}$. Donc l'équation  admet une solution :
                   $\\dfrac{1}{${l(t-$,i)}}$.<br>
                  Ainsi $S=${s(`\\left\\{${l(i,t-$)}\\right\\}`)}$.
                 `,u=`\\{${l(i,t-$)}\\}`):(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${l(t-$,i)}$. Donc l'équation  admet une solution :
                 $\\dfrac{1}{${l(t-$,i)}}=${l(i,t-$)}$.<br>
                Ainsi $S=${s(`\\left\\{${l(i,t-$)}\\right\\}`)}$.
               `,u=`\\{${l(i,t-$)}\\}`);break}break;case 4:default:switch(f[p]){case 0:i=0,$=0,m=q([-10,-5,-4,-3,-2,-1,0,1,2,3,4,5,10]),e=m**3,c=`Résoudre dans $\\mathbb{R}$ :<br>
                ${o(50)} $x^3=${e}$`,r="",this.correctionDetaillee&&(r+=`Pour tout réel $k$, l'équation $x^3=k$ admet pour unique solution le nombre dont le cube est égal à $k$. <br>
                On peut noter ce nombre : $\\sqrt[3]{k}$. <br>`),r+=`L'équation est de la forme $x^3=k$ avec $k=${e}$. <br>
              Le nombre dont le cube est $${e}$ est $${m}$ car $${g(m)}^3=${e}$.<br>
              Ainsi,   $S=\\{${m}\\}$.
              `,u=`\\{${m}\\}`;break;case 1:i=0,$=b(-10,10,0),m=q([-10,-5,-4,-3,-2,-1,0,1,2,3,4,5,10]),e=m**3,t=e+$,c=`Résoudre dans $\\mathbb{R}$ :<br>
                   ${o(50)} $x^3${n($)}=${t}$`,r="",$>0?r+=`On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                    $\\begin{aligned}
                    x^3${n($)}&=${t}\\\\
                    x^3${n($)}-${s($)}&=${t}-${s($)}\\\\
                    x^3&=${t-$}
                                                \\end{aligned}$<br>`:r+=`On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                                                $\\begin{aligned}
                                                x^3${n($)}&=${t}\\\\
                                                x^3${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                                                x^3&=${t-$}
                                                                            \\end{aligned}$<br>`,r+=`L'équation est de la forme $x^3=k$ avec $k=${e}$. <br>
              Le nombre dont le cube est $${e}$ est $${m}$ car $${g(m)}^3=${e}$.<br>
              Ainsi,   $S=\\{${m}\\}$.
              `,u=`\\{${m}\\}`;break;case 2:i=b(-10,10,[0,-1,1]),$=0,m=q([-10,-5,-4,-3,-2,-1,0,1,2,3,4,5,10]),e=m**3,t=e*i,c=`Résoudre dans $\\mathbb{R}$ :<br>
                     ${o(50)} $${i}x^3=${t}$`,r="",r+=`On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                      $\\begin{aligned}
                      ${i}x^3&=${t}\\\\
                      x^3&=${l(t,i)}\\\\
                                                  \\end{aligned}$<br>`,r+=`L'équation est de la forme $x^3=k$ avec $k=${e}$. <br>
              Le nombre dont le cube est $${e}$ est $${m}$ car $${g(m)}^3=${e}$.<br>
              Ainsi,   $S=\\{${m}\\}$.
              `,u=`\\{${m}\\}`;break;case 3:default:i=b(-10,10,[0,-1,1]),$=b(-10,10,[0,-1,1]),m=q([-10,-5,-4,-3,-2,-1,0,1,2,3,4,5,10]),e=m**3,t=e*i+$,c=`Résoudre dans $\\mathbb{R}$ :<br>
                     ${o(50)} $${i}x^3${n($)}=${t}$`,r="",$>0?r+=`On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                      $\\begin{aligned}
                      ${i}x^3${n($)}&=${t}\\\\
                      ${i}x^3${n($)}-${s($)}&=${t}-${s($)}\\\\
                      ${i}x^3&=${d(t-$,0)}\\\\
                      x^3&=${l(t-$,i)}\\\\
                                                  \\end{aligned}$<br>`:r+=`On isole $x^3$ dans le membre de gauche pour obtenir une équation du type $x^3=k$.<br>
                      $\\begin{aligned}
                      ${i}x^3${n($)}&=${t}\\\\
                      ${i}x^3${n($)}+${s(-$)}&=${t}+${s(-$)}\\\\
                      ${i}x^3&=${d(t-$,0)}\\\\
                      x^3&=${l(t-$,i)}\\\\
                                                  \\end{aligned}$<br>`,r+=`L'équation est de la forme $x^3=k$ avec $k=${e}$. <br>
              Le nombre dont le cube est $${e}$ est $${m}$ car $${g(m)}^3=${e}$.<br>
              Ainsi,   $S=\\{${m}\\}$.
              `,u=`\\{${m}\\}`;break}break}O(this,p,{reponse:{value:u,options:{ensembleDeNombres:!0}}}),h=c+"<br>"+M(this,p," lycee   ",{texteAvant:" $S=$"}),y=r,this.interactif&&(h+="<br>$\\textit{Respecter les notations}$."),this.questionJamaisPosee(p,v[p],i,$,e)&&(this.listeQuestions[p]=h,this.listeCorrections[p]=y,p++),A++}Q(this)}}export{W$ as dateDeModifImportante,U$ as dateDePublication,$e as default,X$ as interactifReady,Y$ as interactifType,_$ as refs,K$ as titre,Z$ as uuid};
//# sourceMappingURL=2F12-1-CSgtoGup.js.map

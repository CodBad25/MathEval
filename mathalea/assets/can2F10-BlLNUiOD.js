import{E as b,p as S,r as x,u as m,y as u,v as d,k as a,T as c,s as n,ad as o,G as l,o as h}from"./index-DjA7ROjC.js";import{a as p}from"./deprecatedFractions-DsorrrvY.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const Ft="Résoudre une équation avec une fonction de référence*",Pt=!0,Tt="qcm",Nt="27/12/2021",wt="1380f",Gt={"fr-fr":["can2F10"],"fr-ch":["1mCL3-1"]};class Jt extends b{constructor(){super(),this.nbQuestions=1,this.spacing=2}nouvelleVersion(){let s,r,t,e,$,f;for(let i=0,q=0;i<this.nbQuestions&&q<50;){switch(S([1,2,3,4,5,6])){case 1:e=x(-5,5,0),$=x(-5,5,0),t=c($-e),s=`L'ensemble des solutions $S$ de l'équation $x^2${a(e)}=${$}$ est :
                 `,t>0&&(t===1||t===4||t===9||t===16||t===25?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{-${o(t)[0]}${n(1)};${n(1)}${o(t)[0]}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{${o(t)[0]}\\}$`,statut:!1}]}:o(t)[1]===t?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{-\\sqrt{${$-e}}${n(1)};${n(1)}\\sqrt{${$-e}}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{\\sqrt{${$-e}}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{-${Math.sqrt(t)};${Math.sqrt(t)}\\}$`,statut:!0},{texte:`$S=\\{${Math.sqrt(t)}\\}$`,statut:!1},{texte:`$S=\\{${t}\\}$`,statut:!1}]}),t===0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\{0\\}$",statut:!0},{texte:"$S=\\{1}\\}$",statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}),t<0&&(t===-1||t===-4||t===-9||t===-16||t===-25?this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:`$S=\\{-${Math.sqrt(-t)};${Math.sqrt(-t)}\\}$`,statut:!1},{texte:`$S=\\{-${Math.sqrt(-t)}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:`$S=\\{-\\sqrt{${-t}};\\sqrt{${-t}}\\}$`,statut:!1},{texte:`$S=\\{\\sqrt{${-t}}\\}$`,statut:!1}]}),f=m(this,i),this.interactif?s+=f.texte:s=`Résoudre dans $\\mathbb{R}$ :<br>
  
        $x^2${a(e)}=${$}$`,e>0?r=`On isole $x^2$ :<br>
            
            $\\begin{aligned}
           x^2${a(e)}&=${$}\\\\
           x^2${a(e)}-${u(e)}&=${$}-${u(e)}\\\\
           x^2&=${$-e}
           \\end{aligned}$`:r=`On isole $x^2$ :<br>
            
            $\\begin{aligned}
           x^2${a(e)}&=${$}\\\\
           x^2${a(e)}+${u(-e)}&=${$}+${u(-e)}\\\\
           x^2&=${$-e}
           \\end{aligned}$`,t>0&&(t===1||t===4||t===9||t===16||t===25?r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${l(t)}>0$, donc l'équation a deux solutions : $-\\sqrt{${l(t)}}$ et $\\sqrt{${l(t)}}$.
              <br> Comme $-\\sqrt{${l(t)}}=-${o(t)[0]}$ et $\\sqrt{${t}}=${o(t)[0]}$ alors
              les solutions de l'équation peuvent s'écrire plus simplement : $-${o(t)[0]}$ et $${o(t)[0]}$.<br>
              Ainsi,  $S=\\{-${o(t)[0]}${n(1)};${n(1)}${o(t)[0]}\\}$.`:o(t)[1]!==t?r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${l(t)}>0$, donc l'équation a deux solutions : $-\\sqrt{${l(t)}}$ et $\\sqrt{${l(t)}}$. <br>
                  Comme $-\\sqrt{${t}}=-${o(t)[0]}\\sqrt{${o(t)[1]}}$ et $\\sqrt{${t}}=${o(t)[0]}\\sqrt{${o(t)[1]}}$ alors
                  les solutions de l'équation peuvent s'écrire plus simplement : $-${o(t)[0]}\\sqrt{${o(t)[1]}}$ et $${o(t)[0]}\\sqrt{${o(t)[1]}}$.<br>
                  Ainsi,  $S=\\{-${o(t)[0]}\\sqrt{${o(t)[1]}}${n(1)};${n(1)}${o(t)[0]}\\sqrt{${o(t)[1]}}\\}$.`:r+=`<br>L'équation est de la forme $x^2=k$ avec $k=${$-e}>0$,
                  donc l'équation a deux solutions : $-\\sqrt{${$-e}}$ et $\\sqrt{${$-e}}$.<br>
                  Ainsi,  $S=\\{-\\sqrt{${$-e}}${n(1)};${n(1)}\\sqrt{${$-e}}\\}$.`),t===0&&(r+=`
            <br>L'équation est de la forme $x^2=k$ avec $k=${l(t)}$, alors l'équation a une solution : $0$.<br>
            Ainsi, $S=\\{0\\}$. `),t<0&&(r+=`
            <br>L'équation est de la forme $x^2=k$ avec $k=${l($-e)}$, alors l'équation n'a pas de solution.
              <br>Ainsi, $S=\\emptyset$. `),this.canEnonce=`Résoudre dans $\\mathbb{R}$ l'équation $x^2${a(e)}=${$}$.`,this.canReponseACompleter="";break;case 2:e=x(-5,5,0),$=x(-5,5,0),t=c(e-$),s=`L'ensemble des solutions $S$ de l'équation $-x^2${a(e)}=${$}$ est :
           `,t>0&&(t===1||t===4||t===9||t===16||t===25?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{-${o(t)[0]}${n(1)};${n(1)}${o(t)[0]}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{${o(t)[0]}\\}$`,statut:!1}]}:o(t)[1]===t?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{-\\sqrt{${t}}${n(1)};${n(1)}\\sqrt{${t}}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{\\sqrt{${t}}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{-${Math.sqrt(t)};${Math.sqrt(t)}\\}$`,statut:!0},{texte:`$S=\\{${Math.sqrt(t)}\\}$`,statut:!1},{texte:`$S=\\{${t}\\}$`,statut:!1}]}),t===0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\{0\\}$",statut:!0},{texte:"$S=\\{1}\\}$",statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}),t<0&&(t===-1||t===-4||t===-9||t===-16||t===-25?this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:`$S=\\{-${Math.sqrt(-t)};${Math.sqrt(-t)}\\}$`,statut:!1},{texte:`$S=\\{-${Math.sqrt(-t)}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:`$S=\\{-\\sqrt{${-t}};\\sqrt{${-t}}\\}$`,statut:!1},{texte:`$S=\\{\\sqrt{${-t}}\\}$`,statut:!1}]}),f=m(this,i),this.interactif?s+=f.texte:s=`Résoudre dans $\\mathbb{R}$ :<br>
  
   $-x^2${a(e)}=${$}$`,e>0?r=`On isole $x^2$ :<br>
            
            $\\begin{aligned}
     -x^2${a(e)}&=${$}\\\\
     -x^2${a(e)}-${u(e)}&=${$}-${u(e)}\\\\
     x^2&=${e-$}
     \\end{aligned}$`:r=`On isole $x^2$ :<br>
  
            $\\begin{aligned}
     -x^2${a(e)}&=${$}\\\\
    - x^2${a(e)}+${u(-e)}&=${$}+${u(-e)}\\\\
     x^2&=${e-$}
     \\end{aligned}$`,t>0&&(t===1||t===4||t===9||t===16||t===25?r+=`<br>
  
              L'équation est de la forme $x^2=k$ avec $k=${l(t)}>0$, donc l'équation a deux solutions : $-\\sqrt{${l(t)}}$ et $\\sqrt{${l(t)}}$.
        <br> Comme $-\\sqrt{${l(t)}}=-${o(t)[0]}$ et $\\sqrt{${t}}=${o(t)[0]}$ alors
        les solutions de l'équation peuvent s'écrire plus simplement : $-${o(t)[0]}$ et $${o(t)[0]}$.<br>
        Ainsi,  $S=\\{-${o(t)[0]}${n(1)};${n(1)}${o(t)[0]}\\}$.`:o(t)[1]!==t?r+=`<br>
                L'équation est de la forme $x^2=k$ avec $k=${l(t)}>0$, donc l'équation a deux solutions : $-\\sqrt{${l(t)}}$ et $\\sqrt{${l(t)}}$. <br>
            Comme $-\\sqrt{${t}}=-${o(t)[0]}\\sqrt{${o(t)[1]}}$ et $\\sqrt{${t}}=${o(t)[0]}\\sqrt{${o(t)[1]}}$ alors
            les solutions de l'équation peuvent s'écrire plus simplement : $-${o(t)[0]}\\sqrt{${o(t)[1]}}$ et $${o(t)[0]}\\sqrt{${o(t)[1]}}$.<br>
            Ainsi,  $S=\\{-${o(t)[0]}\\sqrt{${o(t)[1]}}${n(1)};${n(1)}${o(t)[0]}\\sqrt{${o(t)[1]}}\\}$.`:r+=`<br>
                L'équation est de la forme $x^2=k$ avec $k=${t}>0$,
            donc l'équation a deux solutions : $-\\sqrt{${t}}$ et $\\sqrt{${t}}$.<br>
            Ainsi,  $S=\\{-\\sqrt{${t}}${n(1)};${n(1)}\\sqrt{${t}}\\}$.`),t===0&&(r+=`<br>
            L'équation est de la forme $x^2=k$ avec $k=${l(t)}$, alors l'équation a une solution : $0$.<br>
      Ainsi, $S=\\{0\\}$. `),t<0&&(r+=`<br>
            L'équation est de la forme $x^2=k$ avec $k=${l(t)}$, alors l'équation n'a pas de solution.
        <br>Ainsi, $S=\\emptyset$. `),this.canEnonce=`Résoudre dans $\\mathbb{R}$ l'équation $-x^2${a(e)}=${$}$.`,this.canReponseACompleter="";break;case 3:e=x(-5,5,0),$=x(-5,5),t=c($-e),s=`L'ensemble des solutions $S$ de l'équation $\\sqrt{x}${a(e)}=${$}$ est :
                       `,t>0&&(t!==1?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{${t**2}\\}$`,statut:!0},{texte:`$S=\\{${2*t}\\}$`,statut:!1},{texte:`$S=\\{${t}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{${t}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{${2*t}\\}$`,statut:!1}]}),t<0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:`$S=\\{\\sqrt{${-t}}\\}$`,statut:!1},{texte:`$S=\\{${t**2}\\}$`,statut:!1}]}),t===0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\{0\\}$",statut:!0},{texte:`$S=\\{${t+1}\\}$`,statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}),f=m(this,i),this.interactif?s+=f.texte:s=`Résoudre dans $[0${n(1)};${n(1)}+\\infty[$ :<br>
  
               $\\sqrt{x}${a(e)}=${$}$`,e>0?r=`
            
            On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
              $\\begin{aligned}
              \\sqrt{x}${a(e)}&=${$}\\\\
              \\sqrt{x}${a(e)}-${u(e)}&=${$}-${u(e)}\\\\
              \\sqrt{x}&=${$-e}
                             \\end{aligned}$<br>`:r=`
            
            On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                             $\\begin{aligned}
                             \\sqrt{x}${a(e)}&=${$}\\\\
                             \\sqrt{x}${a(e)}+${u(-e)}&=${$}+${u(-e)}\\\\
                             \\sqrt{x}&=${$-e}
                                            \\end{aligned}$<br>`,$-e<0&&(r+=`
            L'équation est de la forme $\\sqrt{x}=k$ avec $k=${t}$. Comme $${t}<0$ alors l'équation n'admet pas de solution. <br>
  Ainsi,   $S=\\emptyset$.<br>
  `),($-e>0||$-e===0)&&(r+=`
            L'équation est de la forme $\\sqrt{x}=k$ avec $k=${$-e}$. Comme $${$-e}\\geqslant 0$ alors l'équation admet une solution : $${t}^2=${t**2}$.<br>
  Ainsi $S=\\{${t**2}\\}$.
  `),this.canEnonce=`Résoudre dans $[0${n(1)};${n(1)}+\\infty[$ l'équation $\\sqrt{x}${a(e)}=${$}$.`,this.canReponseACompleter="";break;case 4:e=x(-5,5,0),$=x(-5,5),t=c(e-$),s=`L'ensemble des solutions $S$ de l'équation $${e}-\\sqrt{x}=${$}$ est :
                           `,t>0&&(t!==1?t===2?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{${t**2}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{${t}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{${t**2}\\}$`,statut:!0},{texte:`$S=\\{${2*t}\\}$`,statut:!1},{texte:`$S=\\{${t}\\}$`,statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\{${t}\\}$`,statut:!0},{texte:"$S=\\emptyset$",statut:!1},{texte:`$S=\\{${2*t}\\}$`,statut:!1}]}),t<0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:`$S=\\{\\sqrt{${-t}}\\}$`,statut:!1},{texte:`$S=\\{${t**2}\\}$`,statut:!1}]}),t===0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\{0\\}$",statut:!0},{texte:`$S=\\{${t+1}\\}$`,statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}),f=m(this,i),this.interactif?s+=f.texte:s=`Résoudre dans $[0${n(1)};${n(1)}+\\infty[$ :<br>
  
                  $-\\sqrt{x}${a(e)}=${$}$`,e>0?r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                  $\\begin{aligned}
                  ${e}-\\sqrt{x}&=${$}\\\\
                  ${e}-\\sqrt{x}-${u(e)}&=${$}-${u(e)}\\\\
                  -\\sqrt{x}&=${$-e}\\\\
                  \\sqrt{x}&=${e-$}
                                 \\end{aligned}$<br>`:r=`On isole $\\sqrt{x}$ dans le membre de gauche pour obtenir une équation du type $\\sqrt{x}=k$.<br>
                                 $\\begin{aligned}
                                 ${e}-\\sqrt{x}&=${$}\\\\
                                 ${e}-\\sqrt{x}+${u(-e)}&=${$}+${u(-e)}\\\\
                                 -\\sqrt{x}&=${$-e}\\\\
                                 \\sqrt{x}&=${e-$}
                                                \\end{aligned}$<br>`,t<0&&(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${t}$. Comme $${t}<0$ alors l'équation n'admet pas de solution. <br>
  Ainsi,   $S=\\emptyset$.<br>
  `),(t>0||t===0)&&(r+=`L'équation est de la forme $\\sqrt{x}=k$ avec $k=${e-$}$. Comme $${e-$}\\geqslant0$ alors l'équation admet une solution : $${t}^2=${t**2}$.<br>
     Ainsi $S=\\{${t**2}\\}$.
    `),this.canEnonce=`Résoudre dans $[0${n(1)};${n(1)}+\\infty[$ l'équation $-\\sqrt{x}${a(e)}=${$}$.`,this.canReponseACompleter="";break;case 5:e=x(-10,10,0),$=x(-10,10),t=$-e,s=`L'ensemble des solutions $S$ de l'équation $\\dfrac{1}{x}${a(e)}=${$}$ est :
                         `,t!==0&&(t===1?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\left\\{${p(1,t)}\\right\\}$`,statut:!0},{texte:`$S=\\left\\{${p(1,-t)}\\right\\}$`,statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}:t===-1?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\left\\{${p(1,t)}\\right\\}$`,statut:!0},{texte:`$S=\\left\\{${p(1,-t)}\\right\\}$`,statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\left\\{${p(1,t)}\\right\\}$`,statut:!0},{texte:`$S=\\left\\{${p(1,-t)}\\right\\}$`,statut:!1},{texte:`$S=\\left\\{${t}\\right\\}$`,statut:!1}]}),t===0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:"$S=\\left\\{0\\right\\}$",statut:!1},{texte:"$S=\\left\\{-1\\right\\}$",statut:!1}]}),f=m(this,i),this.interactif?s+=f.texte:s=`
                       Résoudre dans $\\mathbb{R}^*$ :<br>
  
                        $\\dfrac{1}{x}${a(e)}=${$}$`,r=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
              $\\begin{aligned}
              \\dfrac{1}{x}${a(e)}&=${$}\\\\
              \\dfrac{1}{x}${a(e)}+${u(d(-e))}&=${$}+${u(-e)}\\\\
              \\dfrac{1}{x}&=${$-e}
                                          \\end{aligned}$<br>`,t===0&&(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${t}$. Donc l'équation n'admet pas de solution.<br>
  Ainsi,   $S=\\emptyset$.
  `),t!==0&&(r+=`$k=${t}$ et $${t}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${t}$. Donc l'équation admet une solution :
  $${p(1,t)}$.<br>
  Ainsi $S=\\left\\{${p(1,t)}\\right\\}$.
  `),this.canEnonce=`Résoudre dans $\\mathbb{R}^*$ l'équation $\\dfrac{1}{x}${a(e)}=${$}$.`,this.canReponseACompleter="";break;case 6:default:e=x(-10,10,0),$=x(-10,10),t=e-$,s=`L'ensemble des solutions $S$ de l'équation $${e}-\\dfrac{1}{x}=${$}$ est :
                             `,t!==0&&(t===1?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\left\\{${p(1,t)}\\right\\}$`,statut:!0},{texte:`$S=\\left\\{${p(1,-t)}\\right\\}$`,statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}:t===-1?this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\left\\{${p(1,t)}\\right\\}$`,statut:!0},{texte:`$S=\\left\\{${p(1,-t)}\\right\\}$`,statut:!1},{texte:"$S=\\emptyset$",statut:!1}]}:this.autoCorrection[i]={enonce:s,propositions:[{texte:`$S=\\left\\{${p(1,t)}\\right\\}$`,statut:!0},{texte:`$S=\\left\\{${p(1,-t)}\\right\\}$`,statut:!1},{texte:`$S=\\left\\{${t}\\right\\}$`,statut:!1}]}),t===0&&(this.autoCorrection[i]={enonce:s,propositions:[{texte:"$S=\\emptyset$",statut:!0},{texte:"$S=\\left\\{0\\right\\}$",statut:!1},{texte:"$S=\\left\\{-1\\right\\}$",statut:!1}]}),f=m(this,i),this.interactif?s+=f.texte:s=`
                           Résoudre dans $\\mathbb{R}^*$ :<br>
  
                           $${e}-\\dfrac{1}{x}=${$}$`,r=`On isole $\\dfrac{1}{x}$ dans le membre de gauche pour obtenir une équation du type $\\dfrac{1}{x}=k$.<br>
                  $\\begin{aligned}
                  ${e}-\\dfrac{1}{x}&=${$}\\\\
                  ${e}-\\dfrac{1}{x}+${u(d(-e))}&=${$}+${u(d(-e))}\\\\
                  \\dfrac{1}{x}&=${e-$}
                                              \\end{aligned}$<br>`,t===0&&(r+=`L'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${t}$. Donc l'équation n'admet pas de solution.<br>
      Ainsi,   $S=\\emptyset$.
      `),t!==0&&(r+=`$k=${t}$ et $${t}\\neq 0$, donc l'équation est de la forme $\\dfrac{1}{x}=k$ avec $k=${t}$. Donc l'équation admet une solution :
      $${p(1,t)}$.<br>
      Ainsi $S=\\left\\{${p(1,t)}\\right\\}$.
      `),this.canEnonce=`Résoudre dans $\\mathbb{R}^*$ l'équation $${e}-\\dfrac{1}{x}=${$}$.`,this.canReponseACompleter="";break}this.questionJamaisPosee(i,t,e,$)&&(this.listeQuestions[i]=s,this.listeCorrections[i]=r,h(this),i++),q++}}}export{Nt as dateDePublication,Jt as default,Pt as interactifReady,Tt as interactifType,Gt as refs,Ft as titre,wt as uuid};
//# sourceMappingURL=can2F10-BlLNUiOD.js.map

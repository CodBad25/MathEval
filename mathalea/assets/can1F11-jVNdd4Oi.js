import{D as m,p as a,r,B as t,I as o,k as s,w as n,j as x}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const L$="Déterminer la fonction dérivée d’un polynôme de degré 3",D$=!0,y$="mathLive",g$="21/06/2022",w$="ffbf6",C$={"fr-fr":["can1F11"],"fr-ch":["3mA2-7"]};class k$ extends m{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let $,i,e,f;switch(a([1,2,3,4,5,6])){case 1:$=r(-10,10,[0]),i=r(-10,10,[0]),e=r(-10,10,[0]),f=r(-10,10,[0]),this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)= ${n($,i,e,f)}$.<br>
        La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>
          
          $f(x)= ${n($,i,e,f)}$.<br>

       Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$.<br>
    La fonction dérivée est donnée par la somme des dérivées des fonctions $u$, $v$ et $w$ définies par $u(x)=${t($)}x^3$, $v(x)=${t(i)}x^2$ et $w(x)=${x(e,f)}$.<br>
     Comme $u'(x)=${3*$}x^2$, $v'(x)=${2*i}x$ et $w'(x)=${e}$, on obtient  $f'(x)=${n(0,3*$,2*i,e)}$. `,this.reponse=[`${3*$}x^2+${2*i}x+${e}`];break;case 2:$=r(-10,10,[0]),i=r(-10,10,[0]),e=r(-10,10,[0]),f=r(-10,10,[0]),a([!0,!1])?this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
            $f(x)= ${t(i)}x^2${o($)}x^3${o(e)}x${s(f)}$.<br>
        La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)= ${t(i)}x^2${o($)}x^3${o(e)}x${s(f)}$.<br>
       
            Déterminer $f'(x)$.`:this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)=${t(e)}x${o(i)}x^2${s(f)}${o($)}x^3 $.<br>
      La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>
            
            $f(x)=${t(e)}x${o(i)}x^2${s(f)}${o($)}x^3 $.<br>
    
            Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$.<br>
    La fonction dérivée est donnée par la somme des dérivées des fonctions $u$, $v$ et $w$ définies par $u(x)=${t($)}x^3$, $v(x)=${t(i)}x^2$ et $w(x)=${x(e,f)}$.<br>
     Comme $u'(x)=${3*$}x^2$, $v'(x)=${2*i}x$ et $w'(x)=${e}$, on obtient  $f'(x)=${n(0,3*$,2*i,e)}$. `,this.reponse=[`${3*$}x^2+${2*i}x+${e}`];break;case 3:$=r(-10,10,[0]),i=r(-10,10,[0]),e=r(-10,10,[0]),a([!0,!1])?this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
            $f(x)= ${n($,i,0,e)}$.<br>
        La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)= ${n($,i,0,e)}$.<br>

        Déterminer $f'(x)$.`:this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
             $f(x)=${t($)}x^3${s(e)}${o(i)}x^2$.<br>
      La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)=${t($)}x^3${s(e)}${o(i)}x^2 $.<br>

      Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$ avec $c=0$.<br>
        La fonction dérivée est donnée par la somme des dérivées des fonctions $u$, $v$ et $w$ définies par $u(x)=${t($)}x^3$, $v(x)=${t(i)}x^2$ et $w(x)=${e}$.<br>
         Comme $u'(x)=${3*$}x^2$, $v'(x)=${2*i}x$ et $w'(x)=0$, on obtient  $f'(x)=${n(0,3*$,2*i,0)}$. `,this.reponse=[`${3*$}x^2+${2*i}x`];break;case 4:$=r(-10,10,[0]),i=r(-10,10,[0]),e=r(-10,10,[0]),a([!0,!1])?this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
            $f(x)= ${n($,0,i,e)}$.<br>
        La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)= ${n($,0,i,e)}$.<br>

       Déterminer $f'(x)$.`:this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
             $f(x)=${t(i)}x${s(e)}${o($)}x^3 $.<br>
      La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)=${t(i)}x${s(e)}${o($)}x^3 $.<br>

     Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$ avec $b=0$.<br>
        La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$  définies par $u(x)=${t($)}x^3$ et $v(x)=${x(i,e)}$.<br>
         Comme $u'(x)=${3*$}x^2$, $v'(x)=${i}$, on obtient  $f'(x)=${3*$}x^2${s(i)}$. `,this.reponse=[`${3*$}x^2+${i}`];break;case 5:$=r(-10,10,[0]),i=r(-10,10,[0]),a([!0,!1])?this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
            $f(x)= ${n($,0,0,i)}$.<br>
        La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
            $f(x)= ${n($,0,0,i)}$.<br>
       Déterminer la fonction dérivée de $f$.`:this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
             $f(x)=${i}${o($)}x^3 $.<br>
      La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :<br>

            $f(x)=${i}${o($)}x^3 $.<br>

      Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$ avec $b=0$ et $c=0$.<br>
        La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$  définies par $u(x)=${t($)}x^3$ et $v(x)=${i}$.<br>
         Comme $u'(x)=${3*$}x^2$, $v'(x)=0$, on obtient  $f'(x)=${3*$}x^2$. `,this.reponse=[`${3*$}x^2`];break;case 6:$=r(-10,10,[0]),i=r(-10,10,[0]),a([!0,!1])?(this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :
                      $f(x)= ${t(i)}x^2${o($)}x^3$.<br>
        La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)= ${t(i)}x^2${o($)}x^3$.<br>

       Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$ avec $c=0$ et $d=0$.<br>
        La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$  définies par $u(x)=${t($)}x^3$ et $v(x)=${i}x^2$.<br>
         Comme $u'(x)=${3*$}x^2$, $v'(x)=${2*i}x$, on obtient  $f'(x)=${3*$}x^2${2*i}x$. `,this.reponse=[`${3*$}x^2+${2*i}x`]):(this.interactif?this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :<br>
             $f(x)=${t(i)}x${o($)}x^3 $.<br>
      La fonction dérivée de $f$ est définie par : <br>$f'(x)=$`:this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)=${t(i)}x${o($)}x^3 $.<br>

     Déterminer $f'(x)$.`,this.correction=`$f$ est une fonction polynôme du troisième degré de la forme $f(x)=ax^3+bx^2+cx+d$ avec $b=0$ et $d=0$.<br>
        La fonction dérivée est donnée par la somme des dérivées des fonctions $u$ et $v$  définies par $u(x)=${t($)}x^3$ et $v(x)=${i}x$.<br>
         Comme $u'(x)=${3*$}x^2$, $v'(x)=${i}$, on obtient  $f'(x)=${3*$}x^2${s(i)}$. `,this.reponse=[`${3*$}x^2+${i}`]);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{g$ as dateDePublication,k$ as default,D$ as interactifReady,y$ as interactifType,C$ as refs,L$ as titre,w$ as uuid};
//# sourceMappingURL=can1F11-jVNdd4Oi.js.map

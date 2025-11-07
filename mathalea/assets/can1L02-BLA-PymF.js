import{D as p,p as m,r as c,q as u,j as r,k as a,y as n,w as d,v as o,av as l}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ee="Déterminer le nombre de solutions d’une équation du second degré",Pe=!0,Ce="mathLive",Le="1/11/2021",Ie="c74ea",Oe={"fr-fr":["can1L02"],"fr-ch":[]};class ke extends p{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let e,i,t,s,$;switch(m([1,2])){case 1:e=c(1,4)*m([-1,1]),i=c(-4,4,0),t=c(-4,4,0),s=i*i-4*e*t,this.question=`Donner le nombre de solutions de l'équation  $${d(0,e,i,t)}=0$.`,s<0&&(this.correction=`Le nombre de solutions est donné par le signe de $\\Delta$ :<br>
    $\\Delta =b^2-4ac=${o(i)}^2 - 4 \\times ${o(e)} \\times ${o(t)}=${s}$.<br>
    Comme $${s}$ est strictement négatif, l'équation n'a pas de solution.`,this.correction+=l(`<br> Mentalement : <br>
          Il n'est pas nécessaire de faire le calcul du discriminant puisque seul
          le signe de celui-ci permet de répondre à la question :<br>
          faites deux calculs séparés mentalement :
          $b^2=${o(i)}^2=${i**2}$ puis
          $4ac=4 \\times ${o(e)} \\times ${o(t)}=${4*e*t}$
          et évaluez le signe de leur différence.  `),this.reponse=0),s>0&&(this.correction=`Le nombre de solutions est donné par le signe de $\\Delta$ :<br>
    $\\Delta =b^2-4ac=${o(i)}^2 - 4 \\times ${o(e)} \\times ${o(t)}=${s}$.<br>
    Comme $${s}$ est strictement positif, l'équation a 2 solutions.`,this.correction+=l(`<br> Mentalement : <br>
          Il n'est pas nécessaire de faire le calcul du discriminant puisque seul
          le signe de celui-ci permet de répondre à la question :<br>
    par exemple, si le produit $4\\times a\\times c$ (c'est le cas lorsque $a$ et $c$ sont de signes contraires) est négatif, l'équation aura deux solutions puisque $\\Delta$ sera strictement positif.
<br>  Dans les autres cas, faites deux calculs séparés mentalement : $b^2=${o(i)}^2=${i**2}$ puis
$4ac=4 \\times ${o(e)} \\times ${o(t)}=${4*e*t}$
et évaluez le signe de leur différence. `),this.reponse=2),s===0&&(this.correction=`Le nombre de solutions est donné par le signe de $\\Delta$ :<br>
            $\\Delta =b^2-4ac=${o(i)}^2 - 4 \\times ${o(e)} \\times ${o(t)}=${s}$.<br>
            Comme $${s}$ est nul, l'équation a une unique solution.`,this.correction+=l(`<br> Mentalement : <br>
               Faites deux calculs séparés mentalement : $b^2=${o(i)}^2=${i**2}$ puis
     $4ac=4 \\times ${o(e)} \\times ${o(t)}=${4*e*t}$.  `),this.reponse=1);break;case 2:e=c(-10,10,0),i=c(-5,5,0),t=c(-5,5),$=u(-t,e),-t/e>0&&(this.question=`Donner le nombre de solutions de l'équation
       $${e===1?"":e}(${r(1,i)})^2${a(t)}=0$.`,this.correction=`On isole le carré : <br>
        $\\begin{aligned}
        ${e===1?"":e}(${r(1,i)})^2${a(t)}&=0\\\\
        ${e===1?"":e}(${r(1,i)})^2${a(t)}${n(a(-t))}&=0${n(a(-t))}\\\\`,this.correction+=e===1?"":`\\dfrac{${e}}{${n(e)}}(${r(1,i)})^2&=\\dfrac{${-t}}{${n(e)}}\\\\`,this.correction+=`
        (${r(1,i)})^2&=${$.texFractionSimplifiee}
                \\end{aligned}$<br>
        Puisque $${$.texFractionSimplifiee}$ est strictement positif, il y a deux nombres dont le carré est égal à $${$.texFractionSimplifiee}$, donc l'équation a deux solutions. `,this.reponse=2),-t/e===0&&(e===-1?(this.question=`Donner le nombre de solutions de l'équation
       $-(${r(1,i)})^2=0$.`,this.correction=`On isole le carré : <br>
             $\\begin{aligned}
             -(${r(1,i)})^2&=0\\\\
             ${e===1?"":e}(${r(1,i)})^2&=0\\\\`,this.correction+=e===1?"":`\\dfrac{${e}}{${n(e)}}(${r(1,i)})^2&=\\dfrac{${-t}}{${n(e)}}\\\\`,this.correction+=`
             (${r(1,i)})^2&=${$.texFractionSimplifiee}
                     \\end{aligned}$<br>
             Il y a un nombre dont le carré est nul, donc l'équation a une solution. `,this.reponse=1):(this.question=`Donner le nombre de solutions de l'équation
          $${e===1?"":e}(${r(1,i)})^2=0$.`,this.correction=`On isole le carré : <br>
                $\\begin{aligned}
                ${e===1?"":e}(${r(1,i)})^2&=0\\\\`,this.correction+=e===1?"":`\\dfrac{${e}}{${n(e)}}(${r(1,i)})^2&=\\dfrac{${-t}}{${n(e)}}\\\\`,this.correction+=`
                (${r(1,i)})^2&=${$.texFractionSimplifiee}
                        \\end{aligned}$<br>
                Il y a un nombre dont le carré est nul, donc l'équation a une solution. `,this.reponse=1)),-t/e<0&&(this.question=`Donner le nombre de solutions de l'équation
       $${e===1?"":e}(${r(1,i)})^2${a(t)}=0$.`,this.correction=`On isole le carré : <br>
                 $\\begin{aligned}
                 ${e===1?"":e}(${r(1,i)})^2${a(t)}&=0\\\\
                 ${e===1?"":e}(${r(1,i)})^2${a(t)}${n(a(-t))}&=0${n(a(-t))}\\\\`,this.correction+=e===1?"":`\\dfrac{${e}}{${n(e)}}(${r(1,i)})^2&=\\dfrac{${-t}}{${n(e)}}\\\\`,this.correction+=`(${r(1,i)})^2&=${$.texFractionSimplifiee}
                         \\end{aligned}$<br>
                         Puisque $${$.texFractionSimplifiee}$ est strictement négatif, il n'existe pas de nombres réels dont le carré est strictement négatif, donc l'équation n'a pas de solution. `,this.reponse=0);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{Le as dateDePublication,ke as default,Pe as interactifReady,Ce as interactifType,Oe as refs,Ee as titre,Ie as uuid};
//# sourceMappingURL=can1L02-BLA-PymF.js.map

import{E as u,p as x,r,q as p,j as $,s as t,u as g,v as d,k as s,w as m,o as h}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Le="Déterminer le sens de variation d’un pôlynome du second degré",Ie=!0,ke="qcm",Qe="1/11/2021",Pe="10/06/2022",Ee="cc460",we={"fr-fr":["can1F02"],"fr-ch":[]};class Ne extends u{constructor(){super(),this.nbQuestions=1}nouvelleVersion(){let a,f,e,i,o,n,l,b;for(let c=0;c<this.nbQuestions;c++){switch(x([1,2,3,4,5,6])){case 1:e=r(-5,5,0),i=r(-9,9),n=r(-9,9,0),o=p(-i,2*e),l=p(i,2*e),a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${m(0,e,i,n)}$.<br>
  
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`,i===0?this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${o.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e>0},{texte:`$\\bigg]-\\infty${t(1)} ;${t(1)}${o.texFractionSimplifiee} \\bigg]$ `,statut:e<0},{texte:`$\\bigg[${e}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${e} \\bigg]$ `,statut:e===0}]}:this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${o.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e>0},{texte:`$\\bigg]-\\infty${t(1)} ;${t(1)}${o.texFractionSimplifiee} \\bigg]$ `,statut:e<0},{texte:`$\\bigg[${l.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${l.texFractionSimplifiee} \\bigg]$ `,statut:e===0}]},b=g(this,c),this.interactif&&(a+=b.texte),e>0?f=`Comme le coefficient $${e}$ devant $x^2$ est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
            <br> $-\\dfrac{b}{2a}=-\\dfrac{${i}}{2\\times ${d(e)}}=${o.texFractionSimplifiee}$.
            <br>Ainsi, $f$ est croissante sur $\\bigg[${o.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$.    `:f=`Comme le coefficient $${e}$ devant $x^2$ est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
            <br>$-\\dfrac{b}{2a}=-\\dfrac{${i}}{2\\times ${d(e)}}=${o.texFractionSimplifiee}$.
            <br>Ainsi, $f$ est croissante sur $\\bigg]-\\infty${t(1)} ;${t(1)}${o.texFractionSimplifiee} \\bigg]$.    `;break;case 2:e=r(-10,10,0),i=r(-5,5,0),n=r(-9,9,0),e===1?a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${$(1,i)})^2${s(n)}$.
            <br>
            
            Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`:e===-1?a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=-(${$(1,i)})^2${s(n)}$.
              <br>   Le plus grand intervalle sur lequel la fonction $f$ est croissante est :`:a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}$.
              <br>
              
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`,this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${-i}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e>0},{texte:`$\\bigg]-\\infty${t(1)} ;${t(1)}${-i} \\bigg]$ `,statut:e<0},{texte:`$\\bigg[${i}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${i} \\bigg]$ `,statut:e===0}]},b=g(this,c),this.interactif&&(a+=b.texte),e>0&&(i>0?f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>  $f(x)=a(x-\\alpha)^2+\\beta$
          <br>    Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br>  Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}=
         ${$(0,e)}(x-(\\underbrace{-${i}}_{\\alpha}))^2${s(n)}$, d'où $\\alpha=-${i}$.
         <br> Le coefficient $${e}$ devant la parenthèse est strictement positif, la fonction est donc
         d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
         <br>  Ainsi, $f$ est croissante sur $\\bigg[-${i} ${t(1)} ;${t(1)} +\\infty\\bigg[$.    `:f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>$f(x)=a(x-\\alpha)^2+\\beta$
           <br> Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
           <br>
           Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}$, d'où $\\alpha=${-i}$.
           <br>  Le coefficient $${e}$ devant la parenthèse est strictement positif, la fonction est donc
          d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
          <br>  Ainsi, $f$ est croissante sur $\\bigg[${-i} ${t(1)} ;${t(1)} +\\infty\\bigg[$.    `),e<0&&(i>0?f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>$f(x)=a(x-\\alpha)^2+\\beta$<br>
          Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br> Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}=
         ${$(0,e)}(x-(\\underbrace{-${i}}_{\\alpha}))^2${s(n)}$, d'où $\\alpha=-${i}$.
         <br> Comme le coefficient $${e}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
         <br>    Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${t(1)} ;${t(1)} -${i}  \\bigg]$.    `:f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>  $f(x)=a(x-\\alpha)^2+\\beta$
              <br> Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
           <br> Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}$, d'où $\\alpha=${-i}$.
           <br> Comme le coefficient $${e}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
           Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${t(1)} ;${t(1)} ${-i}  \\bigg]$.    `);break;case 3:e=r(-5,5,0),i=r(-9,9),n=r(-9,9,0),l=p(i+n,2),o=p(-(i+n),2),e===1?a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${$(1,i)})(${$(1,n)})$.
            <br>
            
            Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`:e===-1?a=a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=-(${$(1,i)})(${$(1,n)})$.
              <br>
              
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`:a=a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${e}(${$(1,i)})(${$(1,n)})$.
              <br>
              
              Donner le plus grand intervalle sur lequel la fonction $f$ est croissante.`,this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${o.texFractionSimplifiee} ${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e>0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${o.texFractionSimplifiee} \\bigg]$ `,statut:e<0},{texte:`$\\bigg[${l.texFractionSimplifiee} ${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${l.texFractionSimplifiee} \\bigg]$ `,statut:e===0}]},b=g(this,c),this.interactif&&(a+=b.texte),e<0?f=`On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>       $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br>         L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-i}+${d(-n)}}{2}= ${o.texFractionSimplifiee}$.
            <br>           Comme le coefficient $${e}$ devant les parenthèses est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
                <br>           Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${t(1)} ;${t(1)} ${o.texFractionSimplifiee}  \\bigg]$.    `:f=`On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>      $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br>    L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-i}+${d(-n)}}{2}= ${o.texFractionSimplifiee}$.
            <br>            Comme le coefficient $${e}$ devant les parenthèses est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
              <br>     Ainsi, $f$ est croissante sur $\\bigg[${o.texFractionSimplifiee} ${t(1)} ;${t(1)} +\\infty\\bigg[$.    `;break;case 4:e=r(-5,5,0),i=r(-9,9),n=r(-9,9,0),o=p(-i,2*e),l=p(i,2*e),a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${m(0,e,i,n)}$.
          <br>
          
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`,i===0?this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${o.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e<0},{texte:`$\\bigg]-\\infty${t(1)} ;${t(1)}${o.texFractionSimplifiee} \\bigg]$ `,statut:e>0},{texte:`$\\bigg[${e}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${e} \\bigg]$ `,statut:e===0}]}:this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${o.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e<0},{texte:`$\\bigg]-\\infty${t(1)} ;${t(1)}${o.texFractionSimplifiee} \\bigg]$ `,statut:e>0},{texte:`$\\bigg[${l.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${l.texFractionSimplifiee} \\bigg]$ `,statut:e===0}]},b=g(this,c),this.interactif&&(a+=b.texte),e>0?f=`Comme le coefficient $${e}$ devant $x^2$ est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
            <br>         $-\\dfrac{b}{2a}=-\\dfrac{${i}}{2\\times ${d(e)}}=${o.texFractionSimplifiee}$.
           <br>          Ainsi, $f$ est décroissante sur $\\bigg]-\\infty${t(1)} ;${t(1)}${o.texFractionSimplifiee} \\bigg]$.    `:f=`Comme le coefficient $${e}$ devant $x^2$ est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
            <br>  $-\\dfrac{b}{2a}=-\\dfrac{${i}}{2\\times ${d(e)}}=${o.texFractionSimplifiee}$.
    <br>   Ainsi, $f$ est décroissante sur $\\bigg[${o.texFractionSimplifiee}${t(1)} ;${t(1)} +\\infty\\bigg[$.    `;break;case 5:e=r(-10,10,0),i=r(-5,5,0),n=r(-9,9,0),e===1?a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${$(1,i)})^2${s(n)}$.
            <br>
  
            Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`:e===-1?a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=-(${$(1,i)})^2${s(n)}$.
              <br>
  
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`:a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}$.
              <br>
  
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`,this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${-i}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e<0},{texte:`$\\bigg]-\\infty${t(1)} ;${t(1)}${-i} \\bigg]$ `,statut:e>0},{texte:`$\\bigg[${i}${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${i} \\bigg]$ `,statut:e===0}]},b=g(this,c),this.interactif&&(a+=b.texte),e>0&&(i>0?f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>        $f(x)=a(x-\\alpha)^2+\\beta$<br>
          Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br>       Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}=
         ${$(0,e)}(x-(\\underbrace{-${i}}_{\\alpha}))^2${s(n)}$, d'où $\\alpha=-${i}$.
         <br>       Le coefficient $${e}$ devant la parenthèse est strictement positif, la fonction est donc
         d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
         <br>    Ainsi, $f$ est décroissante sur $\\bigg]-\\infty${t(1)} ;${t(1)}${-i} \\bigg]$.    `:f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>         $f(x)=a(x-\\alpha)^2+\\beta$
              <br>         Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
              <br>         Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}$, d'où $\\alpha=${-i}$.
              <br>        Le coefficient $${e}$ devant la parenthèse est strictement positif, la fonction est donc
          d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
          <br>           Ainsi, $f$ est décroissante sur $\\bigg]-\\infty${t(1)} ;${t(1)}${-i} \\bigg]$.    `),e<0&&(i>0?f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>        $f(x)=a(x-\\alpha)^2+\\beta$
          <br>        Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
          <br>       Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}=
         ${$(0,e)}(x-(\\underbrace{-${i}}_{\\alpha}))^2${s(n)}$, d'où $\\alpha=-${i}$.
         <br>       Comme le coefficient $${e}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
         <br>         Ainsi, $f$ est décroissante sur $\\bigg[${-i}${t(1)} ;${t(1)} +\\infty\\bigg[$.    `:f=`On reconnaît la forme canonique d'une fonction polynôme du second degré :
              <br>         $f(x)=a(x-\\alpha)^2+\\beta$
           <br>         Comme $\\alpha=-\\dfrac{b}{2a}$, le changement de variation de la fonction $f$ se fait en $\\alpha$.
           <br>         Ici,  $f(x)=${$(0,e)}(${$(1,i)})^2${s(n)}$, d'où $\\alpha=${-i}$.
           <br>         Comme le coefficient $${e}$ devant la parenthèse est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
           <br>         Ainsi, $f$ est décroissante sur $\\bigg[${-i}${t(1)} ;${t(1)} +\\infty\\bigg[$.    `);break;case 6:e=r(-5,5,0),i=r(-9,9),n=r(-9,9,0),l=p(i+n,2),o=p(-(i+n),2),e===1?a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par  $f(x)=(${$(1,i)})(${$(1,n)})$.
            <br>
  
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`:e===-1?a=a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x)=-(${$(1,i)})(${$(1,n)})$.
              <br>                           Le plus grand intervalle sur lequel la fonction $f$ est décroissante est :`:a=a=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : $f(x)=${e}(${$(1,i)})(${$(1,n)})$.
              <br>
              
          Donner le plus grand intervalle sur lequel la fonction $f$ est décroissante.`,this.autoCorrection[c]={enonce:a,options:{vertical:!1},propositions:[{texte:`$\\bigg[${o.texFractionSimplifiee} ${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e<0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${o.texFractionSimplifiee} \\bigg]$ `,statut:e>0},{texte:`$\\bigg[${l.texFractionSimplifiee} ${t(1)} ;${t(1)} +\\infty\\bigg[$ `,statut:e===0},{texte:`$\\bigg]-\\infty ${t(1)} ;${t(1)} ${l.texFractionSimplifiee} \\bigg]$ `,statut:e===0}]},b=g(this,c),this.interactif&&(a+=b.texte),e<0?f=`On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>              $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br>              L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-i}+${d(-n)}}{2}= ${o.texFractionSimplifiee}$.
                <br>              Comme le coefficient $${e}$ devant les parenthèses est strictement négatif, la fonction est d'abord croissante puis décroissante (la parabole est "tournée vers le bas").
                <br>              Ainsi, $f$ est décroissante sur $\\bigg[${o.texFractionSimplifiee} ${t(1)} ;${t(1)} +\\infty\\bigg[$.    `:f=`On reconnaît une forme factorisée d'une fonction polynôme du second degré :
            <br>            $f(x)=a(x-x_1)(x-x_2)$ où $x_1$ et $x_2$ sont les racines du polynôme.
            <br> L'abscisse du sommet de la parabole est donné par la moyenne des racines soit par : $\\dfrac{x_1+x_2}{2}=\\dfrac{${-i}+${d(-n)}}{2}= ${o.texFractionSimplifiee}$.
              <br>            Comme le coefficient $${e}$ devant les parenthèses est strictement positif, la fonction est d'abord décroissante puis croissante (la parabole est "tournée vers le haut").
              <br> Ainsi, $f$ est croissante sur $\\bigg]-\\infty ${t(1)} ;${t(1)} ${o.texFractionSimplifiee} \\bigg]$.    `;break}this.listeQuestions.push(a),this.listeCorrections.push(f),h(this),this.canEnonce=a,this.canReponseACompleter=""}}}export{Pe as dateDeModifImportante,Qe as dateDePublication,Ne as default,Ie as interactifReady,ke as interactifType,we as refs,Le as titre,Ee as uuid};
//# sourceMappingURL=can1F02-DUQHPkXn.js.map

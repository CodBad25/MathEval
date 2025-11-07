import{E,ah as q,ag as i,p as g,r as u,y as m,b as U,n as S,s as v,o as O}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const K$=!0,R$="mathLive",F$="Exprimer une variable en fonction des autres",I$="25/09/2023",J$="27/09/2024",k$="ef686",z$={"fr-fr":["2N42-1"],"fr-ch":["11FA5-3"]};class B$ extends E{constructor(){super(),this.besoinFormulaireNumerique=["Niveau de difficulté",4,`1 : Niveau 1
 2 : Niveau 2
 3 : Niveau 3
 4 : Mélange des niveaux précédents`],this.nbQuestions=1,this.sup=1}nouvelleVersion(){let l=[];this.sup===1?l=[1]:this.sup===2?l=[2]:this.sup===3?l=[3]:l=[1,2,3];const h=q(l,this.nbQuestions);for(let s=0,t,n,r,x=0,b,e,d,$,o,a;s<this.nbQuestions&&x<50;){switch(b=h[s],n="",b){case 1:d=[i(["a","b","c"]),i(["x","y","z"]),i(["u","v","w"]),i(["A","B","C"]),i(["R","S","T"]),i(["I","J","K"]),i(["c","d","e"]),i(["K","L","M"]),i(["r","s","t"]),i(["U","V","W"])],$=g(d),o=u(1,5),o===1?(t=`Soient $${$[0]}$, $${$[1]}$ et $${$[2]}$ trois nombres vérifiant l'égalité : 
          $${$[0]}=${$[1]}-${$[2]}$.<br>
          Exprimer $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$.`,a=$[1],r=`${$[0]}+${$[2]}`,n=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
            $\\begin{aligned}
            ${$[0]}&=${$[1]}-${$[2]}\\\\
            ${$[0]}+${m($[2])}&=${$[1]}-${$[2]}+${m($[2])}\\\\
            ${$[0]}+${$[2]}&= ${$[1]}
                           \\end{aligned}$
                       <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$ est $${$[1]}= ${$[0]}+${$[2]}$.`):o===2?(t=`Soient $${$[0]}$, $${$[1]}$ et $${$[2]}$ trois nombres vérifiant l'égalité :
             $${$[0]}=${$[1]}+${$[2]}$.<br>
            Exprimer $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$.`,a=$[1],r=[`${$[1]}=${$[0]}-${$[2]}`,`${$[0]}-${$[2]}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
              $\\begin{aligned}
              ${$[0]}&=${$[1]}+${$[2]}\\\\
              ${$[0]}-${m($[2])}&=${$[1]}-${$[2]}-${m($[2])}\\\\
              ${$[0]}-${$[2]}&= ${$[1]}
                             \\end{aligned}$
                         <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$ est $${$[1]}= ${$[0]}-${$[2]}$.`):o===3?(t=`Soient $${$[0]}$, $${$[1]}$ et $${$[2]}$ trois nombres non nuls vérifiant l'égalité  : 
  $${$[0]}=\\dfrac{${$[1]}}{${$[2]}}$.<br>
                            Exprimer $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$.`,a=$[1],r=[`${$[0]}\\times ${$[2]}`,`${$[0]}\\times ${$[2]}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
                              $\\begin{aligned}
                              ${$[0]}&=\\dfrac{${$[1]}}{${$[2]}}\\\\
                              ${$[0]}\\times ${$[2]}&=${$[1]}                              
                                             \\end{aligned}$
                                         <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$ est $${$[1]}=${$[0]}\\times ${$[2]}$.`):o===4?(t=`Soient $${$[0]}$, $${$[1]}$ et $${$[2]}$ trois nombres non nuls vérifiant l'égalité  :
  $${$[0]}=\\dfrac{${$[1]}}{${$[2]}}$.<br>
Exprimer $${$[2]}$ en fonction de $${$[0]}$ et $${$[1]}$.`,a=$[2],r=`\\dfrac{${$[1]}}{${$[0]}}`,n=`On isole $${$[2]}$ dans un membre de l'égalité :<br>
$\\begin{aligned}   
 ${$[0]}&=\\dfrac{${$[1]}}{${$[2]}}\\\\
 ${$[0]}\\times ${$[2]}&=${$[1]} \\\\
 ${$[2]}&=\\dfrac{${$[1]}}{${$[0]}}                        
 \\end{aligned}$
<br> Une expression de $${$[2]}$ en fonction de $${$[0]}$ et $${$[1]}$ est $${$[2]}=\\dfrac{${$[1]}}{${$[0]}}$.`):(t=`Soient $${$[0]}$, $${$[1]}$ et $${$[2]}$ trois nombres non nuls vérifiant l'égalité  :
  $${$[0]}=${$[1]}\\times ${$[2]}$.<br>
  Exprimer $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$.`,a=$[1],r=`${$[1]}=\\dfrac{${$[0]}}{${$[2]}}`,n=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
    $\\begin{aligned}
    ${$[0]}&=${$[1]}\\times ${$[2]}\\\\
    \\dfrac{${$[0]}}{${$[2]}}&=${$[1]}
                   \\end{aligned}$
               <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$ et $${$[2]}$ est $${$[1]}= \\dfrac{${$[0]}}{${$[2]}}$.`);break;case 2:d=[i(["a","b","c","e"]),i(["x","y","z","w"]),i(["u","v","w","t"]),i(["A","B","C","E"]),i(["R","S","T","U"]),i(["I","J","K","L"]),i(["c","g","e","f"]),i(["c","m","f","e"]),i(["K","L","M","N"]),i(["r","s","t","u"]),i(["U","V","W","X"])],$=g(d),o=u(1,12),o===1?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$  quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité  :`,t=`${e} $${$[0]}=${$[1]}-${$[2]}${$[3]}$.<br>
   Exprimer $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[3]}$.`,a=$[2],r=[`\\dfrac{${$[1]}-${$[0]}}{${$[3]}}`,`\\dfrac{${$[0]}-${$[1]}}{-${$[3]}}`],n=`On isole $${$[2]}$ dans un membre de l'égalité :<br>
       $\\begin{aligned}
      ${$[0]}&=${$[1]}-${$[2]}${$[3]}\\\\
      ${$[0]}-${$[1]}&=-${$[2]}${$[3]}\\\\
       -${$[0]}+${$[1]}&= ${$[2]}${$[3]}\\\\
       \\dfrac{-${$[0]}+${$[1]}}{${$[3]}}&=${$[2]}
                 \\end{aligned}$
      <br> Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[3]}$ est $${$[2]}=  \\dfrac{${$[1]}-${$[0]}}{${$[3]}}$.`):o===2?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$  quatre nombres (avec $${$[2]}$ non nul) vérifiant l'égalité  :`,t=`${e} $${$[0]}=${$[1]}-${$[2]}${$[3]}$.<br>
          Exprimer $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$.`,a=$[3],r=[`\\dfrac{${$[1]}-${$[0]}}{${$[2]}}`,`\\dfrac{${$[0]}-${$[1]}}{-${$[2]}}`],n=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
              $\\begin{aligned}
             ${$[0]}&=${$[1]}-${$[2]}${$[3]}\\\\
             ${$[0]}-${$[1]}&=-${$[2]}${$[3]}\\\\
              -${$[0]}+${$[1]}&= ${$[2]}${$[3]}\\\\
              \\dfrac{-${$[0]}+${$[1]}}{${$[2]}}&=${$[3]}
                        \\end{aligned}$
      <br> Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$ est $${$[3]}=  \\dfrac{${$[1]}-${$[0]}}{${$[2]}}$.`):o===3?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$  quatre nombres vérifiant l'égalité :`,t=`${e} $${$[0]}=${$[1]}-${$[2]}${$[3]}$.<br>
     Exprimer $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et  $${$[3]}$.`,a=$[1],r=[`${$[0]}+${$[2]}${$[3]}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br> 
         $\\begin{aligned}
        ${$[0]}&=${$[1]}-${$[2]}${$[3]}\\\\
        ${$[0]}+${$[2]}${$[3]}&=${$[1]}
                   \\end{aligned}$
 <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et  $${$[2]}$ est $${$[1]}= ${$[0]}+${$[2]}${$[3]}$.`):o===4?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$  quatre nombres (avec $${$[2]}$ non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=${$[1]}${$[2]}+${$[3]}$.<br>
    Exprimer $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et  $${$[3]}$.`,a=$[1],r=[`\\dfrac{${$[0]}-${$[3]}}{${$[2]}}`,`\\dfrac{-${$[0]}+${$[3]}}{-${$[2]}}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br> 
        $\\begin{aligned}
       ${$[0]}&=${$[1]}${$[2]}+${$[3]}\\\\
       ${$[0]}-${$[3]}&=${$[1]}${$[2]}\\\\
        \\dfrac{${$[0]}-${$[3]}}{${$[2]}}&=${$[1]}
                  \\end{aligned}$
       <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et  $${$[3]}$ est $${$[1]}=  \\dfrac{${$[0]}-${$[3]}}{${$[2]}}$.`):o===5?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$  quatre nombres vérifiant l'égalité suivante :`,t=`${e}  $${$[0]}=${$[1]}${$[2]}+${$[3]}$.<br>
     Exprimer $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$.`,a=$[3],r=`${$[0]}-${$[1]}${$[2]}`,n=`On isole $${$[3]}$ dans un membre de l'égalité :<br> 
 $\\begin{aligned}
 ${$[0]}&=${$[1]}${$[2]}+${$[3]}\\\\
  ${$[0]}-${$[1]}${$[2]}&=${$[3]}
 \\end{aligned}$
   <br> Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$ est $${$[3]}=  ${$[0]}-${$[1]}${$[2]}$.`):o===6?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$  quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=\\dfrac{${$[1]}+${$[2]}}{${$[3]}}$.<br>
  Exprimer $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et  $${$[3]}$.`,a=$[1],r=`${$[3]}\\times ${$[0]}-${$[2]}`,n=`On isole $${$[1]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=\\dfrac{${$[1]}+${$[2]}}{${$[3]}}\\\\
 ${$[0]}\\times ${$[3]}&=${$[1]}+${$[2]}\\\\
 ${$[0]}\\times ${$[3]}-${$[2]}&=${$[1]}
 \\end{aligned}$
    <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et  $${$[3]}$ est $${$[1]}= ${$[3]}\\times ${$[0]}-${$[2]}$.`):o===7?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=\\dfrac{${$[1]}+${$[2]}}{${$[3]}}$.<br>
  Exprimer $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[3]}$.`,a=$[2],r=`${$[3]}\\times ${$[0]}-${$[1]}`,n=`On isole $${$[2]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=\\dfrac{${$[1]}+${$[2]}}{${$[3]}}\\\\
 ${$[0]}\\times ${$[3]}&=${$[1]}+${$[2]}\\\\
 ${$[0]}\\times ${$[3]}-${$[1]}&=${$[2]}
 \\end{aligned}$
    <br> Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[3]}$ est $${$[2]}= ${$[3]}\\times ${$[0]}-${$[1]}$.`):o===8?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$   quatre nombres (avec $${$[3]}$ et $${$[0]}$  non nuls) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=\\dfrac{${$[1]}+${$[2]}}{${$[3]}}$.<br>
  Exprimer $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$.`,a=$[3],r=[`\\dfrac{${$[1]} +${$[2]}}{${$[0]}}`,`\\dfrac{-${$[1]} -${$[2]}}{-${$[0]}}`],n=`On isole $${$[3]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=\\dfrac{${$[1]}+${$[2]}}{${$[3]}}\\\\
 ${$[0]}\\times ${$[3]}&=${$[1]}+${$[2]}\\\\
  ${$[3]}&=\\dfrac{${$[1]} +${$[2]}}{${$[0]}}
 \\end{aligned}$
    <br> Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$ est $${$[3]}= \\dfrac{${$[1]} +${$[2]}}{${$[0]}}$.`):o===9?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$   quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=(${$[1]}+${$[2]})${$[3]}$.<br>
  Exprimer $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et  $${$[2]}$.`,a=$[1],r=[`\\dfrac{${$[0]} -${$[2]}\\times ${$[3]}}{${$[3]}}`,`\\dfrac{-${$[0]} +${$[2]}\\times ${$[3]}}{-${$[3]}}`,`\\dfrac{${$[0]}}{${$[3]}}-${$[2]}`,`\\dfrac{${$[0]}}{${$[3]}}-${$[2]}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=(${$[1]}+${$[2]})${$[3]}\\\\
 ${$[0]}&=${$[1]}${$[3]}+${$[2]}${$[3]}\\\\
  ${$[0]}-${$[2]}${$[3]}&=${$[1]}${$[3]}\\\\
 \\dfrac{${$[0]}-${$[2]}${$[3]}}{${$[3]}}&=${$[1]}
 \\end{aligned}$
    <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et  $${$[2]}$ est 
    $${$[1]}= \\dfrac{${$[0]} -${$[2]}\\times ${$[3]}}{${$[3]}}$ ou plus simplement $${$[1]}=\\dfrac{${$[0]}}{${$[3]}}-${$[2]}$.`):o===10?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$   quatre nombres (avec $${$[1]}+${$[2]}$  non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=(${$[1]}+${$[2]})${$[3]}$.<br>
  Exprimer $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$.`,a=$[3],r=`\\dfrac{${$[0]}}{${$[1]}+${$[2]}}`,n=`On isole $${$[3]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=(${$[1]}+${$[2]})${$[3]}\\\\
\\dfrac{${$[0]}}{${$[1]}+${$[2]}} &=${$[3]}
 \\end{aligned}$
    <br> Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[2]}$ est 
    $${$[3]}= \\dfrac{${$[0]}}{${$[1]}+${$[2]}}$.`):o===11?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$   quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=(${$[1]}-${$[2]})${$[3]}$.<br>
  Exprimer $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et  $${$[2]}$.`,a=$[1],r=[`\\dfrac{${$[0]} +${$[2]}\\times ${$[3]}}{${$[3]}}`,`\\dfrac{${$[0]}}{${$[3]}}+${$[2]}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=(${$[1]}-${$[2]})${$[3]}\\\\
 ${$[0]}&=${$[1]}${$[3]}-${$[2]}${$[3]}\\\\
  ${$[0]}+${$[2]}${$[3]}&=${$[1]}${$[3]}\\\\
 \\dfrac{${$[0]}+${$[2]}${$[3]}}{${$[3]}}&=${$[1]}
 \\end{aligned}$
    <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et  $${$[2]}$ est 
    $${$[1]}= \\dfrac{${$[0]} +${$[2]}${$[3]}}{${$[3]}}$ ou plus simplement $${$[1]}=\\dfrac{${$[0]}}{${$[3]}}+${$[2]}$.`):(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$   quatre nombres (avec $${$[3]}$  non nul) vérifiant l'égalité  :`,t=`${e}  $${$[0]}=(${$[1]}-${$[2]})${$[3]}$.<br>
  Exprimer $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[3]}$.`,a=$[2],r=[`\\dfrac{-${$[0]} +${$[1]}\\times ${$[3]}}{${$[3]}}`,`${$[1]}-\\dfrac{${$[0]}}{${$[3]}}`],n=`On isole $${$[2]}$ dans un membre de l'égalité :<br> 
  $\\begin{aligned}
 ${$[0]}&=(${$[1]}-${$[2]})${$[3]}\\\\
 ${$[0]}&=${$[1]}${$[3]}-${$[2]}${$[3]}\\\\
  ${$[0]}-${$[1]}${$[3]}&=-${$[2]}${$[3]}\\\\
 \\dfrac{${$[0]}-${$[1]}${$[3]}}{-${$[3]}}&=${$[2]}\\\\
 \\dfrac{-${$[0]}+${$[1]}${$[3]}}{${$[3]}}&=${$[2]}
 \\end{aligned}$
    <br> Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et  $${$[3]}$ est 
    $${$[2]}=  \\dfrac{-${$[0]}+${$[1]}${$[3]}}{${$[3]}}$ ou plus simplement : 
    $${$[2]}= ${$[1]} -\\dfrac{${$[0]}}{${$[3]}}$ .`);break;case 3:default:d=[i(["a","b","c","e","f"]),i(["x","y","z","w","v"]),i(["u","v","w","t","r"]),i(["A","B","C","E","F"]),i(["R","S","T","U","V"]),i(["I","J","K","L","M"]),i(["c","g","e","f","h"]),i(["c","m","f","e","a"]),i(["K","L","M","N","P"]),i(["r","s","t","u","a"]),i(["U","V","W","X","R"])],$=g(d),o=u(1,6),o===1?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$ cinq nombres (avec $${$[3]}-${$[4]}$ non nul) vérifiant l'égalité  :`,t=`${e} $${$[0]}=(${$[1]}+${$[2]})(${$[3]}-${$[4]})$.<br>
       Exprimer $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$.`,a=$[1],r=[`\\dfrac{${$[0]}-${$[2]}${$[3]}+${$[2]}${$[4]}}{${$[3]}-${$[4]}}`,` \\dfrac{${$[0]}}{${$[3]}-${$[4]}}-${$[2]}`,` \\dfrac{${$[0]}-${$[2]}(${$[3]}-${$[4]})}{${$[3]}-${$[4]}}`],n=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
           $\\begin{aligned}
          ${$[0]}&=(${$[1]}+${$[2]})(${$[3]}-${$[4]})\\\\
          ${$[0]}&=${$[1]}${$[3]}-${$[1]}${$[4]}+${$[2]}${$[3]}-${$[2]}${$[4]}\\\\
           ${$[0]}-${$[2]}${$[3]}+${$[2]}${$[4]}&= ${$[1]}(${$[3]}-${$[4]})\\\\
           \\dfrac{${$[0]}-${$[2]}${$[3]}+${$[2]}${$[4]}}{${$[3]}-${$[4]}}&=${$[1]}
                     \\end{aligned}$
          <br> Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[3]}$ et $${$[4]}$ est $${$[1]}=\\dfrac{${$[0]}-${$[2]}${$[3]}+${$[2]}${$[4]}}{${$[3]}-${$[4]}}$ ou plus simplement 
          $${$[1]}= \\dfrac{${$[0]}}{${$[3]}-${$[4]}}-${$[2]}$.`):o===2?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$ cinq nombres (avec $${$[1]}+${$[2]}$ non nul) vérifiant l'égalité  :`,t=`${e} $${$[0]}=(${$[1]}+${$[2]})(${$[3]}-${$[4]})$.<br>
                Exprimer $${$[4]}$ en fonction de $${$[0]}$, $${$[2]}$, $${$[3]}$ et $${$[1]}$.`,a=$[4],r=[`\\dfrac{${$[0]}-${$[1]}${$[3]}-${$[2]}${$[3]}}{-${$[1]}-${$[2]}}`,`\\dfrac{-${$[0]}+${$[1]}${$[3]}+${$[2]}${$[3]}}{${$[1]}+${$[2]}}`,` \\dfrac{-${$[0]}}{${$[1]}+${$[2]}}+${$[3]}`,`\\dfrac{-${$[0]}+${$[3]}(${$[1]}+${$[2]})}{${$[1]}+${$[2]}}`,`\\dfrac{${$[0]}-${$[3]}(${$[1]}+${$[2]})}{-${$[1]}-${$[2]}}`],n=`On isole $${$[4]}$ dans un membre de l'égalité :<br>
                    $\\begin{aligned}
                   ${$[0]}&=(${$[1]}+${$[2]})(${$[3]}-${$[4]})\\\\
                   ${$[0]}&=${$[1]}${$[3]}-${$[1]}${$[4]}+${$[2]}${$[3]}-${$[2]}${$[4]}\\\\
${$[0]}-${$[1]}${$[3]}-${$[2]}${$[3]}&= -${$[1]}${$[4]}-${$[2]}${$[4]})\\\\
${$[0]}-${$[1]}${$[3]}-${$[2]}${$[3]}&= ${$[4]}(-${$[1]}-${$[2]})\\\\
 \\dfrac{${$[0]}-${$[1]}${$[3]}-${$[2]}${$[3]}}{-${$[1]}-${$[2]}}&=${$[4]}\\\\
 \\dfrac{-${$[0]}+${$[1]}${$[3]}+${$[2]}${$[3]}}{${$[1]}+${$[2]}}&=${$[4]}
                              \\end{aligned}$
                   <br> Une expression de $${$[4]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ est 
                   $${$[4]}=\\dfrac{-${$[0]}+${$[1]}${$[3]}+${$[2]}${$[3]}}{${$[1]}+${$[2]}}$ 
                   ou plus simplement 
                   $${$[4]}= -\\dfrac{${$[0]}}{${$[1]}+${$[2]}}+${$[3]}$.<br>
                   `):o===3?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$ cinq nombres (avec $${$[3]}-${$[4]}$ et $${$[0]}$ non nuls) vérifiant l'égalité  :`,t=`${e} $${$[0]}=\\dfrac{${$[1]}+${$[2]}}{${$[3]}-${$[4]}}$.<br>
 Exprimer $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[4]}$.`,a=$[3],r=`\\dfrac{${$[1]}+${$[2]}+${$[0]}${$[4]}}{${$[0]}}`,n=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
 $\\begin{aligned}
   ${$[0]}=&\\dfrac{${$[1]}+${$[2]}}{${$[3]}-${$[4]}}\\\\
    ${$[0]}(${$[3]}-${$[4]})&=${$[1]}+${$[2]}\\\\
   ${$[0]}${$[3]}-${$[0]}${$[4]}&= ${$[1]}+${$[2]}\\\\
   ${$[0]}${$[3]}&=${$[1]}+${$[2]}+${$[0]}${$[4]}\\\\
   ${$[3]}&=\\dfrac{${$[1]}+${$[2]}+${$[0]}${$[4]}}{${$[0]}}
     \\end{aligned}$
     <br> Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[4]}$ est 
       $${$[3]}=\\dfrac{${$[1]}+${$[2]}+${$[0]}${$[4]}}{${$[0]}}$.`):o===4?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$ cinq nombres (avec $${$[3]}-${$[4]}$ et $${$[0]}$ non nuls) vérifiant l'égalité  :`,t=`${e} $${$[0]}=\\dfrac{${$[1]}+${$[2]}}{${$[3]}-${$[4]}}$.<br>
    Exprimer $${$[4]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$.`,a=$[4],r=[`\\dfrac{${$[1]}+${$[2]}-${$[0]}${$[3]}}{-${$[0]}}`,`\\dfrac{-${$[1]}-${$[2]}+${$[0]}${$[3]}}{${$[0]}}`,`\\dfrac{-${$[1]}-${$[2]}}{${$[0]}}+${$[3]}`],n=`$${r}$On isole $${$[4]}$ dans un membre de l'égalité :<br>
     $\\begin{aligned}
      ${$[0]}=&\\dfrac{${$[1]}+${$[2]}}{${$[3]}-${$[4]}}\\\\
        ${$[0]}(${$[3]}-${$[4]})&=${$[1]}+${$[2]}\\\\
      ${$[0]}${$[3]}-${$[0]}${$[4]}&= ${$[1]}+${$[2]}\\\\
      -${$[0]}${$[4]} &=${$[1]}+${$[2]}-${$[0]}${$[3]}\\\\
      ${$[4]}&=\\dfrac{${$[1]}+${$[2]}-${$[0]}${$[3]}}{-${$[0]}}\\\\
      ${$[4]}&=\\dfrac{-${$[1]}-${$[2]}+${$[0]}${$[3]}}{${$[0]}}
         \\end{aligned}$
         <br> Une expression de $${$[4]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ est 
           $${$[4]}=\\dfrac{-${$[1]}-${$[2]}+${$[0]}${$[3]}}{${$[0]}}$.`):o===5?(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$ cinq nombres (strictement positifs) vérifiant l'égalité  :`,t=`${e} $${$[0]}=${$[1]}+${$[2]}\\sqrt{${$[3]}+${$[4]}}$.<br>
    Exprimer $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[4]}$.`,a=$[3],r=[`\\dfrac{${$[0]}^2-2${$[0]}${$[1]}+${$[1]}^2}{${$[2]}^2}-${$[4]}`,`(\\dfrac{${$[0]}-${$[1]}}{${$[2]}})^2-${$[4]}`,`$\\dfrac{${$[0]}^2-2${$[0]}${$[1]}+${$[1]}^2-${$[4]}${$[2]}^2}{${$[2]}^2}`,`\\dfrac{(${$[0]}-${$[1]})^2-${$[4]}${$[2]}^2}{${$[2]}^2}`],n=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
 $\\begin{aligned}
  ${$[0]}=&${$[1]}+${$[2]}\\sqrt{${$[3]}+${$[4]}}\\\\
   ${$[0]}-${$[1]}&=${$[2]}\\sqrt{${$[3]}+${$[4]}}\\\\
   \\dfrac{${$[0]}-${$[1]}}{${$[1]}}&= \\sqrt{${$[3]}+${$[4]}}\\\\
   \\left(\\dfrac{${$[0]}-${$[1]}}{${$[1]}}\\right)^2 &=${$[3]}+${$[4]}\\\\
   \\left(\\dfrac{${$[0]}-${$[1]}}{${$[1]}}\\right)^2-${$[4]}&=${$[3]}
\\end{aligned}$
 <br> Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[4]}$ est 
   $${$[3]}=\\left(\\dfrac{${$[0]}-${$[1]}}{${$[1]}}\\right)^2-${$[4]}$ ou par exemple $${$[3]}=\\dfrac{\\left(${$[0]}-${$[1]}\\right)^2-${$[4]}${$[1]}^2}{${$[1]}^2}$.
 `):(e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$, $${$[3]}$ et $${$[4]}$ cinq nombres (strictement positifs) vérifiant l'égalité  :`,t=`${e} $${$[0]}=${$[1]}+${$[2]}\\sqrt{${$[3]}+${$[4]}}$.<br>
     Exprimer $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[3]}$ et $${$[4]}$.`,a=$[2],r=`\\dfrac{${$[0]}-${$[1]}}{\\sqrt{${$[3]}+${$[4]}}}`,n=`On isole $${$[2]}$ dans un membre de l'égalité :<br>
  $\\begin{aligned}
   ${$[0]}=&${$[1]}+${$[2]}\\sqrt{${$[3]}+${$[4]}}\\\\
    ${$[0]}-${$[1]}&=${$[2]}\\sqrt{${$[3]}+${$[4]}}\\\\
    \\dfrac{${$[0]}-${$[1]}}{\\sqrt{${$[3]}+${$[4]}}}&=${$[2]}
 \\end{aligned}$
  <br> Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$, $${$[3]}$ et $${$[4]}$ est 
    $${$[2]}= \\dfrac{${$[0]}-${$[1]}}{\\sqrt{${$[3]}+${$[4]}}}$.
  `);break}t+="<br>"+U(this,s," alphanumeric  ",{texteAvant:v(10)+`$${a} =$`}),S(this,s,{reponse:{value:r}});const f=n.split("=");let p=f[f.length-1];p=p.replace("$","").replace("<br>",""),n="";for(let c=0;c<f.length-1;c++)n+=f[c],n+=c<f.length-2?"=":"";n=n.slice(0,n.length-1)+v(2)+`${m(n[n.length-1]+"="+p)}$`,this.questionJamaisPosee(s,b,o,$.join())&&(this.listeQuestions[s]=t,this.listeCorrections[s]=n,s++),x++}O(this)}}export{J$ as dateDeModifImportante,I$ as dateDePublication,B$ as default,K$ as interactifReady,R$ as interactifType,z$ as refs,F$ as titre,k$ as uuid};
//# sourceMappingURL=2N42-1-DCnQ-PqW.js.map

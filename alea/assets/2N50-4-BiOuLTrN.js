import{E as H,ah as z,r as b,z as i,R as s,aR as N,aq as L,am as D,aP as M,x as h,ap as l,G as u,m as B,j as p,y as o,bp as k,X as S,s as v,B as q,o as j,P as F}from"./index-Bk_D2JkM.js";import{a as f}from"./deprecatedFractions-BTR31pbW.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const tt="Modéliser une situation géométrique à l'aide d'une équation",$t="16/12/2021",rt="cf5b7",at={"fr-fr":["2N50-4","BP2RES24"],"fr-ch":["11FA6-10"]};class nt extends H{constructor(){super(),this.nbQuestions=1,this.nbCols=2,this.nbColsCorr=2,this.sup=1}nouvelleVersion(){const Q=z(["typeE1","typeE2","typeE3","typeE4","typeE5","typeE6","typeE7","typeE8"],this.nbQuestions);for(let P=0,w=0;P<this.nbQuestions&&w<50;){const d=[];let C="",c="";const A=[];switch(Q[P]){case"typeE1":{const e=b(1,10),t=b(1,7),$=b(4*t+2*e+1,50),n=$-2*e-2*t,r=i(0,0,"A","below"),m=i(10,0,"B","below"),a=i(10,6,"C"),x=i(0,6,"D");d.push(s(r,m),s(m,a),s(x,r),s(a,x),D(r,m,a,x)),d.push(h(`x+${u(e)}`,l(a,x).x+0,l(a,x).y+.7,0,"black",1,"milieu",!0),h(`${u(t)}`,l(r,x).x-.5,l(r,x).y,0,"black",1,"milieu",!0)),C=` Un rectangle a pour largeur $${t}$ cm et pour longueur $x$ cm.<br>
            En ajoutant $${e}$ cm à la longueur de ce rectangle, on obtient un nouveau rectangle dont le périmètre est $${$}$ cm.<br>
             Quelle est la longueur $x$ du rectangle initial ?<br>
              `,c=" On réalise une petite figure à main levée pour visualiser la situation :<br>",c+=B({xmin:-1,ymin:-1,xmax:12,ymax:8,pixelsParCm:20,mainlevee:!0,amplitude:.5,scale:.7},d),c+=`<br>Le périmètre du rectangle obtenu est donnée par la formule : $2\\times (\\ell+L)$ avec $\\ell$ la largeur du rectangle et $L$ sa longueur. <br>
                  Comme $\\ell=${t}$ et $L=x+${e}$, le périmètre est donné en fonction de $x$ par :  $ 2(${t}+x+${e})=2(x+${e+t})=2x+${2*e+2*t}$.<br>
       Puisque le périmètre du rectangle est $${$}$ cm, on cherche $x$ tel que :   $2x+${2*e+2*t}=${$}$.<br>
       $\\begin{aligned}
       2x+${2*e+2*t}&=${$}\\\\
       2x+${2*e+2*t}${o(-2*e-2*t)}&=${$}${o(-2*e-2*t)}\\\\
       2x&=${$-2*e-2*t}\\\\
       x&=\\dfrac{${$-2*e-2*t}}{2}\\\\
       x&=${u(n/2)}\\end{aligned}$<br>

       La longueur $x$ du rectangle initial est  $${u(n/2)}$ cm.
       `,A.push(e,$,n,t)}break;case"typeE2":{const e=b(1,10),t=b(1,5),$=b(t*t+t*e+1,100),n=i(0,0,"A","below"),r=i(10,0,"B","below"),m=i(10,6,"C"),a=i(0,6,"D");d.push(s(n,r),s(r,m),s(a,n),s(m,a),D(n,r,m,a)),d.push(h(`x+${u(e)}`,l(m,a).x+0,l(m,a).y+.7,0,"black",1,"milieu",!0),h(`${u(t)}`,l(n,a).x-.5,l(n,a).y,0,"black",1,"milieu",!0)),C=` Un rectangle a pour largeur $${t}$ cm et pour longueur $x$ cm.<br>
             En ajoutant $${e}$ cm à la longueur de ce rectangle, on obtient un nouveau rectangle dont l'aire est $${$}$ cm$^2$.<br>
              Quelle est la longueur $x$ du rectangle initial ? <br>
              On donnera le résultat sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant.`,c=" On réalise une petite figure à main levée pour visualiser la situation :<br>",c+=B({xmin:-1,ymin:-1,xmax:12,ymax:8,pixelsParCm:20,mainlevee:!0,amplitude:.5,scale:.7},d),c+=`L'aire du rectangle obtenu est donnée par la formule : $\\ell\\times L$ avec $\\ell$ la largeur du rectangle et $L$ sa longueur. <br>
                   Comme $\\ell=${t}$ et $L=x+${e}$, l'aire est donnée en fonction de $x$ par :  $ ${q(t)}\\times (x+${e})=${t}x+${t*e}$.<br>
        Puisque l'aire du rectangle est $${$}$ cm, on cherche $x$ tel que :   $${q(t)}x+${t*e}=${$}$.<br>
       $\\begin{aligned}
        ${q(t)}x+${t*e}&=${$}\\\\
        ${q(t)}x+${t*e}${o(-t*e)}&=${$}${o(-t*e)}\\\\
                ${q(t)}x&=${$-t*e}
        \\end{aligned}$<br>`,t!==1?c+=`${v(18)}$\\begin{aligned}
          \\dfrac{${t}x}{${o(t)}}&=\\dfrac{${$-t*e}}{${o(t)}}\\\\
               x&=${f($-t*e,t)}\\end{aligned}$<br>`:c+="",c+=` La longueur $x$ du rectangle initial est  $${f($-t*e,t)}$ cm.
        `,A.push(e,$,t)}break;case"typeE3":{const e=b(1,10),t=b(e*e+1,100),$=i(0,0,"A","below"),n=i(10,0,"B","below"),r=i(0,6,"C");d.push(s($,n),s(n,r),s($,r),D($,n,r),L(n,$,r)),d.push(h(`${u(e)}`,l($,n).x+0,l($,n).y-.5,0,"black",1,"milieu",!0),h("x",l($,r).x-.5,l($,r).y,0,"black",1,"milieu",!0)),C=` Un triangle $ABC$ est rectangle en $A$. On a $AB= ${e}$ cm  et $AC= x$ cm.<br>
         Sachant que le carré de son hypoténuse est $${t}$, déterminer la valeur exacte de $x$. `,c=" On réalise une petite figure à main levée pour visualiser la situation :<br>",c+=B({xmin:-1,ymin:-1,xmax:12,ymax:8,pixelsParCm:20,mainlevee:!0,amplitude:.5,scale:.7},d),c+=`Le carré de l'hypoténuse  est égal à $${t}$. On a donc $BC^2=${t}$.<br>
          Le triangle $ABC$ est rectangle en $A$, d'après le théorème de Pythagore :<br>
        $\\begin{aligned}
        AB^2+AC^2&=BC^2\\\\
        ${e*e}+x^2&=${t}\\\\
        ${e*e}+x^2${o(-e*e)}&=${t} ${o(-e*e)}\\\\
        x^2&=${t-e*e}\\\\
        x&=\\sqrt{${t-e*e}}${v(10)}  \\text{car}${v(2)} x>0
        \\end{aligned}$`,t-e*e===1||t-e*e===4||t-e*e===9||t-e*e===16||t-e*e===25||t-e*e===36||t-e*e===49||t-e*e===64||t-e*e===81||t-e*e===100?c+=`<br>
            ${v(28)} $x=${Math.sqrt(t-e*e)}$<br>
         La valeur de $x$ cherchée est  $${Math.sqrt(t-e*e)}$.
         `:c+=`<br>
         La valeur de $x$ cherchée est  $\\sqrt{${t-e*e}}$.
         `,A.push(e,t)}break;case"typeE4":{const e=b(1,10),t=b(e+1,15),$=i(0,0,"M","below"),n=i(10,0,"N","below"),r=i(0,6,"P");d.push(s($,n),s(n,r),s($,r),D($,n,r),L(n,$,r)),d.push(h(`${u(t)}`,l($,r).x-.5,l($,r).y,0,"black",1,"milieu",!0),h("x",l($,n).x+0,l($,n).y-.5,0,"black",1,"milieu",!0),k(`$x+${u(e)}$`,r,n,"black",.5)),C=` Un triangle $MNP$ est rectangle en $M$. On a $MP= ${t}$ cm  et $MN= x$ cm.<br>
             L'hypoténuse du triangle $MNP$ mesure  $${e}$ cm de plus que le côté $[MN]$.<br>
             Déterminer la valeur de $x$ sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant. `,c=" On réalise une petite figure à main levée pour visualiser la situation :<br>",c+=B({xmin:-1,ymin:-1,xmax:12,ymax:8,pixelsParCm:20,mainlevee:!0,amplitude:.5,scale:.7},d),c+=`Le triangle $MNP$ est rectangle en $M$, d'après le théorème de Pythagore :<br>
            $\\begin{aligned}
            MN^2+MP^2&=PN^2\\\\
            x^2+${t}^2&=(x+${e})^2\\\\
            x^2+${t*t}&= x^2+2\\times x\\times ${e}+${e}^2\\\\
            x^2+${t*t}&= x^2+${2*e}x+${e*e}\\\\
            ${t*t}+\\cancel{x^2}&=\\cancel{x^2}+${2*e}x+${e*e} \\\\
            ${2*e}x+${e*e}&=${t*t}\\\\
            ${2*e}x+${e*e}${o(-e*e)}&=${t*t}${o(-e*e)}\\\\
            ${2*e}x&=${t*t-e*e}\\\\
            \\dfrac{${2*e}x}{${o(2*e)}}&=\\dfrac{${t*t-e*e}}{${o(2*e)}}\\\\
            x&=${f(t*t-e*e,2*e)}\\end{aligned}$<br>
            
       La valeur de $x$ cherchée est : $${f(t*t-e*e,2*e)}$.
       `,A.push(t,e)}break;case"typeE5":{const e=b(1,8),t=b(e*e+1,100);C=` En augmentant le côté d'un carré de $${e}$ cm, son aire aumente de $${t}$ cm$^2$.<br>
      Quelle est la longueur du côté de ce carré ? <br>
      On donnera le résultat sous la forme d'une fraction irréductible ou d'un nombre entier le cas échéant.`,c=`On note $x$ la longueur du côté du carré que l'on cherche.<br>
      La différence des aires entre les deux carrés est  $${t}$, on cherche $x$ tel que :   <br>
      $\\begin{aligned}
      (x+${e})^2-x^2&=${t}\\\\
      \\cancel{x^2}+ ${2*e}x+${e}^2-\\cancel{x^2}&=${t}\\\\
       ${2*e}x+${e*e}&=${t}\\\\
        ${2*e}x+${e*e}${o(-e*e)}&=${t}${o(-e*e)}\\\\
         ${2*e}x&=${t-e*e}\\\\
         \\dfrac{${2*e}x}{${o(2*e)}}&=\\dfrac{${t-e*e}}{${o(2*e)}}\\\\
         x&=${f(t-e*e,2*e)}\\end{aligned}$
           <br>
           La longueur du côté du carré est  $${f(t-e*e,2*e)}$ cm.
 `,A.push(e,t)}break;case"typeE6":{const e=b(1,7),t=b(e+2,14),$=(t-e)/2,r=b(1,10)*2*(t+e)/2,m=i(0,0,"A","below"),a=i(9,0,"H","below"),x=i(15,0,"B","below"),g=i(15,8,"C"),y=i(9,8,"D"),E=i(0,-1,"E"),O=i(15,-1,"F");d.push(s(m,y),N(E,O),s(m,x),s(x,g),s(y,g),s(y,a),L(m,x,g),L(x,g,y),D(m,a,y,x,g),L(x,a,y)),d.push(k(`${S(e)} cm`,y,g,"black",.5),k(`${S(t)} cm`,E,O,"black",-.5),h("x",l(x,g).x+.5,l(x,g).y,0,"black",1,"milieu",!0)),C=" $ABCD$ est un trapèze rectangle.<br> ",C+="Le schéma ci-dessous n'est pas à l'échelle.<br>"+B({xmin:-1,ymin:-2,xmax:16,ymax:10,pixelsParCm:20,scale:1},d),C+=`Sachant que l'aire de ce trapèze est $${r}$ cm$^2$ et en utilisant les données du graphique, déterminer la hauteur de ce trapèze.<br>
                    <br>`,c=B({xmin:-1,ymin:-3,xmax:16,ymax:10,pixelsParCm:20,scale:.7},d),c+=`<br>La  hauteur du trapèze est  $x$. Il est constitué du rectangle $HBCD$ et du triangle rectangle $AHD$. <br>
                    Son aire est donc la somme des aires de ces deux figures. <br>
                    $\\bullet~$ L' aire du rectangle $HBCD$ est : $${e}\\times x=${p(e,0)}$.<br>
                    $\\bullet~$ L' aire de triangle rectangle $AHD$ est : $\\dfrac{(${t}-${e})\\times x}{2}=${p((t-e)/2,0)}$.
                    <br>
                    Puisque l'aire du trapèze est $${r}$ cm$^2$, $x$ est donc la solution de l'équation : $${p(e,0)} + ${p((t-e)/2,0)}=${r}$.<br>
                    $\\begin{aligned}
                    ${p(e,0)} + ${p((t-e)/2,0)}&=${r}\\\\
                    ${u(e+(t-e)/2)}x&=${r}\\\\
                    \\dfrac{${u(e+$)}x}{${o(u(e+$))}}&=\\dfrac{${r}}{${o(u(e+$))}}\\\\
                    x&=${f(r,e+$)}
                    \\end{aligned}$<br>
                    La hauteur du trapèze est : $${f(r,e+$)}$ cm.`,A.push(t,e,r,$)}break;case"typeE7":{const e=b(3,8),t=b(1,6),$=b(1,6),r=(b(1,20)*(2*e+t)+2*e*$+$*t)/2,m=i(0,0,"A","below"),a=i(5,6,"H","below"),x=i(10,0,"B","below"),g=i(10,6,"C"),y=i(0,6,"D"),E=i(5,10,"E");d.push(s(m,x),s(x,g),s(g,y),s(m,y),s(E,g),s(E,y),s(E,a),L(E,a,g),D(m,a,y,x,g,E),M("//","blue",y,E,E,g)),d.push(h(`${u(e)}`,l(x,g).x+.4,l(x,g).y,0,"black",1,"milieu",!0),h(`${u(t)}`,l(E,a).x+.4,l(E,a).y,0,"black",1,"milieu",!0),h(`x + ${u($)}`,l(m,x).x+.4,l(m,x).y-.4,0,"black",1,"milieu",!0)),C=` La figure ci-dessous (qui n'est pas à l'échelle) est composée d'un rectangle $ABCD$ et d'un triangle isocèle $DEC$. <br>
        L'unité est le mètre.<br> `+B({xmin:-1,ymin:-1,xmax:12,ymax:11,pixelsParCm:20,scale:1},d),C+=`Sachant que l'aire de cette figure est $${u(r)}$ m$^2$ et en utilisant les données du graphique, déterminer la  valeur exacte de $x$.<br>
         <br>`,c=B({xmin:-1,ymin:-1,xmax:16,ymax:11,pixelsParCm:20,scale:.7},d),c+=`<br>La figure est  constituée du rectangle $ABCD$ et du triangle isocèle $DEC$.   <br>
        Son aire est donc la somme des aires de ces deux figures. <br>
        $\\bullet~$ L' aire du rectangle $ABCD$ est : $${e}\\times (x+${$})=${p(e,e*$)}$ ;<br>
        $\\bullet~$ L' aire de triangle isocèle $DEC$ est : $\\dfrac{${t}\\times(x +${$})}{2}=${f(t,2)}(x+${$})=${p(t/2,t*$/2)}$.<br>
        L'aire de la figure étant $${u(r)}$ m$^2$, on cherche $x$ tel que : <br>
        $\\begin{aligned}
        (${p(e,e*$)})+(${p(t/2,t*$/2)})&=${u(r)}\\\\
        ${p(e,e*$)}+${p(t/2,t*$/2)}&=${u(r)}\\\\
        ${p(e+t/2,e*$+t*$/2)}&=${u(r)}\\\\
        ${p(e+t/2,e*$+t*$/2)}${o(u(-e*$-t*$/2))}&=${r}${o(u(-e*$-t*$/2))}\\\\
                ${p(e+t/2,0)}&=${p(0,r-e*$-t*$/2)}\\\\
                \\dfrac{${p(e+t/2,0)}}{${o(u(e+t/2))}}&=\\dfrac{${u(r-e*$-t*$/2)}}{${o(u(e+t/2))}}\\\\
                x&=${f((r-e*$-t*$/2)*10,(e+t/2)*10)}
                \\end{aligned}$<br>
                La valeur de $x$ cherchée est donc : $ ${f((r-e*$-t*$/2)*10,(e+t/2)*10)}$.
                `,A.push(e,t,$,r)}break;case"typeE8":default:{const e=b(10,50),t=i(0,0,"A","below"),$=i(10,0,"B","below"),n=i(10,6,"C"),r=i(4,6,"D"),m=i(2,3.46,"E"),a=i(4,0,"M","below"),x=i(10,-1,"K"),g=i(0,-1,"L");d.push(s(t,$),s(t,m),N(x,g),s(m,a),s(a,r),s($,n),s(r,n),L($,a,r),L(a,$,n),L($,n,r),L(n,r,a),D(t,a,$,n,r,m),M("//","blue",t,m,m,a,t,a),M("/","blue",a,$,$,n,n,r,r,a)),d.push(h("$x$",l(t,a).x,l(t,a).y-.3,0,"black",2,"milieu",!0),h(`${u(e)}`,l(t,$).x,l(t,$).y-1.5,0,"black",1,"milieu",!0)),C=`$[AB]$ est un segment de longueur $${e}$ et $M$ est un point de ce segment.<br>
      Du même côté du segment $[AB]$, on trace le triangle équilatéral $AME$ et le carré $MBCD$.<br>
      On pose $AM=x$.<br>
     Déterminer la valeur de $x$ pour que le périmètre du triangle $AME$ soit égal à celui du carré $MBCD$.  `,c=F.isHtml?"<br>":"On réalise une figure pour visualiser la situation :<br>",c+=B({xmin:-1,ymin:-3,xmax:12,ymax:8,pixelsParCm:30,scale:2},d),c+=` Le triangle $AME$ est un triangle équilatéral de côté $x$, son périmètre est donc  $3x$.<br>
      
      Le carré $MBCD$ a pour côté $MB=${e}-x$. Son périmètre est donc : $4\\times (${e}-x)=${p(-4,4*e)} $.
      <br>
      On cherche $x$ tel que : <br>
      $\\begin{aligned}
      ${p(-4,4*e)}&=3x\\\\
      ${p(-4,4*e)} ${o("-3\\textit{x}")}&=3x${o("-3\\textit{x}")}\\\\
      ${p(-7,4*e)}&=0\\\\
      ${p(-7,4*e)}${o(-4*e)}&=0${o(-4*e)}\\\\
      \\dfrac{${p(-7,0)}}{${o("-7")}}&=\\dfrac{${p(0,-4*e)}}{${o("-7")}}\\\\
      x&=${f(-4*e,-7)}
      \\end{aligned}$<br>
      Les deux périmètres sont égaux lorsque  : $x=${f(-4*e,-7)}$.
      `,A.push(e)}break}this.questionJamaisPosee(P,A.map(String).join())&&(this.listeQuestions[P]=C,this.listeCorrections[P]=c,P++),w++}j(this)}}export{$t as dateDePublication,nt as default,at as refs,tt as titre,rt as uuid};
//# sourceMappingURL=2N50-4-BiOuLTrN.js.map

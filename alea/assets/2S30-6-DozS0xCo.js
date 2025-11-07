import{E as q,ae as y,ah as k,r as o,G as e,y as l,b as m,K as B,s as p,n as S,o as I}from"./index-Bk_D2JkM.js";import{D as c}from"./vendors/decimal.js-16C9rIKp.js";import{t as L}from"./tableau-C_fjvQa2.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const We="Calculer des probabilités avec des unions et intersections d'événements",Xe="25/05/2024",Ye=!0,Ze="mathLive",_e="ea35b",et={"fr-fr":["2S30-6"],"fr-ch":[]};class tt extends q{constructor(){super(),this.sup=7,this.nbQuestions=1,this.besoinFormulaireTexte=["Type de questions",["Nombres séparés par des tirets  :","1 : On cherche P(A union B)","2 : On cherche P(A inter B)","3 : On cherche P(A)","4 : Avec des événements incompatibles","5 : Avec des événements contraires","6 : Avec un tableau","7 : Mélange"].join(`
`)]}nouvelleVersion(){const T=y({saisie:this.sup,min:1,max:6,melange:7,defaut:7,nbQuestions:this.nbQuestions}),v=k(T,this.nbQuestions);for(let n=0,h=0;n<this.nbQuestions&&h<50;){const C=o(1,20);let i="",a="",u="",$,t;$=new c(o(1,99)).div(100),t=new c(o(1,99)).div(100);let r;r=new c(o(1,99)).div(100);let s=$.add(t).sub(r);for(;s.greaterThan(.99)===!0||s.lessThan(.01)===!0||r.greaterThan($.sub(.01))===!0||r.greaterThan(t.sub(.01))===!0;)$=new c(o(1,99)).div(100),t=new c(o(1,99)).div(100),r=new c(o(1,99)).div(100),s=$.add(t).sub(r);switch(v[n]){case 1:i=e(s,2),a=`Soient $A$ et $B$ deux événements vérifiant :  <br>
           $\\bullet$  $P(A)=${e($,2)}$ ${p(4)} $\\bullet$  $P(B)=${e(t,2)}$ ${p(4)}
           $\\bullet$  $P(A\\cap B)=${e(r,2)}$.<br>
            Calculer $P(A\\cup B)$.
           `,u=`On sait que $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.<br><br>
            $\\begin{aligned} 
            P(A\\cup B)&=P(A)+P(B)-P(A\\cap B)\\\\
            &=${e($,2)}+${e(t,2)}-${e(r,2)}\\\\
            &=${i}
            \\end{aligned}$<br>
            Ainsi $P(A\\cup B)=${l(i)}$.`,a+="<br>"+m(this,n,B.clavierDeBase,{texteAvant:" $P(A\\cup B)=$"});break;case 2:i=e(r,2),a=`Soient $A$ et $B$ deux événements vérifiant :  <br>
         $\\bullet$  $P(A)=${e($,2)}$  ${p(4)} $\\bullet$  $P(B)=${e(t,2)}$  ${p(4)} $\\bullet$  $P(A\\cup B)=${e(s,2)}$.<br>
          Calculer $P(A\\cap B)$.
         `,u=`On sait que $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.<br><br>
          $\\begin{aligned} 
          P(A\\cup B)&=P(A)+P(B)-P(A\\cap B)\\\\
          ${e(s,2)} &=${e($,2)}+${e(t,2)}-P(A\\cap B)\\\\
          P(A\\cap B) &=${e($,2)}+${e(t,2)}-${e(s,2)}\\\\
          P(A\\cap B)&=${i}
          \\end{aligned}$<br>
          Ainsi $P(A\\cap B)=${l(i)}$.`,a+="<br>"+m(this,n,B.clavierDeBase,{texteAvant:"$P(A\\cap B)=$"});break;case 3:i=e($,2),a=`Soient $A$ et $B$ deux événements vérifiant :  <br>
           $\\bullet$  $P(B)=${e(t,2)}$  ${p(4)} $\\bullet$  $P(A\\cap B)=${e(r,2)}$  ${p(4)}$\\bullet$  $P(A\\cup B)=${e(s,2)}$.<br>
            Calculer $P(A)$.
           `,u=`On sait que $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.<br><br>
            $\\begin{aligned} 
            P(A\\cup B)&=P(A)+P(B)-P(A\\cap B)\\\\
            ${e(s,2)}&=P(A)+${e(t,2)}-${e(r,2)}\\\\
            P(A)&=${e(s,2)}-${e(t,2)}+${e(r,2)}\\\\
            &=${i}
            \\end{aligned}$<br>
            Ainsi $P(A)=${l(i)}$.`,a+="<br>"+m(this,n,B.clavierDeBase,{texteAvant:"$P(A)=$"});break;case 4:{const b=new c(o(1,40)).div(100),A=new c(o(1,40)).div(100),P=b.add(A);i=e(P,2),a=`Soient $A$ et $B$ deux événements incompatibles vérifiant :  <br>
          $\\bullet$  $P(A)=${e(b,2)}$ ${p(4)} $\\bullet$  $P(B)=${e(A,2)}$.<br>
           Calculer $P(A\\cup B)$.`,u=`Lorsque deux événements sont incompatibles,  $P(A\\cup B)=P(A)+P(B)$.<br><br>
          $\\begin{aligned} 
            P(A\\cup B)&=P(A)+P(B)\\\\
            P(A\\cup B)&=${e(b,2)}+${e(A,2)}\\\\
            P(A\\cup B) &=${i}           
            \\end{aligned}$<br>
            Ainsi $P(A\\cup B)=${l(i)}$.`,a+="<br>"+m(this,n,B.clavierDeBase,{texteAvant:"$P(A\\cup B)=$"})}break;case 5:{const b=$.mul(-1).add(1),A=t.mul(-1).add(1);i=e(s,2),a=`Soient $A$ et $B$ deux événements  vérifiant :  <br>
             $\\bullet$  $P(\\bar{A})=${e(b,2)}$  ${p(4)} $\\bullet$  $P(\\bar{B})=${e(A,2)}$  ${p(4)} $\\bullet$  $P(A\\cap B)=${e(r,2)}$.<br>
              Calculer $P(A\\cup B)$.`,u=`On sait que $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.<br><br>
             Or $P(A)=1-P(\\bar{A})=${e($,2)}$ et $P(B)=1-P(\\bar{B})=${e(t,2)}$.<br>
             <br>$\\begin{aligned} 
             P(A\\cup B)&=P(A)+P(B)-P(A\\cap B)\\\\
             P(A\\cup B)&=${e($,2)}+${e(t,2)}-${e(r,2)}\\\\
             P(A\\cup B)&=${e(s,2)}
             \\end{aligned}$<br>
             Ainsi $P(A\\cup B)=${l(i)}$.`,a+="<br>"+m(this,n,B.clavierDeBase,{texteAvant:"$P(A\\cup B)=$"})}break;case 6:{const b=$.mul(-1).add(1),A=t.mul(-1).add(1),P=$.mul(100),g=t.mul(100),d=r.mul(100),x=g.sub(d),D=P.sub(d),f=b.mul(100),w=A.mul(100),O=f.sub(x),Q=L(["","A","\\overline{A}","\\text{Total}"],["B","\\overline{B}","\\text{Total}"],[`${e(d,2)}`,`${e(x,2)}`,`${e(g,2)}`,`${e(D,2)}`,`${e(O,2)}`,`${e(w,2)}`,`${e(P,2)}`,`${e(f,2)}`,100]);i=e(s,2),a=`Voici un tableau d'effectifs concernant deux événements $A$ et $B$ :  <br>
            ${Q}
              
                Calculer $P(A\\cup B)$.`,u=`On sait que $P(A\\cup B)=P(A)+P(B)-P(A\\cap B)$.<br><br>
               <br>$\\begin{aligned} 
               P(A\\cup B)&=P(A)+P(B)-P(A\\cap B)\\\\
               P(A\\cup B)&=${e($,2)}+${e(t,2)}-${e(r,2)}\\\\
               P(A\\cup B)&=${e(s,2)}
               \\end{aligned}$<br>
               Ainsi $P(A\\cup B)=${l(i)}$.`,a+="<br>"+m(this,n,B.clavierDeBase,{texteAvant:"$P(A\\cup B)=$"})}break}S(this,n,{reponse:{value:i}}),this.questionJamaisPosee(n,v[n],C)&&(this.listeQuestions[n]=a,this.listeCorrections[n]=u,n++),h++}I(this)}}export{Xe as dateDePublication,tt as default,Ye as interactifReady,Ze as interactifType,et as refs,We as titre,_e as uuid};
//# sourceMappingURL=2S30-6-DozS0xCo.js.map

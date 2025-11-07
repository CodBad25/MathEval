import{E as q,p as d,r as s,B as l,k as i,u as y,w as C,I as E,N as _,o as v}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Be="Reconnaitre une fonction polynôme du second degré (V/F)",Je=!0,Ne="qcm",je="24/09/2022",ze="6e9df",Ge={"fr-fr":["can1F22"],"fr-ch":[]};class He extends q{constructor(){super(),this.nbQuestions=1}nouvelleVersion(){const g=[["f"],["g"],["h"],["u"],["v"],["w"],["r"]];let e,$;for(let f=0,S=0;f<this.nbQuestions&&S<50;){let n="",r="",t={texte:"",texteCorr:""};this.canEnonce="";let o=0,p=0,c=0,h=0,x=0,a=0,u=0,b=0,m,L;switch(d([1,2,3,4,5,6])){case 1:o=s(-3,3,0),p=s(-9,9,0),c=s(-9,9,0),h=d([5,7,10]),m=d([2,3,5,6,7,10]),e=d(g),$=d(["a","b","c","d","e","f","g"]),$==="a"?(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=${C(0,o,p,c)}$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="b"?(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=${C(0,o,0,c)}$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="c"?(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=${C(0,o,p,0)}$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="d"?(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=${l(p)}x${i(c)}${E(o)}x^2$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="e"?(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=${l(p)}x${E(o)}x^2${i(c)}$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="f"?(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=\\dfrac{${C(0,o,0,c)}}{${h}}$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):(n=`Soit $${e}$ la fonction définie  par :<br>
            $${e}(x)=${l(o)}x^2+\\sqrt{${m}}x${i(c)}$. <br>
            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n),this.autoCorrection[f]={enonce:n,propositions:[{texte:"Vrai",statut:o<10},{texte:"Faux",statut:o>10}],options:{ordered:!0,radio:!0}},t=y(this,f),n+=t.texte,$==="a"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
            $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=${o}$, $b=${p}$ et $c=${c}$.<br>
             $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `:$==="b"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
            $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=${o}$, $b=0$ et $c=${c}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `:$==="c"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
            $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=${o}$, $b=${p}$ et $c=0$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `:$==="d"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
            $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=${o}$, $b=${p}$ et $c=${c}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `:$==="e"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
            $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=${o}$, $b=${p}$ et $c=${c}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `:$==="f"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
            $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=\\dfrac{${o}}{${h}}$, $b=0$ et $c=\\dfrac{${c}}{${h}}$.<br>
            $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `:r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
                $${e}(x)$ est de la forme $ax^2+bx+c$ avec $a=${o}$, $b=\\sqrt{${m}}$ et $c=${c}$.<br>
                $a$, $b$ et $c$ sont bien des constantes et $a\\neq 0$.   `;break;case 2:o=s(-3,3,0),x=s(-9,9,0),a=s(-9,9,[0,x]),e=d(g),m=d([2,3,5,6,7,10]),L=d([2,3,5,6,7,10]),$=d(["a","b","c","d","e","f"]),$==="a"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${l(o)}(x${i(x)})(x${i(a)})$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="b"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${l(o)}x(x${i(a)})$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="c"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=x(x${i(a)})$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="d"?(n=`Soit $${e}$ la fonction définie  par :<br>
                $${e}(x)=(${x}-x)(x${i(a)})$. <br>
                $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="e"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${l(o)}(x+\\sqrt{${m}})(x-\\sqrt{${L}})$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=\\sqrt{${m}}(x${i(x)})(x${i(a)})$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n),this.autoCorrection[f]={enonce:n,propositions:[{texte:"Vrai",statut:o<10},{texte:"Faux",statut:o>10}],options:{ordered:!0}},t=y(this,f),n+=t.texte,$==="a"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
              $${e}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=${o}$, $x_1=${-x}$ et $x_2=${-a}$.<br>  Il s'agit de la forme factorisée d'une fonction polynôme du second degré. `:$==="b"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
              $${e}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=${o}$, $x_1=0$ et $x_2=${-a}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `:$==="c"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
              $${e}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=1$, $x_1=0$ et $x_2=${-a}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `:$==="d"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
                $${e}(x)=(${x}-x)(x${i(a)})=-(x${i(-x)})(x${i(a)})$.<br>
                $${e}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=1$, $x_1=0$ et $x_2=${-a}$.<br> Il s'agit de la forme factorisée d'une fonction polynôme du second degré.   `:$==="e"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
              $${e}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=${o}$, $x_1=-\\sqrt{${m}}$ et $x_2=\\sqrt{${L}}$.<br>  Il s'agit de la forme factorisée d'une fonction polynôme du second degré. `:r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
              $${e}(x)$ est de la forme $a(x-x_1)(x-x_2)$ avec $a=\\sqrt{${m}}$, $x_1=${-x}$ et $x_2=${-a}$.<br>  Il s'agit de la forme factorisée d'une fonction polynôme du second degré. `;break;case 3:o=s(-5,5,0),x=s(-9,9,0),a=s(-9,9,[0,x]),u=s(-9,9,0),b=s(-9,9,0),e=d(g),$=d(["a","b","c"]),$==="a"?(n=`Soit $${e}$ la fonction définie  par :<br>
                  $${e}(x)=${l(o)}(x${i(u)})^2${i(b)}$. <br>         
                  $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="b"?(n=`Soit $${e}$ la fonction définie  par :<br>
                  $${e}(x)=${l(o)}(x${i(u)})^2$. <br>
                  $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):(n=`Soit $${e}$ la fonction définie  par :<br>
                  $${e}(x)=(x${i(u)})^2$. <br>
                  $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n),this.autoCorrection[f]={enonce:n,propositions:[{texte:"Vrai",statut:o<10},{texte:"Faux",statut:o>10}],options:{ordered:!0}},t=y(this,f),n+=t.texte,$==="a"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
                  $${e}(x)$ est de la forme $a(x-\\alpha)^2+\\beta$ avec $a=${o}$, $\\alpha=${-u}$ et $\\beta=${b}$. <br> Il s'agit de la forme canonique d'une fonction polynôme du second degré. `:$==="b"?r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
                  $${e}(x)$ est de la forme $a(x-\\alpha)^2+\\beta$ avec $a=${o}$, $\\alpha=${-u}$ et $\\beta=0$. <br> Il s'agit de la forme canonique d'une fonction polynôme du second degré. `:r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second degré. <br>
                    $${e}(x)$ est de la forme $a(x-\\alpha)^2+\\beta$ avec $a=1$, $\\alpha=${-u}$ et $\\beta=0$. <br> Il s'agit de la forme canonique d'une fonction polynôme du second degré. `;break;case 4:o=s(-3,3,0),p=s(-9,9,0),c=s(-9,9,0),h=d([5,7]),e=d(g),$=d(["a","b","c","d"]),$==="a"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${C(o,p,c,0)}$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="b"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${p}${E(c)}x^3$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="c"?(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${l(o)}x^2${E(p)}x+\\dfrac{${_(c)}}{x}$. <br>
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):(n=`Soit $${e}$ la fonction définie  par :<br>
              $${e}(x)=${l(o)}x^2${E(p)}\\sqrt{x}${i(c)}$. <br>          
              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n),this.autoCorrection[f]={enonce:n,propositions:[{texte:"Vrai",statut:o>10},{texte:"Faux",statut:o<10}],options:{ordered:!0}},t=y(this,f),n+=t.texte,$==="a"?r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
              $${e}(x)$ est une fonction polynôme du troisième degré.   `:$==="b"?r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
              $${e}(x)$ est une fonction polynôme du troisième degré.   `:$==="c"?r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
             L'expression  $${e}(x)$ contient une division par $x$.  `:r=t.texteCorr+`La fonction $${e}$ est une fonction polynôme du second. <br>
              L'expression  $${e}(x)$ contient une racine carrée de $x$.   `;break;case 5:o=s(-3,3,0),x=s(-9,9,0),a=s(-9,9,[0,x]),e=d(g),$=d(["a","b"]),$==="a"?(n=`Soit $${e}$ la fonction définie  par :<br>
                    $${e}(x)=${l(o)}x(x${i(x)})(x${i(a)})$. <br>          
                    $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):(n=`Soit $${e}$ la fonction définie  par :<br>
                  $${e}(x)=${l(o)}x(\\sqrt{x}${i(x)})(x${i(a)})$. <br>            
                  $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n),this.autoCorrection[f]={enonce:n,propositions:[{texte:"Vrai",statut:o>10},{texte:"Faux",statut:o<10}],options:{ordered:!0}},t=y(this,f),n+=t.texte,$==="a"?r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
                   En développant l'expression, on obtient une fonction polynôme du troisième degré. `:r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
                  L'expression $${e}(x)$ contient une racine carrée de $x$. `;break;case 6:o=s(-5,5,0),u=s(-9,9,0),b=s(-9,9,0),e=d(g),$=d(["a","b","c"]),$==="a"?(n=`Soit $${e}$ la fonction définie  par :<br>
                            $${e}(x)=${l(o)}x(x${i(u)})^2${i(b)}$. <br>                
                            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):$==="b"?(n=`Soit $${e}$ la fonction définie  par :<br>
                            $${e}(x)=${l(o)}(x${i(u)})^2+\\sqrt{x}$. <br>
                            $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n):(n=`Soit $${e}$ la fonction définie  par :<br>
                              $${e}(x)=${l(o)}(\\sqrt{x}${i(u)})^2${i(b)}$. <br>         
                              $${e}$ est une fonction polynôme du second degré.`,this.canEnonce=n),this.autoCorrection[f]={enonce:n,propositions:[{texte:"Vrai",statut:o>10},{texte:"Faux",statut:o<10}],options:{ordered:!0}},t=y(this,f),n+=t.texte,$==="a"?r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
                      En développant l'expression, on obtient une fonction polynôme du troisième degré. `:$==="b"?r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
                      L'expression $${e}(x)$ contient une racine carrée de $x$. `:r=t.texteCorr+`La fonction $${e}$ n'est pas une fonction polynôme du second degré. <br>
                        L'expression $${e}(x)$ contient une racine carrée de $x$. `;break}this.questionJamaisPosee(f,o,x,a,p,c,u,b)&&(this.listeQuestions[f]=n,this.listeCorrections[f]=r,this.canReponseACompleter=t.texte,this.listeCanEnonces.push(this.canEnonce),this.listeCanReponsesACompleter.push(this.canReponseACompleter),f++),S++}v(this)}}export{je as dateDePublication,He as default,Je as interactifReady,Ne as interactifType,Ge as refs,Be as titre,ze as uuid};
//# sourceMappingURL=can1F22-DZS2dRLh.js.map

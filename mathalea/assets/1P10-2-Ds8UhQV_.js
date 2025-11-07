import{E as C,ae as _,ah as E,p as b,r as m,G as t,n as c,b as p,K as d,y as u,F as A,o as B,M as P}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ie="Calculer avec une probabilité conditionnelle",Ke=!0,Me="mathLive",Re="29/04/2025",Se="baee1",Ge={"fr-fr":["1P10-2"],"fr-ch":[]};class Je extends C{constructor(){super(),this.nbQuestions=1,this.sup=4,this.spacing=1.5,this.besoinFormulaireTexte=["Type de questions",["Nombres séparés par des tirets  :","1 : Sans situation (valeurs décimales)","2 : Sans situation (valeurs fractionnaires)","3 : Dans une situation","4 : Mélange"].join(`
`)]}nouvelleVersion(){const F=_({saisie:this.sup,min:1,max:3,melange:4,defaut:4,nbQuestions:this.nbQuestions}),O=E(F,this.nbQuestions);for(let $=0,s=0,r,o,l,f=0,i,a,n,v,h,x,e,q,g;$<this.nbQuestions&&f<50;){switch(h=`Pour tout événement $A$ (avec $P(A)\\neq 0$) et $B$ d'un univers $\\Omega$, on a  : <br>
          $P_{A}(B)=\\dfrac{P(A\\cap B)}{P(A)}$ ou encore  $P(A\\cap B)=P(A)\\times P_{A}(B)$.<br>
          En appliquant avec les données de l'énoncé, on obtient :<br>`,x=[["A","B"],["A","C"],["R","T"],["K","L"]],e=b(x),q=[[1,3,1,4],[2,3,3,7],[1,4,1,6],[3,4,1,7],[3,5,3,7],[2,3,2,9],[3,8,1,4],[4,7,1,4],[4,7,1,3],[1,6,1,9]],g=b(q),O[$]){case 1:i=m(1,9)/10,a=m(1,49)/100,n=i*a,b([!0,!1])?(l=t(i*a,3),c(this,s,{reponse:{value:l,compare:P}}),r=`On considère deux événements $${e[0]}$ et  $${e[1]}$ tels que : <br>
          $P(${e[0]})=${t(i,1)}$ et $P_{${e[0]}}(${e[1]})=${t(a,2)}$.<br>
         ${this.interactif?`$P(${e[0]}\\cap ${e[1]})=$`:`Calculer $P(${e[0]}\\cap ${e[1]})$.`}`,r+=p(this,s," "),o=h,o+=`
          $\\begin{aligned}
          P(${e[0]}\\cap ${e[1]})&=P(${e[0]}) \\times P_{${e[0]}}(${e[1]})\\\\
          &=${t(i,2)}\\times ${t(a,2)}\\\\
          &=${u(`${t(i*a,3)}`)}
          \\end{aligned}$`):(l=t(a,2),c(this,$,{reponse:{value:l,compare:P}}),r=`On considère deux événements $${e[0]}$ et  $${e[1]}$ tels que : <br>
          $P(${e[0]})=${t(i,1)}$ et $P(${e[0]}\\cap ${e[1]})=${t(n,3)}$.<br>
         ${this.interactif?`$P_{${e[0]}}(${e[1]})=$`:`Calculer $P_{${e[0]}}(${e[1]})$.`}`,r+=p(this,$," "),o=h,o+=`
          $\\begin{aligned}
         P_{${e[0]}}(${e[1]})&=\\dfrac{P(${e[0]}\\cap ${e[1]})}{P(${e[0]})}\\\\
          &=\\dfrac{${t(i*a,3)}}{${t(i,3)}}\\\\
          &=${u(`${t(a,3)}`)}
          \\end{aligned}$`);break;case 2:i=new A(g[0],g[1]),a=new A(g[2],g[3]),n=i.produitFraction(a).simplifie(),b([!0,!1])?(l=n.texFraction,c(this,s,{reponse:{value:l,options:{fractionEgale:!0}}}),r=`On considère deux événements $${e[0]}$ et  $${e[1]}$ tels que : <br>
        $P(${e[0]})=${i.texFraction}$ et $P_{${e[0]}}(${e[1]})=${a.texFraction}$.<br>
       ${this.interactif?`$P(${e[0]}\\cap ${e[1]})=$`:`Calculer $P(${e[0]}\\cap ${e[1]})$.`}`,r+=p(this,s,d.clavierDeBaseAvecFraction),o=h,o+=`
        $\\begin{aligned}
        P(${e[0]}\\cap ${e[1]})&=P(${e[0]}) \\times P_{${e[0]}}(${e[1]})\\\\
        &=${i.texFraction}\\times ${a.texFraction}\\\\
        &=${u(n.texFraction)}
        \\end{aligned}$`):(l=a.texFraction,c(this,s,{reponse:{value:l,options:{fractionEgale:!0}}}),r=`On considère deux événements $${e[0]}$ et  $${e[1]}$ tels que : <br>
        $P(${e[0]})=${i.texFraction}$ et $P(${e[0]}\\cap ${e[1]})=${n.texFraction}$.<br>
       ${this.interactif?`$P_{${e[0]}}(${e[1]})=$`:`Calculer $P_{${e[0]}}(${e[1]})$.`}`,r+=p(this,s,d.clavierDeBaseAvecFraction),o=h,o+=`
        $\\begin{aligned}
       P_{${e[0]}}(${e[1]})&=\\dfrac{P(${e[0]}\\cap ${e[1]})}{P(${e[0]})}\\\\
        &=${n.texFraction}\\div ${i.texFraction}\\\\
         &=${n.texFraction}\\times ${i.inverse().texFraction}\\\\
        &=${u(a.texFraction)}
        \\end{aligned}$`);break;case 3:default:switch(m(1,2)){case 1:i=m(40,60)/100,a=m(65,85)/100,n=i*a,v=b([`On estime que la proportion de spams, sur la boîte de messagerie électronique d’un particulier est de $${t(i*100,0)}\\,\\%$. <br>
               Un logiciel de suppression de spams est installé sur l'ordinateur. Il ne supprime que des spams mais ne supprime pas tous les spams.<br>
               On constate qu'il  supprime $${t(a*100,2)}\\,\\%$ de spams.<br>
                On choisit un message au hasard et on note $${e[0]}$ : « le message est un spam » et $${e[1]}$ : « le message est supprimé ».<br>
              En utilisant les événements  $${e[0]}$ et $${e[1]}$,  écrire la probabilité que le message soit un spam supprimé, puis calculer cette probabilité.`,`Le cuisinier d’une colonie de vacances a confectionné des beignets pour le goûter :<br>
 $${t(i*100,0)}\\,\\%$ des beignets sont à l’ananas, les autres sont aux pommes  et $${t(a*100,2)}\\,\\%$ des beignets à l’ananas sont aromatisés à la cannelle.<br>
On choisit un beignet au hasard. <br>
On définit les évènements suivants :<br>
• $${e[0]}$ : « le beignet choisi est à l’ananas » ;<br>
• $${e[1]}$ : « le beignet choisi est aromatisé à la cannelle ».<br>
En utilisant les événements  $${e[0]}$ et $${e[1]}$, écrire la probabilité que le beignet choisi soit un beignet à l'ananas aromatisé à la cannelle, puis calculer cette probabilité.`,`Le jour d'une grande journée de promotion, $${t(i*100,0)}\\,\\%$ des clients qui entrent dans un magasin ont été
contactés lors d'une  campagne publicitaire. Une étude statistique montre que la probabilité qu’un client effectue un achat sachant qu’il a été contacté au cours de la campagne publicitaire est de $${t(a,2)}$.<br>
On choisit au hasard un client du magasin lors de cette grande journée de promotion. <br>On définit les évènements suivants :<br>
• $${e[0]}$ : « le client choisi a été contacté lors de la campagne publicitaire ; »<br>
• $${e[1]}$ : le client choisi a effectué un achat ».<br>
En utilisant les événements  $${e[0]}$ et $${e[1]}$, écrire la probabilité que le client choisi ait été contacté par la campagne publicitaire et qu'il a fait un achat, puis calculer cette probabilité.`]),c(this,s,{reponse:{value:[`P(${e[0]}\\cap ${e[1]})`,`P(${e[1]}\\cap ${e[0]})`],options:{texteAvecCasse:!0}}}),c(this,s+1,{reponse:{value:t(n,4),compare:P}}),r=v,r+="<br>"+p(this,s,d.clavierProbabilite,{texteAvant:"Notation de la probabilité :"})+"<br>"+p(this,s+1,d.clavierDeBase,{texteAvant:"Valeur de la probabilité :"}),o=`La probabilité $P$ est donnée par  $${u(`P(${e[0]}\\cap ${e[1]})`)}$.<br>
              $\\begin{aligned}
              P(${e[0]}\\cap ${e[1]})&=P(${e[0]}) \\times P_{${e[0]}}(${e[1]})\\\\
              &=${t(i,4)}\\times ${t(a,4)}\\\\
              &=${u(`${t(i*a,4)}`)}
              \\end{aligned}$`;break;case 2:default:i=m(40,60)/100,a=m(89,95)/100,n=i*a,v=b([`On estime que la proportion de spams, sur la boîte de messagerie électronique d’un particulier est de $${t(i*100,0)}\\,\\%$. <br>
                  Un logiciel de suppression de spams est installé sur l'ordinateur. Il ne supprime que des spams mais ne supprime pas tous les spams.<br>
                 $${t(n*100,2)}\\,\\%$ des messages sont des spams supprimés.<br>
                 On note $${e[0]}$ : « le message est un spam » et $${e[1]}$ : « le message est supprimé ».<br>
                 On choisit un message au hasard.<br>
                  En utilisant les événements  $${e[0]}$ et $${e[1]}$, écrire la probabilité  que le message soit supprimé par le logiciel lorsque c'est un spam, puis calculer cette probabilité.`,`Le cuisinier d’une colonie de vacances a confectionné des beignets pour le goûter :<br>
                  $${t(i*100,0)}\\,\\%$  sont à l’ananas, les autres sont aux pommes  et $${t(n*100,1)}\\,\\%$  sont des beignets à l’ananas  aromatisés à la cannelle.<br>
                 On choisit un beignet au hasard. <br>
                 On définit les évènements suivants :<br>
                 • $${e[0]}$ : « le beignet choisi est à l’ananas » ;<br>
                 • $${e[1]}$ : « le beignet choisi est aromatisé à la cannelle ».<br>
                 En utilisant les événements  $${e[0]}$ et $${e[1]}$, écrire la probabilité que le beignet choisi soit aromatisé à la cannelle sachant que ce beignet est à l'ananas, puis calculer cette probabilité.`,`Le jour d'une grande journée de promotion, $${t(i*100,0)}\\,\\%$ des clients qui entrent dans un magasin ont été
contactés lors d'une  campagne publicitaire. Une étude statistique montre que, parmi tous les clients,  $${t(n*100,3)}\\,\\%$ ont été contactés lors de la campagne publicitaire et ont fait un achat.<br>
On choisit au hasard un client du magasin lors de cette grande journée de promotion. <br>On définit les évènements suivants :<br>
• $${e[0]}$ : « le client choisi a été contacté lors de la campagne publicitaire  » ;<br>
• $${e[1]}$ : « le client choisi a effectué un achat. »<br>
Le client choisi a été contacté lors de la campagne publicitaire.<br>
En utilisant les événements  $${e[0]}$ et $${e[1]}$, écrire la probabilité que ce client ait fait un achat, puis calculer cette probabilité.`]),c(this,s,{reponse:{value:[`P_{${e[0]}}(${e[1]})`],options:{texteAvecCasse:!0}}}),c(this,s+1,{reponse:{value:t(a,4),compare:P}}),r=v,r+="<br>"+p(this,s,d.clavierProbabilite,{texteAvant:"Notation de la probabilité :"})+"<br>"+p(this,s+1,d.clavierDeBase,{texteAvant:"Valeur de la probabilité :"}),o=`La probabilité $P$ est donnée par  $${u(`P_{${e[0]}}(${e[1]})`)}$.<br>
          $\\begin{aligned}
         P_{${e[0]}}(${e[1]})&=\\dfrac{P(${e[0]}\\cap ${e[1]})}{P(${e[0]})}\\\\
          &=\\dfrac{${t(n,4)}}{${t(i,4)}}\\\\
          &=${u(`${t(a,4)}`)}
          \\end{aligned}$`}break}this.questionJamaisPosee($,i)?(this.listeQuestions[$]=r,this.listeCorrections[$]=o,$++,s=this.autoCorrection.length):this.autoCorrection=this.autoCorrection.slice(0,s),f++}B(this)}}export{Re as dateDePublication,Je as default,Ke as interactifReady,Me as interactifType,Ge as refs,Ie as titre,Se as uuid};
//# sourceMappingURL=1P10-2-Ds8UhQV_.js.map

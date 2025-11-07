import{E as Ne,P as Oe,ae as Ue,F as O,p as le,r as f,T as Te,z as De,aw as Se,aF as Ce,G as i,aR as be,dk as L,dj as ne,am as je,m as ee,f as te,ah as ie,u as ye,y as D,b as Q,n as I,o as Me,bp as qe}from"./index-DjA7ROjC.js";import{c as He}from"./aleatoires-DoEZ-8p_.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./dateEtHoraires-DRPbpiPj.js";const ti="Effectuer des calculs liés aux homothéties",ii="28/11/2021",ri="15/04/2024",ai=!0,$i="mathLive",si="6f383",oi={"fr-fr":["3G13"],"fr-ch":["11ES3-5"]};function N(Ae,re,W,R="black",w=.5,l=!1){return re.x<W.x?qe(Ae,re,W,R,w,l):qe(Ae,W,re,R,w,l)}class li extends Ne{constructor(){super(),this.nbQuestions=4,this.nbCols=0,this.nbColsCorr=0,this.correctionDetailleeDisponible=!0,this.correctionDetaillee=!0,Oe.isHtml?this.spacing=1.5:this.spacing=0,Oe.isHtml?this.spacingCorr=1.5:this.spacingCorr=0,this.sup=12,this.sup2=3,this.sup3=1,this.sup4=!0,this.besoinFormulaireTexte=["Type de questions",["Nombres séparés par des tirets  :","1 : Calculer le rapport","2 : Calculer une longueur image","3 : Calculer une longueur antécédent","4 : Calculer une longueur image (deux étapes)","5 : Calculer une longueur antécédent (deux étapes)","6 : Calculer une aire image","7 : Calculer une aire antécédent","8 : Calculer le rapport à partir des aires","9 : Calculer le rapport connaissant OA et AA'","10 : Encadrer le rapport k","11 : Encadrer le rapport k connaissant OA et AA'","12 : Mélange"].join(`
`)],this.besoinFormulaire2Numerique=["Signe du rapport",3,`1 : Positif
2 : Négatif
3 : Mélange`],this.besoinFormulaire3Numerique=["Choix des valeurs",3,`1 : k est décimal
2 : k est fractionnaire
3 : k est une fractionnaire et les mesures sont entières`],this.besoinFormulaire4CaseACocher=["Figure dans l'énoncé (Cas 1 à 5 et 9 à 11)",!1]}nouvelleVersion(){const re=["rapport","image","antécédent","image2etapes","antecendent2etapes","aireImage","aireAntécédent","aireRapport","rapport2","encadrerk","encadrerk2"],W=Ue({saisie:this.sup,min:1,max:11,melange:12,defaut:12,nbQuestions:this.nbQuestions,listeOfCase:re}),R=this.sup3>1,w=this.sup3===3;for(let l=0,ce,d,n,$,ge=0;l<this.nbQuestions&&ge<50;){const ae=He(5,["P","Q","U","V","W","X","Y","Z"]),r=ae[0],a=ae[1],t=ae[2],y=ae[3],S=ae[4],we=new O(this.sup2===1?1:this.sup2===2?-1:le([1,-1]));let s=new O(1);do s=new O(R?f(1,9):le([f(15,40),f(1,9)]),R?f(1,9):10),s=s.produitFraction(we),s=s.simplifie();while(s.valeurDecimale===1);const h=s.valeurAbsolue(),v=h.valeurDecimale>1,p=s.valeurDecimale>0,ve=w?new O(f(1,19)):new O(f(11,99));let c=v?ve.entierDivise(10):ve;c=c.multiplieEntier(10**w*h.d**R);let u=s.produitFraction(c),E=new O(f(10,99,[parseInt(ve.valeurDecimale)]),10);E=E.multiplieEntier(10**w*h.d**R);let C=s.produitFraction(E),q=u.differenceFraction(c).simplifie();q=q.valeurAbsolue();let A=new O(le([f(1,4)*10+5+le([0,5]),f(1,9)]),1);A=A.entierDivise(10),A=A.simplifie();const x=w?new O(f(10,99)):new O(f(100,999),10),g=A.produitFractions(A,x).valeurDecimale,$e=Te(g,2),X=v?">":"<",U=v?"un agrandissement":"une réduction",T=v?p?"k > 1":"k < -1":p?"0 < k < 1":"-1 < k < 0",G=p?"positif":"négatif",m=p?"":"-",ue=p?"":"l'opposé de ",pe=p?"le":"l'opposé du ",Y=this.sup4?"":`de rapport ${G} et `,fe=p?"\\in":"\\notin",M=this.sup4?"":"Pour vous aider, illustrer cette situation par une figure (sans forcément respecter l'échelle).<br>",k=new O(1).diviseFraction(h),Ee=u.entierDivise(k.d).simplifie().valeurAbsolue().texFSD,Pe=C.entierDivise(k.denIrred).valeurAbsolue().valeurDecimale;let Z=new O(Math.max(c.valeurAbsolue().valeurDecimale,u.valeurAbsolue().valeurDecimale,q.valeurAbsolue().valeurDecimale),1);Z=new O(10,1).diviseFraction(Z),Z=Z.multiplieEntier(2);let me=u,xe=c,ke=!0;h.valeurDecimale<.3?me=c.produitFraction(new O(3,10).multiplieEntier((-1)**(s.valeurDecimale<0))):h.valeurDecimale<1&&h.valeurDecimale>.7?me=c.produitFraction(new O(7,10).multiplieEntier((-1)**(s.valeurDecimale<0))):h.valeurDecimale>1&&h.valeurDecimale<1.3?me=c.produitFraction(new O(13,10).multiplieEntier((-1)**(s.valeurDecimale<0))):h.valeurDecimale>4?xe=c.multiplieEntier(2):ke=!1;const P=!(ke&&this.sup4)||[4,5,6,7,8].includes(W[l])?"":"La figure ci-dessous n'est pas à l'échelle.<br>",Le=this.sup4?"La figure ci-dessous n'est pas à l'échelle.<br>":"";let e={O:De(0,0,`${t}`,"below"),A:De(xe.produitFraction(Z).valeurDecimale,0,`${r}`,"below"),hA:De(me.produitFraction(Z).valeurDecimale,0,`${a}`,"below")};const Be=le([f(20,50),f(130,160)]);e=Object.assign({},e,{B:Se(Ce(e.A,e.O,Be),e.O,1.2,`${y}`),hB:Se(Ce(e.hA,e.O,Be),e.O,1.2,`${S}`,p?"above":"below")}),u=u.valeurAbsolue().valeurDecimale;const Qe=w&&!h.estEntiere?`=${u}\\times ${k.texFSD}`+(k.d!==1?`=\\dfrac{${u}}{${k.d}}\\times ${k.n}=${Ee}\\times ${k.n}`:""):"";C=C.valeurAbsolue().valeurDecimale;const Ie=w&&!h.estEntiere?`=${C}\\times ${k.texFSD}`+(k.d!==1?`=\\dfrac{${C}}{${k.d}}\\times ${k.n}=${Pe}\\times ${k.n}`:""):"",se=(h.d===1||this.sup3===1)&&p?i(A.valeurDecimale):`\\left(${m}${this.sup3===1?i(A.valeurDecimale):A.texFSD}\\right)`,Fe=p?v?`${t}${r} + ${r}${a} = ${i(c.valeurAbsolue().valeurDecimale,2)} + ${i(q.valeurAbsolue().valeurDecimale,2)} `:`${t}${r} - ${r}${a} = ${i(c.valeurAbsolue().valeurDecimale,2)} - ${i(q.valeurAbsolue().valeurDecimale,2)}`:`${a}${r} - ${t}${r} = ${i(q.valeurAbsolue().valeurDecimale,2)} - ${i(c.valeurAbsolue().valeurDecimale,2)}`;e=Object.assign({},e,{segmentOA:be(e.O,e.A),segmentOhA:be(e.O,e.hA),segmentOB:be(e.O,e.B),segmentOhB:be(e.O,e.hB)}),e=Object.assign({},e,{arcOA:v||!p?e.A:ne(e.O,e.A,60,!1),arcOhA:!v||!p?e.hA:ne(e.O,e.hA,60,!1),arcOB:v||!p?e.B:ne(e.B,e.O,60,!1),arcOhB:!v||!p?e.hB:ne(e.hB,e.O,60,!1),arcAhA:p?e.A:ne(e.hA,e.A,60,!1),legendeOA:v||!p?N(`$${i(c.valeurDecimale)}~\\text{cm}$`,e.A,e.O,"black",.6):L(`$${i(c.valeurDecimale)}~\\text{cm}$`,e.O,e.A,60,"black",.3),legendeOhA:!v||!p?N(`$${i(u)}~\\text{cm}$`,e.hA,e.O,"black",.6):L(`$${i(u)}~\\text{cm}$`,e.O,e.hA,60,"black",.3),legendeOB:v||!p?N(`$${i(E.valeurDecimale)}~\\text{cm}$`,e.B,e.O,"black",.6):L(`$${i(E.valeurDecimale)}~\\text{cm}$`,e.B,e.O,60,"black",.3),legendeOhB:!v||!p?N(`$${i(C)}~\\text{cm}$`,e.hB,e.O,"black",.6):L(`$${i(C)}~\\text{cm}$`,e.hB,e.O,60,"black",.3),legendeAhA:p?N(`$${i(q.valeurDecimale)}~\\text{cm}$`,e.hA,e.A,"black",.6):L(`$${i(q.valeurDecimale)}~\\text{cm}$`,e.hA,e.A,60,"black",.3)}),e.arcOA.pointilles=5,e.arcOhA.pointilles=5,e.arcOB.pointilles=5,e.arcOhB.pointilles=5,e.arcAhA.pointilles=5,e=Object.assign({},e,{legendeOAi:v||!p?N("$?$",e.O,e.A,"black",.6):L("$?$",e.O,e.A,60,"black",.3),legendeOhAi:!v||!p?N("$?$",e.O,e.hA,"black",.6):L("$?$",e.hA,e.O,60,"black",.3,!0),legendeOBi:v||!p?N("$?$",e.O,e.B,"black",.6):L("$?$",e.B,e.O,60,"black",.3),legendeOhBi:!v||!p?N("$?$",e.O,e.hB,"black",.6):L("$?$",e.hB,e.O,60,"black",.3,!0)});let o=[];const z=Oe.isHtml?1:.4,H=je(e.O,e.A,e.hA);o=[e.segmentOA,e.segmentOhA,e.legendeOA,e.legendeOhA],e.arcOA.typeObjet!=="point"&&o.push(e.arcOA),e.arcOhA.typeObjet!=="point"&&o.push(e.arcOhA);let j=ee(Object.assign({},te([...o,...H]),{style:"inline",scale:z}),o,H);j={enonce:this.sup4?j+"<br>":"",solution:this.sup4?"":j+"<br>"},o=[e.segmentOA,e.segmentOhA,e.legendeOA,e.legendeOhAi],e.arcOA.typeObjet!=="point"&&o.push(e.arcOA),e.arcOhA.typeObjet!=="point"&&o.push(e.arcOhA);let K=ee(Object.assign({},te([...o,...H]),{style:"inline",scale:z}),o,H);K={enonce:this.sup4?K+"<br>":"",solution:this.sup4?"":K+"<br>"},o=[e.segmentOA,e.segmentOhA,e.legendeOhA,e.legendeOAi],e.A.typeObjet!=="point"&&o.push(e.A),e.O.typeObjet!=="point"&&o.push(e.O),e.hA.typeObjet!=="point"&&o.push(e.hA),e.arcOA.typeObjet!=="point"&&o.push(e.arcOA),e.arcOhA.typeObjet!=="point"&&o.push(e.arcOhA);let _=ee(Object.assign({},te([...o,...H]),{style:"inline",scale:z}),o,H);_={enonce:this.sup4?_+"<br>":"",solution:this.sup4?"":_+"<br>"};const he=je(e.O,e.A,e.hA,e.B,e.hB);o=[e.segmentOA,e.segmentOhA,e.segmentOB,e.segmentOhB,e.legendeOA,e.legendeOhA,e.legendeOB,e.legendeOhBi],e.A.typeObjet!=="point"&&o.push(e.A),e.O.typeObjet!=="point"&&o.push(e.O),e.hA.typeObjet!=="point"&&o.push(e.hA),e.B.typeObjet!=="point"&&o.push(e.B),e.hB.typeObjet!=="point"&&o.push(e.hB),e.arcOA.typeObjet!=="point"&&o.push(e.arcOA),e.arcOB.typeObjet!=="point"&&o.push(e.arcOB),e.arcOhA.typeObjet!=="point"&&o.push(e.arcOhA),e.arcOhB.typeObjet!=="point"&&o.push(e.arcOhB);let V=ee(Object.assign({},te([...o,...he]),{style:"inline",scale:z}),o,he);V={enonce:this.sup4?V+"<br>":"",solution:this.sup4?"":V+"<br>"},o=[e.segmentOA,e.segmentOhA,e.segmentOB,e.segmentOhB,e.legendeOBi,e.legendeOhB,e.legendeOA,e.legendeOhA],e.arcOA.typeObjet!=="point"&&o.push(e.arcOA),e.arcOhA.typeObjet!=="point"&&o.push(e.arcOhA),e.arcOB.typeObjet!=="point"&&o.push(e.arcOB),e.arcOhB.typeObjet!=="point"&&o.push(e.arcOhB);let oe=ee(Object.assign({},te([...o,...he]),{style:"inline",scale:z}),o,he);oe={enonce:this.sup4?oe+"<br>":"",solution:this.sup4?"":oe+"<br>"},o=[e.segmentOA,e.segmentOhA,e.legendeOA,e.legendeOhA,e.legendeAhA],e.arcOA.typeObjet!=="point"&&o.push(e.arcOA),e.arcOhA.typeObjet!=="point"&&o.push(e.arcOhA),e.arcAhA.typeObjet!=="point"&&o.push(e.arcAhA);let J=ee(Object.assign({},te([...o,...H]),{style:"inline",scale:z}),o,H);J={enonce:this.sup4?"<br>"+J+"<br>":"",solution:this.sup4?"":J+"<br>"};let b,B,F,de;switch(W[l]){case"rapport":b=[`${t}${a}=${i(u)}\\text{ cm}`,`${t}${r}=${i(c.valeurDecimale)}\\text{ cm}`],d=ie([0,1]),B=b[d[0]],F=b[d[1]],n=`$${a}$ est l'image de $${r}$
          par une homothétie ${Y}
          de centre $${t}$ tel que $${B}$ et $${F}$.
          <br>
          ${M} ${P}
          Calculer le rapport $k$ de cette homothétie`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :"}),n+=".<br>"+j.enonce,I(this,l,{reponse:{value:s.texFSD}}),this.correctionDetaillee?($=`$[${t}${a}]$ est l'image de $[${t}${r}]$ par cette homothétie
            et $${t} ${a} ${X} ${t} ${r}$,
            donc c'est ${U} et on a : $${T}$.<br>
            ${j.solution}
            `,$+=`Le rapport de cette homothétie est ${pe} quotient
            de la longueur d'un segment "à l'arrivée"
            par sa longueur "au départ".
            <br>
            Soit `):$=j.solution,$+=`$k=${m}\\dfrac{${t}${a}}{${t}${r}}=${m}\\dfrac{${i(u)}}{${i(c.valeurDecimale)}}=${D(this.sup3===1?i(s.valeurDecimale,2):s.texFSD)}$.`;break;case"image":n=`$${a}$ est l'image de $${r}$ par une homothétie
          de centre $${t}$ et de rapport $k=${this.sup3===1?i(s.valeurDecimale):s.texFSD}$
          tel que $ {${t}${r}=${c.valeurDecimale}\\text{ cm}}$.
          <br>
          ${M} ${P} 
          Calculer $${t}${a}$`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :",texteApres:"$ \\text{ cm}$"}),n+=".<br>"+K.enonce,I(this,l,{reponse:{value:u}}),this.correctionDetaillee?($=`$[${t}${a}]$ est l'image de $[${t}${r}]$ par cette homothétie et $${T}$, donc $[${t}${a}]$ est ${U} de $[${t}${r}]$.
            <br>${K.solution}`,$+=`Une homothétie de rapport ${G} est
            une transformation qui multiplie
            toutes les longueurs par ${ue} son rapport.
            <br>
            Soit $${t}${a}=${m}k \\times ${t}${r}$.
            <br>
            Donc `):$=K.solution,$+=`$${t}${a}= ${this.sup3===1?i(h.valeurDecimale):h.texFSD} \\times ${i(c.valeurDecimale)} =  ${D(i(u))}~\\text{cm}$.`;break;case"antécédent":n=`$${a}$ est l'image de $${r}$ par une
          homothétie de centre $${t}$ et de rapport
          $k=${this.sup3===1?i(s.valeurDecimale):s.texFSD}$ tel que $ {${t}${a}=${i(u)}\\text{ cm}}$.
          <br>
          ${M} ${P} 
          Calculer $${t}${r}$`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :",texteApres:"$ \\text{ cm}$"}),n+=".<br>"+_.enonce,I(this,l,{reponse:{value:c.texFSD}}),this.correctionDetaillee?$=`$[${t}${a}]$ est l'image de $[${t}${r}]$ par cette homothétie et 
            $${T}$, donc $[${t}${a}]$ est ${U} de $[${t}${r}]$.
            <br>${_.solution}
            Une homothétie de rapport ${G} est
            une transformation qui multiplie
            toutes les longueurs par ${ue} son rapport.
            <br>
            Soit $${t}${a}=${m}k \\times  ${t}${r}$.
            <br>
            Donc `:$=_.solution,$+=`$${t}${r}=\\dfrac{${t}${a}}{${m}k}=\\dfrac{${i(u)}}{${this.sup3===1?i(h.valeurDecimale):h.texFSD}} ${Qe} = ${D(i(c.valeurDecimale))}~\\text{cm}$.`;break;case"image2etapes":b=[`${t}${y}=${i(E.valeurDecimale)}\\text{ cm}`,`${t}${a}=${i(u)}\\text{ cm}`,`${t}${r}=${i(c.valeurDecimale)}\\text{ cm}`],d=ie([0,1,2]),B=b[d[0]],F=b[d[1]],de=b[d[2]],n=`$${a}$ et $${S}$ sont les images respectives
          de $${r}$ et $${y}$ par une homothétie
          ${Y} de centre $${t}$ tel que
          $ {${B}}$, $ {${F}}$ et $ {${de}}$.
          <br>
          ${M} ${P} 
          Calculer $${t}${S}$`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :",texteApres:"$ \\text{ cm}$"}),n+=".<br>"+V.enonce,I(this,l,{reponse:{value:C}}),this.correctionDetaillee?($=`$[${t}${a}]$ est l'image de $[${t}${r}]$
            et $${t} ${a} ${X} ${t} ${r}$
            donc c'est ${U} et on a : $${T}$.
            <br>${V.solution}`,$+=`Le rapport de cette homothétie est
            ${pe} quotient de la longueur d'un segment
            "à l'arrivée" par sa longueur "au départ".
            <br>
            Soit $k=${m}\\dfrac{${t}${a}}{${t}${r}}=${m}\\dfrac{${i(u)}}{${i(c.valeurDecimale)}}=${this.sup3===1?i(s.valeurDecimale):s.texFSD}$.
            <br>
            $[${t}${S}]$ est l'image de $[${t}${y}]$.
            <br>
            Or, une homothétie de rapport ${G}
            est une transformation qui multiplie
            toutes les longueurs par ${ue} son rapport.
            <br>
            Soit $${t}${S}= ${m}k \\times ${t}${y}$.
            <br>
            Donc `):($=V.solution,$+=`Soit $k=${m}\\dfrac{${t}${a}}{${t}${r}}=${m}\\dfrac{${i(u)}}{${i(c.valeurDecimale)}}=${this.sup3===1?i(s.valeurDecimale):s.texFSD}$.
            <br><br>`),$+=`$${t}${S}= ${this.sup3===1?i(h.valeurDecimale):h.texFSD} \\times ${i(E.valeurDecimale)} = ${D(i(C))}~\\text{cm}$.`;break;case"antecendent2etapes":b=[`${t}${S}=${i(C)}\\text{ cm}`,`${t}${a}=${i(u)}\\text{ cm}`,`${t}${r}=${i(c.valeurDecimale)}\\text{ cm}`],d=ie([0,1,2]),B=b[d[0]],F=b[d[1]],de=b[d[2]],n=`$${a}$ et $${S}$ sont les images respectives
          de $${r}$ et $${y}$ par une homothétie ${Y}
          de centre $${t}$ tel que
          $ {${B}}$, $ {${F}}$ et $ {${de}}$.
          <br>
          ${M} ${Le} 
          Calculer $${t}${y}$`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :",texteApres:"$ \\text{ cm}$"}),n+=".<br>"+oe.enonce,I(this,l,{reponse:{value:E.texFSD}}),this.correctionDetaillee?($=`$[${t}${a}]$ est l'image de $[${t}${r}]$
            et $${t} ${a} ${X} ${t} ${r}$
            donc c'est ${U} et on a : $${T}$.
            <br>${oe.solution}`,$+=`Le rapport de cette homothétie est ${pe} quotient
            de la longueur d'un segment "à l'arrivée" par sa longueur "au départ".
            <br>
            Soit $k=${m}\\dfrac{${t}${a}}{${t}${r}}=${m}\\dfrac{${i(u)}}{${i(c.valeurDecimale)}}=${this.sup3===1?i(s.valeurDecimale):s.texFSD}$.
            <br>
            $[${t}${S}]$ est l'image de $[${t}${y}]$.
            <br>
            Or, une homothétie de rapport ${G} est
            une transformation qui multiplie
            toutes les longueurs par ${ue} son rapport.
            <br>
            Soit $${t}${S}=${m}k \\times ${t}${y}$.
            <br>
            Donc `):($=V.solution,$+=`Soit $k=${m}\\dfrac{${t}${a}}{${t}${r}}=${m}\\dfrac{${i(u)}}{${i(c.valeurDecimale)}}=${this.sup3===1?i(s.valeurDecimale):s.texFSD}$.
            <br><br>`),$+=`$${t}${y}=\\dfrac{${t}${S}}{${m}k}=\\dfrac{${i(C)}}{${this.sup3===1?i(h.valeurDecimale):h.texFSD}} ${Ie} = ${D(i(E.valeurDecimale))}~\\text{cm}$.`;break;case"aireImage":ce=g===$e?"":"environ",n=`Une figure a pour aire $ {${i(x.valeurDecimale)}\\text{ cm}^2}$.<br>
          Calculer l'aire de son image par une homothétie de rapport $${m}${this.sup3===1?i(A.valeurDecimale):A.texFSD}$`,this.interactif?n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :",texteApres:" $\\text{ cm}^2$ (arrondi au $\\text{ mm}^2$ si besoin)"}):n+=" (arrondir au $\\text{mm}^2$ près si besoin)",I(this,l,{reponse:{value:$e}}),$=`$${se}^2 \\times ${i(x.valeurDecimale)}`,$+=ce==="environ"?` = ${i(g)} \\approx ${D(i($e))}`:` = ${D(i(g))}`,$+="~\\text{cm}^2$",this.correctionDetaillee&&($=`Une homothétie est une transformation qui multiplie toutes les aires par le carré de son rapport.
            <br>
            $${se}^2 \\times ${i(x.valeurDecimale)} = ${i(g)}`,$+=ce==="environ"?`\\approx ${i($e)}`:"",$+=`$<br>
            Donc l'aire de l'image de cette figure est ${ce} $ {${D(i($e))}~\\text{cm}^2}$.`);break;case"aireAntécédent":n=`L'image d'une figure par une homothétie de rapport $${m}${this.sup3===1?i(A.valeurDecimale):A.texFSD}$ a pour aire $ {${i(g)}\\text{ cm}^2}$.
          <br>
          Calculer l'aire de la figure de départ`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :",texteApres:" $\\text{ cm}^2$"}),n+=".",I(this,l,{reponse:{value:x.texFSD}}),$=`$ {\\dfrac{${i(g)}}{${se}^2} = ${D(i(x.valeurDecimale))}~\\text{cm}^2}$`,this.correctionDetaillee&&($=`Une homothétie est une transformation qui multiplie toutes les aires par le carré de son rapport.
            <br>
            Notons $\\mathscr{A}$ l'aire de la figure de départ.
            <br>
            D'où $${se}^2 \\times \\mathscr{A} = ${i(g)}$.
            <br>
            Puis $\\mathscr{A}=\\dfrac{${i(g)}}{${se}^2}=${i(x.valeurDecimale)}$.
            <br>
            Donc l'aire de la figure de départ est $ {${D(i(x.valeurDecimale))}~\\text{cm}^2}$.`);break;case"aireRapport":A=G==="positif"?A:A.multiplieEntier(-1),n=`Une figure et son image par une homothétie de rapport ${G} ont respectivement pour aires $ {${i(x.valeurDecimale)}\\text{ cm}^2}$ et $ {${i(g)}\\text{ cm}^2}$.
          <br>
          Calculer le rapport de l'homothétie`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :"}),n+=".",I(this,l,{reponse:{value:A.texFSD}}),this.correctionDetaillee&&($=`Une homothétie est une transformation qui multiplie toutes les aires par le carré de son rapport. <br>
            Notons $k$ le rapport de cette homothétie.
            On a donc $k^2 \\times ${i(x.valeurDecimale)} = ${i(g)}$,
            ou encore $k^2=\\dfrac{${i(g)}}{${i(x.valeurDecimale)}}$.
            <br>
            D'où `),$+=`$ {k=${m}\\sqrt{\\dfrac{${i(g)}}{${i(x.valeurDecimale)}}} = ${D(this.sup3===1?i(A.valeurDecimale):A.texFSD)}}$.`;break;case"rapport2":b=[`${r}${a}=${i(q.valeurDecimale)}\\text{ cm}`,`${t}${r}=${i(c.valeurDecimale)}\\text{ cm}`],d=ie([0,1]),B=b[d[0]],F=b[d[1]],n=`$${a}$ est l'image de $${r}$
          par une homothétie ${Y}
          de centre $${t}$ tel que $ {${B}}$ et $ {${F}}$.
          <br>
          ${M} ${P} 
          Calculer le rapport $k$ de cette homothétie`,n+=Q(this,l,"clavierDeBaseAvecFraction  ",{texteAvant:" :"}),n+=".<br>"+J.enonce,I(this,l,{reponse:{value:s.texFSD}}),this.correctionDetaillee?($=`$${t}${a} = ${Fe} = ${i(u)}\\text{ cm}$
            <br>
            $[${t}${a}]$ est l'image de $[${t}${r}]$
            et $${t} ${a} ${X} ${t} ${r}$
            donc c'est ${U} et on a : $${T}$.
            <br> ${j.solution}`,$+=`Le rapport de cette homothétie est ${pe} quotient
            de la longueur d'un segment "à l'arrivée"
            par sa longueur "au départ".
            <br>
            Soit `):$=j.solution,$+=`$k=${m}\\dfrac{${t}${a}}{${t}${r}}=${m}\\dfrac{${i(u)}}{${i(c.valeurDecimale)}}=${D(this.sup3===1?i(s.valeurDecimale):s.texFSD)}$.`;break;case"encadrerk":b=[`${t}${a}=${i(u)}\\text{ cm}`,`${t}${r}=${i(c.valeurDecimale)}\\text{ cm}`],d=ie([0,1]),B=b[d[0]],F=b[d[1]],n=`$${a}$ est l'image de $${r}$
          par une homothétie ${Y}
          de centre $${t}$ tel que $ {${B}}$ et $ {${F}}$.
          <br>
          ${M} ${P} 
          Sans effectuer de calculs, que peut-on dire du rapport $k$ de cette homothétie ? Choisir la bonne réponse.
          <br>
          ${P}
          ${j.enonce}`,this.autoCorrection[l]={},this.autoCorrection[l].propositions=[{texte:"$k < -1$",statut:s.valeurDecimale<-1},{texte:"$ -1 < k < -0 $",statut:s.valeurDecimale>-1&&s.valeurDecimale<0},{texte:"$0 < k < 1$",statut:s.valeurDecimale<1&&s.valeurDecimale>0},{texte:"$k > 1$",statut:s.valeurDecimale>1}],this.autoCorrection[l].options={ordered:!1},n+="<br>"+ye(this,l).texte,this.correctionDetaillee?$=`$[${t}${a}]$ est l'image de $[${t}${r}]$
            et $${t} ${a} ${X} ${t} ${r}$
            donc c'est ${U}.
            <br>
            De plus, $${a}${fe}[${t}${r})$.
            ${j.solution}
            <br>Donc `:$=j.solution+"<br>",$+=`$${D(T)}$`,$+=this.correctionDetaillee?".":"";break;case"encadrerk2":b=[`${r}${a}=${i(q.valeurDecimale)}\\text{ cm}`,`${t}${r}=${i(c.valeurDecimale)}\\text{ cm}`],d=ie([0,1]),B=b[d[0]],F=b[d[1]],n=`$${a}$ est l'image de $${r}$
          par une homothétie ${Y}
          de centre $${t}$ tel que $ {${B}}$ et $ {${F}}$.
          <br>
          ${M} ${P} 
          Sans effectuer de calculs, que peut-on dire du rapport $k$ de cette homothétie ? Choisir la bonne réponse.
          <br>
          ${P}
          ${J.enonce}`,this.autoCorrection[l]={},this.autoCorrection[l].propositions=[{texte:"$k < -1$",statut:s.valeurDecimale<-1},{texte:"$ -1 < k < -0 $",statut:s.valeurDecimale>-1&&s.valeurDecimale<0},{texte:"$0 < k < 1$",statut:s.valeurDecimale<1&&s.valeurDecimale>0},{texte:"$k > 1$",statut:s.valeurDecimale>1}],this.autoCorrection[l].options={ordered:!1},n+="<br>"+ye(this,l).texte,this.correctionDetaillee?$=`$${t}${a} = ${Fe} = ${i(u)}\\text{ cm}$
            <br>
            $[${t}${a}]$ est l'image de $[${t}${r}]$
            et $${t} ${a} ${X} ${t} ${r}$
            donc c'est ${U}.
            <br>
            De plus, $${a}${fe}[${t}${r})$.
            ${J.solution}
            <br>Donc `:$=J.solution+"<br>",$+=`$${D(T)}$`,$+=this.correctionDetaillee?".":"";break}this.questionJamaisPosee(l,s)&&(this.listeQuestions[l]=n,this.listeCorrections[l]=$,l++),ge++}Me(this)}}export{ri as dateDeModifImportante,ii as dateDePublication,li as default,ai as interactifReady,$i as interactifType,oi as refs,ti as titre,si as uuid};
//# sourceMappingURL=3G13-BJKOx8k-.js.map

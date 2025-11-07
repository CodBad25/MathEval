var tt=Object.defineProperty;var et=(d,p,e)=>p in d?tt(d,p,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[p]=e;var D=(d,p,e)=>et(d,typeof p!="symbol"?p+"":p,e);import{cp as ot,z as v,aa as l,a9 as a,aF as f,a1 as H,x as I,R as rt,m as g,f as x,bR as z,L as st,dq as q,aA as G,cQ as it,p as k,r as nt,P as b}from"./index-Bk_D2JkM.js";import{c as Q}from"./lists-C9cc3WE2.js";import{s as S}from"./scratchblock-CshoMrZ3.js";import{E as ct}from"./ExerciceBrevetA-SMkyb2rK.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const ye="972f6",Ae={"fr-fr":["3I1DNB-0","3Z1DNB-16"],"fr-ch":[]},qe="Scratch",Me="7/12/2024";class Be extends ct{constructor(){super();D(this,"versionOriginale",()=>{this.appliquerLesValeurs("losange",20,3,40,3,60,"direct")});D(this,"versionAleatoire",e=>{const o=k(["carré","losange","rectangle"]),m=k([3,4,5]),u=nt(4,5)*5,P=m>4?u/2:m>3?u:u*2,i=o==="losange"?k([50,60,70]):45,M=o==="losange"?k([3,4,5]):k([4,6]),V=k(["direct","indirect"]);this.appliquerLesValeurs(o,u,M,P,m,i,V)});this.besoinFormulaireCaseACocher=["Sujet original",!1],this.sup=!1,this.introduction=ot("D'après l'exercice 5 du brevet Amérique du sud 2024.<br>"),this.versionAleatoire(0)}appliquerLesValeurs(e,o,m,u,P,i,M){let j,y,r;const n=M==="direct",$=n?-1:1;switch(e){case"rectangle":{j=`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]
        \\initmoreblocks{définir \\namemoreblocks{${e}}}
        \\blockpen{stylo en position d'écriture}
        \\blockrepeat{répéter \\ovalnum{2} fois}
        {
        \\blockmove{avancer de \\ovalnum{${o}} pas}
        \\blockmove{tourner ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{90} degrés}
         \\blockmove{avancer de \\ovalnum{a} pas}
        \\blockmove{tourner  ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{b} degrés}
      }
         \\blockpen{relever le stylo}
         \\end{scratch}`,y=`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]
        \\initmoreblocks{définir \\namemoreblocks{Motif A}}
        \\blockrepeat{répéter \\ovalnum{${m}} fois}
        {
           \\blockmoreblocks{${e}}
           \\blockmove{tourner ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{${i}} degrés}
        }
         \\end{scratch}
`;const t=v(0,0),s=l(t,a(o/5,0)),c=f(l(s,a(o/10,0)),s,$*90),h=l(c,a(-o/5,0));r=H([t,s,c,h])}break;case"carré":{j=`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]
        \\initmoreblocks{définir \\namemoreblocks{${e}}}
        \\blockpen{stylo en position d'écriture}
        \\blockrepeat{répéter \\ovalnum{2} fois}
        {
        \\blockmove{avancer de \\ovalnum{${o}} pas}
        \\blockmove{tourner ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{90} degrés}
         \\blockmove{avancer de \\ovalnum{a} pas}
        \\blockmove{tourner  ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{b} degrés}
      }
         \\blockpen{relever le stylo}
         \\end{scratch}
`,y=`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]
        \\initmoreblocks{définir \\namemoreblocks{Motif A}}
        \\blockrepeat{répéter \\ovalnum{${m}} fois}
        {
           \\blockmoreblocks{${e}}
           \\blockmove{tourner ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{${i}} degrés}
        }
         \\end{scratch}
`;const t=v(0,0),s=l(t,a(o/5,0)),c=f(l(s,a(o/5,0)),s,$*90),h=l(c,a(-o/5,0));r=H([t,s,c,h])}break;default:{j=`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]

        \\initmoreblocks{définir \\namemoreblocks{${e}}}
        \\blockpen{stylo en position d'écriture}
        \\blockrepeat{répéter \\ovalnum{2} fois}
        {
        \\blockmove{avancer de \\ovalnum{${o}} pas}
        \\blockmove{tourner ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{60} degrés}
         \\blockmove{avancer de \\ovalnum{a} pas}
        \\blockmove{tourner  ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{b} degrés}
      }
         \\blockpen{relever le stylo}
         \\end{scratch}
`,y=`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]
        \\initmoreblocks{définir \\namemoreblocks{Motif A}}
        \\blockrepeat{répéter \\ovalnum{${m}} fois}
        {
           \\blockmoreblocks{${e}}
           \\blockmove{tourner ${n?"\\turnright{}":"\\turnleft{}"} de \\ovalnum{${i}} degrés}
        }
         \\end{scratch}
`;const t=v(0,0),s=l(t,a(o/5,0)),c=f(l(s,a(o/5,0)),s,$*60),h=l(c,a(-o/5,0));r=H([t,s,c,h])}break}const Z=I("Point et",-5,1),_=I("orientation",-5,0),J=I("de départ.",-5,-1),w=rt(v(-3,0),v(-.5,0));w.styleExtremites="->";const F=[r,w,Z,_,J],K=g(Object.assign({pixelsParCm:15,scale:.5},x(F)),F),B=[r];for(let t=1;t<m;t++)B.push(f(r,r.listePoints[0],$*i*t));const T=g(Object.assign({pixelsParCm:15,scale:.5},x(B)),B),N=this.sup?i-10:i===50?60:i===60?70:60,C=[r];for(let t=1;t<(e==="losange"?6:8);t++)C.push(f(r,r.listePoints[0],$*i*t));const U=g(Object.assign({pixelsParCm:15,scale:.5},x(C)),C),E=[r];for(let t=1;t<m;t++)E.push(f(r,r.listePoints[0],$*N*t));let L=[g(Object.assign({pixelsParCm:15,scale:.5},x(E)),E),U,T];const A=3;this.sup||(L=L.map((t,s,c)=>c[(s-A+3)%3]));const O=[r];for(let t=1;t<P;t++)O.push(l(r,a(t*u/5,0)));const W=g(Object.assign({pixelsParCm:15,scale:.5},x(O)),O);let R=`Dans cet exercice, aucune justification n'est attendue pour les réponses apportées aux questions 1 et 2.<br>
À l'aide d'un logiciel de programmation, on définit un bloc ${z(e)} pour construire un ${e}.<br>
${st(`${q(G(`Bloc «${e}»`,"black"))}
${S(j)}`,`${q(G(`${z(e)} obtenu`,"black"))}
${K}`,{largeur1:50,widthmincol1:"100px",widthmincol2:"100px",eleId:""})}
`;const X=L.map((t,s)=>`${q(`figure ${s+1}`)}${t}`);R+=Q({items:[`Dans le bloc «${e}», par quelles valeurs faut-il remplacer $a$ et $b$ pour obtenir le ${e} ci-dessus ?`,`On définit ensuite un nouveau bloc nommé  «Motif A» :<br>
    ${S(y)}<br>
    Parmi les figures ci-dessous, laquelle est obtenue en utilisant le bloc «Motif A» ?<br>
    ${it(...X,200,200)}`,`On définit un nouveau bloc nommé «Motif B» :<br>
    En l'exécutant on obtient la figure ci-dessous :<br>
    ${q(W)}
    Écrire un script du bloc «Motif B».`],style:"nombres"});const Y=Q({items:[`${e==="rectangle"?`Le ${e} ci-dessus, a une largeur qui est la moitié de sa longueur, il faut donc remplacer $a$ par $${o/2}$.<br>`:`La figure ci-dessus est un ${e} dont les côtés sont de même mesure, il faut donc remplacer $a$ par $${o}$.<br>`}
         Il faut remplacer $b$  par $2$ car les instructions de la boucle ne construisent que deux côtés.`,`La figure obtenue en utilisant le bloc «Motif A» est la figure ${this.sup?3:(2+A)%3+1}.<br>
        En effet, la figure ${this.sup?1:(0+A)%3+1} est obtenue en utilisant un angle de $${N}^{\\circ}$ et la figure ${this.sup?2:(1+A)%3+1} comporte ${e==="rectangle"?8:6} ${e}s.`,`Voici un script du bloc «Motif B» :<br>
        ${S(`\\begin{scratch}[${b.isHtml?"print,":""}fill,blocks,scale=0.8]

        \\initmoreblocks{définir \\namemoreblocks{Motif B}}
        \\blockpen{stylo en position d'écriture}
        \\blockrepeat{répéter \\ovalnum{${P}} fois}
        {
           \\blockmoreblocks{${e}}
           \\blockmove{avancer de \\ovalnum{${u}} pas}
        }
         \\end{scratch}
`)}`],style:"nombres"});this.enonce=R,this.correction=Y}}export{Me as dateDePublication,Be as default,Ae as refs,qe as titre,ye as uuid};
//# sourceMappingURL=3I1DNB-0-Try-t45Q.js.map

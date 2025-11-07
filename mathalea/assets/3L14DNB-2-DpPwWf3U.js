var ne=Object.defineProperty;var pe=(b,c,e)=>c in b?ne(b,c,{enumerable:!0,configurable:!0,writable:!0,value:e}):b[c]=e;var B=(b,c,e)=>pe(b,typeof c!="symbol"?c+"":c,e);import{cp as $e,k as o,v as a,cl as ce,q as P,I as ae,b2 as x,R as u,m as me,f as le,P as xe,p as ue,r as g,ay as G}from"./index-DjA7ROjC.js";import{c as F}from"./lists-CMnbjK1R.js";import{E as be}from"./ExerciceBrevetA-pPkq9xLI.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Li="972f7",Di={"fr-fr":["3L14DNB-2","3Z1DNB-14"],"fr-ch":["11FA4-5","1mCL1-13"]},Si="Programme de calcul et calcul littéral",ji="25/11/2024";class Ci extends be{constructor(){super();B(this,"versionOriginale",()=>{this.appliquerLesValeurs(2,4,5,-3,2,-3)});B(this,"versionAleatoire",e=>{let r=1,t=1,i=2,p=-3,n=-2,$=3,m=2,l=-3;do r=ue([1,-1]),t=-r,i=g(2,5)*r,p=g(2,5)*t,n=g(2,5),$=g(2,5,n),m=g(2,7),l=-g(2,7,m);while((m+i)*n*(m*$+p)===0||(l+i)*n*(l*$+p)===0);this.appliquerLesValeurs(i,n,$,p,m,l)});this.besoinFormulaireCaseACocher=["Sujet original",!1],this.sup=!1,this.introduction=$e("D'après l'exercice 2 du brevet Amérique du Nord 2024.")+"<br><br>",this.versionAleatoire(0)}appliquerLesValeurs(e,r,t,i,p,n){const $=G(e)==="+",m=G(i)==="+",l=s=>(s+e)*r*(s*t+i),d=s=>(s+e)*r,y=s=>s*t+i,A=l(p),R=l(n),h=[{exp:`\\Big(x${o(e)}\\times ${a(r)}\\Big)\\Big(x\\times ${a(t)}${o(i)}\\Big)`,isGood:!1},{exp:`\\Big(${r}x${o(e)}\\Big)\\Big(${t}x${o(i)}\\Big)`,isGood:!1},{exp:`\\Big(${r}x${o(e*r)}\\Big)\\Big(${t}x${o(i)}\\Big)`,isGood:!0},{exp:`\\Big(x${o(e)}\\Big)\\times ${a(r)}\\times\\Big(x\\times ${a(t)}${o(i)}\\Big)`,isGood:!0}],v=["A","B","C","D"];ce(h,v);const M=v.findIndex(s=>s==="B"),V=h[M].exp,O=`On choisit $x$ comme nombre de départ.<br>
    Parmi les expressions suivantes, lesquelles permettent d'exprimer le résultat à l'arrivée de ce programme de calcul. Aucune justification n'est demandée.<br>
    $\\def\\arraystretch{2}\\begin{array}{|c|c|c|c|}
    \\hline
    \\text{Expression A} & \\text{Expression B} & \\text{Expression C} & \\text{Expression D} \\\\
    \\hline
    ${h.map(s=>s.exp).join(" & ")} \\\\
    \\hline
    \\end{array}$<br>
    <br>`,k=F({items:[`Montrer que, si on choisit $${p}$ comme nombre de départ, le résultat du programme A est $${A}$.`,`Quel est le résultat obtenu à l'arrivée si on choisit $${n}$ comme nombre de départ ?`,O,"Trouver les deux nombres de départ qui permettent d'obtenir 0 à l'arrivée. Expliquer la démarche.",`Développer et réduire l'expression ${String.fromCharCode(65+M)}.`],style:"nombres"}),I=d(p),q=y(p),z=`Tout d'abord, calculons le nombre de gauche du programme :<br>
    $\\Big(${p}${$?"+":"-"}${Math.abs(e)}\\Big)\\times ${r} = ${p+e} \\times ${r} = ${I}$<br>
    Ensuite, calculons le nombre de droite du programme :<br>
    $${p}\\times ${t}${o(i)} = ${p*t}${o(i)} = ${q}$<br>
    Enfin, le résultat du programme est :<br>
    $${I}\\times${a(q)} = ${A}$`,w=d(n),E=y(n),H=`Tout d'abord, calculons le nombre de gauche du programme :<br>
    $\\Big(${n}${$?"+":"-"}${Math.abs(e)}\\Big)\\times ${r} = ${n+e} \\times ${r} = ${w}$<br>
    Ensuite, calculons le nombre de droite du programme :<br>
    $${n}\\times ${t}${o(i)} = ${n*t}${o(i)} = ${E}$<br>
    Enfin, le résultat du programme est :<br>
    $${w}\\times${a(E)} = ${R}$`,Q=h.map((s,oe)=>{const se=s.exp;return`Expression ${String.fromCharCode(65+oe)} : $${se}$ est ${s.isGood?"vraie":"fausse"}`}).filter(s=>s.includes("vraie")).join("<br>"),Z=`Le nombre de gauche s'exprime en fonction de x comme suit :<br>
    $\\Big(x${o(e)}\\Big)\\times ${r} = ${r}x${o(r*e)}$<br>
    Le nombre de droite s'exprime en fonction de x comme suit :<br>
    $${t}x${o(i)}$<br>
    Le résultat du programme s'exprime en fonction de x comme suit :<br>
    $\\Big(${r}x${o(r*e)}\\Big)\\Big(${t}x${o(i)}\\Big)$ ou $\\Big(x${o(e)}\\Big)\\times${r}\\times\\Big(${t}x${o(i)}\\Big)$<br>`,J=`Pour que le résultat du programme soit égal à 0, il faut que l'un des deux nombres soit égal à 0.<br>
    Le nombre de gauche est égal à $0$ si $x${$?"+":"-"}${Math.abs(e)} = 0$ donc $x = ${-e}$.<br>
    Le nombre de droite est égal à $0$ si $${t}x${o(i)} = 0$ soit $${t}x = ${-i}$ et donc $x=${P(-i,t).simplifie().texFSD}$.<br>
    Le résultat du programme est égal à $0$ si $x = ${-e}$ ou $x=${P(-i,t).simplifie().texFSD}$`,K=`Développons l'expression ${String.fromCharCode(65+M)} :<br>
    $\\begin{aligned}${V}&=${r}x\\times${t}x+${r}x\\times${a(i)}${o(e)}\\times${t}x${o(e)}\\times${a(i)}\\\\
    &=${r*t}x^2${o(r*i)}x${o(t*e)}x${o(e*i)}\\\\
    &=${r*t}x^2${r*i+e*t!==0?`${ae(r*i+t*e)}x`:""}${o(e*i)}\\end{aligned}$`,U=F({items:[z,H,Z+Q,J,K],style:"nombres"}),f=[],W=new x({xMin:-4.5,yMin:-.5,xMax:4.5,yMax:.5}).addTextIn({textIn:"Résultat obtenu à l'arrivée"}).render(),X=new x({xMin:-4.5,yMin:2,xMax:4.5,yMax:3}).addTextIn({textIn:"Multiplier les deux nombres"}).render(),Y=new x({xMin:-9,yMin:4.5,xMax:-4,yMax:5.5}).addTextIn({textIn:`Multiplier par ${r}`}).render(),_=new x({xMin:-8.5,yMin:7,xMax:-4.5,yMax:8}).addTextIn({textIn:`${$?"Ajouter":"Soustraire"} ${Math.abs(e)}`}).render(),ee=new x({xMin:4.5,yMin:4.5,xMax:8.5,yMax:5.5}).addTextIn({textIn:`${m?"Ajouter":"Soustraire"} ${Math.abs(i)}`}).render(),ie=new x({xMin:4,yMin:7,xMax:9,yMax:8}).addTextIn({textIn:`Multiplier par ${t}`}).render(),re=new x({xMin:-4,yMin:9.5,xMax:4,yMax:10.5}).addTextIn({textIn:"Nombre choisi au départ"}).render(),L=u(0,1.9,0,.6),D=u(-6.5,4.4,-.2,3.1),S=u(6.5,4.4,.2,3.1),j=u(6.5,6.9,6.5,5.6),C=u(-6.5,6.9,-6.5,5.6),T=u(-.2,9.4,-6.5,8.1),N=u(.2,9.4,6.5,8.1);for(const s of[L,D,S,C,j,T,N])s.styleExtremites="->",s.epaisseur=2;f.push(W,X,Y,ie,_,ee,re),f.push(L,D,S,C,j,T,N);const te=me(Object.assign({},le(f)),f);this.enonce=`Voici un programme de calcul :<br>
    ${xe.isHtml?te:` \\begin{figure}[!h]
    \\begin{center}
    \\psset{unit=1cm,arrowsize=2pt 3}
    \\begin{pspicture}(-7,0)(7,8.4)
    %\\psgrid
    \\rput(0,0){\\fbox{Résultat obtenu à l'arrivée}}
    \\rput(0,2){\\fbox{Multiplier les deux nombres}}
    \\rput(-3,4){\\fbox{Multiplier par $${r}$}}\\rput(3,4){\\fbox{${i>0?"Ajouter":"Soustraire"} $${Math.abs(i)}$}}
    \\rput(-3,6){\\fbox{${e>0?"Ajouter":"Soustraire"} $${Math.abs(e)}$}}\\rput(3,6){\\fbox{Multiplier par $${t}$}}
    \\rput(0,8){\\fbox{Nombre choisi au départ}}
    \\psline[linewidth=1.5pt]{->}(0,7.5)(-3,6.5)\\psline[linewidth=1.5pt]{->}(0,7.5)(3,6.5)
    \\psline[linewidth=1.5pt]{->}(-3,5.5)(-3,4.5)\\psline[linewidth=1.5pt]{->}(3,5.5)(3,4.5)
    \\psline[linewidth=1.5pt]{->}(-3,3.5)(0,2.5)\\psline[linewidth=1.5pt]{->}(3,3.5)(0,2.5)
    \\psline[linewidth=1.5pt]{->}(0,1.5)(0,0.5)
    \\end{pspicture}
    \\end{center}
    \\end{figure}`}
    ${k}`,this.correction=U}}export{ji as dateDePublication,Ci as default,Di as refs,Si as titre,Li as uuid};
//# sourceMappingURL=3L14DNB-2-DpPwWf3U.js.map

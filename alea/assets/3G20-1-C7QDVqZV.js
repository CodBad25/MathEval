import{E as J,p as w,aO as V,r as v,z as u,a1 as K,aq as k,bv as X,aH as Z,R as B,Z as U,ap as W,bp as C,X as j,am as Y,m as _,G as p,P as ee,o as te}from"./index-Bk_D2JkM.js";import{t as y}from"./deprecatedFractions-BTR31pbW.js";import{D as P}from"./vendors/decimal.js-16C9rIKp.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const bt="Problèmes avec le théorème de Thalès",gt="eea67",ut={"fr-fr":["3G20-1","BP2AutoR7","BP2G14"],"fr-ch":["11GM3-8"]};class ht extends J{constructor(){super(),this.besoinFormulaireNumerique=["Type de questions",3,`1 : Triangles rectangles imbriqués
2 : Triangles dans un rectangle
3 : Mélange`],this.nbQuestions=1,this.nbQuestionsModifiable=!1,this.sup=3}nouvelleVersion(){let x="",s="";const I=this.sup===1||this.sup===2?this.sup:w([1,2]);let o,$,n,i,m,f,b,e,t,r,A,E,T,Q,S,q,z,N,G,F,H,L,O,c,g,h;const[a,d,R,l]=V(4,["MNQD"]);switch(I){case 1:if(e=v(6,10),t=new P(v(12,19)).div(10),r=new P(v(30,50)).div(10),[o,$,n,i,m]=V(5,"QD"),x=`On sait que $${o}${m}=${e}$ cm ; $${o}${i}=${p(t*e,1)}$ cm et $${m}${$}=${p(r,1)}$ cm.<br>`,x+=`Calculer la valeur exacte de $${i}${n}$.`,ee.isHtml){const D=`<div><svg width="450" height="300" viewBox="-40 -40 450 300" xmlns="http://www.w3.org/2000/svg">
 <polygon points="0,0 ${t*e*20},0 ${t*e*20},${t*r*20}  " fill="none" stroke="black" />
 <line x1="${e*20}" y1="0" x2="${e*20}" y2="${r*20}" stroke="black" /> //[BE]
 <polyline points="${e*20-10},0 ${e*20-10},10 ${e*20},10" fill="none" stroke="black" />  //Angle droit en E
 <polyline points="${t*e*20-10},0 ${t*e*20-10},10 ${t*e*20},10" fill="none" stroke="black" />  //Angle droit en D
 <text x="-10" y="-10" text-anchor="middle" alignment-baseline="central">${o}</text>
 <text x="${e*20}" y="-10" text-anchor="middle" alignment-baseline="central">${m}</text>
 <text x="${e*20}" y="${r*20+10}" text-anchor="middle" alignment-baseline="central">${$}</text>
 <text x="${e*t*20+10}" y="-10" text-anchor="middle" alignment-baseline="central">${i}</text>
<text x="${e*t*20+10}" y="${t*r*20+10}" text-anchor="middle" alignment-baseline="central">${n}</text>
</svg></div>`,M=`<div><svg width="450" height="300" viewBox="-40 -260 450 300" xmlns="http://www.w3.org/2000/svg">
 <polygon points="0,0 ${t*e*20},0 ${t*e*20},${-t*r*20}  " fill="none" stroke="black" />
 <line x1="${e*20}" y1="0" x2="${e*20}" y2="${-r*20}" stroke="black" /> //[BE]
 <polyline points="${e*20-10},0 ${e*20-10},-10 ${e*20},-10" fill="none" stroke="black" />  //Angle droit en E
 <polyline points="${t*e*20-10},0 ${t*e*20-10},-10 ${t*e*20},-10" fill="none" stroke="black" />  //Angle droit en D
 <text x="-10" y="-10" text-anchor="middle" alignment-baseline="central">${o}</text>
 <text x="${e*20}" y="10" text-anchor="middle" alignment-baseline="central">${m}</text>
 <text x="${e*20}" y="${-r*20-10}" text-anchor="middle" alignment-baseline="central">${$}</text>
 <text x="${e*t*20+10}" y="10" text-anchor="middle" alignment-baseline="central">${i}</text>
 <text x="${e*t*20+10}" y="${-t*r*20-10}" text-anchor="middle" alignment-baseline="central">${n}</text>
</svg></div>`;x+=w([D,M])}else{const D=`\\begin{tikzpicture}[scale=.6]
\\draw (0,0)--(${t*e},0)--(${t*e},${-t*r})--cycle;
\\draw (${e},0)--(${e},${-r});
\\draw (${e},0) rectangle ++(-.5,-.5);
\\draw (${t*e},0) rectangle ++(-.5,-.5);
\\node [above left] at (0,0) {${o}};
\\node [above] at (${e},0) {${m}};
\\node [above right] at (${t*e},0) {${i}};
\\node [below right] at (${t*e},${-t*r}) {${n}};
\\node [below] at (${e},${-r}) {${$}};
\\end{tikzpicture}`,M=`\\begin{tikzpicture}[scale=.6]
\\draw (0,0)--(${t*e},0)--(${t*e},${t*r})--cycle;
\\draw (${e},0)--(${e},${r});
\\draw (${e},0) rectangle ++(.5,.5);
\\draw (${t*e},0) rectangle ++(.5,.5);
\\node [below left] at (0,0) {${o}};
\\node [below] at (${e},0) {${m}};
\\node [below right] at (${t*e},0) {${i}};
\\node [above right] at (${t*e},${t*r}) {${n}};
\\node [above] at (${e},${r}) {${$}};
\\end{tikzpicture}`;x+="<br>"+w([D,M])}s=`Les droites $(${m}${$})$ et $(${i}${n})$ sont perpendiculaires à la même droite $(${o}${i})$, elles sont donc parallèles entre elles.`,s+=`<br>De plus les points $${o}$, $${m}$, $${i}$  et $${o}$, $${$}$, $${n}$ sont alignés dans cet ordre donc d'après le théorème de Thalès on a :`,s+=`<br><br>$\\dfrac{${o}${m}}{${o}${i}}=\\dfrac{${m}${$}}{${i}${n}}=\\dfrac{${o}${$}}{${o}${n}}$`,s+=`<br><br>$\\dfrac{${e}}{${p(t*e)}}=\\dfrac{${p(r)}}{${i}${n}}$`,s+=`<br><br>$${i}${n}=\\dfrac{${p(t*e)}\\times${p(r)}}{${e}}=${p(t*r)}$`;break;case 2:c=v(2,6),g=2*c,h=new P(w([2,3,4])).div(10).mul(g),o=u(0,4,a,"above"),$=u(7,4,d,"above"),n=u(7,0,R,"below"),i=u(0,0,l,"below"),A=K(o,$,n,i),E=k(i,o,$),T=k(o,$,n),Q=k($,n,i),S=k(n,i,o),f=X(o,$,Z(o,$)/3,"M","above"),b=X(o,i,Z(o,i)/3,"N","left"),q=B(f,b),z=B($,i),N=B(u(b.x-1.3,b.y),u(i.x-1.3,i.y)),N.styleExtremites="<->",G=U("?",W(u(b.x-1.5,b.y),u(i.x-1.5,i.y)),0,"black",1,"gauche"),F=C(g+" cm",$,i),H=C(j(h)+" cm",f,b),L=C(c+" cm",$,n),O=Y(f,b,o,$,n,i),x=`Sur la figure ci-dessous $${a+d+R+l}$ est un rectangle et $(MN)$ est parallèle à la diagonale $(${d+l})$.`,x+=`<br>Calculer la longueur $${l+"N"}$ au millimètre près.<br><br>`,x+=_({xmin:-2,xmax:9,ymin:-1.5,ymax:5,scale:.8},A,E,T,Q,S,q,z,N,G,F,H,L,O),s=`Dans le triangle $${a+d+l}$, $M$ est un point de $[${a+d}]$, $N$ est un point de $[${a+l}]$ et $(MN)$ est parallèle à $(${d+l})$ donc d'après le théorème de Thalès on a : `,s+=`<br><br> $${y(a+"M",a+d)}=${y(a+"N",a+l)}=${y("MN",d+l)}$`,s+=`<br><br> $${y(a+"M",a+d)}=${y(a+"N",c)}=${y(p(h,1),g)}$`,s+=`<br><br> $${a}N = ${y(c+"\\times"+j(h),g)}=${p(h.mul(c).div(g),1)}$ cm`,s+=`<br><br> Les points $${a}$, $N$ et $${l}$ sont alignés dans cet ordre donc $N${l}=${a+l}-${a}N= ${c}-${p(h.mul(c).div(g),1)}=${p(h.mul(-c).div(g).plus(c),1)}$ cm.`;break}this.listeQuestions[0]=x,this.listeCorrections[0]=s,te(this)}}export{ht as default,ut as refs,bt as titre,gt as uuid};
//# sourceMappingURL=3G20-1-C7QDVqZV.js.map

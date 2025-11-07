var z=Object.defineProperty;var O=(x,f,m)=>f in x?z(x,f,{enumerable:!0,configurable:!0,writable:!0,value:m}):x[f]=m;var Q=(x,f,m)=>O(x,typeof f!="symbol"?f+"":f,m);import{E as C,ae as k,r as p,P as h,bd as d,b as Y,K as B,G as c,y as w,C as L,n as M,o as H}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const We="Résoudre des problèmes (impliquant diverses opérations)",Ke=!0,Ie="AMCHybride",Je=!0,Ue="mathLive",Xe="24/05/2025",Ze="72e9d",_e={"fr-fr":["6N5-6"],"fr-2016":["6C12-6"],"fr-ch":[]};class ei extends C{constructor(){super();Q(this,"generateBalanceTikz",(m,b,l)=>`
\\begin{tikzpicture}[baseline={(current bounding box.north)}, scale=1]

\\fill[gray!60] (2,-0.8) rectangle (8,-0.6); % barre horizontale
\\fill[gray!60] (1.9,-0.8) rectangle (2.1,-0.2); % barre horizontale
\\fill[gray!60] (7.9,-0.8) rectangle (8.1,-0.2); % barre horizontale

% Barres et socle
\\fill[gray!70] (0,-0.4) rectangle (4,-0.2); % plateau gauche
\\fill[gray!70] (6,-0.4) rectangle (10,-0.2); % plateau droit
\\fill[gray!70] (4.8,-1) rectangle (5.2,-0); % support central
\\fill[gray!50] (4.7,0.2) -- (5.3,0.2) -- (5,.9) -- cycle; % base triangle

% Définir une variable locale à tikzpicture
\\pgfmathsetmacro{\\boules}{${m}}
\\pgfmathsetmacro{\\etoiles}{${b}}
\\pgfmathsetmacro{\\masse}{${l}}

% Objets sur plateau gauche
\\ifthenelse{\\boules>0}{
\\ifthenelse{\\boules<11}{
% forme triangulaire
\\foreach \\i in {0,...,\\numexpr\\boules-1\\relax} {
  \\ifthenelse{\\i<4}{
    \\fill (0.3+0.4*\\i,0) circle (0.2);
  }{
    \\ifthenelse{\\i<7}{
      \\fill (0.3+0.4*\\i-1.4,0.4) circle (0.2);
    }{
      \\ifthenelse{\\i<9}{
        \\fill (0.3+0.4*\\i-2.4,0.8) circle (0.2);
      }{
        \\fill (0.3+0.4*\\i-3,1.2) circle (0.2);
      }
    }
  }
} % fin de forme triangulaire forEach
}{
% forme carrée
\\foreach \\i in {0,...,\\numexpr\\boules-1\\relax} {
  \\ifthenelse{\\i<4}{
    \\fill (0.3+0.4*\\i,0) circle (0.2);
  }{
    \\ifthenelse{\\i<8}{
      \\fill (0.3+0.4*\\i-1.6,0.4) circle (0.2);
    }{
      \\ifthenelse{\\i<12}{
        \\fill (0.3+0.4*\\i-3.2,0.8) circle (0.2);
      }{
        \\ifthenelse{\\i<16}{
          \\fill (0.3+0.4*\\i-4.8,1.2) circle (0.2);
         }{
          \\fill (0.3+0.4*\\i-6.4,1.6) circle (0.2);
        }
      }
    }
  }
} % fin de forme carrée forEach
}
}{}

\\ifthenelse{\\etoiles>0}{
\\ifthenelse{\\etoiles<11}{
% forme triangulaire
\\foreach \\i in {0,...,\\numexpr\\etoiles-1\\relax} {
  \\ifthenelse{\\i<4}{
    \\node at (2.5+0.4*\\i,0) {\\textcolor{orange}{\\Large \\ding{72}}};
  }{
    \\ifthenelse{\\i<7}{
      \\node at (2.5+0.4*\\i-1.4,0.4) {\\textcolor{orange}{\\Large \\ding{72}}};
    }{
      \\ifthenelse{\\i<9}{
        \\node at (2.5+0.4*\\i-2.4,0.8) {\\textcolor{orange}{\\Large \\ding{72}}};
      }{
        \\node at (2.5+0.4*\\i-3,1.2) {\\textcolor{orange}{\\Large \\ding{72}}};
      }
    }
  }
} % fin de forme triangulaire
}{
% forme carrée
\\foreach \\i in {0,...,\\numexpr\\etoiles-1\\relax} {
  \\ifthenelse{\\i<4}{
    \\node at (2.5+0.4*\\i,0) {\\textcolor{orange}{\\Large \\ding{72}}};
  }{
    \\ifthenelse{\\i<8}{
      \\node at (2.5+0.4*\\i-1.6,0.4) {\\textcolor{orange}{\\Large \\ding{72}}};
    }{
      \\ifthenelse{\\i<12}{
        \\node at (2.5+0.4*\\i-3.2,0.8) {\\textcolor{orange}{\\Large \\ding{72}}};
      }{
        \\ifthenelse{\\i<16}{
          \\node at (2.5+0.4*\\i-4.8,1.2) {\\textcolor{orange}{\\Large \\ding{72}}};
         }{
          \\node at (2.5+0.4*\\i-6.4,1.6) {\\textcolor{orange}{\\Large \\ding{72}}};;
        }
      }
    }
  }
} % fin de forme carrée
}
}{}

% Masse à droite
\\fill[yellow] (7.4,-0.2) rectangle +(1.2,1);
\\pgfkeys{/pgf/number format/set decimal separator={,}}
\\pgfkeys{/pgf/number format/set thousands separator={\\,}}
\\node[black, font={\\small},anchor=center] at (8,0.3) {\\pgfmathprintnumber{\\masse}\\,g};

\\end{tikzpicture}`);this.consigne="On a réalisé deux pesées comme indiqué sur les schémas.",this.nbQuestions=4,this.sup=1,this.sup2=1,this.besoinFormulaireNumerique=["Niveau de difficulté",3,`1 : Soustraction et division
2 :Multiplication, soustraction et division
3 : Mélange`],this.besoinFormulaire2Numerique=["Précision de la masse",4,`1 : à la dizaine
2 :à l'unité
3 : au dixième
4 : Mélange`]}nouvelleVersion(){const m=k({max:2,defaut:1,melange:3,nbQuestions:this.nbQuestions,saisie:this.sup}),b=k({max:3,defaut:1,melange:4,nbQuestions:this.nbQuestions,saisie:this.sup2});for(let l=0,g,o,S=0;l<this.nbQuestions&&S<50;){const u=b[l],s=p(2,5)*10+p(1,9)*(u>=2?1:0)+p(1,9)*.1*(u>=3?1:0),n=p(2,5,[Math.floor(s/10)])*10+p(1,9)*(u>=2?1:0)+p(1,9)*.1*(u>=3?1:0),i=p(2,5),a=p(2,5,[i]);switch(m[l]){case 1:{const r=p(0,1)===0?[p(2,4),1]:[1,p(2,4)],$=this.generateBalance(a,i,n*a+s*i),e=this.generateBalance(a*r[0],i*r[1],n*a*r[0]+s*i*r[1]),t=p(0,1);g=(t===0?$+(h.isHtml?"":"<br>")+e:e+(h.isHtml?"":"<br>")+$)+"<br>",g+=`${d(0)} Quelle est la masse d'une ${r[0]===1?"étoile":"boule"} en grammes?<br>`,g+=this.interactif&&!h.isAmc?Y(this,l*2,B.clavierDeBase,{texteApres:" g"})+"<br>":"",g+=`${d(1)} Quelle est la masse d'une ${r[0]===1?"boule":"étoile"} en grammes?<br>`,g+=this.interactif&&!h.isAmc?Y(this,l*2+1,B.clavierDeBase,{texteApres:" g"})+"<br>":"",o=`${d(0)} Si on fait la soustraction entre les deux balances, ${r[0]===1?"les boules sont enlevées":"les étoiles sont enlevées"}.<br>`,o+=this.generateBalance(a*r[0]-a,i*r[1]-i,n*(a*r[0]-a)+s*(i*r[1]-i))+"<br>",o+=`On divise ensuite par le nombre ${r[0]===1?"d'étoiles restantes":"de boules restantes"} pour trouver la masse d'une ${r[0]===1?"étoile":"boule"}.<br>`,o+=`$ ${c(n*(a*r[0]-a)+s*(i*r[1]-i))} \\div ${r[0]===1?i*r[1]-i:a*r[0]-a} = ${c(r[0]===1?s:n)}$ g.<br>`,o+=`La masse d'une ${r[0]===1?"étoile":"boule"} est de $${w(c(r[0]===1?s:n))}$ g.<br>`,o+=`${d(1)} Si on reprend la ${t===0?"première":"deuxième"} balance<br>`,o+=$+"<br>",o+=`On supprime les ${r[0]===1?i:a} ${r[0]===1?"étoiles":"boules"} à gauche et on supprime à droite $${r[0]===1?i:a} \\times ${r[0]===1?c(s):c(n)} = ${r[0]===1?c(i*s):c(a*n)}$ g.<br>`,o+=this.generateBalance(r[0]===1?a:0,r[0]===1?0:i,r[0]===1?a*n:i*s)+"<br>",o+=`On en déduit que  ${r[0]===1?a:i} ${r[0]===1?"boules":"étoiles"} pèsent $${c(r[0]===1?n*a:s*i)}$ g.<br>`,o+=`On divise ensuite ${r[0]===1?a:i} pour trouver la masse d'une ${r[0]===1?"boule":"étoile"}.<br>`,o+=`$ ${c(r[0]===1?n*a:s*i)} \\div ${r[0]===1?a:i} = ${c(r[0]===1?n:s)}$ g.<br>`,o+=`La masse d'une ${r[0]===1?"boule":"étoile"} est de $${w(c(r[0]===1?n:s))}$ g.<br>`,h.isAmc?(L(this,l*2,r[0]===1?s:n),L(this,l*2+1,r[0]===1?n:s)):(M(this,l*2,{reponse:{value:r[0]===1?s:n}}),M(this,l*2+1,{reponse:{value:r[0]===1?n:s}}));break}case 2:{const r=p(2,4),$=p(2,4,[r]),e=p(0,1)===0?[r,$]:[$,r],t=e[0]<e[1]?1:0,v=this.generateBalance(a,i,n*a+s*i),A=this.generateBalance(a*e[0],i*e[1],n*a*e[0]+s*i*e[1]),y=p(0,1);g=(y?A+(h.isHtml?"":"<br>")+v:v+(h.isHtml?"":"<br>")+A)+"<br>",g+=`${d(0)} Quelle est la masse d'une ${t===1?"étoile":"boule"} en grammes?<br>`,g+=this.interactif&&!h.isAmc?Y(this,l*2,B.clavierDeBase,{texteApres:" g"})+"<br>":"",g+=`${d(1)} Quelle est la masse d'une ${t===0?"étoile":"boule"} en grammes?<br>`,g+=this.interactif&&!h.isAmc?Y(this,l*2+1,B.clavierDeBase,{texteApres:" g"})+"<br>":"",o=`${d(0)} Si on multiplie la ${y===0?"première":"deuxième"} par ${t===1?e[0]:e[1]} alors on obtient la même quantité ${t===1?"de boules":"d'étoiles"}.<br>`,o+=this.generateBalance(a*(t===1?e[0]:e[1]),i*(t===1?e[0]:e[1]),n*a*(t===1?e[0]:e[1])+s*i*(t===1?e[0]:e[1]))+"<br>",o+=`La ${y===1?"première":"deuxième"} étant: <br>`,o+=A+"<br>",o+=`Si on fait la soustraction entre les deux balances, ${t===1?"les boules sont enlevées":"les étoiles sont enlevées"}.<br>`,o+=this.generateBalance(Math.abs(a*(t===1?e[0]:e[1])-a*e[0]),Math.abs(i*(t===1?e[0]:e[1])-i*e[1]),Math.abs(n*(a*(t===1?e[0]:e[1])-a*e[0])+s*(i*(t===1?e[0]:e[1])-i*e[1])))+"<br>",o+=`On divise ensuite par le nombre ${t===1?"d'étoiles restantes":"de boules restantes"} pour trouver la masse d'une ${t===1?"étoile":"boule"}.<br>`,o+=`$ ${c(Math.abs(n*(a*(t===1?e[0]:e[1])-a*e[0])+s*(i*(t===1?e[0]:e[1])-i*e[1])))} \\div ${Math.abs(t===1?i*e[1]-i*e[0]:a*e[0]-a*e[1])} = ${t===1?c(s):c(n)}$ g.<br>`,o+=`La masse d'une ${t===1?"étoile":"boule"} est de $${w(c(t===1?s:n))}$ g.<br>`,o+=`${d(1)} Si on reprend la ${y===0?"première":"deuxième"} balance<br>`,o+=v+"<br>",o+=`On supprime les ${t===0?a:i} ${t===0?" boules":" étoiles"} à gauche et on supprime à droite $${t===0?a:i} \\times ${t===0?c(n):c(s)} = ${t===0?c(a*n):c(i*s)}$ g.<br>`,o+=this.generateBalance(t===1?a:0,t===1?0:i,t===1?a*n:i*s)+"<br>",o+=`On en déduit que  ${t===1?a:i} ${t===1?"boules":"étoiles"} pèsent $${c(t===1?n*a:s*i)}$ g.<br>`,o+=`On divise ensuite par ${t===1?a:i} pour trouver la masse d'une ${t===1?"boule":"étoile"}.<br>`,o+=`$ ${c(t===1?n*a:s*i)} \\div ${t===1?a:i} = ${t===1?c(n):c(s)}$ g.<br>`,o+=`La masse d'une ${t===1?"boule":"étoile"} est de $${w(c(t===1?n:s))}$ g.<br>`,h.isAmc?(L(this,l*2,t===1?s:n),L(this,l*2+1,t===1?n:s)):(M(this,l*2,{reponse:{value:t===1?s:n}}),M(this,l*2+1,{reponse:{value:t===1?n:s}}))}}this.questionJamaisPosee(l,i,n,n,s)&&(this.listeQuestions[l]=g??"",this.listeCorrections[l]=o??"",l++),S++}H(this)}generateBalance(m,b,l){return h.isHtml?this.generateBalanceSVG(m,b,l):this.generateBalanceTikz(m,b,l)}generateBalanceSVG(m,b,l){const u=(e,t)=>`<circle cx="${e}" cy="${t}" r="10" fill="black" />`,s=(e,t)=>`<text x="${e}" y="${t+10}" font-size="30" text-anchor="middle" fill="gold">★</text>`,n=(e,t,v)=>`<rect x="${e-25}" y="${t-20}" width="50" height="40" rx="5" ry="5" fill="#666" />
       <text x="${e}" y="${t+5}" font-size="14" text-anchor="middle" fill="white">${Intl.NumberFormat("fr-FR",{maximumFractionDigits:1}).format(l).toString()} g</text>`,i=[];for(let e=0;e<m;e++)m<11?e<4?i.push(u(30+e*20,90)):e<7?i.push(u(30+(e-4)*20+20/2,70)):e<9?i.push(u(30+(e-7)*20+20,50)):e<10?i.push(u(30+(e-9)*20+20+20/2,30)):i.push(u(30+(e-10)*20,50)):e<4?i.push(u(30+e*20,90)):e<8?i.push(u(30+(e-4)*20,70)):e<12?i.push(u(30+(e-8)*20,50)):e<16?i.push(u(30+(e-12)*20,30)):i.push(u(30+(e-16)*20,10));for(let e=0;e<b;e++)b<11?e<4?i.push(s(30+(4+e)*20,90)):e<7?i.push(s(30+(4+e-4)*20+20/2,70)):e<9?i.push(s(30+(4+e-7)*20+20,50)):e<10?i.push(s(30+(4+e-9)*20+20+20/2,30)):e<11?i.push(s(30+(4+e-10)*20,50)):e<12&&i.push(s(30+(4+e-11)*20+20+20+20,50)):e<4?i.push(s(30+(4+e)*20,90)):e<8?i.push(s(30+(4+e-4)*20,70)):e<12?i.push(s(30+(4+e-8)*20,50)):e<16?i.push(s(30+(4+e-12)*20,30)):i.push(s(30+(4+e-16)*20,10));const r=n(305,80);return`<div class="svgContainer" style="display: inline-block">
    <svg class="mathalea2d" viewBox="0 0 400 200" style="display: inline-block" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        
    
      <!-- Barre horizontale -->
      <!--<rect x="80" y="50" width="240" height="5" fill="#333" />-->
    
      <!-- Plateaux -->
      <rect x="20" y="100" width="160" height="10" fill="#999" />
      <rect x="85" y="120" width="230" height="10" fill="#999" />
      <rect x="85" y="100" width="20" height="30" fill="#999" />
      <rect x="295" y="100" width="20" height="30" fill="#999" />
      <rect x="220" y="100" width="160" height="10" fill="#999" />
      
      <!-- Socle -->
      <rect x="190" y="110" width="20" height="40" fill="#444" />
      <polygon points="200,70 195,105 205,105" fill="#888" />
    
      <!-- Contenu plateau gauche -->
      ${i.join(`
`)}
    
      <!-- Contenu plateau droit -->
      ${r}
    </svg></div>
    `}}export{Ke as amcReady,Ie as amcType,Xe as dateDePublication,ei as default,Je as interactifReady,Ue as interactifType,_e as refs,We as titre,Ze as uuid};
//# sourceMappingURL=6N5-6-CNDllHdX.js.map

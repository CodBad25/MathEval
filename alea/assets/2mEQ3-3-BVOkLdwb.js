import{E as T,ae as Q,r as q,B as p,I as o,k as s,v as E,F as l,y as g,p as S,o as P}from"./index-Bk_D2JkM.js";import{E as C}from"./EquationSecondDegre-CSpJy-15.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./MonomePlusieursVariables-CqkijXom.js";import"./PolynomePlusieursVariables-Bi252sOF.js";const He="Déterminer l'équation de la tangente à une courbe ou un cercle passant par un point",Ke="04/09/2025",We=!1,Ye="asdea",Ze={"fr-fr":[],"fr-ch":["2mEqCar-3"]};class _e extends T{constructor(){super(),this.besoinFormulaireTexte=["Tangente à",`1 : Une courbe
2 : Un cercle
3 : Mélange`],this.sup=1,this.nbQuestions=3}nouvelleVersion(){const L=Q({saisie:this.sup,min:1,max:2,melange:3,defaut:3,listeOfCase:["courbe","cercle"],shuffle:!0,nbQuestions:this.nbQuestions});for(let b=0,w=0;b<this.nbQuestions&&w<50;){let y="",c="",v=[];if(L[b]==="courbe"){let d,u,r,m,$,i;do $=q(-5,5,[0]),i=q(-5,5,[0]),d=q(-5,5,[0]),m=q(-5,5,[0]),u=m-i+d*$,r=2*u+d;while(u===0);y=`Déterminer les équations de toutes les tangentes à la courbe d'équation $y = ${p(u)}x^2${o(r)}x${s(m)}$ passant par le point $(${$} \\,;\\, ${i})$.`,c=`On pose $y=ax+b$ la droite tangente avec inconnues $a$ et $b$.<br> On va déterminer les valeurs de $a$ et $b$.<br> La droite passe par le point $(${$}\\,;\\,${i})$, donc $${i}=${$}a+b$, d'où $b=${i}${o(-$)}a$. On obtient 
            \\[y=ax${s(i)}${o(-$)}a\\]
            On impose que cette droite et la courbe aient un unique point d'intersection, donc que le système
            \\[\\begin{cases}
            y=${p(u)}x^2${o(r)}x${o(m)}\\\\
            y=ax${s(i)}${o(-$)}a
            \\end{cases}\\]
            ait une unique solution. On résout le système par comparaison :
            \\[${p(u)}x^2${o(r)}x${o(m)}=ax${s(i)}${o(-$)}a\\]
            Cette équation est équivalente à 
            \\[${p(u)}x^2${r<0?`-(${-r}+a)`:`(${r}-a)`}x${o($)}a${s(m-i)}=0\\]
            Le discriminant de ce polynôme doit être nul, afin que l'équation ait une unique solution. Il vaut :
            \\[\\Delta=(${r}-a)^2-4\\cdot${E(u)}\\cdot\\left(${p($)}a${s(m-i)}\\right).\\] On impose donc $\\Delta=0$, d'où
            \\[(${r}-a)^2-4\\cdot${E(u)}\\cdot\\left(${p($)}a${s(m-i)}\\right)=0\\]
            On obtient l'équation du second degré en $a$ suivante :
            \\[a^2${o(-(2*r+4*u*$))}a${s(r*r-4*u*(m-i))}=0.\\]
            On résout cette équation et on obtient comme ensemble de solutions
            `;const x=C.aPartirDesCoefficients(new l(1,1),new l(-(2*r+4*u*$),1),new l(r*r-4*u*(m-i),1),new l(0,1),new l(0,1),new l(0,1),{format:"initial",variable:"a"});let t=x.solutionFrac();if(c+=`$${x.ensembleDeSolutionsTex}$.`,x.delta.num===0){c+=` Il y a qu'une seule valeur de $a$ possible et donc une seule tangente.
          On déduit l'ordonnée à l'origine en substituant la valeur trouvée pour $a$ dans $b=${i}${o(-$)}a$.<br>`;let e=t[0],n=new l(i,1).sommeFraction(e.multiplieEntier(-$));c+=`\\[b=${n.texFractionSimplifiee}\\]
        L'équation de la tangente est donc :<br>
        \\[${g(`y=${p(e.simplifie())}x${n.simplifie().texFractionSignee}`)}.\\]
        `}else{`${i}${o(-$)}`;let e=t[0],n=t[1],a=new l(i,1).sommeFraction(n.multiplieEntier(-$)),f=new l(i,1).sommeFraction(e.multiplieEntier(-$));c+=`\\[b=${a.texFractionSimplifiee} \\text{ si } a=${n.texFractionSimplifiee}\\quad \\text{ ou } b=${f.texFractionSimplifiee} \\text{ si } a=${e.texFractionSimplifiee}\\]
        Les équations des tangentes sont donc :<br>
        \\[${g(`y=${p(n.simplifie())}x${a.simplifie().texFractionSignee}`)} \\text{ et } ${g(`y=${p(e.simplifie())}x${f.simplifie().texFractionSignee}`)}.\\]
        `}v=[x.solutionsListeTex[0]]}else{let d=[[[1,8],[4,7]],[[9,13],[15,5]]],u=S([0,1]),r=[[0,0],[0,1],[1,0],[1,1]],m=S([0,1,2,3]),$=S([0,1]),i=d[u][r[m][0]][r[m][1]],x=d[u][r[m][0]][(r[m][1]+1)%2],t,e,n,a;n=q(-14,14,[0]),a=q(-14,14,[0]),t=d[u][(r[m][0]+1)%2][$]+n,e=d[u][(r[m][0]+1)%2][($+1)%2]+a,y=`Déterminer les équations de toutes les tangentes au cercle d'équation $(x${s(-n)})^2+(y${s(-a)})^2 = ${i**2}$ passant par le point $(${t} \\,;\\, ${e})$.`,c=`On pose $y=ax+b$ la droite tangente avec inconnues $a$ et $b$.<br> On va déterminer les valeurs de $a$ et $b$.<br> La droite passe par le point $(${t}\\,;\\,${e})$, donc $${e}=${p(t)}a+b$, d'où $b=${e}${o(-t)}a$. On obtient 
            \\[y=ax${s(e)}${o(-t)}a\\]
            On impose que cette droite et la courbe aient un unique point d'intersection, donc que le système
            \\[\\begin{cases}
             ${i**2}=(x${s(-n)})^2+(y${s(-a)})^2\\\\
            y=ax${s(e)}${o(-t)}a
            \\end{cases}\\]
            ait une unique solution. On résout le système par substitution de la valeur de $y$ dans la première équation :
            \\[\\begin{cases}
             ${i**2}=(x${s(-n)})^2+(ax${s(e)}${o(-t)}a${s(-a)})^2\\\\
            y=ax${s(e)}${o(-t)}a
            \\end{cases}\\iff\\begin{cases}
             ${i**2}=(x${s(-n)})^2+(ax${o(-t)}a${s(e-a)})^2\\\\
            y=ax${s(e)}${o(-t)}a
            \\end{cases}\\]
            La première équation du système est équivalente à 
            \\[(a^2+1)x^2+(${p(-2*t)}a^2${o(2*e-2*a)}a${o(-2*n)})x${o(t**2)}a^2${o(2*t*a-2*e*t)}a${s(n**2+(e-a)**2-i**2)}=0\\]
            Le discriminant de ce polynôme doit être nul, afin que l'équation ait une unique solution. Il vaut :
            \\[\\Delta=(${p(-2*t)}a^2${o(2*e-2*a)}a${o(-2*n)})^2-4(a^2+1)(${p(t**2)}a^2${o(2*t*a-2*e*t)}a${s(n**2+(e-a)**2-i**2)}).\\] On impose donc $\\Delta=0$ et on obtient l'équation du second degré en $a$ suivante :
            \\[${p(4*i**2-4*t**2+8*t*n-4*n**2)}a^2${o(8*t*e-8*n*e-8*t*a+8*n*a)}a${s(4*i**2-4*e**2+8*e*a-4*a**2)}=0.\\]
            On résout cette équation et on obtient les deux solutions
            `;const f=C.aPartirDesCoefficients(new l(4*i**2-4*t**2+8*t*n-4*n**2,1),new l(8*t*e-8*n*e-8*t*a+8*n*a,1),new l(4*i**2-4*e**2+8*e*a-4*a**2,1),new l(0,1),new l(0,1),new l(0,1),{format:"initial",variable:"a"});c+=`$${f.ensembleDeSolutionsTex}$. Ces deux solutions correspondent aux pentes des deux tangentes.<br> On en déduit l'ordonnées à l'origine de chaque droite en substituant la valeur trouvée pour $a$ dans $b=${e}${o(-t)}a$.<br>`;let F=new l(x*i+t*(a-e)+n*e-n*a,i**2-(t-n)**2),h=new l(-x*i+t*(a-e)+n*e-n*a,i**2-(t-n)**2),O=new l(e,1).sommeFraction(h.multiplieEntier(-t)),D=new l(e,1).sommeFraction(F.multiplieEntier(-t));c+=`\\[b=${O.texFractionSimplifiee} \\text{ si } a=${h.texFractionSimplifiee}\\quad \\text{ ou } b=${D.texFractionSimplifiee} \\text{ si } a=${F.texFractionSimplifiee}\\]
        Les équations des tangentes sont donc :<br>
        \\[${g(`y=${p(h.simplifie())}x${O.simplifie().texFractionSignee}`)} \\text{ et } ${g(`y=${p(F.simplifie())}x${D.simplifie().texFractionSignee}`)}.\\]
        
`,v=[f.solutionsListeTex[0],f.solutionsListeTex[1]]}this.questionJamaisPosee(b,v[0])&&(this.listeQuestions[b]=y,this.listeCorrections[b]=c,b++),w++}P(this)}}export{Ke as dateDePublication,_e as default,We as interactifReady,Ze as refs,He as titre,Ye as uuid};
//# sourceMappingURL=2mEQ3-3-BVOkLdwb.js.map

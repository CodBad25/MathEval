import{E as S,ae as A,ah as C,p as q,r as u,n as c,G as m,cq as _,y as p,B as g,I as f,k as b,b as D,o as N}from"./index-Bk_D2JkM.js";import{D as v}from"./vendors/decimal.js-16C9rIKp.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Be="Calculer les termes d'une suite arithmétique ou géométrique",Ie=!0,Je="mathLive",Re="29/09/2024",Ve="3ae4a",ze={"fr-fr":["1AL11-4"],"fr-ch":[]};class He extends S{constructor(){super(),this.nbQuestions=1,this.sup="7",this.spacing=1.5,this.spacingCorr=1.5,this.correctionDetaillee=!1,this.correctionDetailleeDisponible=!0,this.besoinFormulaireTexte=["Type de questions",["Nombres séparés par des tirets  :","1 : Suite arithmétique avec premier terme u_0","2 : Suite arithmétique avec premier terme u_1","3 : Suite arithmétique avec premier terme u_p","4 : Suite géométrique avec premier terme u_1","5 : Suite géométrique avec premier terme u_1","6 : Suite géométrique avec premier terme u_p","7 : Mélange"].join(`
`)]}nouvelleVersion(){const L=A({saisie:this.sup,min:1,max:6,melange:7,defaut:7,nbQuestions:this.nbQuestions}),h=C(L,this.nbQuestions);for(let a=0,x=0;a<this.nbQuestions&&x<50;){let l="",r="",n;const e=q(["u","v","w","t"]);let $,i,t,s,o,d;switch(h[a]){case 1:t=u(-10,10),$=u(5,15),i=u(-10,10,0),n=m(t+$*i,0),c(this,a,{reponse:{value:n}}),l=`$(${e}_n)$ est une suite arithmétique de raison $r=${i}$ et de premier terme $${e}_0=${t}$.<br>
          Calculer $${e}_{${$}}$.`,this.correctionDetaillee?r="La forme explicite d'une suite arithmétique $(u_n)$ de raison $r$ et de premier terme $u_0$ est : $u_n=u_0+n\\times r$.<br>":r="",r+=`La suite $(${e}_n)$ est arithmétique de raison $r=${i}$ et de premier terme $${e}_0=${t}$.<br>
          On en déduit que pour tout $n\\in\\mathbb{N}$,  <br>
          $\\begin{aligned}
          ${e}_n&=${e}_0+n\\times r\\\\
          ${e}_n&=${t}+n\\times ${_(i)}\\\\
           ${e}_n&=${t===0?`${g(i)}n`:`${t}${f(i)}n`}
           \\end{aligned}$
          <br>Ainsi, `,t===0?i===1||i===-1?r+=`$${e}_n=${p(n)}$.`:r+=`$${e}_{${$}}=${i}\\times ${$} =${p(n)}$.`:i===1||i===-1?r+=`$${e}_{${$}}=${t}${i===1?`${b($)}`:`${-$}`} =${p(n)}$.`:r+=`$${e}_{${$}}=${t}${b(i)}\\times ${$} =${p(n)}$.`;break;case 2:t=u(-10,10),$=u(5,15),i=u(-10,10,0),n=m(t-i+$*i,0),c(this,a,{reponse:{value:n}}),l=`$(${e}_n)$ est une suite arithmétique de raison $r=${i}$ et de premier terme $${e}_1=${t}$.<br>
          Calculer $${e}_{${$}}$.`,this.correctionDetaillee?r="La forme explicite d'une suite arithmétique $(u_n)$ de raison $r$ et de premier terme $u_1$ est : $u_n=u_1+(n-1)\\times r$.<br>":r="",r+=`
          La suite $(${e}_n)$ est arithmétique de raison $r=${i}$ et de premier terme $${e}_1=${t}$.<br>
          On en déduit que pour tout $n\\in\\mathbb{N}^*$,  <br>
          $\\begin{aligned}
          ${e}_n&=${e}_1+(n-1)\\times r\\\\
          ${e}_n&=${t}+(n-1)\\times ${_(i)}\\\\
           ${e}_n&=${t-i===0?`${g(i)}n$.`:`${t-i}${f(i)}n`}
           \\end{aligned}$
          <br>   
          Ainsi, `,t-i===0?i===1||i===-1?r+=`$${e}_n=${p(n)}$.`:r+=`$${e}_{${$}}=${i}\\times ${$} =${p(n)}$.`:i===1||i===-1?r+=`$${e}_{${$}}=${t-i}${i===1?`${b($)}`:`${-$}`} =${p(n)}$.`:r+=`$${e}_{${$}}=${t-i}${b(i)}\\times ${$} =${p(n)}$.`;break;case 3:t=u(-10,10),$=u(9,15),i=u(-10,10,0),o=u(2,4),n=m(t+($-o)*i,0),c(this,a,{reponse:{value:n}}),l=`$(${e}_n)$ est une suite arithmétique de raison $r=${i}$ avec $${e}_${o}=${t}$.<br>
            Calculer $${e}_{${$}}$.`,this.correctionDetaillee?r="Si $(u_n)$ est une suite arithmétique  de raison $r$, alors pour tout entier naturel $n$ et $p$, on a $u_n=u_p+(n-p)\\times r$.<br>":r="",r+=`
              La suite $(${e}_n)$ est arithmétique de raison $r=${i}$ avec $${e}_${o}=${t}$.<br>
            On en déduit que pour tout $n\\in\\mathbb{N}$,  <br>
          $\\begin{aligned}
          ${e}_n&=${e}_${o}+(n-${o})\\times r\\\\
          ${e}_n&=${t}+(n-${o})\\times ${_(i)}\\\\
          ${e}_n&=${t-o*i===0?`=${g(i)}n`:`${t-o*i}${f(i)}n`} 
           \\end{aligned}$
          <br>   
          Ainsi, `,t-o*i===0?i===1||i===-1?r+=`$${e}_n=${p(n)}$.`:r+=`$${e}_{${$}}=${i}\\times ${$} =${p(n)}$.`:i===1||i===-1?r+=`$${e}_{${$}}=${t-o*i}${i===1?`${b($)}`:`${-$}`} =${p(n)}$.`:r+=`$${e}_{${$}}=${t-o*i}${b(i)}\\times ${$} =${p(n)}$.`;break;case 4:t=u(-10,10,0),$=u(5,10),s=new v(u(8,29,[10,20])).div(10).mul(q([-1,1])),d=s.pow($).mul(t),n=d.toFixed(1),c(this,a,{reponse:{value:n}}),l=`$(${e}_n)$ est une suite géométrique de raison $q=${m(s,1)}$ et de premier terme $${e}_0=${t}$.<br>
            Calculer $${e}_{${$}}$.`,l+="<br>Donner la valeur arrondie au dixième.",this.correctionDetaillee?r="La forme explicite d'une suite géométrique $(u_n)$ de raison $q$ et de premier terme $u_0$ est : $u_n=u_0\\times q^n$.<br>":r="",r+=`La suite $(${e}_n)$ est géométrique de raison $q=${m(s,1)}$ et de premier terme $${e}_0=${t}$.<br>
          On en déduit que pour tout $n\\in\\mathbb{N}$,  <br>
          $\\begin{aligned}
          ${e}_n&=${e}_0\\times q^n\\\\
          ${e}_n&=${t}\\times ${_(m(s,1))}^n\\\\
           ${e}_{${$}}&=${t===1?`${_(m(s,1))}^{${$}}`:`${t}\\times ${_(m(s,1))}^{${$}}`}
           \\end{aligned}$
          <br>Ainsi, $${e}_{${$}}\\simeq${p(m(d,1))}$.`;break;case 5:t=u(-10,10,0),$=u(5,10),s=new v(u(8,29,[10,20])).div(10).mul(q([-1,1])),d=s.pow($-1).mul(t),n=d.toFixed(1),c(this,a,{reponse:{value:n}}),l=`$(${e}_n)$ est une suite géométrique de raison $q=${m(s,1)}$ et de premier terme $${e}_1=${t}$.<br>
            Calculer $${e}_{${$}}$.`,l+="<br>Donner la valeur arrondie au dixième.",this.correctionDetaillee?r="La forme explicite d'une suite géométrique $(u_n)$ de raison $q$ et de premier terme $u_1$ est : $u_n=u_1\\times q^{n-1}$.<br>":r="",r+=`La suite $(${e}_n)$ est géométrique de raison $q=${m(s,1)}$ 
          et de premier terme $${e}_1=${t}$.<br>
          On en déduit que pour tout $n\\in\\mathbb{N}^*$,  <br>
          $\\begin{aligned}
          ${e}_n&=${e}_1\\times q^{n-1}\\\\
          ${e}_n&=${t}\\times ${_(m(s,1))}^{n-1}\\\\
           ${e}_{${$}}&=${t===1?`${_(m(s,1))}^{${$-1}}`:`${t}\\times ${_(m(s,1))}^{${$-1}}`}
           \\end{aligned}$
          <br>Ainsi, $${e}_{${$}}\\simeq${p(m(d,1))}$.`;break;case 6:t=u(-10,10,0),$=u(9,11),o=u(2,4),s=new v(u(8,29,[10,20])).div(10).mul(q([-1,1])),d=s.pow($-o).mul(t),n=d.toFixed(1),c(this,a,{reponse:{value:n}}),l=`$(${e}_n)$ est une suite géométrique de raison $q=${m(s,1)}$ avec $${e}_${o}=${t}$.<br>
            Calculer $${e}_{${$}}$.`,l+="<br>Donner la valeur arrondie au dixième.",this.correctionDetaillee?r="Si $(u_n)$ est une suite géométrique  de raison $q$, alors pour tout entier naturel $n$ et $p$, on a $u_n=u_p\\times q^{n-p}$.<br>":r="",r+=` La suite $(${e}_n)$ est géométrique de raison $q=${m(s,1)}$ avec $${e}_${o}=${t}$.<br>
          On en déduit que pour tout $n\\in\\mathbb{N}$,  <br>
          $\\begin{aligned}
          ${e}_n&=${e}_{${o}}\\times q^{n-${o}}\\\\
          ${e}_n&=${t}\\times ${_(m(s,1))}^{n-${o}}\\\\
           ${e}_{${$}}&=${t===1?`${_(m(s,1))}^{${$-o}}`:`${t}\\times ${_(m(s,1))}^{${$-o}}`}
           \\end{aligned}$
          <br>Ainsi, $${e}_{${$}}\\simeq${p(m(d,1))}$.`;break}h[a]===1||h[a]===2||h[a]===3?l+="<br>"+D(this,a," ",{texteAvant:`$${e}_{${$}}=$`}):l+="<br>"+D(this,a," ",{texteAvant:`$${e}_{${$}}\\simeq$`}),this.questionJamaisPosee(a,l)&&(this.listeQuestions[a]=l,this.listeCorrections[a]=r,a++),x++}N(this)}}export{Re as dateDePublication,He as default,Ie as interactifReady,Je as interactifType,ze as refs,Be as titre,Ve as uuid};
//# sourceMappingURL=1AL11-4-DfvxUNue.js.map

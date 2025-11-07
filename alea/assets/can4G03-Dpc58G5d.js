import{D as M,K as O,aO as P,r as m,z as E,aj as L,aW as A,au as D,p as R,ad as g,y as p,av as d,aX as l,aq as z,x as q,ap as u,G as x,m as G}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ie="Calculer l’hypoténuse avec le théorème de Pythagore",Ve=!0,We="mathLive",Xe="01/06/2025",Je="d9524",Ue={"fr-fr":["can4G03","3AutoG11-1"],"fr-ch":[]};class Ye extends M{constructor(){super(),this.typeExercice="simple",this.formatChampTexte=O.clavierFullOperations,this.nbQuestions=1}nouvelleVersion(){let r,$;const e=P(3,["QD"]);r=m(2,7),$=m(3,7);const o=E(0,0,e[0]),i=L(o,r,m(0,45),e[1]),n=A(o,i,90,$/r,e[2]),b=D(o,i,n),h=[],y=Math.min(o.x,i.x,n.x)-1,v=Math.min(o.y,i.y,n.y)-1,f=Math.max(o.x,i.x,n.x)+1,C=Math.max(o.y,i.y,n.y)+1;let t,a,s,c;switch(R(["a","b"])){case"a":t=r**2+$**2,a=g(t),s=a[0]!==1,c=a[1]===1,h.push(b[0],b[1],z(o,i,n)),h.push(q(`${x(r)}`,u(o,i).x,u(o,i).y+.4),q(`${x($)}`,u(i,n).x+.4,u(i,n).y)),this.question=`Sur cette figure, calculer la valeur exacte de $${e[0]}${e[2]}$.<br>`,this.question+=G({xmin:y,ymin:v,xmax:f,ymax:C,pixelsParCm:22,mainlevee:!1,amplitude:.3,scale:.5,style:"margin: auto"},h),c?(this.correction=` On utilise le théorème de Pythagore dans le triangle $${e[0]}${e[1]}${e[2]}$,  rectangle en $${e[1]}$.<br>
            On obtient :<br>
            $\\begin{aligned}
              ${e[0]}${e[1]}^2+${e[1]}${e[2]}^2&=${e[0]}${e[2]}^2\\\\
              ${e[0]}${e[2]}^2&=${e[1]}${e[2]}^2+${e[0]}${e[1]}^2\\\\
              ${e[0]}${e[2]}^2&=${$}^2+${r}^2\\\\
              ${e[0]}${e[2]}^2&=${$**2}+${r**2}\\\\
              ${e[0]}${e[2]}^2&=${t}\\\\
              ${e[0]}${e[2]}&=\\sqrt{${t}}\\\\
              ${e[0]}${e[2]}&=${p(`${a[0]}`)}
              \\end{aligned}$`,this.correction+=d(`<br> Mentalement : <br>
    La longueur $${e[0]}${e[2]}$ est donnée par la racine carrée de la somme des carrés de $${$}$ et de $${r}$.<br>
    Cette somme vaut $${$**2}+${r**2}=${t}$. <br>
    La valeur cherchée est donc : $\\sqrt{${t}}$, soit $${a[0]}$.`)):(this.correction=` On utilise le théorème de Pythagore dans le triangle $${e[0]}${e[1]}${e[2]}$,  rectangle en $${e[1]}$.<br>
      On obtient :<br>
      $\\begin{aligned}
        ${e[0]}${e[1]}^2+${e[1]}${e[2]}^2&=${e[0]}${e[2]}^2\\\\
        ${e[0]}${e[2]}^2&=${e[1]}${e[2]}^2+${e[0]}${e[1]}^2\\\\
        ${e[0]}${e[2]}^2&=${$}^2+${r}^2\\\\
        ${e[0]}${e[2]}^2&=${$**2}+${r**2}\\\\
        ${e[0]}${e[2]}^2&=${t}\\\\
        ${e[0]}${e[2]}&=${p(`\\sqrt{${t}}`)}
        \\end{aligned}$
        ${s?`En simplifiant, on obtient : $${e[0]}${e[2]} = ${l(t)}$`:""}`,this.correction+=d(`<br> Mentalement : <br>
La longueur $${e[0]}${e[2]}$ est donnée par la racine carrée de la somme des carrés de $${$}$ et de $${r}$.<br>
Cette somme vaut $${$**2}+${r**2}=${t}$. <br>
La valeur cherchée est donc : $\\sqrt{${t}}$.
`)),this.reponse=[`\\sqrt{${t}}`,`${Math.sqrt(t)}`,l(t)],this.canEnonce=this.question,this.canReponseACompleter=`$${e[0]}${e[2]}=\\ldots$`;break;case"b":r=m(1,10),$=m(2,10,[4,9]),t=r**2+$,a=g(t),s=a[0]!==1,c=a[1]===1,c?(this.question=`$${e[0]}${e[1]}${e[2]}$ est un triangle rectangle en $${e[0]}$ dans lequel
                  $${e[0]}${e[1]}=${r}$ et $${e[0]}${e[2]}=\\sqrt{${$}}$.<br>
                   Calculer la valeur exacte de $${e[1]}${e[2]}$ .<br>`,this.correction=` On utilise le théorème de Pythagore dans le triangle $${e[0]}${e[1]}${e[2]}$,  rectangle en $${e[0]}$.<br>
        On obtient :<br>
        $\\begin{aligned}
          ${e[0]}${e[1]}^2+${e[0]}${e[2]}^2&=${e[1]}${e[2]}^2\\\\
          ${e[1]}${e[2]}^2&=${e[0]}${e[1]}^2+${e[0]}${e[2]}^2\\\\
          ${e[1]}${e[2]}^2&=\\sqrt{${$}}^2+${r}^2\\\\
          ${e[1]}${e[2]}^2&=${$}+${r**2}\\\\
          ${e[1]}${e[2]}^2&=${t}\\\\
          ${e[1]}${e[2]}&=\\sqrt{${t}}\\\\
          ${e[1]}${e[2]}&=${p(`${a[0]}`)}
          \\end{aligned}$`,this.correction+=d(`<br> Mentalement : <br>
    La longueur $${e[1]}${e[2]}$ est donnée par la racine carrée de la somme des carrés de $\\sqrt{${$}}$ et de $${r}$.<br>
    Cette somme vaut $${$}+${r**2}=${t}$ (n'oubliez pas que $(\\sqrt{${$}})^2=${$}$). <br>
    La valeur cherchée est donc : $${a[0]}$.`)):(this.question=`$${e[0]}${e[1]}${e[2]}$ est un triangle rectangle en $${e[0]}$ dans lequel
      $${e[0]}${e[1]}=${r}$ et $${e[0]}${e[2]}=\\sqrt{${$}}$.<br>
       Calculer la valeur exacte de $${e[1]}${e[2]}$ .<br>`,this.correction=` On utilise le théorème de Pythagore dans le triangle $${e[0]}${e[1]}${e[2]}$,  rectangle en $${e[0]}$.<br>
On obtient :<br>
$\\begin{aligned}
${e[0]}${e[1]}^2+${e[0]}${e[2]}^2&=${e[1]}${e[2]}^2\\\\
${e[1]}${e[2]}^2&=${e[0]}${e[1]}^2+${e[0]}${e[2]}^2\\\\
${e[1]}${e[2]}^2&=\\sqrt{${$}}^2+${r}^2\\\\
${e[1]}${e[2]}^2&=${$}+${r**2}\\\\
${e[1]}${e[2]}^2&=${t}\\\\
${e[1]}${e[2]}&=${p(`\\sqrt{${t}}`)}
\\end{aligned}$
${s?`En simplifiant, on obtient : $${e[1]}${e[2]} = ${l(t)}$`:""}`,this.correction+=d(`<br> Mentalement : <br>
La longueur $${e[1]}${e[2]}$ est donnée par la racine carrée de la somme des carrés de $\\sqrt{${$}}$ et de $${r}$.<br>
Cette somme vaut $${$}+${r**2}=${t}$ (n'oubliez pas que $(\\sqrt{${$}})^2=${$}$). <br>
La valeur cherchée est donc : $\\sqrt{${t}}${s?"="+l(t):""}$.`)),this.reponse=[`\\sqrt{${t}}`,l(t),`${Math.sqrt(t)}`],this.canEnonce=this.question,this.canReponseACompleter=`$${e[1]}${e[2]}=\\ldots$`;break}}}export{Xe as dateDeModifImportante,Ye as default,Ve as interactifReady,We as interactifType,Ue as refs,Ie as titre,Je as uuid};
//# sourceMappingURL=can4G03-Dpc58G5d.js.map

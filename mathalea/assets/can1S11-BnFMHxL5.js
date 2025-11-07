import{D as c,p as m,r as o,s as e,k as a}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ot="Donner le résultat d’un programme Python",Pt=!0,wt="mathLive",Dt="21/02/2022",Lt="0f014",Qt={"fr-fr":["can1S11"],"fr-ch":["autres-7"]};class Et extends c{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let t,s,n,i,u,p,$=0;switch(m(["a","b","c"])){case"a":t=o(2,5),i=o(1,8)*m([-1,1]),u=o(1,9)*m([-1,1]),n=t,this.question=`Que renvoie l'instruction $\\texttt{suite(${t})}$ ?<br>
        
        $\\begin{array}{|l|}
`,this.question+=`\\hline
`,this.question+=`\\
 \\texttt{def suite(n) :}  \\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{u = ${i}}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{for i in range(n) :}\\
 `,this.question+=`\\\\
 ${e(12)} \\texttt{u = u${a(u)}}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{return u}\\\\
 `,this.question+=`\\hline
`,this.question+=`\\end{array}
$`,this.question+=`
        
        `,this.correction=` L'instruction $\\texttt{for i in range(n)}$ signifie : pour i allant de $0$ à $${t-1}$.<br>
      On calcule les valeurs successives de la variable u :
           `;for(let r=0;r<n;r++)this.correction+=`<br>Pour i=${r},  u = $${i} ${a(u)} = ${i+u}$`,i=i+u;this.reponse=i;break;case"b":t=o(3,4),i=o(1,8)*m([-1,1]),n=t,this.question=`Que renvoie l'instruction $\\texttt{suite(${t})}$ ?<br>
        
        $\\begin{array}{|l|}
`,this.question+=`\\hline
`,this.question+=`\\
 \\texttt{def suite(n) :}  \\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{u = ${i}}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{for i in range(1,n) :}\\
 `,this.question+=`\\\\
 ${e(12)} \\texttt{u = u+i}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{return u}\\\\
 `,this.question+=`\\hline
`,this.question+=`\\end{array}
$`,this.question+=`
        
        `,this.correction=` L'instruction $\\texttt{for i in range(1,n)}$ signifie : pour i allant de 1 à $${t-1}$.<br>
        
        On calcule les valeurs successives de la variable u :`;for(let r=1;r<n;r++)this.correction+=`<br>Pour i=${r}, u = $${i} +${r} = ${i+r}$`,i=i+r;this.reponse=i;break;case"c":for(t=o(1,5),s=o(6,80),p=o(2,3),n=t,this.question=`Que renvoie l'instruction $\\texttt{suite(${t})}$ ?<br>
        
        $\\begin{array}{|l|}
`,this.question+=`\\hline
`,this.question+=`\\
 \\texttt{def suite(u) :}  \\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{u=${t}}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{n=0}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{while u<${s}:}\\
 `,this.question+=`\\\\
 ${e(12)} \\texttt{u = u*${p}}\\
 `,this.question+=`\\\\
 ${e(12)} \\texttt{n = n+1}\\
 `,this.question+=`\\\\
 ${e(6)} \\texttt{return n}\\\\
 `,this.question+=`\\hline
`,this.question+=`\\end{array}
$`,this.question+=`
        
        `,this.correction=` L'instruction $\\texttt{while u<${s}}$ signifie : tant que u<${s}.<br>

        On calcule les valeurs successives des  variables u et n. On s'arrête dès que u dépasse ${s} :<br>
        On a au départ, u=${t} et n=0, puis, <br>`;t<s;)this.correction+=`<br>n=${$+1} et u=${t}$\\times$ ${p} = ${t*p} `,$=$+1,t=p*t;this.correction+=`$> ${s}$. Donc l'algorithme retourne $${$}$.`,this.reponse=$;break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{Dt as dateDePublication,Et as default,Pt as interactifReady,wt as interactifType,Qt as refs,Ot as titre,Lt as uuid};
//# sourceMappingURL=can1S11-BnFMHxL5.js.map

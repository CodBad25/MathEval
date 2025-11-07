var q=Object.defineProperty;var h=(p,s,x)=>s in p?q(p,s,{enumerable:!0,configurable:!0,writable:!0,value:x}):p[s]=x;var g=(p,s,x)=>h(p,typeof s!="symbol"?s+"":s,x);import{s as f,r as t,G as a,aA as b,p as u}from"./index-DjA7ROjC.js";import{E as v}from"./ExerciceQcmA-C3izriW3.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-CiFmkxlJ.js";import"./lists-CMnbjK1R.js";const Pn="28/07/2025",Qn="4c3c0",jn={"fr-fr":["1A-F3"],"fr-ch":[]},zn=!0,Bn="qcm",Hn="true",In="qcmMono",Jn="Reconnaître une fonction affine";class Kn extends v{constructor(){super();g(this,"versionOriginale",()=>{this.enonce=`On considère les trois fonctions définies sur $\\mathbb{R}$ par : <br>
    $f_1\\,:\\,x \\longmapsto x^2-(1-x)^2$${f(8)}$f_2\\,:\\,x \\longmapsto \\dfrac{x}{2}-\\left(1+\\dfrac{1}{\\sqrt{2}}\\right)$${f(8)}$f_3\\,:\\,x \\longmapsto\\dfrac{5-\\dfrac{2}{3}x}{0,7}$<br>

    On peut affirmer que :`,this.correction=`En développant, on obtient :<br> 
    $\\begin{aligned}
    f_1(x)&=x^2-(1-x)^2\\\\
    &=x^2-(1-2x+x^2)\\\\
    &=2x-1
    \\end{aligned}$<br>
    On retrouve une forme $mx+p$ avec $m=2$ et $p=1$, donc $f_1$ est une fonction affine.<br><br>
    
$f_2$ est une fonction affine avec $m=\\dfrac{1}{2}$ et $p=-\\left(1+\\dfrac{1}{\\sqrt{2}}\\right)$.<br><br>

 $\\begin{aligned}
    f_3(x)&=\\dfrac{5-\\dfrac{2}{3}x}{0,7}\\\\
    &=-\\dfrac{2}{2,1}x+\\dfrac{5}{0,7}
    \\end{aligned}$<br>
    On retrouve une forme $mx+p$ avec $m=\\dfrac{2}{2,1}$ et $p=\\dfrac{5}{0,7}$, donc $f_3$ est une fonction affine.<br><br>
    `,this.reponses=["Toutes ces fonctions sont affines","Aucune de ces fonctions n'est affine","Uniquement la fonction $f_1$ est affine","Uniquement les fonctions $f_2$ et $f_3$ sont affines"]});g(this,"versionAleatoire",()=>{const x=t(1,4),l="On cherche si les fonctions $f$ peuvent s'écrire sous la forme $f(x)=mx+p$.<br>";switch(x){case 1:{const n=t(2,5),o=t(1,4),e=t(2,4),i=t(1,3),$=t(4,12),r=$+u([-1,1]),m=u([1,3]),c=u([1,2]),_=u([3,5,7,9]),d=u([.7,.9,.5,.6]);this.enonce=`On considère les trois fonctions définies  par : <br>
        $f_1\\,:\\,x \\longmapsto ${n}x^2-(${n}x+${o})(x-${e})$${f(8)}$f_2\\,:\\,x \\longmapsto \\dfrac{${i*r}x+${$}}{${r}}$${f(8)}$f_3\\,:\\,x \\longmapsto\\dfrac{${m}-\\dfrac{${c}}{${_}}x}{${a(d,1)}}$<br>

        On peut affirmer que :`,this.correction=l+` $\\bullet$ En développant, on obtient :<br> 
        $\\begin{aligned}
        f_1(x)&=${n}x^2-(${n}x+${o})(x-${e})\\\\
        &=${n}x^2-(${n}x^2-${n*e}x+${o}x-${o*e})\\\\
        &=${n}x^2-${n}x^2+${n*e}x-${o}x+${o*e}\\\\
        &=${n*e-o}x+${o*e}
        \\end{aligned}$<br>
        On retrouve une forme $mx+p$, donc $f_1$ est une fonction affine.<br>
        
         $\\bullet$ $f_2(x)=\\dfrac{${i*r}x+${$}}{${r}}=${i}x+\\dfrac{${$}}{${r}}$<br>
        $f_2$ est une fonction affine.<br>

        $\\bullet$ $f_3(x)=\\dfrac{${m}-\\dfrac{${c}}{${_}}x}{${a(d,1)}}=-\\dfrac{${c}}{${a(_*d,1)}}x+\\dfrac{${m}}{${a(d,1)}}$<br>
        $f_3$ est une fonction affine.<br>
${b("Toutes ces fonctions sont affines.")}`,this.reponses=["Toutes ces fonctions sont affines","Aucune de ces fonctions n'est affine","Uniquement la fonction $f_1$ est affine","Uniquement les fonctions $f_2$ et $f_3$ sont affines"]}break;case 2:{const n=t(2,5),o=t(1,4),e=t(2,6),i=t(3,7),$=t(2,5),r=t(3,8);this.enonce=`On considère les trois fonctions définies  par : <br>
        $f_1\\,:\\,x \\longmapsto \\dfrac{${n}x+${o}}{x}$${f(8)}$f_2\\,:\\,x \\longmapsto ${i}\\sqrt{x}-${e}$${f(8)}$f_3\\,:\\,x \\longmapsto\\dfrac{${$}}{x}+${r}$<br>

        On peut affirmer que :`,this.correction=l+` $\\bullet$ $f_1(x)=\\dfrac{${n}x+${o}}{x}=${n}+\\dfrac{${o}}{x}$<br>
        Après simplification, cette fonction contient un terme en $\\dfrac{1}{x}$, elle n'est donc pas affine.<br>
        
         $\\bullet$ $f_2(x)=${i}\\sqrt{x}-${e}$<br>
        Cette fonction contient un terme en $\\sqrt{x}$, elle n'est donc pas affine.<br>

        $\\bullet$ $f_3(x)=\\dfrac{${$}}{x}+${r}$<br>
        Cette fonction contient un terme en $\\dfrac{1}{x}$, elle n'est donc pas affine.<br>
${b("Aucune de ces fonctions n'est affine.")}`,this.reponses=["Aucune de ces fonctions n'est affine","Toutes ces fonctions sont affines","Uniquement la fonction $f_1$ est affine","Uniquement les fonctions $f_2$ et $f_3$ sont affines"]}break;case 3:{const n=t(2,5),o=t(3,7,n),e=t(2,5),i=t(3,7),$=t(2,4),r=t(3,8);this.enonce=`On considère les trois fonctions définies  par : <br>
        $f_1\\,:\\,x \\longmapsto x^2-(x+${n})(x-${o})$${f(8)}$f_2\\,:\\,x \\longmapsto ${e}\\sqrt{x}+${i}$${f(8)}$f_3\\,:\\,x \\longmapsto\\dfrac{${$}}{x}-${r}$<br>

        On peut affirmer que :`,this.correction=l+` $\\bullet$ En développant, on obtient :<br> 
        $\\begin{aligned}
        f_1(x)&=x^2-(x+${n})(x-${o})\\\\
        &=x^2-(x^2-${o}x+${n}x-${n*o})\\\\
        &=x^2-x^2+${o}x-${n}x+${n*o}\\\\
        &=${o-n}x+${n*o}
        \\end{aligned}$<br>
        On retrouve une forme $mx+p$, donc $f_1$ est une fonction affine.<br>
        
         $\\bullet$ $f_2(x)=${e}\\sqrt{x}+${i}$<br>
        Cette fonction contient un terme en $\\sqrt{x}$, elle n'est donc pas affine.<br>

         $\\bullet$ $f_3(x)=\\dfrac{${$}}{x}-${r}$<br>
        Cette fonction contient un terme en $\\dfrac{1}{x}$, elle n'est donc pas affine.<br>
        ${b("Uniquement la fonction $f_1$ est affine.")}`,this.reponses=["Uniquement la fonction $f_1$ est affine","Toutes ces fonctions sont affines","Aucune de ces fonctions n'est affine","Uniquement les fonctions $f_2$ et $f_3$ sont affines"]}break;case 4:{const n=t(2,5),o=t(3,7),e=t(2,4),i=t(3,6),$=t(1,5),r=t(4,9),m=t(2,5),c=t(21,29)/100;this.enonce=`On considère les trois fonctions définies sur leur domaine de définition par : <br>
        $f_1\\,:\\,x \\longmapsto ${n}x^2+${o}$${f(8)}$f_2\\,:\\,x \\longmapsto ${e}x^2-${e}(x-${i})(x+${$})$${f(8)}$f_3\\,:\\,x \\longmapsto\\dfrac{${r}+${m}x}{${a(c,2)}}$<br>

        On peut affirmer que :`,this.correction=l+` $\\bullet$ $f_1(x)=${n}x^2+${o}$<br>
        Cette fonction contient un terme en $x^2$, elle n'est donc pas affine.<br>
        
         $\\bullet$ En développant, on obtient :<br> 
        $\\begin{aligned}
        f_2(x)&=${e}x^2-${e}(x-${i})(x+${$})\\\\
        &=${e}x^2-${e}(x^2+${$}x-${i}x-${i*$})\\\\
        &=${e}x^2-${e}x^2-${e*$}x+${e*i}x+${e*i*$}\\\\
        &=${e*(i-$)}x+${e*i*$}
        \\end{aligned}$<br>
        On retrouve une forme $mx+p$, donc $f_2$ est une fonction affine.<br>

       $\\bullet$  $f_3(x)=\\dfrac{${r}+${m}x}{${a(c,2)}}=\\dfrac{${m}}{${a(c,2)}}x+\\dfrac{${r}}{${a(c,2)}}$<br>
        On retrouve une forme $mx+p$, donc $f_3$ est une fonction affine.<br>
        ${b("Uniquement les fonctions $f_2$ et $f_3$ sont affines.")}`,this.reponses=["Uniquement les fonctions $f_2$ et $f_3$ sont affines","Toutes ces fonctions sont affines","Aucune de ces fonctions n'est affine","Uniquement la fonction $f_1$ est affine"]}break}});this.versionAleatoire(),this.options={vertical:!0,ordered:!1}}}export{Hn as amcReady,In as amcType,Pn as dateDePublication,Kn as default,zn as interactifReady,Bn as interactifType,jn as refs,Jn as titre,Qn as uuid};
//# sourceMappingURL=1A-F3-DgpHC324.js.map

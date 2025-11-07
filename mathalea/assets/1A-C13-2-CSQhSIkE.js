var a=Object.defineProperty;var c=(r,i,o)=>i in r?a(r,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[i]=o;var s=(r,i,o)=>c(r,typeof i!="symbol"?i+"":i,o);import{y as n,ag as t,p as d,r as m}from"./index-DjA7ROjC.js";import{E as l}from"./ExerciceQcmA-C3izriW3.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./ExerciceQcm-CiFmkxlJ.js";import"./lists-CMnbjK1R.js";const y$="8d642",w$={"fr-fr":["1A-C13-2"],"fr-ch":[]},C$=!0,R$="qcm",T$="true",V$="qcmMono",K$="Exprimer une variable en fonction des autres",L$="05/08/2025";class M$ extends l{constructor(){super();s(this,"versionOriginale",()=>{this.enonce=`Soient $a$, $b$, $c$ et $d$ quatre nombres (avec $d$ non nul) vérifiant l'égalité :<br>
    $a = b - cd$.<br>
    Exprimer $c$ en fonction de $a$, $b$ et $d$.`,this.correction=`On isole $c$ dans un membre de l'égalité :<br>
    $\\begin{aligned}
    a &= b - cd\\\\
    a - b &= -cd\\\\
    -a + b &= cd\\\\
    \\dfrac{-a + b}{d} &= c
    \\end{aligned}$
    <br>Une expression de $c$ en fonction de $a$, $b$ et $d$ est $${n("c = \\dfrac{b - a}{d}")}$.`,this.reponses=["$c = \\dfrac{b - a}{d}$","$c = \\dfrac{a - b}{d}$","$c = d(b - a)$","$c = \\dfrac{b + a}{d}$"]});s(this,"versionAleatoire",()=>{const o=[t(["a","b","c","e"]),t(["x","y","z","w"]),t(["u","v","w","t"]),t(["A","B","C","E"]),t(["R","S","T","U"]),t(["I","J","K","L"]),t(["c","g","e","f"]),t(["c","m","f","e"]),t(["K","L","M","N"]),t(["r","s","t","u"]),t(["U","V","W","X"])],$=d(o);switch(m(1,12)){case 1:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = ${$[1]} - ${$[2]}${$[3]}$.<br>
        Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[3]}$ est :`,this.correction=`On isole $${$[2]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= ${$[1]} - ${$[2]}${$[3]}\\\\
        ${$[0]} - ${$[1]} &= -${$[2]}${$[3]}\\\\
        -${$[0]} + ${$[1]} &= ${$[2]}${$[3]}\\\\
        \\dfrac{-${$[0]} + ${$[1]}}{${$[3]}} &= ${$[2]}
        \\end{aligned}$
        <br>Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[3]}$ est $${n($[2]+" = \\dfrac{"+$[1]+" - "+$[0]+"}{"+$[3]+"}")}$.`,this.reponses=[`$${$[2]} = \\dfrac{${$[1]} - ${$[0]}}{${$[3]}}$`,`$${$[2]} = \\dfrac{${$[0]} - ${$[1]}}{${$[3]}}$`,`$${$[2]} = ${$[3]}(${$[1]} - ${$[0]})$`,`$${$[2]} = \\dfrac{${$[1]} + ${$[0]}}{${$[3]}}$`];break}case 2:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[2]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = ${$[1]} - ${$[2]}${$[3]}$.<br>
        Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est :`,this.correction=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= ${$[1]} - ${$[2]}${$[3]}\\\\
        ${$[0]} - ${$[1]} &= -${$[2]}${$[3]}\\\\
        -${$[0]} + ${$[1]} &= ${$[2]}${$[3]}\\\\
        \\dfrac{-${$[0]} + ${$[1]}}{${$[2]}} &= ${$[3]}
        \\end{aligned}$
        <br>Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est $${n($[3]+" = \\dfrac{"+$[1]+" - "+$[0]+"}{"+$[2]+"}")}$.`,this.reponses=[`$${$[3]} = \\dfrac{${$[1]} - ${$[0]}}{${$[2]}}$`,`$${$[3]} = \\dfrac{${$[0]} - ${$[1]}}{${$[2]}}$`,`$${$[3]} = ${$[2]}(${$[1]} - ${$[0]})$`,`$${$[3]} = \\dfrac{${$[1]} + ${$[0]}}{${$[2]}}$`];break}case 3:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = ${$[1]} - ${$[2]}${$[3]}$.<br>
         Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et $${$[3]}$ est :`,this.correction=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= ${$[1]} - ${$[2]}${$[3]}\\\\
        ${$[0]} + ${$[2]}${$[3]} &= ${$[1]}
        \\end{aligned}$
        <br>Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et $${$[3]}$ est $${n($[1]+" = "+$[0]+" + "+$[2]+$[3])}$.`,this.reponses=[`$${$[1]} = ${$[0]} + ${$[2]}${$[3]}$`,`$${$[1]} = ${$[0]} - ${$[2]}${$[3]}$`,`$${$[1]} = \\dfrac{${$[0]}}{${$[2]}${$[3]}}$`,`$${$[1]} = ${$[0]} \\times ${$[2]}${$[3]}$`];break}case 4:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[2]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = ${$[1]}${$[2]} + ${$[3]}$.<br>
        Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et $${$[3]}$ est :`,this.correction=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= ${$[1]}${$[2]} + ${$[3]}\\\\
        ${$[0]} - ${$[3]} &= ${$[1]}${$[2]}\\\\
        \\dfrac{${$[0]} - ${$[3]}}{${$[2]}} &= ${$[1]}
        \\end{aligned}$
        <br>Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et $${$[3]}$ est $${n($[1]+" = \\dfrac{"+$[0]+" - "+$[3]+"}{"+$[2]+"}")}$.`,this.reponses=[`$${$[1]} = \\dfrac{${$[0]} - ${$[3]}}{${$[2]}}$`,`$${$[1]} = \\dfrac{${$[0]} + ${$[3]}}{${$[2]}}$`,`$${$[1]} = ${$[2]}(${$[0]} - ${$[3]})$`,`$${$[1]} = \\dfrac{${$[3]} - ${$[0]}}{${$[2]}}$`];break}case 5:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres vérifiant l'égalité suivante :`;this.enonce=`${e} $${$[0]} = ${$[1]}${$[2]} + ${$[3]}$.<br>
         Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est :`,this.correction=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= ${$[1]}${$[2]} + ${$[3]}\\\\
        ${$[0]} - ${$[1]}${$[2]} &= ${$[3]}
        \\end{aligned}$
        <br>Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est $${n($[3]+" = "+$[0]+" - "+$[1]+$[2])}$.`,this.reponses=[`$${$[3]} = ${$[0]} - ${$[1]}${$[2]}$`,`$${$[3]} = ${$[0]} + ${$[1]}${$[2]}$`,`$${$[3]} = \\dfrac{${$[0]}}{${$[1]}${$[2]}}$`,`$${$[3]} = ${$[0]} \\times ${$[1]}${$[2]}$`];break}case 6:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = \\dfrac{${$[1]} + ${$[2]}}{${$[3]}}$.<br>
        Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et $${$[3]}$ est :`,this.correction=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= \\dfrac{${$[1]} + ${$[2]}}{${$[3]}}\\\\
        ${$[0]} \\times ${$[3]} &= ${$[1]} + ${$[2]}\\\\
        ${$[0]} \\times ${$[3]} - ${$[2]} &= ${$[1]}
        \\end{aligned}$
        <br>Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[2]}$ et $${$[3]}$ est $${n($[1]+" = "+$[3]+" \\times "+$[0]+" - "+$[2])}$.`,this.reponses=[`$${$[1]} = ${$[3]} \\times ${$[0]} - ${$[2]}$`,`$${$[1]} = ${$[3]} \\times ${$[0]} + ${$[2]}$`,`$${$[1]} = \\dfrac{${$[0]} - ${$[2]}}{${$[3]}}$`,`$${$[1]} = ${$[0]} - ${$[2]} \\times ${$[3]}$`];break}case 7:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = \\dfrac{${$[1]} + ${$[2]}}{${$[3]}}$.<br>
         Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[3]}$ est :`,this.correction=`On isole $${$[2]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= \\dfrac{${$[1]} + ${$[2]}}{${$[3]}}\\\\
        ${$[0]} \\times ${$[3]} &= ${$[1]} + ${$[2]}\\\\
        ${$[0]} \\times ${$[3]} - ${$[1]} &= ${$[2]}
        \\end{aligned}$
        <br>Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[3]}$ est $${n($[2]+" = "+$[3]+" \\times "+$[0]+" - "+$[1])}$.`,this.reponses=[`$${$[2]} = ${$[3]} \\times ${$[0]} - ${$[1]}$`,`$${$[2]} = ${$[3]} \\times ${$[0]} + ${$[1]}$`,`$${$[2]} = \\dfrac{${$[0]} - ${$[1]}}{${$[3]}}$`,`$${$[2]} = ${$[0]} - ${$[1]} \\times ${$[3]}$`];break}case 8:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ et $${$[0]}$ non nuls) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = \\dfrac{${$[1]} + ${$[2]}}{${$[3]}}$.<br>
         Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est :`,this.correction=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= \\dfrac{${$[1]} + ${$[2]}}{${$[3]}}\\\\
        ${$[0]} \\times ${$[3]} &= ${$[1]} + ${$[2]}\\\\
        ${$[3]} &= \\dfrac{${$[1]} + ${$[2]}}{${$[0]}}
        \\end{aligned}$
        <br>Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est $${n($[3]+" = \\dfrac{"+$[1]+" + "+$[2]+"}{"+$[0]+"}")}$.`,this.reponses=[`$${$[3]} = \\dfrac{${$[1]} + ${$[2]}}{${$[0]}}$`,`$${$[3]} = \\dfrac{${$[1]} - ${$[2]}}{${$[0]}}$`,`$${$[3]} = ${$[0]}(${$[1]} + ${$[2]})$`,`$${$[3]} = \\dfrac{${$[0]}}{${$[1]} + ${$[2]}}$`];break}case 9:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = (${$[1]} + ${$[2]})${$[3]}$.<br>
         Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et $${$[2]}$ est :`,this.correction=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= (${$[1]} + ${$[2]})${$[3]}\\\\
        ${$[0]} &= ${$[1]}${$[3]} + ${$[2]}${$[3]}\\\\
        ${$[0]} - ${$[2]}${$[3]} &= ${$[1]}${$[3]}\\\\
        \\dfrac{${$[0]} - ${$[2]}${$[3]}}{${$[3]}} &= ${$[1]}
        \\end{aligned}$
        <br>Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et $${$[2]}$ est $${n($[1]+" = \\dfrac{"+$[0]+"}{"+$[3]+"} - "+$[2])}$.`,this.reponses=[`$${$[1]} = \\dfrac{${$[0]}}{${$[3]}} - ${$[2]}$`,`$${$[1]} = \\dfrac{${$[0]}}{${$[3]}} + ${$[2]}$`,`$${$[1]} = ${$[0]} - ${$[2]}${$[3]}$`,`$${$[1]} = \\dfrac{${$[0]} + ${$[2]}${$[3]}}{${$[3]}}$`];break}case 10:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[1]} + ${$[2]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = (${$[1]} + ${$[2]})${$[3]}$.<br>
         Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est :`,this.correction=`On isole $${$[3]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= (${$[1]} + ${$[2]})${$[3]}\\\\
        \\dfrac{${$[0]}}{${$[1]} + ${$[2]}} &= ${$[3]}
        \\end{aligned}$
        <br>Une expression de $${$[3]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[2]}$ est $${n($[3]+" = \\dfrac{"+$[0]+"}{"+$[1]+" + "+$[2]+"}")}$.`,this.reponses=[`$${$[3]} = \\dfrac{${$[0]}}{${$[1]} + ${$[2]}}$`,`$${$[3]} = \\dfrac{${$[0]}}{${$[1]} - ${$[2]}}$`,`$${$[3]} = ${$[0]}(${$[1]} + ${$[2]})$`,`$${$[3]} = \\dfrac{${$[1]} + ${$[2]}}{${$[0]}}$`];break}case 11:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = (${$[1]} - ${$[2]})${$[3]}$.<br>
        Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et $${$[2]}$ est :`,this.correction=`On isole $${$[1]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= (${$[1]} - ${$[2]})${$[3]}\\\\
        ${$[0]} &= ${$[1]}${$[3]} - ${$[2]}${$[3]}\\\\
        ${$[0]} + ${$[2]}${$[3]} &= ${$[1]}${$[3]}\\\\
        \\dfrac{${$[0]} + ${$[2]}${$[3]}}{${$[3]}} &= ${$[1]}
        \\end{aligned}$
        <br>Une expression de $${$[1]}$ en fonction de $${$[0]}$, $${$[3]}$ et $${$[2]}$ est $${n($[1]+" = \\dfrac{"+$[0]+"}{"+$[3]+"} + "+$[2])}$.`,this.reponses=[`$${$[1]} = \\dfrac{${$[0]}}{${$[3]}} + ${$[2]}$`,`$${$[1]} = \\dfrac{${$[0]}}{${$[3]}} - ${$[2]}$`,`$${$[1]} = ${$[0]} + ${$[2]}${$[3]}$`,`$${$[1]} = \\dfrac{${$[0]} - ${$[2]}${$[3]}}{${$[3]}}$`];break}case 12:default:{const e=`Soient $${$[0]}$, $${$[1]}$, $${$[2]}$ et $${$[3]}$ quatre nombres (avec $${$[3]}$ non nul) vérifiant l'égalité :`;this.enonce=`${e} $${$[0]} = (${$[1]} - ${$[2]})${$[3]}$.<br>
        Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[3]}$ est :`,this.correction=`On isole $${$[2]}$ dans un membre de l'égalité :<br>
        $\\begin{aligned}
        ${$[0]} &= (${$[1]} - ${$[2]})${$[3]}\\\\
        ${$[0]} &= ${$[1]}${$[3]} - ${$[2]}${$[3]}\\\\
        ${$[0]} - ${$[1]}${$[3]} &= -${$[2]}${$[3]}\\\\
        \\dfrac{${$[0]} - ${$[1]}${$[3]}}{-${$[3]}} &= ${$[2]}\\\\
        \\dfrac{-${$[0]} + ${$[1]}${$[3]}}{${$[3]}} &= ${$[2]}
        \\end{aligned}$
        <br>Une expression de $${$[2]}$ en fonction de $${$[0]}$, $${$[1]}$ et $${$[3]}$ est $${n($[2]+" = "+$[1]+" - \\dfrac{"+$[0]+"}{"+$[3]+"}")}$.`,this.reponses=[`$${$[2]} = ${$[1]} - \\dfrac{${$[0]}}{${$[3]}}$`,`$${$[2]} = ${$[1]} + \\dfrac{${$[0]}}{${$[3]}}$`,`$${$[2]} = \\dfrac{${$[0]} - ${$[1]}${$[3]}}{${$[3]}}$`,`$${$[2]} = ${$[0]} - ${$[1]}${$[3]}$`];break}}});this.versionAleatoire()}}export{T$ as amcReady,V$ as amcType,L$ as dateDePublication,M$ as default,C$ as interactifReady,R$ as interactifType,w$ as refs,K$ as titre,y$ as uuid};
//# sourceMappingURL=1A-C13-2-CSQhSIkE.js.map

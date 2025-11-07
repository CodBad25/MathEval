import{D as $,p as s,r as o,G as t,T as n}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ct="Calculer astucieusement avec une factorisation",Et=!0,xt="mathLive",kt="7d21c",Ot={"fr-fr":["can5C16"],"fr-ch":[]};class _t extends ${constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let e,r,i,m;switch(s(["a","b","c","c","d","e"])){case"a":e=o(5,99)/10,r=o(2,9)*5,i=100-r,this.question=`Calculer $${r}\\times${t(e)} + ${t(e)}\\times${i}$.
`,this.correction=`On remarque de part et d'autre  du signe "$+$" un facteur commun : $${t(e)}$.<br>
En factorisant par ce nombre, on obtient : <br>
$\\begin{aligned}
${t(r)}\\times${t(e)} + ${t(e)}\\times${i}&=${t(e)}\\underbrace{(${t(r)}+${t(i)})}_{=100}\\\\
&=${t(e)}\\times 100\\\\
&=${t(100*e)}
\\end{aligned}$`,this.reponse=n(100*e);break;case"b":e=o(5,99)/100,r=o(2,8),i=10-r,this.question=`Calculer $ ${r}\\times${t(e)}+ ${i}\\times${t(e)}$.
`,this.correction=`On remarque de part et d'autre  du signe "$+$" un facteur commun : $${t(e)}$.<br>
        En factorisant par ce nombre, on obtient : <br>
        $\\begin{aligned}
        ${t(r)}\\times${t(e)} + ${t(i)}\\times${t(e)}&=${t(e)}\\underbrace{(${t(r)}+${t(i)})}_{=10}\\\\
        &=${t(e)}\\times 10\\\\
        &=${t(10*e)}
        \\end{aligned}$`,this.reponse=n(10*e);break;case"c":e=o(5,99,[10,20,30,40,50,60,70,80,90])/10,r=o(2,8)/10,m=o(1,2),i=m-r,this.question=`Calculer $ ${t(r)}\\times${t(e)}+ ${t(i)}\\times${t(e)}$.
`,this.correction=`On remarque de part et d'autre  du signe "$+$" un facteur commun : $${t(e)}$.<br>
        En factorisant par ce nombre, on obtient : <br>
$\\begin{aligned}
${t(e)}\\times ${t(r)}+${t(e)}\\times ${t(i)}&=${t(e)}\\underbrace{(${t(r)}+${t(i)})}_{=${m}}\\\\
&=${t(e)}\\times ${m}\\\\
&=${t(m*e)}
\\end{aligned}$`,this.reponse=n(m*e);break;case"d":e=o(5,99)/100,r=o(2,99)/10,i=10-r,this.question=`Calculer $ ${t(r)}\\times${t(e)}+ ${t(i)}\\times${t(e)}$.
    `,this.correction=`On remarque de part et d'autre  du signe "$+$" un facteur commun : $${t(e)}$.<br>
            En factorisant par ce nombre, on obtient : <br>
            $\\begin{aligned}
            ${t(r)}\\times${t(e)} + ${t(i)}\\times${t(e)}&=${t(e)}\\underbrace{(${t(r)}+${t(i)})}_{=10}\\\\
            &=${t(e)}\\times 10\\\\
            &=${t(10*e)}
            \\end{aligned}$`,this.reponse=n(10*e);break;case"e":e=o(1,12)*10,r=o(2,9)/10,i=5-r,this.question=`Calculer $ ${t(e)}\\times${t(r)}+ ${t(i)}\\times${t(e)}$.
    `,this.correction=`On remarque de part et d'autre  du signe "$+$" un facteur commun : $${t(e)}$.<br>
            En factorisant par ce nombre, on obtient : <br>
            $\\begin{aligned}
            ${t(e)}\\times${t(r)}+ ${t(i)}\\times${t(e)}&=${t(e)}\\underbrace{(${t(r)}+${t(i)})}_{=5}\\\\
            &=${t(e)}\\times 5\\\\
            &=${t(5*e)}
            \\end{aligned}$`,this.reponse=n(5*e);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{_t as default,Et as interactifReady,xt as interactifType,Ot as refs,Ct as titre,kt as uuid};
//# sourceMappingURL=can5C16-DXI78V1f.js.map

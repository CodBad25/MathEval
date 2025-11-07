import{E as u,ah as b,r as t,G as r,o as d}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const ye="Déterminer la parité d'une expression",Ae="3ec5c",Ie={"fr-fr":["2N20-8"],"fr-ch":["11FA4-2"]};class Ee extends u{constructor(){super(),this.consigne="Soit $n$ un entier naturel.",this.nbQuestions=4,this.nbCols=2,this.nbColsCorr=2}nouvelleVersion(){const a=[1,2,3];let o;const p=b(a,this.nbQuestions);for(let $=0,s=0;$<this.nbQuestions&&s<50;){let e=0,n=0,m="",i="";switch(o=p[$],o){case 1:e=t(2,6),n=t(2,11,[4,8,9]),m=`Que peut-on dire de la parité de ${e}$n$ ?`,e%2===0&&e!==2&&(i=`${e}$n=2\\times ${r(e/2)}n$<br>
                        Comme $${r(e/2)}n$ est un entier naturel, ${e}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`),e===2&&(i=`${e}$n=2\\times n$<br>
                        Comme $n$ est un entier naturel, ${e}$n$ s'écrit comme le double d'un entier naturel, il est donc pair`),e===3&&(i=`${e}$n=2n+n$<br>
                            Comme $n$ est un entier naturel, $2 n$ est un nombre pair.<br>
                            Si $n$ est pair, $2n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${e}$n$ a donc la même parité que $n$.`),e%2!==0&&e!==3&&(i=`${e}$n=2\\times ${r((e-1)/2)}n+n$<br>
                            Comme $${r((e-1)/2)}n$ est un entier naturel, $2\\times ${r((e-1)/2)}n$ est un nombre pair.<br>
                            Si $n$ est pair, $2\\times${r((e-1)/2)}n+n$ est la somme de deux nombres pairs, il sera donc pair. <br>
                            Si $n$ est impair, $2\\times${r((e-1)/2)}n+n$ est la somme d'un nombre pair et d'un impair, il sera donc impair. <br>
                            Au final, ${e}$n$ a donc la même parité que $n$.`);break;case 2:e=t(2,6),n=t(2,11),m=`Que peut-on dire de la parité de $${e}n+${n}$ ?`,e%2===0&&n%2===0&&e!==2&&(i=`$${e}n+${n}=2\\times ${r(e/2)}n+${n}$<br>
                        Comme $${r(e/2)}n$ est un entier naturel, $2\\times ${r(e/2)}n$ est donc un nombre pair<br>
                        ${n} est aussi un nombre pair.
                        $${e}n+${n}$ est donc la somme de deux nombres pairs, il est donc pair`),e%2===0&&n%2!==0&&e!==2&&(i=`$${e}n+${n}=2\\times ${r(e/2)}n+${n}$<br>
                        Comme $${r(e/2)}n$ est un entier naturel, $2\\times ${r(e/2)}n$ est donc un nombre pair<br>
                        ${n} est un nombre impair.
                        $${e}n+${n}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`),e===2&&n%2===0&&(i=`Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${n} est aussi un nombre pair.
                        $${e}n+${n}$ est donc la somme de deux nombres pairs, il est donc pair`),e===2&&n%2!==0&&(i=`
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair<br>
                        ${n} est un nombre impair.<br>
                        $2n+${n}$ est donc la somme d'un nombre pair et d'un nombre impair. Il est donc impair`),e===3&&n%2===0&&(i=`$${e}n+${n}=2n+n+${n}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${n} est un nombre pair. <br>
                        $2n + ${n}$ est donc un nombre pair. <br>
                        $${e}n+${n}=2n+${n}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`),e===3&&n%2!==0&&(i=`$${e}n+${n}=2n+n+${n}$<br>
                        Comme $n$ est un entier naturel, $2n$ est un nombre pair.<br>
                        ${n} est un nombre impair. <br>
                        $2n + ${n}$ est donc un nombre impair. <br>
                        $${e}n+${n}=2n+${n}+n$ est donc la somme d'un nombre impair et de $n$, il a donc la parité contraire de $n$.`),e%2!==0&&n%2===0&&e!==3&&(i=`${e}$n=2\\times ${r((e-1)/2)}n+n+${n}$<br>
                        Comme $${r((e-1)/2)}n$ est un entier naturel, $2 ${r((e-1)/2)}n$ est donc un nombre pair<br>
                        ${n} est aussi un nombre pair.<br>
                        $${r((e-1)/2)}n +${n}$ est donc un nombre pair.<br>
                        $${e}n+${n}=2\\times${r((e-1)/2)}n+${n}+n$ est donc la somme d'un nombre pair et de $n$, il a donc la même parité que $n$.`),e%2!==0&&n%2!==0&&e!==3&&(i=`$${e}n+${n}=2\\times ${r((e-1)/2)}n+n+${n}$<br>
                        Comme $${r((e-1)/2)}n$ est un entier naturel, $2 \\times ${r((e-1)/2)}n$ est donc un nombre pair<br>
                        ${n} est un nombre impair.<br>
                        $2\\times${r((e-1)/2)}n +${n}$ est une somme d'un nombre pair et d'un nombre impair, c'est donc un nombre impair.<br>
                        $${e}n+${n}=2\\times${r((e-1)/2)}n+${n}+n$ est donc la somme d'un nombre impair et de $n$,  il a donc la parité contraire de $n$.`);break;case 3:e=t(2,6),n=t(2,11),m=`Que peut-on dire de la parité de $${e}n^{2}$ ?`,e===2&&(i=`
                        Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `),e%2===0&&e!==2&&(i=`$${e}n^{2}=2\\times ${r(e/2)}n^{2}$<br>
                        Comme $${r(e/2)}n^{2}$ est un entier naturel, $2\\times ${r(e/2)}n^{2}$ est donc un nombre pair<br>
                        `),e%2===2&&(i=`Comme $n^{2}$ est un entier naturel, $2n^{2}$ est un nombre pair<br>
                        `),e%2!==0&&e!==3&&(i=`$${e}n^{2}=2\\times ${r((e-1)/2)}n^{2}+n^{2}$<br>
                        Comme $${r((e-1)/2)}n^{2}$ est un entier naturel, $2\\times ${r((e-1)/2)}n^{2}$ est donc un nombre pair<br>
                        $${e}n^{2}$ est donc la somme d'un nombre pair et de $n^{2}$. Il a donc la même parité que $n^{2}$<br>
                        Or, on sait d'après le cours (démonstration fondamentale) que $n^{2}$ et $n$ ont la même parité.<br>
                        Donc $${e}n^{2}$ a la même parité que $n$`);break}this.listeQuestions.indexOf(m)===-1&&(this.listeQuestions[$]=m,this.listeCorrections[$]=i,$++),s++}d(this)}}export{Ee as default,Ie as refs,ye as titre,Ae as uuid};
//# sourceMappingURL=2N20-8-o07W6f_G.js.map

import{E as h,ah as u,r as n,k as t,o as b}from"./index-Bk_D2JkM.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const qt="Multiplications de deux entiers relatifs dans un tableau à double entrée",vt="c8f4b",At={"fr-fr":["4C10-5"],"fr-ch":["10NO4-7"]};class Lt extends h{constructor(){super(),this.sup=!1,this.consigne="Calculer.",this.nbQuestions=1,this.nbQuestionsModifiable=!1}nouvelleVersion(){const p=u([-1,1],4);let i=n(2,9),o=n(2,9,i),m=n(2,9,[i,o]),l=n(2,9,[i,o,m]),r=n(2,9),e=n(2,9,r),s=n(2,9,[r,e]),a=n(2,9,[r,e,s]);i*=p[0],o*=p[1],m*=p[2],l*=p[3],r*=p[0],e*=p[1],s*=p[2],a*=p[3];const $=`$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|}
    \\hline
    \\times & ${t(i)} & ${t(o)} & ${t(m)} & ${t(l)} \\\\
    \\hline
    ${t(r)} &  &  & &  \\\\
    \\hline
    ${t(e)} & & & & \\\\
    \\hline
    ${t(s)} & & & & \\\\
    \\hline
    ${t(a)} & & & & \\\\
    \\hline
    \\end{array}$`,c=`$\\def\\arraystretch{1.5}\\begin{array}{|c|c|c|c|c|}
    \\hline
    \\times & ${t(i)} & ${t(o)} & ${t(m)} & ${t(l)} \\\\
    \\hline
    ${t(r)} & ${t(i*r)} & ${t(o*r)} & ${t(m*r)} & ${t(l*r)} \\\\
    \\hline
    ${t(e)} & ${t(i*e)} & ${t(o*e)} & ${t(m*e)} & ${t(l*e)} \\\\
    \\hline
    ${t(s)} & ${t(i*s)} & ${t(o*s)} & ${t(m*s)} & ${t(l*s)} \\\\
    \\hline
    ${t(a)} & ${t(i*a)} & ${t(o*a)} & ${t(m*a)} & ${t(l*a)} \\\\
    \\hline
    \\end{array}$`;this.listeQuestions.push($),this.listeCorrections.push(c),b(this)}}export{Lt as default,At as refs,qt as titre,vt as uuid};
//# sourceMappingURL=4C10-5-BAG5CM7M.js.map

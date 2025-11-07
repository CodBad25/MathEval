import{E as B,r as d,aA as f,y as o,o as O}from"./index-DjA7ROjC.js";import{b as c}from"./style-bimy13bZ.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Jt="Démontrer l'équivalence de deux programmes de calcul",Lt="21/02/2022",Vt="",zt="501f9",Ht={"fr-fr":["4L12"],"fr-ch":["11FA4-1"]};class Kt extends B{constructor(){super(),this.nbQuestions=1,this.nbCols=2,this.nbColsCorr=2,this.video="https://www.youtube.com/watch?v=-iw4OkMhgCA"}nouvelleVersion(){for(let e=0,l,b,i,p,u,x,a,m,g,h,q,C=0;e<this.nbQuestions&&C<50;){const t=d(-9,9,[0]),r=d(2,6),$=d(-9,9,[0,-1*r*t]),s=r,n=t*r+$,v=d(-9,9),P=d(-9,9,[v]);s===2?i="doubler":s===3?i="tripler":i=`multiplier par $${s}$`,n<0?(p=`enlever $${-n}$`,a=""):(p=`ajouter $${n}$`,a="+"),t<0?(u=`soustraire $${-t}$`,m=""):(u=`ajouter $${t}$`,m="+"),$<0?(x=`soustraire $${-$}$`,g=""):(x=`ajouter $${$}$`,g="+"),t*r<0?h="":h="+",t*r+$<0?q="":q="+",l=`On considère les programmes de calcul suivants :<br><br>
      ${c("Programme A :")}<br>
      - choisir un nombre,<br>
      - le ${i},<br>
      - puis ${p}.<br><br>
      ${c("Programme B :")}<br>
      - choisir un nombre,<br>
      - lui ${u},<br>
      - multiplier le résultat par ${r},<br>
      - ${x}.<br><br>
      ${f("1)")} Tester ces programmes avec le nombre $${v}$ et en choisissant un autre nombre quelconque. Émettre une conjecture.<br>
      ${f("2)")} Prouver cette conjecture.`,b=`${f("1)")} ${this.testeProgrammesDeCalcul(v,s,n,t,r,$,a,m,g)}
      Testons ces deux programmes de calcul avec le nombre $${P}$ par exemple :<br>
      ${this.testeProgrammesDeCalcul(P,s,n,t,r,$,a,m,g)}
      À chaque fois, le programme A a donné le même résultat que le programme B.<br>
      On conjecture que le programme A donnera le même résultat que le programme B pour tous les nombres.<br><br>
      ${f("2)")} Appliquons ces deux programmes de calcul à un nombre (n'importe lequel) qu'on va noter $${o("\\textit{x}")}$ :<br>
      ${c("Programme A :")}<br>
      $${o("\\textit{x}")} \\times ${s} = ${s} ${o("\\textit{x}")}$<br>
      $${s} ${o("\\textit{x}")} ${a} ${n} = ${o(s+" \\textit{x} "+a+" "+n)}$<br><br>
      ${c("Programme B :")}<br>
      $${o("\\textit{x}")} ${m} ${t} = ${o("\\textit{x}")} ${m} ${t}$<br>
      $(${o("\\textit{x}")} ${m} ${t}) \\times ${r} = ${o("\\textit{x}")} \\times ${r} ${m} ${t} \\times ${r} = ${r} ${o("\\textit{x}")} ${h} ${t*r}$<br>
      $${r} ${o("\\textit{x}")} ${h} ${t*r} ${g} ${$} = ${o(r+" \\textit{x} "+q+" "+(t*r+$))}$<br><br>
      
      On a obtenu le même résultat avec les deux programmes de calcul.<br>
      Comme on peut remplacer $${o("\\textit{x}")}$ par n'importe quel nombre, on a donc montré qu'on obtient le même résultat avec les deux programmes de calcul pour n'importe quel nombre.`,this.questionJamaisPosee(e,s,n,t,$)&&(this.listeQuestions[e]=l,this.listeCorrections[e]=b,e++),C++}O(this)}testeProgrammesDeCalcul(e,l,b,i,p,u,x,a,m){return`${c("Programme A :")}<br>
  $${e} \\times ${l} = ${e*l}$ <br>
  $${e*l} ${x} ${b} = ${o(e*l+b)}$ <br><br>
  ${c("Programme B :")}<br>
  $${e} ${a} ${i} = ${e+i}$ <br>
  $${e+i} \\times ${p} = ${(e+i)*p}$ <br>
  $${(e+i)*p} ${m} ${u} = ${o((e+i)*p+u)}$ <br><br>`}}export{Vt as dateDeModifImportante,Lt as dateDePublication,Kt as default,Ht as refs,Jt as titre,zt as uuid};
//# sourceMappingURL=4L12-muntGlTT.js.map

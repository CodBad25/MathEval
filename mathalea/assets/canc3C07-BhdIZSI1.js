import{D as b,K as q,p as o,r as u}from"./index-DjA7ROjC.js";import{a as d,p as m}from"./Personne-dDkpKfiY.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const D$='Résoudre un problème avec "de plus", "de moins"',j$=!0,k$="mathLive",M$=!0,P$="AMCNum",K$="25/07/2022",L$="02561",N$={"fr-fr":["canc3C07"],"fr-ch":["PR-8"]};class O$ extends b{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1,this.formatChampTexte=q.clavierNumbers}nouvelleVersion(){const f=[["biscuits"],["billes"],["bonbons"],["ballons"],["vis"],["clous"],["bandes dessinées"]],h=[["judo"],["tennis"],["tennis de table"],["musique"],["théâtre"],["danse"]];let p,e,$,i,t,s,r,l,n,a,c;switch(o([1,2,3])){case 1:p=o(["a","b"]),p==="a"&&(s=o([!0,!1]),i=m(),t=d(),e=u(12,20),$=u(2,8),o([!0,!1])?(r=e+$,l=e-$,this.reponse=s?l:r,o([!0,!1])?this.question=`${i} a $${e}$ ans. Il a $${$}$ ans ${s?"de plus":" de moins "}
                que ${t}. <br>

                Quel est l'âge de ${t} ?`:this.question=`${i} a $${$}$ ans ${s?"de plus":" de moins "}
                que ${t}. <br>
                
                Sachant qu'il a $${e}$ ans, quel est l'âge de ${t} ?`,this.correction=`${i} a $${$}$ ans ${s?"de plus":" de moins "} que ${t} donc ${t}  a $${$}$ années ${s?"de moins":" de plus "} que ${i}.<br>
                Il a donc  (${s?`$${e}-${$}$`:`$${e}+${$}$`}) ans, soit  ${s?`$${e-$}$`:`$${e+$}$`} ans. `,this.interactif&&(this.optionsChampTexte={texteApres:" ans"})):(r=e+$,l=e-$,this.reponse=s?r:l,o([!0,!1])?this.question=`${i} a $${e}$ ans. ${t} a $${$}$ ans ${s?"de plus":" de moins "}
                que ${i}. <br>

                Quel est l'âge de ${t} ?`:this.question=`${t} a $${$}$ ans ${s?"de plus":" de moins "}
                que ${i} qui a $${e}$ ans.  <br>
                Quel est l'âge de ${t} ?`,this.correction=`${i} a $${$}$ ans ${s?"de plus":" de moins "} que ${t}.
           Il a donc  (${s?`$${e}+${$}$`:`$${e}-${$}$`}) ans, soit  ${s?`$${e+$}$`:`$${e-$}$`} ans. `,this.interactif&&(this.optionsChampTexte={texteApres:" ans"}))),p==="b"&&(s=o([!0,!1]),i=m(),e=u(12,20),$=u(2,8),o([!0,!1])?(r=e+$,l=e-$,this.reponse=s?l:r,o([!0,!1])?this.question=`${i} a $${e}$ ans. Il a $${$}$ ans ${s?"de plus":" de moins "}
                  que sa sœur. <br>

                  Quel est l'âge de sa sœur ?`:this.question=`${i} a $${e}$ ans soit $${$}$ ans ${s?"de plus":" de moins "}
                  que sa sœur. <br>

                  Quel est l'âge de sa sœur ?`,this.correction=`${i} a $${$}$ ans ${s?"de plus":" de moins "} que sa sœur donc sa sœur a $${$}$ années ${s?"de moins":" de plus "} que son frère.<br>
                  Elle a donc  (${s?`$${e}-${$}$`:`$${e}+${$}$`}) ans, soit  ${s?`$${e-$}$`:`$${e+$}$`} ans. `):(r=e+$,l=e-$,this.reponse=s?r:l,o([!0,!1])?this.question=`${i} a $${e}$ ans. Sa sœur a $${$}$ ans ${s?"de plus":" de moins "}
                            que lui. <br>

                            Quel est l'âge de sa sœur ?`:this.question=`La sœur de ${i} a $${$}$ ans ${s?"de plus":" de moins "}
                            que lui. <br>Sachant que  ${i} a $${e}$ ans, quel est l'âge de sa sœur ?`,this.correction=`${i} a $${e}$ ans et sa sœur  a $${$}$ ans de ${s?"de plus":" de moins "}.<br>
                            Elle a donc  (${s?`$${e}+${$}$`:`$${e}-${$}$`}) ans, soit  ${s?`$${e+$}$`:`$${e-$}$`} ans. `),this.interactif&&(this.optionsChampTexte={texteApres:" ans"}));break;case 2:p=o(["a","b"]),p==="a"&&(s=o([!0,!1]),i=d(),t=m(),n=o(f),e=u(35,60),$=u(9,21,[10,20]),r=e+$,l=e-$,this.reponse=s?l:r,o([!0,!1])?this.question=`${i} a $${e}$ ${n}. Elle en  a $${$}$ ${s?"de plus":" de moins "}
                    que ${t}. <br>

                    Combien ${t} a-t-il de ${n} ?`:this.question=`${i} a $${$}$ ${n} ${s?"de plus":" de moins "} que ${t}. <br>
            
            Sachant que ${i} a $${e}$ ${n}, combien ${t} en a-t-il ?`,this.correction=`${i} a $${$}$ ${n} ${s?"de plus":" de moins "} que ${t} donc ${t}  a $${$}$ ${n} ${s?"de moins":" de plus "} que ${i}.<br>
                    Il a donc  (${s?`$${e}-${$}$`:`$${e}+${$}$`}) ${n}, soit  ${s?`$${e-$}$`:`$${e+$}$`} ${n}. `),p==="b"&&(s=o([!0,!1]),i=m(),t=d(),n=o(f),e=u(12,20),$=u(2,8),o([!0,!1])?(r=e+$,l=e-$,this.reponse=s?l:r,o([!0,!1])?this.question=`${i} a $${e}$ ${n}. Il a $${$}$ ${n} ${s?"de plus":" de moins "}
                que ${t}. <br>

                Combien ${t} a-t-il de ${n} ?`:this.question=`${i} a $${$}$ ${n} ${s?"de plus":" de moins "}
                que ${t}. <br>

                Sachant qu'il a $${e}$ ${n}, combien de ${n} possède ${t} ?`,this.correction=`${i} a $${$}$ ${n} ${s?"de plus":" de moins "} que ${t} donc ${t}  a $${$}$ ${n} ${s?"de moins":" de plus "} que ${i}.<br>
                Il en a donc  (${s?`$${e}-${$}$`:`$${e}+${$}$`}), soit  ${s?`$${e-$}$`:`$${e+$}$`}. `):(r=e+$,l=e-$,this.reponse=s?r:l,o([!0,!1])?this.question=`${i} a $${e}$ ${n}. ${t} a $${$}$ ${n} ${s?"de plus":" de moins "}
                que lui. <br>

                Combien ${t} a-t-il de ${n} ?`:this.question=`${t} a $${$}$ ${n} ${s?"de plus":" de moins "}
                que ${i} qui en a $${e}$.  <br>

                Combien ${t} a-t-il de ${n} ?`,this.correction=`${i} a $${$}$ ${n} ${s?"de plus":" de moins "} que ${t}.
           Il en a donc  (${s?`$${e}+${$}$`:`$${e}-${$}$`}), soit  ${s?`$${e+$}$`:`$${e-$}$`}. `)),this.interactif&&(this.optionsChampTexte={texteApres:` ${n}`});break;case 3:p=o(["a","b"]),p==="a"&&(s=o([!0,!1]),a=o([!0,!1]),i=d(),t=m(),c=o(h),e=u(35,60),$=u(9,21,[10,20]),r=e+$,l=e-$,this.reponse=s?r:l,this.question=`Dans un club de ${c}, il y a $${e}$ ${a?" garçons ":" filles"}. <br>
              Il y a $${$}$ ${a?" filles ":" garçons"} ${s?"de plus":" de moins "}
                      que de ${a?" garçons ":" filles"}. <br>

                      Combien y a-t-il de ${a?" filles":" garçons "} dans ce club ? `,this.correction=` Il y a $${$}$ ${a?" filles ":" garçons"} ${s?"de plus":" de moins "}
            que de ${a?" garçons ":" filles"}.<br>
                      Il y a donc  (${s?`$${e}+${$}$`:`$${e}-${$}$`}) ${a?" filles":" garçons"}, soit  ${s?`$${e+$}$`:`$${e-$}$`} ${a?" filles ":" garçons"}. `,this.interactif&&(this.optionsChampTexte={texteApres:` ${a?" filles":" garçons"}`})),p==="b"&&(s=o([!0,!1]),a=o([!0,!1]),i=d(),t=m(),c=o(h),e=u(35,60),$=u(9,21,[10,20]),r=e+$,l=e-$,this.reponse=s?l:r,this.question=`Dans un club de ${c}, il y a $${e}$ ${a?" filles ":" garçons"}.<br>
          
          Sachant qu'il y a $${$}$ ${a?" filles ":" garçons"} ${s?"de plus":" de moins "} que de ${a?" garçons ":" filles"}, combien y a-t-il de ${a?"garçons":"filles"} dans ce club ? `,this.correction=` Il y a $${$}$ ${a?" filles ":" garçons"} ${s?"de plus":" de moins "}
                      que de ${a?" garçons ":" filles"}, il y a donc  $${$}$ ${a?" garçons ":" filles"} ${s?"de moins":" de plus "}
                      que de ${a?" filles ":" garçons"}.<br>
                     Il y a (${s?`$${e}-${$}$`:`$${e}+${$}$`}) ${a?" garçons":" filles"}, soit  ${s?`$${e-$}$`:`$${e+$}$`} ${a?" garçons":" filles"} dans ce club.<br>
     `,this.interactif&&(this.optionsChampTexte={texteApres:` ${a?" garçons":" filles"}`}));break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{M$ as amcReady,P$ as amcType,K$ as dateDePublication,O$ as default,j$ as interactifReady,k$ as interactifType,N$ as refs,D$ as titre,L$ as uuid};
//# sourceMappingURL=canc3C07-BhdIZSI1.js.map

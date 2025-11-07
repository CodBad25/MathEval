import{D as s,p as t,r as $,G as r,T as i,av as o}from"./index-DjA7ROjC.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const ye="Calculer avec une proportion",qe=!0,Se="mathLive",Pe=!0,Ne="AMCNum",Le="eb6bc",Qe={"fr-fr":["can5P04"],"fr-ch":[]};class ke extends s{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let e,n;switch(t(["a","b","c","d","e","f"])){case"a":e=$(3,7)*5,n=t(["des lunettes","un frère","un chien","un abonnement à une revue","une licence à l’UNSS","un sac à roulette"]),this.question=`$\\dfrac{1}{5}$ des élèves d'une classe de $${e}$ élèves a ${n}.<br>
        
              Quel est le nombre d'élèves n'en ayant pas ?`,this.correction=`On calcule d'abord $\\dfrac{1}{5}$ de $${e}$ .<br>
        $\\dfrac{1}{5}\\times ${e}=\\dfrac{${e}}{5}=${r(e/5)}$.<br>
        $${r(e/5)}$ élèves ont ${n} .<br>
          Le nombre d'élèves  n'en ayant pas est donc donné par : $${e}-${r(e/5)}=${r(e-e/5)}$`,this.correction+=o(`<br> Mentalement : <br>
          Pour calculer $\\dfrac{1}{5}$ d'une quantité, on la divise par $5$. <br>
          Ainsi, $\\dfrac{1}{5}\\times ${e}=${e}\\div 5=${e/5}$.`),this.reponse=i(4*e/5);break;case"b":e=$(3,6)*6,n=t(["des lunettes","un frère"," un chien","un abonnement à une revue","une licence à l’UNSS","un sac à roulette"]),this.question=`$\\dfrac{1}{6}$ des élèves d'une classe de $${e}$ élèves a ${n}.<br>

            Quel est le nombre d'élèves n'en ayant pas ?`,this.correction=`On calcule d'abord $\\dfrac{1}{6}$ de $${e}$ .<br>
        $\\dfrac{1}{6}\\times ${e}=\\dfrac{${e}}{6}=${r(e/6)}$.<br>
        $${r(e/6)}$ élèves ont ${n} .<br>
          Le nombre d'élèves  n'en ayant pas est donc donné par : $${e}-${r(e/6)}=${r(e-e/6)}$`,this.correction+=o(`<br> Mentalement : <br>
          Pour calculer $\\dfrac{1}{6}$ d'une quantité, on la divise par $6$. <br>
          Ainsi, $\\dfrac{1}{6}\\times ${e}=${e}\\div 6=${e/6}$.`),this.reponse=i(5*e/6);break;case"c":e=$(2,5)*7,n=t(["des lunettes","un frère","un chien","un abonnement à une revue","une licence à l’UNSS","un sac à roulette"]),this.question=`$\\dfrac{1}{7}$ d'une classe de $${e}$ élèves a ${n}.<br>

        Quel est le nombre d'élèves n'en ayant pas ?`,this.correction=`On calcule d'abord $\\dfrac{1}{7}$ de $${e}$ .<br>
        $\\dfrac{1}{7}\\times ${e}=\\dfrac{${e}}{7}=${r(e/7)}$.<br>
        $${r(e/7)}$ élèves ont ${n} .<br>
          Le nombre d'élèves  n'en ayant pas est donc donné par : $${e}-${r(e/7)}=${r(e-e/7)}$`,this.correction+=o(`<br> Mentalement : <br>
          Pour calculer $\\dfrac{1}{7}$ d'une quantité, on la divise par $7$. <br>
          Ainsi, $\\dfrac{1}{7}\\times ${e}=${e}\\div 7=${e/7}$.`),this.reponse=i(6*e/7);break;case"d":e=$(3,9)*4,n=t(["des lunettes","un frère","un chien","un abonnement à une revue","une licence à l’UNSS","un sac à roulette"]),this.question=`$\\dfrac{1}{4}$ d'une classe de $${e}$ élèves a ${n}.<br>

            Quel est le nombre d'élèves n'en ayant pas ?`,this.correction=`On calcule d'abord $\\dfrac{1}{4}$ de $${e}$ .<br>
            $\\dfrac{1}{4}\\times ${e}=\\dfrac{${e}}{4}=${r(e/4)}$.<br>
            $${r(e/4)}$ élèves ont ${n} .<br>
              Le nombre d'élèves  n'en ayant pas est donc donné par : $${e}-${r(e/4)}=${r(e-e/4)}$`,this.correction+=o(`<br> Mentalement : <br>
              Pour calculer $\\dfrac{1}{4}$ d'une quantité, on la divise par $4$. <br>
              Ainsi, $\\dfrac{1}{4}\\times ${e}=${e}\\div 4=${e/4}$.`),this.reponse=i(3*e/4);break;case"e":e=$(3,7)*5,n=t(["des lunettes","un frère","un chien","un abonnement à une revue","une licence à l’UNSS","un sac à roulette"]),this.question=`$20 \\%$  des élèves d'une classe de $${e}$ élèves ont ${n}.<br>
              Quel est le nombre d'élèves n'en ayant pas ?`,this.correction=`On calcule d'abord $20 \\%$  de $${e}$ .<br>
             Prendre $20 \\%$  d'une quantité revient à en prendre le cinquième, c'est-à-dire à la diviser par $5$.<br>
              $20\\%$  de $${e}$ est égal à $\\dfrac{${e}}{5}=${r(e/5)}$.<br>
                            $${r(e/5)}$ élèves ont ${n} .<br>
                Le nombre d'élèves  n'en ayant pas est donc donné par : $${e}-${r(e/5)}=${r(e-e/5)}$`,this.reponse=i(8*e/10);break;case"f":e=$(3,9)*4,n=t(["des lunettes","un frère","un chien","un abonnement à une revue","une licence à l’UNSS","un sac à roulette"]),this.question=`$25\\%$  des élèves d'une classe de $${e}$ élèves ont ${n}.<br>

                  Quel est le nombre d'élèves n'en ayant pas ?`,this.correction=`On calcule d'abord $25 \\%$  de $${e}$ .<br>
                  Prendre $25 \\%$  d'une quantité revient à en prendre le quart, c'est-à-dire à la diviser par $4$.<br>
                   $25 \\%$  de $${e}$ est égal à $\\dfrac{${e}}{4}=${r(e/4)}$.<br>
                                 $${r(e/4)}$ élèves ont ${n} .<br>
                     Le nombre d'élèves  n'en ayant pas est donc donné par : $${e}-${r(e/4)}=${r(e-e/4)}$`,this.reponse=i(e-.25*e);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{Pe as amcReady,Ne as amcType,ke as default,qe as interactifReady,Se as interactifType,Qe as refs,ye as titre,Le as uuid};
//# sourceMappingURL=can5P04-CPCmNJit.js.map

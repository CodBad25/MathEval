import{D as s}from"./vendors/decimal.js-16C9rIKp.js";import{D as x,p as r,r as $,F as c,G as a,k as m,j as h}from"./index-Bk_D2JkM.js";import"./vendors/ansi-styles-C5UZWym2.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const Ai="Déterminer la fonction dérivée d’une fonction affine*",Ei=!0,Fi="mathLive",ki="20/06/2022",yi="84ae6",Ci={"fr-fr":["can1F09"],"fr-ch":[]};class Pi extends x{constructor(){super(),this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){const p=[[2,5],[-2,3],[-3,4],[5,7],[-3,7],[3,5],[4,5],[-2,7],[-7,9],[-4,9],[4,7],[2,11],[-3,11],[8,9],[6,7],[-8,3],[-7,3],[2,15],[-2,15],[3,17],[-3,10]],d=[[2,5],[2,3],[3,4],[5,7],[3,7],[3,5],[4,5],[2,7],[7,9],[-4,9],[4,7],[2,11],[3,11],[8,9],[6,7],[10,7],[11,7],[9,8],[7,8],[11,3],[2,15]];let i,t,f,n,o=[],e=[];switch(r([1,2,3,4])){case 1:i=$(2,15),t=r([$(1,10)*r([-1,1]),new s($(-19,19,[0,-10,10])).div(10)]),r([!0,!1])?(this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)=\\dfrac{x}{${i}}${m(t)}$. <br>

            Déterminer $f'(x)$.   <br>       `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=\\dfrac{1}{${i}}$ et $p=${a(t,1)}$.<br>
            La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=\\dfrac{1}{${i}}$. `,this.reponse=new c(1,i)):(this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

         $f(x)=-\\dfrac{x}{${i}}${m(t)}$.<br>
         
          Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=-\\dfrac{1}{${i}}$ et $p=${a(t,1)}$.<br>
            La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=-\\dfrac{1}{${i}}$. `,this.reponse=new c(-1,i));break;case 2:f=$(2,15)*r([-1,1]),t=r([$(1,10)*r([-1,1]),new s($(-19,19,[0,-10,10])).div(10)]),i=$(2,15),n=new c(f,i),r([!0,!1])?(this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

           $f(x)=\\dfrac{${h(f,t)}}{${i}}$. <br>

            Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=\\dfrac{${f}}{${i}}$ et $p=\\dfrac{${a(t,1)}}{${i}}$.<br>
            La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=\\dfrac{${f}}{${i}}${n.texSimplificationAvecEtapes()}$. `,this.reponse=n):(this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par :<br>

           $f(x)=\\dfrac{${a(t,1)}${m(f)}x}{${i}}$.<br>
           
            Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=\\dfrac{${f}}{${i}}$ et $p=\\dfrac{${a(t,1)}}{${i}}$.<br>
            La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=\\dfrac{${f}}{${i}}${n.texSimplificationAvecEtapes()}$. `,this.reponse=n);break;case 3:f=$(2,15)*r([-1,1]),t=r([$(1,10)*r([-1,1]),new s($(-19,19,[0,-10,10])).div(10)]),i=$(2,15),o=r(p),n=new c(o[0],o[1]),r([!0,!1])?(this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

         $f(x)=\\dfrac{${o[0]}x}{${o[1]}}${m(t)}$.<br>

          Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=\\dfrac{${o[0]}}{${o[1]}}$  et $p=${a(t,1)}$.<br>
            La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=\\dfrac{${o[0]}}{${o[1]}}$. `,this.reponse=n):(this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

            $f(x)=\\dfrac{${o[0]}x}{${o[1]}}$.<br>

            Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction linéaire de la forme $f(x)=mx$ avec $m=\\dfrac{${o[0]}}{${o[1]}}$.<br>
              La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=\\dfrac{${o[0]}}{${o[1]}}$. `,this.reponse=n);break;case 4:f=$(2,15)*r([-1,1]),t=r([$(1,10)*r([-1,1]),new s($(-19,19,[0,-10,10])).div(10)]),i=$(2,15),e=r(d),r([!0,!1])?(n=new c(e[0],e[1]),this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

          $f(x)=${a(t,1)}+\\dfrac{${e[0]}x}{${e[1]}}$. <br>
          
          Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=\\dfrac{${e[0]}}{${e[1]}}$  et $p=${a(t,1)}$.<br>
            La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=\\dfrac{${e[0]}}{${e[1]}}$. `,this.reponse=n):(n=new c(-e[0],e[1]),this.question=`Soit $f$ la fonction définie sur $\\mathbb{R}$ par : <br>

           $f(x)=${a(t,1)}-\\dfrac{${e[0]}x}{${e[1]}}$. <br>

            Déterminer $f'(x)$.   <br>  `,this.interactif&&(this.question+="$f'(x)=$"),this.correction=`On reconnaît une fonction affine de la forme $f(x)=mx+p$ avec $m=-\\dfrac{${e[0]}}{${e[1]}}$  et $p=${a(t,1)}$.<br>
              La fonction dérivée est donnée par $f'(x)=m$, soit ici $f'(x)=-\\dfrac{${e[0]}}{${e[1]}}$. `,this.reponse=n);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{ki as dateDePublication,Pi as default,Ei as interactifReady,Fi as interactifType,Ci as refs,Ai as titre,yi as uuid};
//# sourceMappingURL=can1F09-D1SR5IyS.js.map

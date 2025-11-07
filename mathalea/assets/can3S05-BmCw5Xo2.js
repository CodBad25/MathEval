import{D as p,p as m,r as o,G as $,s as t,av as c}from"./index-DjA7ROjC.js";import{a as u}from"./deprecatedFractions-DsorrrvY.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-CSnohZOK.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/decimal.js-16C9rIKp.js";import"./vendors/katex-DRsvfONx.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-w0ofBCni.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BGtQQjtA.js";import"./json/refToUuidCH-Dm7pY6Rc.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-B8vRIdSG.js";import"./json/referentiel2022FR-Bx-nUux7.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";import"./colors-vbveSA7f.js";const O$="Calculer une moyenne",g$=!0,k$="mathLive",C$="c9d15",R$={"fr-fr":["can3S05"],"fr-ch":[]};class S$ extends p{constructor(){super(),this.versionQcmDisponible=!0,this.typeExercice="simple",this.nbQuestions=1}nouvelleVersion(){let e,i,s,n,r,l,a;switch(this.versionQcm?m([1,2]):m([1,2,3,3])){case 1:e=o(2,6),i=o(8,15),s=o(7,11),r=m([36,40,44,48,52]),n=r-e-i-s,this.question=`$${e}$ ${t(2)} ; ${t(2)} $${i}$ ${t(2)} ; ${t(2)} $${s}$${t(2)} ; ${t(2)} $${n}$<br>
   
        ${this.versionQcm?"La moyenne de cette série est :":" Quelle est la moyenne de cette série ?"}`,this.correction=`La somme des $4$ valeurs est : $${e}+${i}+${s}+${n} =${r}$.<br>
         La moyenne est donc $\\dfrac{${r}}{4}=${u(r,4)}$.`,this.reponse=r/4,this.distracteurs=[`$${$(r/4-1)}$`,`$${$((r+1)/4)}$`,`$${$(r/4+1)}$`,`$${$(r/4+2)}$`,`$${$(r/4-2)}$`,`$${$(r/4-.5)}$`,`$${$(r/4+.5)}$`];break;case 2:e=o(1,2)*5,i=o(9,10),s=o(5,7),n=o(1,5),r=m([35,40,45,50]),l=r-e-i-s-n,this.question=`$${i}$${t(2)} ; ${t(2)} $${e}$ ${t(2)} ; ${t(2)}$${s}$${t(2)} ; ${t(2)}$${n}$ ${t(2)} ; ${t(2)}$${l}$<br>
       
        ${this.versionQcm?"La moyenne de cette série est :":" Quelle est la moyenne de cette série ?"}`,this.distracteurs=[`$${$(r/5-1)}$`,`$${$((r+1)/5)}$`,`$${$(r/5+1)}$`,`$${$(r/5+2)}$`,`$${$(r/5-2)}$`,`$${$(r/5-.5)}$`,`$${$(r/5+.5)}$`],this.correction=`La somme des $5$ valeurs est : $${i}+${e}+${s}+${n}+${l}= ${r}$.<br>
         La moyenne est donc $\\dfrac{${$(r)}}{5}=${u(r,5)}$.`,this.reponse=r/5;break;case 3:a=m(["a","b","c","d"]),a==="a"&&(e=o(1,10)+o(31,89,[40,50,60,70,80])/100,r=o(2,9)/100,i=e-r,s=e+r,this.question=`$${$(e)}$ ${t(2)} ; ${t(2)}  $${$(i)}$  ${t(2)} ; ${t(2)}  $${$(s)}$<br>
         
          Quelle est la moyenne de cette série ?`,this.correction=`La somme des $3$ valeurs est : $${$(e)}+${$(i)}+${$(s)} =${$(3*e)}$.<br>
          La moyenne est donc $\\dfrac{${$(3*e)}}{3}=${$(e)}$.`,this.correction+=c(`<br> Mentalement : <br>
          En écrivant les valeurs dans l'ordre croissant : <br>$\\underbrace{${$(i)}}_{${$(e)}- ${$(r)}}$ ${t(2)} ; ${t(2)}  $${$(e)}$  ${t(2)} ; ${t(2)}  $\\underbrace{${$(s)}}_{${$(e)}+ ${$(r)}}$,
                    on remarque que les écarts entre la valeur intermédiaire ($${$(e)}$) et les deux autres valeurs ($${$(e-r)}$ et $${$(e+r)}$) sont égaux (ils valent $${$(r)}$).<br>
          On en déduit que la moyenne est la valeur intermédiaire : $${$(e)}$.

          
          
          `),this.reponse=e),a==="b"&&(e=o(1,10)+o(31,89,[40,50,60,70,80])/100,r=o(2,9)/100,i=e-r,s=e+r,this.question=`$${$(i)}$ ${t(2)} ; ${t(2)}  $${$(s)}$  ${t(2)} ; ${t(2)}  $${$(e)}$<br>
        
          Quelle est la moyenne de cette série ?`,this.correction=`La somme des $3$ valeurs est : $${$(e)}+${$(i)}+${$(s)} =${$(3*e)}$.<br>
          La moyenne est donc $\\dfrac{${$(3*e)}}{3}=${$(e)}$.`,this.correction+=c(`<br> Mentalement : <br>
          En écrivant les valeurs dans l'ordre croissant : <br>$\\underbrace{${$(i)}}_{${$(e)}- ${$(r)}}$ ${t(2)} ; ${t(2)}  $${$(e)}$  ${t(2)} ; ${t(2)}  $\\underbrace{${$(s)}}_{${$(e)}+ ${$(r)}}$,
                    on remarque que les écarts entre la valeur intermédiaire ($${$(e)}$) et les deux autres valeurs ($${$(e-r)}$ et $${$(e+r)}$) sont égaux (ils valent $${$(r)}$).<br>
          On en déduit que la moyenne est la valeur intermédiaire : $${$(e)}$.

          
          
          `),this.reponse=e),a==="c"&&(e=o(100,200),r=o(2,9),i=e-r,s=e+r,this.question=`$${$(s)}$${t(2)} ; ${t(2)} $${$(e)}$ ${t(2)} ; ${t(2)}$${$(i)}$<br>
          
          Quelle est la moyenne de cette série ?`,this.correction=`La somme des $3$ valeurs est : $${$(e)}+${$(i)}+${$(s)} =${$(3*e)}$.<br>
                            La moyenne est donc $\\dfrac{${$(3*e)}}{3}=${$(e)}$.`,this.correction+=c(`<br> Mentalement : <br>
          On remarque que les écarts entre la valeur intermédiaire ($${$(e)}$) et les deux autres valeurs ($${$(e-r)}$ et $${$(e+r)}$) sont égaux (ils valent $${$(r)}$) :
          $\\underbrace{${$(s)}}_{${e}+ ${r}}$ ${t(2)} ; ${t(2)}  $${$(e)}$  ${t(2)} ; ${t(2)}  $\\underbrace{${$(i)}}_{${e}- ${r}}$. <br>
                            
                            On en déduit que la moyenne est la valeur intermédiaire : $${$(e)}$.
                  
                            
                            
                            `),this.reponse=e),a==="d"&&(e=o(100,200),r=o(2,9),i=e-r,s=e+r,this.question=`$${$(e)}$${t(2)} ; ${t(2)} $${$(s)}$ ${t(2)} ; ${t(2)}$${$(i)}$<br>
          
          Quelle est la moyenne de cette série ?`,this.correction=`La somme des $3$ valeurs est : $${$(e)}+${$(i)}+${$(s)} =${$(3*e)}$.<br>
                            La moyenne est donc $\\dfrac{${$(3*e)}}{3}=${$(e)}$.`,this.correction+=c(`<br> Mentalement : <br>
          En écrivant les valeurs dans l'ordre croissant : $\\underbrace{${$(i)}}_{${$(e)}- ${$(r)}}$ ${t(2)} ; ${t(2)}  $${$(e)}$  ${t(2)} ; ${t(2)}  $\\underbrace{${$(s)}}_{${$(e)}+ ${$(r)}}$,
                    on remarque que les écarts entre la valeur intermédiaire ($${$(e)}$) et les deux autres valeurs ($${$(e-r)}$ et $${$(e+r)}$) sont égaux (ils valent $${$(r)}$).<br>
          On en déduit que la moyenne est la valeur intermédiaire : $${$(e)}$.
                            
                            
                            `),this.reponse=e);break}this.canEnonce=this.question,this.canReponseACompleter=""}}export{S$ as default,g$ as interactifReady,k$ as interactifType,R$ as refs,O$ as titre,C$ as uuid};
//# sourceMappingURL=can3S05-BmCw5Xo2.js.map

import{E as L,ae as P,ah as M,z,r as m,aj as b,y as h,G as c,p as q,a1 as G,ak as x,al as K,am as N,m as S,f as J,n as l,b as v,K as d,o as R}from"./index-Bk_D2JkM.js";import{D as V}from"./vendors/decimal.js-16C9rIKp.js";/* empty css                         */import"./vendors/svelte-DYHmJxok.js";import"./vendors/ua-parser-js-IGXSU7q4.js";import"./vendors/instrumenpoche-BZzrq7Nx.js";import"./vendors/sesajstools-DShOIGrY.js";import"./vendors/ansi-styles-C5UZWym2.js";import"./vendors/katex-DoI0QyUo.js";import"./vendors/seedrandom-CNNRxp22.js";import"./vendors/crypto-js-jSnn2346.js";import"./vendors/apigeom-CSdzZNvA.js";import"./vendors/mathjs-oaIJR0Fd.js";import"./vendors/babel_runtime-91SaXnVV.js";import"./vendors/javascript-natural-sort-CZcnv-xn.js";import"./vendors/escape-latex-D2RmlMiC.js";import"./vendors/complex.js-CUuq6tox.js";import"./vendors/typed-function-DLw9ktPY.js";import"./vendors/fraction.js-CAdrwJ1J.js";import"./vendors/tiny-emitter-DDQe9_b_.js";import"./vendors/xstate-CiXeYAGM.js";import"./vendors/earcut-jJVragJp.js";import"./vendors/roughjs-GtHDBO_d.js";import"./json/referentielStaticCH-BvJ6T55O.js";import"./json/referentielStaticFR-CRF_Hjtf.js";import"./json/uuidsToUrlFR-BAWSFQnt.js";import"./vendors/cortex-js_compute-engine-CK5Y8453.js";import"./vendors/mathlive-DtHmjDB4.js";import"./vendors/bugsnag_js-CkCWaA3t.js";import"./vendors/bugsnag_browser-d00kmNSm.js";import"./vendors/big-integer-Cu-VsFVy.js";import"./json/codeToLevelList-Cc4cPPvZ.js";import"./json/codeToThemeList-xPVrG8Yb.js";import"./vendors/mixer_postmessage-rpc-Knoq2TfA.js";import"./vendors/eventemitter3-6E4L_h32.js";import"./vendors/scratchblocks-BVGw3YSR.js";import"./json/scratchFr-DbCU7OC2.js";import"./json/refToUuidFR-BN9okUDO.js";import"./json/refToUuidCH-Bo89B_4U.js";import"./vendors/loadjs-BzrfRgSk.js";import"./vendors/svelte-gestures-u4km4ICX.js";import"./vendors/tw-elements-Cl8JxGRl.js";import"./json/uuidsRessources-CtbQ0Y2s.js";import"./json/referentielProfs-Cey1_luL.js";import"./json/referentielBibliotheque-BkZtqQRj.js";import"./vendors/jszip-CxmGZ1c2.js";import"./vendors/jszip-utils-D5kR6ObF.js";import"./vendors/file-saver-FyOmtGcA.js";import"./vendors/copy-image-clipboard-Cf9y-QAU.js";import"./vendors/qrcode-SHonoxyK.js";import"./vendors/dijkstrajs-D_NXgYpA.js";import"./vendors/svelte-french-toast-BHXPj9o3.js";import"./vendors/svelte-writable-derived-Cn90q3ND.js";import"./vendors/brace-BiTXuHwf.js";import"./json/referentielAppsTierce-SxU58PZT.js";import"./vendors/sortablejs-C83syoBY.js";import"./json/carouselContent-BScQaKkw.js";import"./json/levelsThemesList-HiwLnYG4.js";import"./json/levelsThemesListCH-CWlgSx1G.js";import"./json/referentiel2022CH-BoAqvpTp.js";import"./json/referentiel2022FR-CoYbRrWo.js";import"./json/referentielGeometrieDynamique-BJ2PHXsv.js";import"./json/referentielRessources-BU2QQoSD.js";import"./json/referentielsActivation-CpD_hoec.js";const oe=!0,ie="mathLive",ae="Calculer un produit scalaire avec un angle",se="29/04/2025",$e="867cd",ce={"fr-fr":["1G10-3"],"fr-ch":[]};class ne extends L{constructor(){super(),this.nbQuestions=1,this.sup=1,this.spacing=1.5,this.besoinFormulaire2CaseACocher=["Avec des radians"],this.besoinFormulaireTexte=["Type de questions",["Nombres séparés par des tirets  :","1 : Application de la formule","2 : Avec une figure (parallélogramme)","3: Mélange"].join(`
`)]}nouvelleVersion(){const k=P({saisie:this.sup,min:1,max:2,melange:3,defaut:3,nbQuestions:this.nbQuestions}),O=M(k,this.nbQuestions);for(let o=0,a,$,i,B=0;o<this.nbQuestions&&B<50;){switch(O[o]){case 1:{const t=m(2,12),e=m(2,12),s=q([[30,"\\dfrac{\\pi}{6}"],[45,"\\dfrac{\\pi}{4}"],[60,"\\dfrac{\\pi}{3}"],[120,"\\dfrac{2\\pi}{3}"],[135,"\\dfrac{3\\pi}{4}"],[150,"\\dfrac{5\\pi}{6}"],[180,"\\pi"]]),n=`\\overrightarrow{AB}\\cdot\\overrightarrow{AC}&=${t}\\times ${e}\\times \\cos\\left(${this.sup2?`${s[1]}`:`${s[0]}^\\circ`}\\right)\\\\`;a=`On considère un triangle $ABC$ tel que $AB=${t}$, $AC=${e}$ et $\\widehat{BAC}=${this.sup2?`${s[1]}`:`${s[0]}^\\circ`}$.<br>
          Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.`,$=`D'après le cours on a : $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=AB\\times AC\\times \\cos(\\widehat{BAC})$.<br>
          On applique avec les données de l'énoncé : <br>`,a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=$"}),s[0]===30?($+=`$\\begin{aligned}
                ${n}
                &=${t*e}\\times \\dfrac{\\sqrt{3}}{2}\\\\
                &=${h(`${c(t*e/2,1)}\\sqrt{3}`)}
                \\end{aligned}$`,i=[`${t*e/2}\\sqrt{3}`]):s[0]===45?($+=`$\\begin{aligned}
                ${n}
                &=${t*e}\\times \\dfrac{\\sqrt{2}}{2}\\\\
                &=${h(`${c(t*e/2,1)}\\sqrt{2}`)}
                \\end{aligned}$`,i=[`${t*e/2}\\sqrt{2}`]):s[0]===60?($+=`$\\begin{aligned}
                ${n}
                &=${t*e}\\times \\dfrac{1}{2}\\\\
                &=${h(`${c(t*e/2,1)}`)}
                \\end{aligned}$`,i=[`${t*e/2}`]):s[0]===120?($+=`$\\begin{aligned}
                ${n}
                &=${t*e}\\times \\left(-\\dfrac{1}{2}\\right)\\\\
                &=${h(`${c(-t*e/2,1)}`)}
                \\end{aligned}$`,i=[`${-t*e/2}`]):s[0]===135?($+=`$\\begin{aligned}
                        ${n}
                        &=${t*e}\\times \\left(-\\dfrac{\\sqrt{2}}{2}\\right)\\\\
                        &=${h(`${c(-t*e/2,1)}\\sqrt{2}`)}
                        \\end{aligned}$`,i=[`${-t*e/2}\\sqrt{2}`]):s[0]===150?($+=`$\\begin{aligned}
                            ${n}
                            &=${t*e}\\times \\left(-\\dfrac{\\sqrt{3}}{2}\\right)\\\\
                            &=${h(`${c(-t*e/2,1)}\\sqrt{3}`)}
                            \\end{aligned}$`,i=[`${-t*e/2}\\sqrt{3}`]):($+=`$\\begin{aligned}
                            ${n}
                            &=${t*e}\\times (-1)\\\\
                            &=${h(`${c(-t*e,1)}`)}
                            \\end{aligned}$`,i=[`${-t*e}`]),l(this,o,{reponse:{value:i}})}break;case 2:default:{const t=z(0,0,"A","below"),e=m(3,6),g=m(4,8),s=new V(e*g).div(2),n=b(t,g,0,"B","below"),F=[[30,"\\dfrac{\\pi}{6}","\\dfrac{\\sqrt{3}}{2}",`${h(`${c(s,1)}\\sqrt{3}`)}`,`${h(`-${c(s,1)}\\sqrt{3}`)}`,`${c(s,1)}\\sqrt{3}`,"\\dfrac{5\\pi}{6}",150],[45,"\\dfrac{\\pi}{4}","\\dfrac{\\sqrt{2}}{2}",`${h(`${c(s,1)}\\sqrt{2}`)}`,`${h(`-${c(s,1)}\\sqrt{2}`)}`,`${c(s,1)}\\sqrt{2}`,"\\dfrac{3\\pi}{4}",135],[60,"\\dfrac{\\pi}{3}","\\dfrac{1}{2}",`${h(`${c(s,1)}`)}`,`${h(`-${c(s,1)}`)}`,`${c(s,1)}`,"\\dfrac{2\\pi}{3}",120]],r=q(F),w=`
                &=${e}\\times ${g}\\times \\cos\\left(${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}\\right)\\\\
                         &=${e*g}\\times${r[2]}\\\\
                         &=${r[3]}
                         \\end{aligned}$`,f=`
                &=-${e}\\times ${g}\\times \\cos\\left(${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}\\right)\\\\
                         &=-${e*g}\\times${r[2]}\\\\
                         &=${r[4]}
                         \\end{aligned}$`,A=`
                         &=-${e}\\times ${g}\\times \\cos\\left(${this.sup2?`${r[6]}`:`${r[7]}^\\circ`}\\right)\\\\
                                  &=-${e*g}\\times\\left(-${r[2]}\\right)\\\\
                                  &=${r[3]}
                                  \\end{aligned}$`,y=`
                         &=${e}\\times ${g}\\times \\cos\\left(${this.sup2?`${r[6]}`:`${r[7]}^\\circ`}\\right)\\\\
                                  &=${e*g}\\times\\left(-${r[2]}\\right)\\\\
                                  &=${r[4]}
                                  \\end{aligned}$`,p="On écrit le produit scalaire en utilisant des vecteurs de même origine.<br>",u=b(n,e,r[0],"C","above"),C=b(t,e,r[0],"D","above"),Q=G(t,n,u,C),T=x(n,t,"black",.5,""),j=x(u,n,"black",.5,""),E=K(n,t,C,"black",1.8,`${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}`),D=[];switch(D.push(N(t,n,u,C),T,j,E,Q),a="$ABCD$ est un parallélogramme.<br>",a+=S(Object.assign({zoom:1,scale:.6},J(D)),D),m(1,10)){case 1:a+="Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>",$=`On a :<br> $\\begin{aligned}
         \\overrightarrow{AB}\\cdot \\overrightarrow{AD}&=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
         ${w}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{AB}\\cdot \\overrightarrow{AD}=$"});break;case 2:a+="Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}$.<br>",$=p+`Comme  $\\overrightarrow{BC}=\\overrightarrow{AD}$, on a $\\overrightarrow{AB}\\cdot \\overrightarrow{BC}=\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>
                         $\\begin{aligned}
             \\overrightarrow{AB}\\cdot \\overrightarrow{BC}&= \\overrightarrow{AB}\\cdot \\overrightarrow{AD}\\\\
             &=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
             ${w}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{AB}\\cdot \\overrightarrow{BC}=$"});break;case 3:a+="Calculer $\\overrightarrow{AB}\\cdot \\overrightarrow{CB}$.<br>",$=p+`Comme  $\\overrightarrow{CB}=-\\overrightarrow{AD}$, on a $\\overrightarrow{AB}\\cdot \\overrightarrow{CB}=-\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>
                         $\\begin{aligned}
             \\overrightarrow{AB}\\cdot \\overrightarrow{CB}&= -\\overrightarrow{AB}\\cdot \\overrightarrow{AD}\\\\
             &=-AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
             ${f}`,i=`-${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{AB}\\cdot \\overrightarrow{CB}=$"});break;case 4:a+="Calculer $\\overrightarrow{DC}\\cdot \\overrightarrow{BC}$.<br>",$=p+`Comme  $\\overrightarrow{DC}=\\overrightarrow{AB}$ et $\\overrightarrow{BC}=\\overrightarrow{AD}$, on a $\\overrightarrow{DC}\\cdot \\overrightarrow{BC}=\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>
                             $\\begin{aligned}
                 \\overrightarrow{DC}\\cdot \\overrightarrow{BC}&= \\overrightarrow{AB}\\cdot \\overrightarrow{AD}\\\\
                 &=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
                 ${w}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{DC}\\cdot \\overrightarrow{BC}=$"});break;case 5:a+="Calculer $\\overrightarrow{CD}\\cdot \\overrightarrow{AD}$.<br>",$=p+`Comme  $\\overrightarrow{CD}=-\\overrightarrow{AB}$, on a $\\overrightarrow{CD}\\cdot \\overrightarrow{AD}=-\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>
                                 $\\begin{aligned}
                     \\overrightarrow{CD}\\cdot \\overrightarrow{AD}&= -\\overrightarrow{AB}\\cdot \\overrightarrow{AD}\\\\
                     &=-AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
                     ${f}`,i=`-${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{CD}\\cdot \\overrightarrow{AD}=$"});break;case 6:a+="Calculer $\\overrightarrow{DA}\\cdot \\overrightarrow{BA}$.<br>",$=p+`Comme  $\\overrightarrow{DA}=-\\overrightarrow{AD}$ et $\\overrightarrow{BA}=-\\overrightarrow{AB}$, on a $\\overrightarrow{DA}\\cdot \\overrightarrow{BA}=\\overrightarrow{AB}\\cdot \\overrightarrow{AD}$.<br>
                                     $\\begin{aligned}
                 \\overrightarrow{DA}\\cdot \\overrightarrow{BA}&= \\overrightarrow{AB}\\cdot \\overrightarrow{AD}\\\\
                 &=AB\\times AD\\times \\cos(\\widehat{BAD})\\\\
                 ${w}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{DA}\\cdot \\overrightarrow{BA}=$"});break;case 7:a+="Calculer $\\overrightarrow{DA}\\cdot \\overrightarrow{DC}$.<br>",$=p+`Comme  $ABCD$ est un parallélogramme, les angles consécutifs sont supplémentaires. <br>
                    Ainsi, $\\widehat{ADC}=${this.sup2?"\\pi":"180^\\circ"}-${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}= ${this.sup2?`${r[6]}`:`${r[7]}^\\circ`}$.<br>
                                         $\\begin{aligned}
                     \\overrightarrow{DA}\\cdot \\overrightarrow{DC}&= \\overrightarrow{DA}\\cdot \\overrightarrow{DC}\\\\
                     &=DA\\times DC\\times \\cos(\\widehat{ADC})\\\\
                     ${y}`,i=`-${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{DA}\\cdot \\overrightarrow{DC}=$"});break;case 8:a+="Calculer $\\overrightarrow{AD}\\cdot \\overrightarrow{DC}$.<br>",$=p+`Comme  $\\overrightarrow{AD}=-\\overrightarrow{DA}$, $\\overrightarrow{AD}\\cdot \\overrightarrow{DC}=-\\overrightarrow{DA}\\cdot \\overrightarrow{DC}$.<br>
                        De plus,  $ABCD$ est un parallélogramme donc ses angles consécutifs sont supplémentaires. <br>
                        Ainsi, $\\widehat{ADC}=${this.sup2?"\\pi":"180^\\circ"}-${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}= ${this.sup2?`${r[6]}`:`${r[7]}^\\circ`}$.<br>
                                             $\\begin{aligned}
                         \\overrightarrow{AD}\\cdot \\overrightarrow{DC}&= -\\overrightarrow{DA}\\cdot \\overrightarrow{DC}\\\\
                         &=-DA\\times DC\\times \\cos(\\widehat{ADC})\\\\
                         ${A}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{AD}\\cdot \\overrightarrow{DC}=$"});break;case 9:a+="Calculer $\\overrightarrow{BC}\\cdot \\overrightarrow{DC}$.<br>",$=p+`Comme  $\\overrightarrow{BC}=-\\overrightarrow{DA}$, on a  $\\overrightarrow{BC}\\cdot \\overrightarrow{DC}=-\\overrightarrow{DA}\\cdot \\overrightarrow{DC}$.<br>
                        De plus,  $ABCD$ est un parallélogramme donc ses angles consécutifs sont supplémentaires. <br>
                        Ainsi, $\\widehat{ADC}=${this.sup2?"\\pi":"180^\\circ"}-${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}= ${this.sup2?`${r[6]}`:`${r[7]}^\\circ`}$.<br>
                                             $\\begin{aligned}
                         \\overrightarrow{BC}\\cdot \\overrightarrow{DC}&= -\\overrightarrow{DA}\\cdot \\overrightarrow{DC}\\\\
                         &=-DA\\times DC\\times \\cos(\\widehat{ADC})\\\\
                         ${A}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{BC}\\cdot \\overrightarrow{DC}=$"});break;case 10:default:a+="Calculer $\\overrightarrow{BA}\\cdot \\overrightarrow{CB}$.<br>",$=p+`Comme  $\\overrightarrow{CB}=-\\overrightarrow{BC}$, on a  $\\overrightarrow{BA}\\cdot \\overrightarrow{CB}=-\\overrightarrow{BA}\\cdot \\overrightarrow{BC}$.<br>
                            De plus,  $ABCD$ est un parallélogramme donc ses angles consécutifs sont supplémentaires. <br>
                            Ainsi, $\\widehat{ABC}=${this.sup2?"\\pi":"180^\\circ"}-${this.sup2?`${r[1]}`:`${r[0]}^\\circ`}= ${this.sup2?`${r[6]}`:`${r[7]}^\\circ`}$.<br>
                                                 $\\begin{aligned}
                             \\overrightarrow{BA}\\cdot \\overrightarrow{CB}&= -\\overrightarrow{BA}\\cdot \\overrightarrow{BC}\\\\
                             &=-BA\\times BC\\times \\cos(\\widehat{ABC})\\\\
                             ${A}`,i=`${r[5]}`,l(this,o,{reponse:{value:i}}),a+=v(this,o,d.clavierFullOperations,{texteAvant:"<br>$\\overrightarrow{BA}\\cdot \\overrightarrow{CB}=$"});break}break}}this.questionJamaisPosee(o,a)&&(this.listeQuestions[o]=a,this.listeCorrections[o]=$,o++),B++}R(this)}}export{se as dateDePublication,ne as default,oe as interactifReady,ie as interactifType,ce as refs,ae as titre,$e as uuid};
//# sourceMappingURL=1G10-3-CJn_EXzy.js.map
